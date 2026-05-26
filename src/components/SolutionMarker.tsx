import { useRef, useState } from 'react';
import { CheckCircle, ClipboardCheck, FileUp, Target, XCircle } from 'lucide-react';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

interface SolutionMarkerProps {
  questionId: string;
  totalMarks: number;
  markScheme: string[];
  highMarkExtras?: string[];
  commonMistakes?: string[];
  onMarked?: (id: string) => void;
}

interface CriterionResult {
  criterion: string;
  covered: boolean;
  confidence: number;
  evidence: string[];
}

interface MarkingResult {
  awarded: number;
  percentage: number;
  band: string;
  strengths: string[];
  weaknesses: string[];
  criteria: CriterionResult[];
  extrasFound: string[];
  mistakesFlagged: string[];
}

const STOP_WORDS = new Set([
  'about', 'after', 'also', 'answer', 'because', 'before', 'being', 'briefly', 'could', 'each', 'from',
  'have', 'into', 'mark', 'marks', 'must', 'over', 'should', 'that', 'their', 'there', 'these', 'this',
  'through', 'under', 'when', 'where', 'which', 'with', 'would', 'your',
]);

function normalise(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s.]/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractKeywords(text: string) {
  const importantPhrases = Array.from(text.matchAll(/"([^"]+)"|'([^']+)'/g))
    .map(match => normalise(match[1] || match[2]))
    .filter(Boolean);

  const lawRefs = Array.from(text.matchAll(/\b(?:art(?:icle)?\.?|s(?:ection)?\.?|pida|gdpr|uk gdpr|cma|bcs|acas|ico|ptln|sar|loa)\s*[0-9a-z.]*/gi))
    .map(match => normalise(match[0]))
    .filter(Boolean);

  const words = normalise(text)
    .split(' ')
    .filter(word => word.length > 3 && !STOP_WORDS.has(word));

  return Array.from(new Set([...importantPhrases, ...lawRefs, ...words])).slice(0, 12);
}

function containsKeyword(answer: string, keyword: string) {
  if (keyword.length <= 4) {
    return new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(answer);
  }
  return answer.includes(keyword);
}

function evaluateSolution(answer: string, totalMarks: number, markScheme: string[], highMarkExtras: string[], commonMistakes: string[]): MarkingResult {
  const cleanAnswer = normalise(answer);
  const criteria = markScheme.map((criterion): CriterionResult => {
    const keywords = extractKeywords(criterion);
    const evidence = keywords.filter(keyword => containsKeyword(cleanAnswer, keyword));
    const confidence = keywords.length === 0 ? 0 : evidence.length / Math.min(keywords.length, 6);
    return {
      criterion,
      covered: confidence >= 0.34 || evidence.length >= 3,
      confidence: Math.min(1, confidence),
      evidence: evidence.slice(0, 5),
    };
  });

  const extrasFound = highMarkExtras.filter(extra => {
    const keywords = extractKeywords(extra);
    return keywords.filter(keyword => containsKeyword(cleanAnswer, keyword)).length >= Math.min(2, keywords.length);
  });

  const mistakesFlagged = commonMistakes.filter(mistake => {
    const keywords = extractKeywords(mistake);
    return keywords.filter(keyword => containsKeyword(cleanAnswer, keyword)).length >= Math.min(2, keywords.length);
  });

  const coveredCount = criteria.filter(c => c.covered).length;
  const baseScore = criteria.length === 0 ? 0 : (coveredCount / criteria.length) * totalMarks;
  const partialCredit = criteria.reduce((sum, c) => sum + (c.covered ? 0 : c.confidence * 0.45), 0);
  const extraCredit = Math.min(totalMarks * 0.12, extrasFound.length * 0.35);
  const mistakePenalty = Math.min(totalMarks * 0.18, mistakesFlagged.length * 0.45);
  const lengthPenalty = cleanAnswer.split(' ').length < Math.max(35, totalMarks * 8) ? Math.min(totalMarks * 0.12, 0.75) : 0;
  const awarded = Math.max(0, Math.min(totalMarks, Math.round((baseScore + partialCredit + extraCredit - mistakePenalty - lengthPenalty) * 2) / 2));
  const percentage = Math.round((awarded / totalMarks) * 100);

  const strengths = [
    ...criteria.filter(c => c.covered).slice(0, 3).map(c => c.criterion),
    ...extrasFound.slice(0, 2),
  ].slice(0, 4);

  const weaknesses = [
    ...criteria.filter(c => !c.covered).slice(0, 3).map(c => c.criterion),
    ...mistakesFlagged.slice(0, 2).map(m => `Possible trap: ${m}`),
    ...(lengthPenalty > 0 ? ['Answer looks brief for the mark allocation; add more applied explanation.'] : []),
  ].slice(0, 5);

  const band = percentage >= 85
    ? 'Distinction-level'
    : percentage >= 70
      ? 'Strong'
      : percentage >= 55
        ? 'Pass/solid'
        : percentage >= 40
          ? 'Borderline'
          : 'Needs rebuilding';

  return { awarded, percentage, band, strengths, weaknesses, criteria, extrasFound, mistakesFlagged };
}

export default function SolutionMarker({ questionId, totalMarks, markScheme, highMarkExtras = [], commonMistakes = [], onMarked }: SolutionMarkerProps) {
  const [answer, setAnswer] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [isMarking, setIsMarking] = useState(false);
  const [readStatus, setReadStatus] = useState('');
  const [markStatus, setMarkStatus] = useState('');
  const [markSource, setMarkSource] = useState<'ai' | 'local' | null>(null);
  const [result, setResult] = useState<MarkingResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const runOcr = async (image: File | string) => {
    const { recognize } = await import('tesseract.js');
    const result = await recognize(image, 'eng', {
      logger: message => {
        if (message.status) {
          const progress = message.progress ? ` ${Math.round(message.progress * 100)}%` : '';
          setReadStatus(`Reading image text: ${message.status}${progress}`);
        }
      },
    });
    return result.data.text;
  };

  const extractPdfText = async (file: File) => {
    setReadStatus('Reading PDF text...');
    const { GlobalWorkerOptions, getDocument } = await import('pdfjs-dist');
    GlobalWorkerOptions.workerSrc = pdfWorker;
    const data = await file.arrayBuffer();
    const pdf = await getDocument({ data }).promise;
    const pageTexts: string[] = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      const text = content.items
        .map(item => ('str' in item ? item.str : ''))
        .join(' ');
      pageTexts.push(text);
    }

    const extractedText = pageTexts.join('\n\n').trim();
    if (extractedText.length >= 30) return extractedText;

    const ocrPages = Math.min(pdf.numPages, 6);
    const ocrText: string[] = [];
    for (let pageNumber = 1; pageNumber <= ocrPages; pageNumber += 1) {
      setReadStatus(`PDF looks scanned. OCR page ${pageNumber}/${ocrPages}...`);
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.8 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) continue;
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      await page.render({ canvas, canvasContext: context, viewport }).promise;
      ocrText.push(await runOcr(canvas.toDataURL('image/png')));
    }

    if (pdf.numPages > ocrPages) {
      ocrText.push(`\n[Only the first ${ocrPages} pages were OCR-read. Paste any remaining answer text below.]`);
    }

    return ocrText.join('\n\n').trim();
  };

  const extractFileText = async (file: File) => {
    const type = file.type.toLowerCase();
    const name = file.name.toLowerCase();

    if (type === 'application/pdf' || name.endsWith('.pdf')) {
      return extractPdfText(file);
    }

    if (type.startsWith('image/') || /\.(png|jpe?g|webp|bmp|tiff?)$/.test(name)) {
      setReadStatus('Starting image OCR...');
      return runOcr(file);
    }

    setReadStatus('Reading text file...');
    return file.text();
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setFileError('');
    setFileName(file.name);
    setReadStatus('');
    setIsReadingFile(true);

    try {
      const text = await extractFileText(file);
      if (text.trim().length < 12) {
        setFileError('That file did not contain enough readable text. Try a clearer image or paste the answer below.');
        return;
      }
      setAnswer(text);
      setResult(null);
      setMarkSource(null);
    } catch {
      setFileError('Could not read that file. Try a clearer upload or paste the answer below.');
    } finally {
      setIsReadingFile(false);
      setReadStatus('');
    }
  };

  const markAnswer = async () => {
    if (answer.trim().length < 12) {
      setFileError('Add your answer first, either by upload or by pasting it here.');
      return;
    }
    setFileError('');
    setMarkStatus('Asking AI examiner...');
    setIsMarking(true);

    try {
      const response = await fetch('/api/mark-solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer, totalMarks, markScheme, highMarkExtras, commonMistakes }),
      });

      if (!response.ok) throw new Error('AI marking unavailable');

      const aiResult = await response.json() as MarkingResult;
      setResult(aiResult);
      setMarkSource('ai');
      setMarkStatus('AI marking complete.');
    } catch {
      setResult(evaluateSolution(answer, totalMarks, markScheme, highMarkExtras, commonMistakes));
      setMarkSource('local');
      setMarkStatus('AI marking was unavailable, so local mark-scheme matching was used.');
    } finally {
      setIsMarking(false);
    }

    onMarked?.(questionId);
  };

  return (
    <div style={{ background: '#14091f', border: '1px solid rgba(56,189,248,0.28)', borderRadius: 12 }} className="p-4 space-y-3">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div style={{ color: '#38bdf8', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Upload Solution</div>
          <p style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>Upload a text answer or paste it here to get a mark, feedback, and mark-scheme coverage.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,.text,.rtf,.pdf,.png,.jpg,.jpeg,.webp,.bmp,.tif,.tiff,image/*,application/pdf"
            onChange={event => handleFile(event.target.files?.[0])}
            style={{ display: 'none' }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isReadingFile}
            style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.35)', color: '#7dd3fc', borderRadius: 8, padding: '8px 12px', fontSize: 12, fontWeight: 700 }}
            className="flex items-center gap-1.5"
          >
            <FileUp size={13} /> {isReadingFile ? 'Reading...' : 'Upload'}
          </button>
          <button
            onClick={markAnswer}
            disabled={isReadingFile || isMarking}
            style={{ background: 'rgba(201,167,235,0.14)', border: '1px solid rgba(201,167,235,0.38)', color: '#d8b4fe', borderRadius: 8, padding: '8px 12px', fontSize: 12, fontWeight: 800 }}
            className="flex items-center gap-1.5"
          >
            <ClipboardCheck size={13} /> {isMarking ? 'Marking...' : 'AI Mark'}
          </button>
        </div>
      </div>

      {fileName && <div style={{ color: '#94a3b8', fontSize: 11 }}>Loaded: {fileName}</div>}
      {readStatus && <div style={{ color: '#7dd3fc', fontSize: 11 }}>{readStatus}</div>}
      {markStatus && <div style={{ color: markSource === 'local' ? '#fcd34d' : '#7dd3fc', fontSize: 11 }}>{markStatus}</div>}
      {fileError && <div style={{ color: '#fca5a5', fontSize: 11 }}>{fileError}</div>}

      <textarea
        value={answer}
        onChange={event => { setAnswer(event.target.value); setResult(null); setMarkSource(null); setMarkStatus(''); }}
        placeholder="Paste your answer here..."
        rows={7}
        style={{ width: '100%', background: '#0f0a19', border: '1px solid #2a1938', borderRadius: 10, color: '#e2e8f0', fontSize: 13, lineHeight: 1.6, padding: 12, resize: 'vertical', outline: 'none' }}
      />

      {result && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div style={{ background: '#2a1938', borderRadius: 10, padding: 12, textAlign: 'center' }}>
              <div style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 900 }}>{result.awarded}/{totalMarks}</div>
              <div style={{ color: '#64748b', fontSize: 10 }}>overall mark</div>
            </div>
            <div style={{ background: '#2a1938', borderRadius: 10, padding: 12, textAlign: 'center' }}>
              <div style={{ color: '#38bdf8', fontSize: 22, fontWeight: 900 }}>{result.percentage}%</div>
              <div style={{ color: '#64748b', fontSize: 10 }}>{markSource === 'ai' ? 'AI marked' : 'estimated'}</div>
            </div>
            <div style={{ background: '#2a1938', borderRadius: 10, padding: 12, textAlign: 'center' }}>
              <div style={{ color: '#d8b4fe', fontSize: 13, fontWeight: 800 }}>{result.band}</div>
              <div style={{ color: '#64748b', fontSize: 10 }}>band</div>
            </div>
            <div style={{ background: '#2a1938', borderRadius: 10, padding: 12, textAlign: 'center' }}>
              <div style={{ color: '#a7f3d0', fontSize: 22, fontWeight: 900 }}>{result.criteria.filter(c => c.covered).length}/{result.criteria.length}</div>
              <div style={{ color: '#64748b', fontSize: 10 }}>points hit</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.22)', borderRadius: 10, padding: 12 }}>
              <div style={{ color: '#a7f3d0', fontSize: 11, fontWeight: 800, marginBottom: 8 }}>STRENGTHS</div>
              {(result.strengths.length ? result.strengths : ['Some relevant material is present; tighten it against the mark scheme.']).map((item, index) => (
                <p key={index} style={{ color: '#d1fae5', fontSize: 12, lineHeight: 1.5, marginBottom: 6 }}>{item}</p>
              ))}
            </div>
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.22)', borderRadius: 10, padding: 12 }}>
              <div style={{ color: '#fca5a5', fontSize: 11, fontWeight: 800, marginBottom: 8 }}>WEAKNESSES</div>
              {(result.weaknesses.length ? result.weaknesses : ['No major missing criteria detected; improve precision and examples for higher marks.']).map((item, index) => (
                <p key={index} style={{ color: '#fecaca', fontSize: 12, lineHeight: 1.5, marginBottom: 6 }}>{item}</p>
              ))}
            </div>
          </div>

          <div style={{ background: '#0f0a19', border: '1px solid #2a1938', borderRadius: 10, padding: 12 }}>
            <div className="flex items-center gap-2" style={{ color: '#d8b4fe', fontSize: 11, fontWeight: 800, marginBottom: 10 }}>
              <Target size={12} /> MARK SCHEME COVERAGE
            </div>
            <div className="space-y-2">
              {result.criteria.map((criterion, index) => (
                <div key={index} className="flex items-start gap-2">
                  {criterion.covered ? <CheckCircle size={13} style={{ color: '#34d399', flexShrink: 0, marginTop: 2 }} /> : <XCircle size={13} style={{ color: '#f87171', flexShrink: 0, marginTop: 2 }} />}
                  <div>
                    <p style={{ color: criterion.covered ? '#d1fae5' : '#fecaca', fontSize: 12, lineHeight: 1.45 }}>{criterion.criterion}</p>
                    {criterion.evidence.length > 0 && (
                      <p style={{ color: '#64748b', fontSize: 10, marginTop: 2 }}>Matched: {criterion.evidence.join(', ')}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

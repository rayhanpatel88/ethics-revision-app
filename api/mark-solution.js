const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

function clampMark(value, totalMarks) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.min(totalMarks, Math.round(number * 2) / 2));
}

function normaliseResult(raw, totalMarks, markScheme) {
  const awarded = clampMark(raw.awarded, totalMarks);
  const percentage = Math.round((awarded / totalMarks) * 100);

  const criteria = Array.isArray(raw.criteria)
    ? raw.criteria.map((criterion, index) => ({
        criterion: String(criterion.criterion || markScheme[index] || ''),
        covered: Boolean(criterion.covered),
        confidence: Math.max(0, Math.min(1, Number(criterion.confidence) || 0)),
        evidence: Array.isArray(criterion.evidence) ? criterion.evidence.slice(0, 5).map(String) : [],
      })).filter(criterion => criterion.criterion)
    : markScheme.map(criterion => ({ criterion, covered: false, confidence: 0, evidence: [] }));

  return {
    awarded,
    percentage,
    band: String(raw.band || (percentage >= 70 ? 'Strong' : percentage >= 55 ? 'Pass/solid' : percentage >= 40 ? 'Borderline' : 'Needs rebuilding')),
    strengths: Array.isArray(raw.strengths) ? raw.strengths.slice(0, 5).map(String) : [],
    weaknesses: Array.isArray(raw.weaknesses) ? raw.weaknesses.slice(0, 5).map(String) : [],
    criteria,
    extrasFound: Array.isArray(raw.extrasFound) ? raw.extrasFound.slice(0, 4).map(String) : [],
    mistakesFlagged: Array.isArray(raw.mistakesFlagged) ? raw.mistakesFlagged.slice(0, 4).map(String) : [],
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'OPENROUTER_API_KEY is not configured' });
  }

  const { answer, totalMarks, markScheme, highMarkExtras = [], commonMistakes = [] } = req.body || {};
  if (typeof answer !== 'string' || answer.trim().length < 12 || !Array.isArray(markScheme) || !Number.isFinite(Number(totalMarks))) {
    return res.status(400).json({ error: 'Invalid marking request' });
  }

  const numericTotal = Number(totalMarks);
  const prompt = {
    answer: answer.slice(0, 12000),
    totalMarks: numericTotal,
    markScheme,
    highMarkExtras,
    commonMistakes,
    requiredJsonShape: {
      awarded: 'number, half marks allowed, 0 to totalMarks',
      band: 'short string',
      strengths: ['specific strengths tied to the answer'],
      weaknesses: ['specific missing points or improvements'],
      criteria: [{ criterion: 'criterion text', covered: true, confidence: 0.8, evidence: ['short evidence from answer'] }],
      extrasFound: ['high mark extras found'],
      mistakesFlagged: ['common mistakes detected'],
    },
  };

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'https://ethics-revision-app.vercel.app',
        'X-Title': 'Ethics Revision App',
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: 'You are a strict but helpful UK MSc computing ethics examiner. Mark only against the supplied mark scheme. Return valid JSON only. Do not invent criteria. Award partial credit where the idea is present even if phrasing differs. Penalise unsupported general waffle and legal inaccuracies.',
          },
          {
            role: 'user',
            content: JSON.stringify(prompt),
          },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text.slice(0, 500) || 'OpenRouter request failed' });
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);
    return res.status(200).json(normaliseResult(parsed, numericTotal, markScheme));
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'AI marking failed' });
  }
}

import { useMemo, useState } from 'react';
import { Headphones, Network, Radio, Search, Link as LinkIcon, CheckCircle, Sparkles, FileText, Video, Presentation, FolderOpen } from 'lucide-react';
import { mindmapNodes, podcastEpisodes, resourceLibrary } from '../data/mindmap';
import type { MindmapNode, PodcastEpisode, ResourceItem } from '../data/mindmap';
import type { Week } from '../data/types';

const WEEK_LABELS: Record<Week, string> = {
  week1: 'Week 1',
  week2: 'Week 2',
  week3: 'Week 3',
  week5: 'Week 5',
  week6: 'Week 6',
  week9: 'Week 9',
};

const NODE_SIZE: Record<MindmapNode['size'], number> = {
  core: 104,
  major: 92,
  minor: 82,
};

function titleFromEpisode(episode: PodcastEpisode) {
  return episode.title.replace(/_/g, ' ');
}

export default function MindmapPodcasts() {
  const [selectedId, setSelectedId] = useState('core');
  const [activeWeek, setActiveWeek] = useState<Week | 'all'>('all');
  const [query, setQuery] = useState('');
  const [resourceType, setResourceType] = useState<ResourceItem['type'] | 'all'>('all');
  const [resourceSource, setResourceSource] = useState<ResourceItem['source'] | 'all'>('all');
  const [resourceQuery, setResourceQuery] = useState('');

  const selected = mindmapNodes.find(node => node.id === selectedId) ?? mindmapNodes[0];
  const selectedPodcasts = podcastEpisodes.filter(episode => selected.podcastIds.includes(episode.id));

  const visibleEpisodes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return podcastEpisodes.filter(episode => {
      if (activeWeek !== 'all' && episode.week !== activeWeek) return false;
      if (!q) return true;
      return [
        episode.title,
        episode.topic,
        ...episode.focus,
      ].some(value => value.toLowerCase().includes(q));
    });
  }, [activeWeek, query]);

  const visibleResources = useMemo(() => {
    const q = resourceQuery.trim().toLowerCase();
    return resourceLibrary.filter(resource => {
      if (resourceType !== 'all' && resource.type !== resourceType) return false;
      if (resourceSource !== 'all' && resource.source !== resourceSource) return false;
      if (activeWeek !== 'all' && !resource.weekLabel.toLowerCase().includes(WEEK_LABELS[activeWeek].toLowerCase())) return false;
      if (!q) return true;
      return [
        resource.title,
        resource.topic,
        resource.weekLabel,
        resource.source,
        resource.type,
        ...resource.focus,
      ].some(value => value.toLowerCase().includes(q));
    });
  }, [activeWeek, resourceQuery, resourceSource, resourceType]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Network size={20} style={{ color: '#c9a7eb' }} />
            <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>Mindmap + Podcasts</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13 }}>Explore how the examinable weeks connect, then listen to the matching podcast episodes.</p>
        </div>
        <div style={{ background: 'rgba(201,167,235,0.08)', border: '1px solid rgba(201,167,235,0.2)', borderRadius: 12, padding: '10px 14px' }} className="flex items-center gap-2">
          <Headphones size={16} style={{ color: '#c9a7eb' }} />
          <span style={{ color: '#d8b4fe', fontSize: 12, fontWeight: 700 }}>{podcastEpisodes.length} podcast episodes</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.9fr] gap-4">
        <section style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14, overflow: 'hidden' }}>
          <div className="relative" style={{ minHeight: 560 }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.75, pointerEvents: 'none' }}>
              {mindmapNodes.flatMap(node =>
                node.links
                  .filter(linkId => node.id < linkId)
                  .map(linkId => {
                    const target = mindmapNodes.find(n => n.id === linkId);
                    if (!target) return null;
                    const active = selected.id === node.id || selected.id === target.id;
                    return (
                      <line
                        key={`${node.id}-${target.id}`}
                        x1={node.x}
                        y1={node.y}
                        x2={target.x}
                        y2={target.y}
                        stroke={active ? '#c9a7eb' : '#4c315f'}
                        strokeWidth={active ? 0.48 : 0.22}
                        strokeLinecap="round"
                      />
                    );
                  })
              )}
            </svg>

            {mindmapNodes.map(node => {
              const active = selected.id === node.id;
              const size = NODE_SIZE[node.size];
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedId(node.id)}
                  style={{
                    position: 'absolute',
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    width: size,
                    minHeight: size,
                    transform: 'translate(-50%, -50%)',
                    borderRadius: node.size === 'core' ? '50%' : 12,
                    background: active ? `${node.color}24` : '#0f0a19',
                    border: `1px solid ${active ? node.color : '#2a1938'}`,
                    boxShadow: active ? `0 0 0 3px ${node.color}18` : 'none',
                    color: active ? node.color : '#cbd5e1',
                    padding: 10,
                    textAlign: 'center',
                    transition: 'all 0.16s ease',
                  }}
                  className="flex flex-col items-center justify-center gap-1 hover:opacity-90"
                >
                  <span style={{ fontSize: node.size === 'core' ? 13 : 12, fontWeight: 850, lineHeight: 1.15 }}>{node.label}</span>
                  {node.week && <span style={{ color: '#64748b', fontSize: 10, fontWeight: 700 }}>{WEEK_LABELS[node.week]}</span>}
                  {node.podcastIds.length > 0 && (
                    <span className="flex items-center gap-1" style={{ color: node.color, fontSize: 10, fontWeight: 700 }}>
                      <Headphones size={10} /> {node.podcastIds.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <aside style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} style={{ color: selected.color }} />
              <h2 style={{ color: selected.color, fontWeight: 850, fontSize: 18 }}>{selected.label}</h2>
            </div>
            <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.6 }}>{selected.summary}</p>
          </div>

          <div>
            <div style={{ color: '#64748b', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Must Know</div>
            <div className="space-y-2">
              {selected.mustKnow.map(item => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle size={12} style={{ color: selected.color, flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.45 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ color: '#64748b', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Exam Angles</div>
            <div className="space-y-2">
              {selected.examAngles.map(item => (
                <div key={item} style={{ background: `${selected.color}10`, border: `1px solid ${selected.color}25`, borderRadius: 8, padding: '8px 10px' }}>
                  <span style={{ color: '#d8b4fe', fontSize: 12, lineHeight: 1.45 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {selectedPodcasts.length > 0 && (
            <div>
              <div style={{ color: '#64748b', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Linked Podcasts</div>
              <div className="space-y-3">
                {selectedPodcasts.map(episode => (
                  <PodcastCard key={episode.id} episode={episode} compact />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <section style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5 space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Radio size={18} style={{ color: '#ff6aa8' }} />
            <h2 style={{ color: '#f1f5f9', fontSize: 17, fontWeight: 850 }}>Podcast Library</h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2" style={{ background: '#0f0a19', border: '1px solid #2a1938', borderRadius: 10, padding: '7px 10px' }}>
              <Search size={13} style={{ color: '#64748b' }} />
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search episodes"
                style={{ background: 'transparent', color: '#f1f5f9', outline: 'none', border: 0, fontSize: 12, width: 160 }}
              />
            </div>
            {(['all', 'week1', 'week2', 'week3', 'week5', 'week6', 'week9'] as const).map(week => (
              <button
                key={week}
                onClick={() => setActiveWeek(week)}
                style={{
                  background: activeWeek === week ? 'rgba(201,167,235,0.16)' : '#0f0a19',
                  border: `1px solid ${activeWeek === week ? 'rgba(201,167,235,0.35)' : '#2a1938'}`,
                  color: activeWeek === week ? '#d8b4fe' : '#94a3b8',
                  borderRadius: 8,
                  padding: '7px 9px',
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {week === 'all' ? 'All' : WEEK_LABELS[week]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {visibleEpisodes.map(episode => (
            <PodcastCard key={episode.id} episode={episode} />
          ))}
        </div>
      </section>

      <section style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5 space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <FolderOpen size={18} style={{ color: '#38bdf8' }} />
            <h2 style={{ color: '#f1f5f9', fontSize: 17, fontWeight: 850 }}>Slide Decks, Handouts + Videos</h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2" style={{ background: '#0f0a19', border: '1px solid #2a1938', borderRadius: 10, padding: '7px 10px' }}>
              <Search size={13} style={{ color: '#64748b' }} />
              <input
                value={resourceQuery}
                onChange={event => setResourceQuery(event.target.value)}
                placeholder="Search resources"
                style={{ background: 'transparent', color: '#f1f5f9', outline: 'none', border: 0, fontSize: 12, width: 170 }}
              />
            </div>
            {(['all', 'slides', 'pdf', 'video'] as const).map(type => (
              <button
                key={type}
                onClick={() => setResourceType(type)}
                style={{
                  background: resourceType === type ? 'rgba(56,189,248,0.14)' : '#0f0a19',
                  border: `1px solid ${resourceType === type ? 'rgba(56,189,248,0.35)' : '#2a1938'}`,
                  color: resourceType === type ? '#7dd3fc' : '#94a3b8',
                  borderRadius: 8,
                  padding: '7px 9px',
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'capitalize',
                }}
              >
                {type === 'all' ? 'All types' : type}
              </button>
            ))}
            {(['all', 'original', 'revision'] as const).map(source => (
              <button
                key={source}
                onClick={() => setResourceSource(source)}
                style={{
                  background: resourceSource === source ? 'rgba(201,167,235,0.14)' : '#0f0a19',
                  border: `1px solid ${resourceSource === source ? 'rgba(201,167,235,0.35)' : '#2a1938'}`,
                  color: resourceSource === source ? '#d8b4fe' : '#94a3b8',
                  borderRadius: 8,
                  padding: '7px 9px',
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'capitalize',
                }}
              >
                {source === 'all' ? 'All sources' : source}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {visibleResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>
    </div>
  );
}

function PodcastCard({ episode, compact = false }: { episode: PodcastEpisode; compact?: boolean }) {
  return (
    <div style={{ background: '#0f0a19', border: '1px solid #2a1938', borderRadius: 10, padding: compact ? '10px 12px' : '12px 14px' }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Headphones size={13} style={{ color: '#ff6aa8', flexShrink: 0 }} />
            <h3 style={{ color: '#f1f5f9', fontSize: compact ? 12 : 14, fontWeight: 800, lineHeight: 1.25 }}>{titleFromEpisode(episode)}</h3>
          </div>
          <p style={{ color: '#64748b', fontSize: 11, lineHeight: 1.45 }}>{WEEK_LABELS[episode.week]} · {episode.topic}</p>
        </div>
        <span style={{ color: '#475569', fontSize: 10, fontWeight: 800, flexShrink: 0 }}>{episode.durationLabel}</span>
      </div>
      {!compact && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {episode.focus.map(item => (
            <span key={item} style={{ background: 'rgba(255,106,168,0.08)', border: '1px solid rgba(255,106,168,0.18)', color: '#ffb4cf', borderRadius: 6, padding: '3px 6px', fontSize: 10, fontWeight: 700 }}>
              {item}
            </span>
          ))}
        </div>
      )}
      <audio controls preload="none" src={episode.src} style={{ width: '100%', marginTop: compact ? 8 : 12 }} />
      {!compact && (
        <a href={episode.src} style={{ color: '#94a3b8', fontSize: 11, marginTop: 8 }} className="flex items-center gap-1">
          <LinkIcon size={11} /> Open audio file
        </a>
      )}
    </div>
  );
}

function ResourceCard({ resource }: { resource: ResourceItem }) {
  const href = encodeURI(resource.src);
  const Icon = resource.type === 'video' ? Video : resource.type === 'slides' ? Presentation : FileText;
  const color = resource.type === 'video' ? '#ff6aa8' : resource.type === 'slides' ? '#c9a7eb' : '#38bdf8';

  return (
    <div style={{ background: '#0f0a19', border: '1px solid #2a1938', borderRadius: 10, padding: '12px 14px' }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Icon size={14} style={{ color, flexShrink: 0 }} />
            <h3 style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 850, lineHeight: 1.25 }}>{resource.title}</h3>
          </div>
          <p style={{ color: '#64748b', fontSize: 11, lineHeight: 1.45 }}>
            {resource.weekLabel} · {resource.topic} · {resource.source === 'original' ? 'Original source pack' : 'Revision media pack'}
          </p>
        </div>
        <span style={{ color, border: `1px solid ${color}35`, background: `${color}12`, borderRadius: 6, padding: '3px 7px', fontSize: 10, fontWeight: 850, textTransform: 'uppercase' }}>
          {resource.type}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {resource.focus.map(item => (
          <span key={item} style={{ background: `${color}10`, border: `1px solid ${color}20`, color: '#cbd5e1', borderRadius: 6, padding: '3px 6px', fontSize: 10, fontWeight: 700 }}>
            {item}
          </span>
        ))}
      </div>

      {resource.type === 'video' && (
        <video controls preload="metadata" src={href} style={{ width: '100%', marginTop: 12, borderRadius: 8, background: '#09040f', maxHeight: 280 }} />
      )}

      <a href={href} style={{ color: '#94a3b8', fontSize: 11, marginTop: 10 }} className="flex items-center gap-1">
        <LinkIcon size={11} /> {resource.type === 'video' ? 'Open video file' : 'Open resource'}
      </a>
    </div>
  );
}

// Weekly radar pick: take the oldest Breakpoint topic Billy APPROVED in the Topic Radar email
// (n8n table "topic_radar", business = 'bps', status = 'approved'). Never 'suggested' rows: Billy approves every topic.
// A topic is used once: skipped if it already has a handoff_ref, or if our own ledger already logged it (source "radar:<id>").
const rows = $('Get Radar Topics').all().map(i => i.json || {});
const usedRefs = new Set($input.all().map(i => String((i.json || {}).source_url || '')).filter(s => s.startsWith('radar:')));
const list = v => { try { const a = typeof v === 'string' ? JSON.parse(v) : v; return Array.isArray(a) ? a : []; } catch (e) { return []; } };
const pick = rows
  .filter(r => r.business === 'bps' && r.status === 'approved' && !String(r.handoff_ref || '').trim() && !usedRefs.has('radar:' + r.id))
  .sort((a, b) => String(a.decided_et || a.createdAt || '').localeCompare(String(b.decided_et || b.createdAt || '')))[0];
if (!pick) return [{ json: { skip: true, reason: 'No approved Breakpoint radar topic waiting. Approve one in the Monday Topic Radar email, or use the request form.' } }];
// The approved row becomes the episode brief. Its sources are listed so the writer can credit them;
// the strategist's own wording is not treated as verified fact (the script gate still blocks invented numbers).
const brief = [
  'TOPIC: ' + (pick.title || ''),
  'OWNER QUESTION: ' + (pick.primary_question || ''),
  'WHY NOW: ' + (pick.why_now || ''),
  'ANGLE FOR THE EPISODE: ' + (pick.podcast_angle || ''),
  'SHORT ANSWER TO BUILD ON: ' + (pick.extractable_answer || ''),
  'WHAT MAKES OUR TAKE DIFFERENT: ' + (pick.citation_edge || ''),
  'Use only general explanations plus the points above. Do not state statistics, prices or company results unless they appear above.',
  list(pick.source_urls).length ? 'NEWS SOURCES (credit by publication name if used): ' + list(pick.source_urls).join(' ') : ''
].filter(Boolean).join('\n');
return [{ json: { skip: false, radar_id: pick.id, source_url: '', source_type: 'brief', brief, air_date: '', radar_ref: 'radar:' + pick.id, title: pick.title } }];

// Breakpoint podcast script gate: format, brand and claims checks (never throws; reports).
// The insurance shows' compliance rules do NOT apply to this show; it has its own rules below.
const script = $input.first().json.text || '';
const src = $('Build Script Input').first().json;
const S = $('Show Settings').first().json;
const CO = src.cohost_name;
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const LABEL = new RegExp('^(' + esc(CO) + '|Billy)\\s*:', 'i');
// Words that are in the approved source never block; only words the writer ADDED are checked.
const approved = src.source_type !== 'article';
const post = String(src.compiled_content || '').toLowerCase().replace(/[‘’]/g, "'");
const added = p => (script.match(new RegExp(p.source, p.flags.includes('g') ? p.flags : p.flags + 'g')) || []).filter(m => !(approved && post.includes(m.toLowerCase().replace(/[‘’]/g, "'"))));
const words = script.trim().split(/\s+/).filter(Boolean).length;
const v = [];
if (words < 500) v.push('script_broken_too_short(' + words + ' words)');
if (words > 2000) v.push('script_broken_too_long(' + words + ' words)');
const lengthNote = words < 750 ? 'Short: about ' + words + ' words, under 5 minutes' : words > 1550 ? 'OVER 10 MINUTES: about ' + words + ' words. Consider declining' : words > 1150 ? 'Long: about ' + words + ' words, over 7 minutes' : '';
const lines = script.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
if (!new RegExp('^' + esc(CO) + '\\s*:', 'i').test(lines[0] || '')) v.push('first_line_must_be_cohost_hook');
if (lines.some(l => !LABEL.test(l))) v.push('every_line_must_start_with_a_speaker');
if (!/^\s*Billy\s*:/im.test(script)) v.push('missing_billy_lines');
if (!new RegExp("I['’]m " + esc(CO), 'i').test(script)) v.push('missing_cohost_intro');
if (lines.some(l => new RegExp('\\b(' + esc(CO) + '|Billy)\\s*:', 'i').test(l.replace(LABEL, '')))) v.push('speaker_name_inside_a_line_would_be_read_aloud');
const cta = String(S.cta_must_contain || '').trim();
if (cta && !script.toLowerCase().includes(cta.toLowerCase())) v.push('missing_cta(' + cta + ')');
if (src.spoken_ai_line && !script.includes(src.spoken_ai_line)) v.push('missing_spoken_ai_line');
// Brand: "Break Point" with a space and initials are never used.
const brandBad = [/\bBreak\s+Point\b/i, /\bBPS\b/];
brandBad.forEach(p => { if (p.test(script)) v.push('brand_name:' + p.toString()); });
// Promised results and hype the writer added.
const forbidden = [/\bguarantee[ds]?\s+(?:results?|roi|returns?|savings|growth|leads|revenue|sales|success)\b/i, /\brisk[-\s]?free\b/i, /\bovernight (?:success|results?)\b/i, /\bset it and forget it\b/i, /\bwill (?:double|triple|10x)\b/i, /\b(?:double|triple) your (?:revenue|sales|leads|profits?)\b/i, /\bnumber one\b/i, /\b#1\b/];
forbidden.forEach(p => { if (added(p).length) v.push('forbidden:' + p.toString()); });
// Made-up numbers: a percentage or dollar figure in the script when the source has none at all.
// (Spoken forms like "forty percent" can't be matched to "40%", so this only blocks when the source has no such figures.)
const srcHasPct = /%|percent/i.test(post), srcHasMoney = /\$|dollar/i.test(post);
if (!srcHasPct && /\b\d+(?:\.\d+)?\s?%|\bpercent\b/i.test(script)) v.push('percentage_not_in_source');
if (!srcHasMoney && /\$\s?\d|\bdollars?\b/i.test(script)) v.push('dollar_figure_not_in_source');
return [{ json: {
  pass: v.length === 0,
  violations: v,
  final_script: script,
  topic: src.topic,
  word_count: words,
  est_minutes: Math.round((words / 170 + 0.7) * 10) / 10,
  length_note: lengthNote,
  script_chars: script.length,
  editor_issues: $input.first().json.editor_issues || []
} }];

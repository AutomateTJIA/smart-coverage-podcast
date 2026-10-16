// Read the editor's JSON. If it is unreadable, keep the writer's script and say so.
// Then repair formatting so a stray line never sinks an episode: lines without a speaker join the line before.
const CO = $('Build Script Input').first().json.cohost_name;
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const NAMES = '(' + esc(CO) + '|Billy)';
const raw = String($input.first().json.text || '').trim();
const txt = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
let parsed = null;
try { parsed = JSON.parse(txt); } catch (e) {
  const m = txt.match(/\{[\s\S]*\}/);
  if (m) { try { parsed = JSON.parse(m[0]); } catch (e2) {} }
}
const original = String($('Write Dialogue').first().json.text || '');
const ok = parsed && typeof parsed.script === 'string' && parsed.script.trim().length > 3000;
function repair(s) {
  const out = [];
  // A speaker label in the middle of a line would be read aloud, so it starts a new line
  const split = String(s).replace(new RegExp('([.!?…"”)\\]:;,—–-])[ \\t]+(?:\\*\\*)?' + NAMES + '(?:\\*\\*)?\\s*:\\s*', 'gi'), '$1\n$2: ');
  for (const rawLine of split.split(/\r?\n/)) {
    let l = rawLine.replace(/\*\*/g, '').replace(/^\s*(?:[-*•]|#+)\s+/, '').trim();
    if (!l) continue;
    l = l.replace(new RegExp('^' + NAMES + '(?:\\s+jordan)?(?:\\s*\\([^)]*\\))?\\s*:\\s*', 'i'), (m, w) => (w.toLowerCase() === 'billy' ? 'Billy' : CO) + ': ');
    if (new RegExp('^' + NAMES + ': ').test(l)) out.push(l);
    else if (out.length) out[out.length - 1] += ' ' + l;
    else out.push(CO + ': ' + l);
  }
  return out.join('\n');
}
const chosen = ok ? parsed.script.trim() : original;
const fixed = repair(chosen);
const issues = ok && Array.isArray(parsed.issues) ? parsed.issues.slice(0, 12) : ['Editor output unreadable, so the writer script was kept as is.'];
if (fixed !== chosen.split(/\r?\n/).map(x => x.trim()).filter(Boolean).join('\n')) issues.push('Formatting repaired automatically (lines without a speaker were joined to the line before; a speaker name in the middle of a line was moved to its own line).');
return [{ json: { text: fixed, editor_issues: issues } }];

// Split the co-host + Billy dialogue into ElevenLabs Text to Dialogue chunks.
// Chunk 0 is ONLY the co-host's hook line, so the intro music (if any) goes right after it.
const S = $('Show Settings').first().json;
const script = $('Plan Release').first().json.final_script || '';
const CO = S.cohost_name;
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const VOICES = { [CO.toLowerCase()]: S.cohost_voice, billy: S.host_voice };
const MAX_CHARS = 1500;
const turns = [];
let cur = null;
const names = '(' + esc(CO) + '|Billy)';
for (const raw of script.replace(new RegExp('([.!?…"”)\\]:;,—–-])[ \\t]+' + names + '\\s*:\\s*', 'gi'), '$1\n$2: ').split(/\r?\n/)) {
  const line = raw.trim();
  if (!line) continue;
  const m = line.match(new RegExp('^' + names + '\\s*:\\s*(.*)$', 'i'));
  if (m) { if (cur) turns.push(cur); cur = { voice_id: VOICES[m[1].toLowerCase()], text: m[2].trim() }; }
  else if (cur) { cur.text += ' ' + line; }
}
if (cur) turns.push(cur);
const clean = turns.filter(t => t.voice_id && t.text);
if (clean.length < 2) throw new Error('Split Dialogue: no co-host/Billy turns parsed');
const chunks = [[clean[0]]];
let chunk = [], len = 0;
for (const t of clean.slice(1)) {
  const add = t.text.length + 12;
  if (len + add > MAX_CHARS && chunk.length) { chunks.push(chunk); chunk = []; len = 0; }
  chunk.push({ text: t.text, voice_id: t.voice_id });
  len += add;
}
if (chunk.length) chunks.push(chunk);
return chunks.map((inputs, i) => ({ json: { dialogue_inputs: inputs, chunk_index: i, is_hook: i === 0, total_chunks: chunks.length } }));

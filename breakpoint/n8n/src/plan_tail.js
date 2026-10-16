
// Stop before any voice credits are spent if the Breakpoint show doesn't exist in Transistor yet.
if (!SHOW_ID) throw new Error('Breakpoint podcast: no Transistor show ID yet. Create the show in Transistor and paste its ID into transistor_show_id in the Show Settings node. Nothing was spent on voices.');
const d = $('Read Episode Details').first().json;
const rows = $input.all().map(i => i.json).filter(r => r && (!r.show_id || String(r.show_id) === SHOW_ID));
// The lowest episode number not in use, so a pulled and remade episode keeps its number
const used = new Set(rows.filter(r => ['published', 'scheduled'].includes(r.status)).map(r => Number(r.episode_number) || 0));
let n = 0; while (used.has(n + 1)) n++;
const s = pickSlot(rows, $('Episode Request').first().json.air_date, DateTime.now().setZone(NY));
return [{ json: { episode_number: n + 1, ...s, ...d, show_id: SHOW_ID, show_name: S.show_name } }];

// One item per episode: each new link, plus the brief (if any). Skips links that already have a live or scheduled episode.
// Air date: the first episode gets the date asked for; the rest go on the release days after it.
const req = $('Check Requester').first().json;
const norm = u => String(u || '').trim().replace(/[?#].*$/, '').replace(/\/+$/, '').toLowerCase();
const done = new Set($input.all().map(i => i.json).filter(r => r && r.source_url && ['published', 'scheduled'].includes(r.status)).map(r => norm(r.source_url)));
const out = [];
const date = () => !req.air_date ? '' : (out.length === 0 ? req.air_date : 'after:' + req.air_date);
if (req.brief && req.brief.length >= 200) out.push({ json: { source_url: '', source_type: 'brief', brief: req.brief, air_date: date() } });
for (const url of String(req.link_list || '').split('\n').filter(Boolean)) {
  if (done.has(norm(url))) continue;
  out.push({ json: { source_url: url, source_type: /breakpointsystems\.com/i.test(url) ? 'own' : 'article', brief: '', air_date: date() } });
}
return out;

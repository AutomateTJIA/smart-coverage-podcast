// Turn the request into script input. Two kinds of source:
//  1. a link (our own breakpointsystems.com page, or an outside article that gets credited), or
//  2. a written topic brief from Billy (his own notes, treated as approved).
// Never throws: an unreadable link is reported to Slack instead.
const S = $('Show Settings').first().json;
const req = $('Episode Request').first().json;
const url = String(req.source_url || '').trim();
const brief = String(req.brief || '').trim();
let html = '';
try { if ($('Get Source Page').isExecuted) { const p = $('Get Source Page').first().json || {}; html = String(p.data || p.body || ''); } } catch (e) {}
const hm = url.match(/^https?:\/\/([^\/?#:\s]+)/i);
const host = hm ? hm[1].toLowerCase().replace(/^www\./, '') : '';
const ownDomains = String(S.own_domains || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
const isOwnLink = !!host && ownDomains.some(d => host === d || host.endsWith('.' + d));
const kind = !url && brief ? 'brief' : isOwnLink ? 'own' : 'article';
const site = kind === 'article' ? (host || 'the source website') : S.brand_name;

const tm = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
let title = tm ? tm[1].replace(/<[^>]+>/g, '').replace(/&amp;/gi, '&').replace(/&#39;|&rsquo;/gi, "'").replace(/\s*[|][^|]*$/, '').trim() : '';
if (!title && kind === 'brief') title = brief.split(/\r?\n/)[0].replace(/^[#*\-\s]+/, '').slice(0, 120).trim();
if (!title && url) { const last = (url.split('?')[0].split('/').filter(Boolean).pop() || '').replace(/-/g, ' ').trim(); title = last.replace(/\b\w/g, c => c.toUpperCase()); }
if (!title) title = 'Automation for Business Owners';

let body = '';
if (kind === 'brief') body = brief.replace(/\s+/g, ' ').trim().substring(0, 20000);
else {
  let main = html;
  const art = html.match(/<article[\s\S]*?<\/article>/i) || html.match(/<main[\s\S]*?<\/main>/i);
  if (art && art[0].length > 1500) main = art[0];
  body = main.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ').replace(/<footer[\s\S]*?<\/footer>/gi, ' ').replace(/<aside[\s\S]*?<\/aside>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&#?[a-z0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ').trim().substring(0, 20000);
}
// A brief can be short (Billy's notes); a web page needs real content.
const readable = kind === 'brief' ? body.length >= 200 : body.length >= 1200;

const factRule = kind === 'article'
  ? "- The source is an OUTSIDE article from " + site + ". It was not written by " + S.brand_name + ". Use ONLY facts stated in it and add no facts, numbers or statistics that are not in it.\n- Credit it out loud at least once, by name: for example the co-host says \"According to " + site + ", ...\".\n- Explain it in Billy's own words. Never read or copy long passages word for word.\n- Do not present the article's opinions as Billy's advice."
  : "- The source is " + (kind === 'brief' ? "Billy's own topic brief" : "a page from the " + S.brand_name + " website") + ". Billy has approved it. Use its facts, numbers and examples exactly as written. Never hedge them.\n- Do NOT add facts, statistics, percentages, dollar figures, tool prices, client names or results that are not in the source. If the source has no numbers, the script has no numbers.\n- You MAY add general, widely known explanations of how common business tools work (for example what a CRM or an automated follow-up does), as long as they contain no numbers, prices or claims about specific companies.";
const editorFactRule = kind === 'article'
  ? "1. Facts: the SOURCE is an outside article from " + site + ". Every fact, number and statistic in the script must appear in it; remove any the writer added. It must be credited by name at least once. Replace any long passage copied word for word with plain words."
  : "1. Facts: the SOURCE is approved " + (kind === 'brief' ? "(Billy's own brief)" : "(our own website)") + ". Never remove, soften or hedge what it says. REMOVE any statistic, percentage, dollar figure, tool price, client name, testimonial or result that appears nowhere in the source: the writer may not invent them.";
const words = { min: Number(S.episode_word_min) || 850, max: Number(S.episode_word_max) || 1050 };
return [{ json: {
  show_name: S.show_name, brand_name: S.brand_name, host_name: S.host_name, cohost_name: S.cohost_name,
  listener: S.listener, cta_line: S.cta_line, spoken_ai_line: S.spoken_ai_line || '',
  word_min: words.min, word_max: words.max,
  topic: title,
  source_url: url,
  source_type: kind,
  site: site,
  readable: readable,
  fact_rule: factRule,
  editor_fact_rule: editorFactRule,
  compiled_content: (kind === 'brief' ? "BILLY'S TOPIC BRIEF: " : kind === 'own' ? 'OUR PAGE: ' : 'ARTICLE: ') + title + (url ? '. SOURCE: ' + url + (kind === 'article' ? ' (' + site + ')' : '') : '') + '. BODY: ' + body
} }];

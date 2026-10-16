// Build the transcript, show notes, Transistor description and (once the Breakpoint site has a Podcast collection) the website item
const S = $('Show Settings').first().json;
const p = $('Plan Release').first().json;
const mix = $('Mix Episode MP3').first().json;
const ep = $('Create Transistor Episode').first().json.data;
const src = $('Build Script Input').first().json;
const esc = s => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const SITE = String(S.website || '').replace(/\/+$/, '');
const pageUrl = SITE + '/podcast/' + p.slug;
const CO = S.cohost_name;
const transcript = p.final_script.split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(l => {
  const m = l.match(/^([^:]{2,30})\s*:\s*(.*)$/);
  if (!m) return '';
  const who = m[1].toLowerCase() === 'billy' ? S.host_name : CO + ' (AI co-host)';
  return '<p><strong>' + esc(who) + ':</strong> ' + esc(m[2].replace(/\[[^\]]{1,30}\]\s*/g, '').trim()) + '</p>';
}).join('');
const bullets = (p.bullets || []).map(b => '<li>' + esc(b) + '</li>').join('');
const guide = !p.source_url ? '' : src.source_type === 'article'
  ? '<p>Source: <a href="' + p.source_url + '" rel="nofollow noopener">' + esc(src.topic) + '</a> (' + esc(src.site) + ')</p>'
  : '<p>Read more: <a href="' + p.source_url + '">' + esc(src.topic) + '</a></p>';
// AI disclosure always lives in the show notes (draft brand rule: AI-voice disclosure required)
const disclosure = '<p>' + esc(S.host_name) + ' is the founder of ' + esc(S.brand_name) + '. Voices in this episode are AI-generated, including Billy\'s, from a script reviewed and approved by Billy Jordan. General information, not advice for your specific business.</p>';
const showNotes = '<p>' + esc(p.summary || p.quick_answer) + '</p>' + (bullets ? '<h3>In this episode</h3><ul>' + bullets + '</ul>' : '') + guide + disclosure;
const booking = '<p>Book an automation audit with Billy and his team: <a href="' + SITE + '">' + SITE.replace(/^https?:\/\//, '') + '</a></p>';
const description = showNotes + booking + (S.webflow_collection_id ? '<p>Episode page and full transcript: <a href="' + pageUrl + '">' + pageUrl + '</a></p>' : '');
const share = (ep.attributes && ep.attributes.share_url) || '';
const embed = share ? share.replace('/s/', '/e/') : '';
const appleLink = /^https:\/\/podcasts\.apple\.com\//.test(String(S.apple_podcasts_url || '')) ? S.apple_podcasts_url : share;
// Field slugs are a starting point: set them to match the Podcast collection when it is created on the Breakpoint site.
const fieldData = {
  name: p.title,
  slug: p.slug,
  'episode-number': p.episode_number,
  'publish-date': p.publish_date_cms,
  duration: (() => { const m = String(mix.duration || '').match(/^(\d+):(\d{1,2})$/); return m ? (+m[1]) + ' min ' + (+m[2]) + ' sec' : String(mix.duration || ''); })(),
  'quick-answer': p.quick_answer,
  'show-notes': showNotes,
  'full-transcript': transcript,
  'transistor-player-url': embed,
  'apple-podcasts-link': appleLink,
  'episode-page-url': pageUrl,
  'seo-title': p.seo_title,
  'meta-description': p.meta_description
};
return [{ json: { fieldData, description, transcript_text: p.final_script.replace(/\[[^\]]{1,30}\]\s*/g, ''), page_url: pageUrl, transistor_episode_id: ep.id, share_url: share, make_web_page: !!S.webflow_collection_id } }];

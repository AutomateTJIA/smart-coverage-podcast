// Final Slack message and email, with the ElevenLabs monthly usage check
const S = $('Show Settings').first().json;
const p = $('Plan Release').first().json;
const mix = $('Mix Episode MP3').first().json;
const u = $input.first().json || {};
const used = Number(u.character_count || 0), limit = Number(u.character_limit || 0);
const pct = limit ? Math.round(used / limit * 100) : null;
let credits = pct === null ? 'ElevenLabs usage: unavailable.' : 'ElevenLabs this month (shared with the insurance shows): ' + pct + '% used (' + used.toLocaleString() + ' of ' + limit.toLocaleString() + ').';
if (pct !== null && u.next_character_count_reset_unix) { const r = DateTime.fromSeconds(Number(u.next_character_count_reset_unix)).setZone('America/New_York'); credits += ' Resets ' + r.toFormat('LLL d') + ' (' + Math.max(0, Math.ceil(r.diff($now, 'days').days)) + ' days). Room for about ' + Math.max(0, Math.floor((limit - used) / 6800)) + ' more episodes before then.'; }
if (pct !== null && pct >= 75) credits = ':warning: ' + credits + ' Over 75%.';
const web = S.webflow_collection_id ? ' and the website' : ' (no website page yet: the Breakpoint site has no Podcast collection)';
const text = ':white_check_mark: *[Breakpoint] Episode ' + p.episode_number + ' is built and scheduled*\n' +
  '*' + p.title + '*\n' +
  'Show: ' + S.show_name + ' · Topic: ' + p.topic + ' · Length: ' + mix.duration + '\n' +
  'Goes live: ' + p.release_label + ' on Transistor' + web + '.\n' +
  ':headphones: The finished MP3 is in your email now.\n' + credits;
const html = '<p>[Breakpoint] Episode ' + p.episode_number + ' of ' + S.show_name + ' is built and scheduled. The finished audio is attached so you can listen before it airs.</p><p><b>' + p.title + '</b></p><ul><li>Topic: ' + p.topic + '</li><li>Length: ' + mix.duration + '</li><li>Goes live: ' + p.release_label + '</li></ul><p>' + credits.replace(/^:warning: /, 'WARNING: ') + '</p><p>Built with ❤️ by Breakpoint Systems LLC.</p>';
return [{ json: { text, html, subject: '[Breakpoint] Episode ' + p.episode_number + ' is ready to hear: ' + p.title } }];

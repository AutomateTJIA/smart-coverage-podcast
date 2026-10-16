// Audio parts fetched from GitHub (AutomateTJIA/smart-coverage-podcast, branch main).
// The 0.6 s silence is shared and unbranded. Music is used only when Show Settings use_music = 'yes'
// and Breakpoint's own intro/outro files exist (none yet; the insurance show's music is NOT reused).
const S = $('Show Settings').first().json;
const out = [{ json: { part: 'gap', path: 'assets/audio/factory/the-jordan-insurance-agency-factory-gap-0.6s.mp3' } }];
if (String(S.use_music).toLowerCase() === 'yes' && S.music_intro_path && S.music_outro_path) {
  out.push({ json: { part: 'intro', path: S.music_intro_path } });
  out.push({ json: { part: 'outro', path: S.music_outro_path } });
}
return out;

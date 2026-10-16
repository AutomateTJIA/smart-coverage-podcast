// Breakpoint podcast settings. Billy (or Claude) changes the values here; nothing else needs editing.
// Every Breakpoint workflow reads its settings from this one node. The insurance shows never read it.
const S = {
  show_name: 'Work ON Your Business',              // DRAFT name from brands/breakpoint.md. Billy to confirm.
  brand_name: 'Breakpoint Systems',                // How the company name is said and written.
  host_name: 'Billy Jordan',
  cohost_name: 'Tanya',                            // Speaker label in the script. Must match cohost_voice.
  host_voice: '2dIruLdSTKfsYrmyR4YG',              // Billy's cloned ElevenLabs voice.
  cohost_voice: 'Rv3wiuHHQq0rSS4QVaQ8',            // Tanya for now. Swap for a different stock voice if Billy wants the shows to sound different.
  listener: 'owners and founders of service businesses with 5 to 50 people',
  website: 'https://www.breakpointsystems.com',
  own_domains: 'breakpointsystems.com',            // Links on these sites count as our own, already-approved content.
  cta_line: 'If you want help putting this to work in your business, book an automation audit with Billy and his team at breakpointsystems.com.',
  cta_must_contain: 'breakpointsystems.com',       // The gate blocks a script whose call to action is missing this.
  spoken_ai_line: '',                              // Optional on-air line saying the voices are AI. Blank = disclosure lives in the show notes only.
  transistor_show_id: '',                          // REQUIRED before any audio is made. Billy creates the show in Transistor, then paste its ID here.
  apple_podcasts_url: '',
  release_days: 'Tue',                             // Days episodes air, e.g. 'Tue' (weekly) or 'Mon,Wed,Fri'.
  release_time: '09:00',                           // Eastern time.
  use_music: 'no',                                 // 'yes' uses intro/outro music files (none made for Breakpoint yet).
  music_intro_path: '',
  music_outro_path: '',
  approval_email: 'billy@agencyhlpc.com',
  slack_channel: 'C0C8A3WRQA1',                    // Same channel as the insurance podcast. Messages start with [Breakpoint].
  webflow_collection_id: '',                       // Breakpoint site has no Podcast collection yet. Blank = no website page is made.
  ledger_table_id: 'fII8YCB84TQBpd5X',             // n8n table "Breakpoint Podcast Ledger" (created Oct 16).
  episode_word_min: '850',
  episode_word_max: '1050'
};
return [{ json: { ...S, ...($input.first().json || {}) } }];

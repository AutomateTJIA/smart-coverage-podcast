# Setup checklist — everything needed before episode 1

Owner key: **Billy** = only Billy can do it (his accounts, his voice, his license).
**Claude** = can be done in a session once Billy's piece is in place.

## 1. Decisions (Billy)

- [ ] Confirm the partner show. Paste the Spotify link again (the first one had "okay" added by dictation), or confirm it's AEO Engine's "Answer Engine Optimization (AEO): The AI Search Podcast."
- [ ] Are the 4 Spotify episodes linked on `/podcast` ours? Keep, replace, or remove.
- [ ] Final yes on the name "Smart Coverage. Real Advice."
- [ ] Voice path for The Jordan Insurance Agency show: **ElevenLabs with Billy's voice** (recommended) or **NotebookLM hosts** (see "How the voices work" below).
- [ ] Which YouTube channel carries the podcast. The site links four (insurance, Medicare, health insurance, mortgage protection). Recommend the main insurance channel so subscribers build in one place. Note: the existing channel handles use initials, which the brand guidelines forbid in new names. Changing a handle is optional but worth deciding.
- [ ] Booking link for the CTA (the site uses a cal.com link today).

## 2. Accounts (Billy creates; Claude never needs your passwords)

| Account | Plan | Why | After creating |
|---|---|---|---|
| Transistor.fm | **Starter**, $19/mo (start the 14-day trial; **confirm the API works on Starter**) | Hosting for both shows, RSS to all apps, API for n8n | Account → API Access → copy key → add as n8n Header Auth credential (`x-api-key`) |
| ElevenLabs | **already have it** | Billy's voice + Rachel, Text to Dialogue API | Profile → API key → add as n8n Header Auth credential (`xi-api-key`); My Voices → copy Billy's voice ID |
| Apple Podcasts Connect | free (Apple ID) | Submit the show, owner verification, transcripts setting | Submit the Transistor RSS feed |
| Spotify for Creators | free (existing login) | Claim the show, export old analytics, redirect old feed | See section 4 |
| Amazon Music for Podcasters | free | Directory listing | Submit RSS |
| YouTube Studio | existing channel | Podcast playlist; n8n uploads episodes | Add a YouTube OAuth credential in n8n (none exists yet); check whether the Google Cloud project is audited (unaudited projects upload as Private) |
| Google Workspace | existing | `podcast@` role email for the feed owner | Create alias |
| Webflow (site CMS) | existing | Episode pages at `/podcast/{slug}` | Add a "Podcast Episodes" collection (Claude can spec the fields) |
| n8n | existing | Automation and the approval step | Add Transistor + ElevenLabs credentials |

**API keys:** Billy adds them to n8n credentials and to this cloud environment's secrets.
Never paste a key into chat.

## 3. Billy's voice (ElevenLabs)

The n8n workflow "AI Coverage Coach — Blog to Podcast (Host + Guest)" already expects Billy's
voice and uses Rachel as host. First check ElevenLabs → My Voices: if Billy's voice is already a
**Professional** clone, skip to step 5. If it's an **Instant** clone, it's fine for testing; do
steps 1–3 before the public launch.

1. Record **at least 30 minutes** of Billy talking naturally, ideally 1–2 hours. Read old blog posts out loud and explain things like you would to a client. Use a quiet room and a decent USB mic held at a steady distance. No music, no other voices.
2. Upload in ElevenLabs → Voices → Professional Voice Clone. Billy completes the voice verification (he reads a short phrase so ElevenLabs knows it's really his voice).
3. Training takes a few hours. Test it with one paragraph of a real script.
4. Choose the co-host voice from the ElevenLabs Voice Library. Pick one that's clearly different from Billy's, and keep it for every episode.
5. Sign the one-page voice-clone consent (Claude can draft it) and keep it on file.
6. Put both voice IDs in `brands/the-jordan-insurance-agency.md`.
7. Build the pronunciation dictionary (ACA, HMO, PPO, IRMAA, Medigap, Mecklenburg, Davidson, carrier names if ever used).

Instant Voice Clone (1–2 minutes of audio) works for a test but sounds less like Billy. Use Professional for the public show.

## 3b. Organize the ElevenLabs account (do this before the first real episode)

Billy has an ElevenLabs account but never set it up deliberately. Do these once:

1. **Plan and credits.** Current: Starter ($6/mo, 30,000 credits/mo, Instant clone only), 90,000 unused credits. **Upgrade to Creator ($22/mo, 121,000 credits/mo, Professional Voice Cloning) before launch**, after confirming the unused balance carries over. Background: One 10–12 minute episode is roughly 9,000–10,000 characters of script.
   At 3 episodes a week (~13 a month) that's roughly **120,000–130,000 characters a month**,
   plus retakes. Check Subscription → your plan's monthly credits and how many credits v4 uses
   per character, and pick the plan that covers it. A paid plan is also what grants
   commercial-use rights.
2. **One official voice.** In My Voices, keep **Billy Jordan Clone Voice 2.0**
   (`2dIruLdSTKfsYrmyR4YG`) as the podcast voice. Rename or delete older test clones so nobody
   picks the wrong one. Note whether it's an **Instant** or **Professional** clone; if
   Instant, re-record 30+ minutes for a Professional clone before the public launch (v4 is
   built to get more out of good clones).
3. **Pick the co-host with v4.** Rachel is an older stock voice. Audition 2–3 voices from the
   Voice Library with the v4 model on the same 30-second script excerpt; choose one clearly
   different from Billy's and keep it forever.
4. **A dedicated API key for n8n.** Create a key named "n8n podcast" with only the
   permissions it needs (Text to Speech / Text to Dialogue) and **a monthly credit limit**, so
   a broken loop can't run up a bill. (The "ElevenLabs API Key" credential already exists in
   n8n; swap in the restricted key when it's made.)
5. **Pronunciation dictionary.** ACA, HMO, PPO, EPO, HSA, IRMAA, Medigap, MAPD, Mecklenburg,
   Davidson County, Novant, Atrium.
6. **Consent on file.** One-page note that Billy authorizes his voice clone for The Jordan
   Insurance Agency podcast and Breakpoint Systems.

## 4. Spotify

Claude does **not** need Billy's Spotify login. Two separate things:

- **Research (public pages):** Spotify was blocked by this cloud environment's network policy, not by Spotify. To let Claude read public Spotify and podcast pages, Billy opens the environment settings (cloud environment menu in the session's title bar → Edit → Network access) and adds `open.spotify.com`, `podcasts.apple.com`, `feeds.transistor.fm`, `aeoengine.ai`, and `thejordaninsuranceagency.com` under Allowed domains. Steps: https://code.claude.com/docs/en/cloud-environments#network-access
- **Our own show (private dashboard):** Billy logs into creators.spotify.com himself to (a) check what's in the old show, (b) export analytics, and (c) after Transistor is set up, use Settings → Redirect your podcast. Screenshots are enough for Claude to read.

## 5. Compliance (Billy + FMO/carrier compliance contact)

- [ ] TPMO counts: number of organizations and products we represent, per state
- [ ] Exact CY2027 TPMO disclaimer wording from the FMO/carrier
- [ ] Tennessee Department of Commerce & Insurance advertising rules confirmed
- [ ] Named backup approver (licensed) when Billy is unavailable
- [ ] Billy's NC and TN license numbers for show notes, if we include them

## 6. Brand assets

- [ ] **Original high-resolution avatar file** (the Pixar-style image from the website) for the avatar cover
- [ ] 8–12 second intro jingle (+ short outro) made in ElevenLabs Music, exported as MP3 44.1 kHz / 128 kbps

- [ ] Vector logo (Webflow `Logo Image.svg`) for crisper cover art
- [ ] Decision on the avatar's gray beard vs. the brand image rule
- [ ] Host bio (3 sentences) + headshot for the show page and Apple
- [ ] Breakpoint Systems brand kit (logo, colors, fonts) for the second show

## 7. Content approvals for launch

- [ ] Trailer script
- [ ] Episodes 1–3 scripts (Medicare, educational)
- [ ] Description template and CTA wording

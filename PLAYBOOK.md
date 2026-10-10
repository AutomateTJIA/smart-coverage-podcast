# The Podcast Engine Playbook — The Jordan Insurance Agency (then Breakpoint Systems)

Version 1.3 · October 10, 2026 · Owner: Billy Jordan

This is the operating playbook for launching and running an AI-assisted podcast for
The Jordan Insurance Agency, modeled on the show run by our AEO partner, then cloned for
Breakpoint Systems. This playbook is part of the `podcast-engine` skill; the steps that
automate it are in [`SKILL.md`](SKILL.md).

> **Brand name, non-negotiable:** always **The Jordan Insurance Agency**, exactly, everywhere,
> including file names (slug: `the-jordan-insurance-agency`). The skill invokes the
> `the-jordan-insurance-agency-brand-image` skill first and runs `scripts/check-brand-name.sh`
> before anything is approved or published.

---

## 0. The one-paragraph version

Publish short (10–14 minute), two-voice, AI-produced episodes built from the 588 pages we
already have on thejordaninsuranceagency.com. Host on **Transistor** (one account, both
brands). Generate audio with **ElevenLabs using Billy's cloned voice** as host, not NotebookLM.
Every episode gets three things that matter more than downloads: **a YouTube upload, a
transcript page on our own domain, and our full brand name spoken on air**.
Medicare episodes stay educational by default so they don't trip CMS marketing rules. Launch
with a trailer + 3 episodes before Medicare AEP opens **October 15**, then publish 3× per
week through AEP and ACA open enrollment. Running cost: about **$75–90/month for both shows**.

---

## 1. What the partner is actually doing (teardown)

Show studied: **"Answer Engine Optimization (AEO): The AI Search Podcast"** by AEO Engine
(Apple ID 1884409947, Transistor feed `aeo-engine-ai-search-show`).

> ⚠️ The Spotify link we were given had the word "okay" appended by voice dictation, and Spotify
> is blocked from our research environment, so the match to AEO Engine is based on the
> Transistor + AEO clues. **Confirm this is the right show.**

| What | What they do | What we take from it |
|---|---|---|
| Name | Renamed from brand-first ("AEO Engine AI Search Show") to **keyword-first** | Lead with what the listener searches for, keep brand in author field |
| Launch | March 2026, loaded a backlog (~2/day for the first 10 days) | Launch with a batch, not a single episode |
| Cadence | **Daily** (~200 episodes in 6 months) | Volume = more indexable transcripts and brand mentions |
| Length | **7–13 minutes** | Short, one topic per episode |
| Voices | AI two-host format: founder's **cloned voice** + synthetic "co-hosts" (Aria Chen, Marcus Reid) | Clone Billy's voice; use one consistent co-host |
| Production | "AI assisted… narrated in Vijay's voice" — **not plain NotebookLM** | NotebookLM is fine for drafts, not the branded show |
| Titles | News hooks, stats, contrarian takes, "Topic: Payoff" | Question-first titles that mirror how people ask ChatGPT |
| Website | **One page per episode on their own domain with full transcript** + episode schema | This is the real AEO engine — copy exactly |
| Blog tie-in | Episode topics mirror blog topics | Our 185 blogs + 351 FAQs are the script source |
| Self-promo | Publishes "Best AEO Podcasts of 2026" ranking itself #1 | We can publish "Best Medicare podcasts for NC and TN" |
| Monetization | **Sells "AI Podcast Creation for Businesses"** | This is a Breakpoint Systems product (see §10) |

**Brutal truth about their results:** 0 Apple ratings, chart peaks around #41–#92 in the
Marketing category, and every "#1" claim is self-published. The podcast is not winning on
listeners. It wins on **search surface area**: hundreds of transcript pages and brand mentions
that AI answer engines can read. That's the game we're copying. Don't judge this by download
counts.

---

## 2. Why this moves the needle (and where it doesn't)

**Where it pays:**
- **YouTube is the #1 signal.** Ahrefs' study of 75,000 brands found YouTube mentions
  (title/transcript/description) had the strongest correlation with AI visibility (~0.74) —
  stronger than web mentions. BrightEdge and Ahrefs both rank YouTube the most-cited domain in
  Google AI Overviews. → **Every episode goes to YouTube. Non-negotiable.**
- **Transcript pages on our domain** add new, quotable, entity-rich pages to a site that
  already has topical depth.
- **Credibility:** "Listen to our podcast" on the site, in email signatures, and in the Google
  Business Profile signals expertise to clients comparing agents.

**Where it won't pay (set expectations now):**
- Downloads. Median podcast gets **27 downloads in its first week** (Buzzsprout, 2026). A niche
  local show doing 30–100 per episode in 30 days is a good year one.
- Direct leads from podcast apps will be small. Leads come from the YouTube + website +
  AI-citation side.

**The gap nobody's talking about:** our existing `/podcast` page already links to **4 Spotify
episodes** while we believe no episodes exist. If those are template placeholders, a prospect
clicking them sees someone else's show. **Check and remove/replace this week.**

---

## 3. Brand decision — name, look, voice

### Name: keep it, sharpen it

**Decision (Billy, Oct 10): no city in the name.** We have offices in Charlotte, NC and
Nashville, TN, so a city-named show tells half our market it isn't for them.

**Recommendation: "Smart Coverage. Real Advice. — The Insurance Podcast from The Jordan Insurance Agency"**

- **It's already the H1 on our `/podcast` page.** Someone who hears the show and then lands on
  the site sees the same words. That's the brand-to-website connection.
- **Our full brand name is in the show title itself.** Apple only searches show name, author,
  and episode titles, so "The Jordan Insurance Agency" and "Insurance Podcast" are both indexed.
  Every AI engine that reads the feed sees our entity name attached to the show.
- **No one else uses it.** Searches found no podcast with this name. The nearest is an
  unrelated "PolicyWise" show that uses "smart coverage choices" in its description.
- One descriptor phrase only, which keeps us safe from Apple's keyword-stuffing removals.

| Option | Upside | Downside |
|---|---|---|
| **Smart Coverage. Real Advice.** ✅ | Matches site H1, unused, works in every market | Tagline itself isn't a search keyword (the subtitle fixes that) |
| Under the Umbrella | Ties to the umbrella in our logo, unused, memorable | Could read as an "umbrella insurance" show; no link to site copy |
| We've Got You Covered | Our logo tagline | Crowded: "We Got You Covered!" (another agency) and "Insurance Covered" already exist |

Rebrand *now* if we're going to — we have zero subscribers, so it costs nothing today and a lot later.

**Feed fields:**
- Show title: `Smart Coverage. Real Advice. — The Insurance Podcast from The Jordan Insurance Agency`
  (if an app truncates, the first three words still carry the brand line)
- Author: `Billy Jordan | The Jordan Insurance Agency`
- Owner email: a role address on our domain (e.g. podcast@thejordaninsuranceagency.com)
- Website: `https://thejordaninsuranceagency.com/podcast`
- Categories: **Business › Investing** (closest to personal finance) + **Education › How To**
  (Health & Fitness › Medicine if the show becomes mostly Medicare)
- Type: **Episodic** · Explicit: **No** · Language: `en-us`
- Episode numbers in the feed, **not** in titles

### Look (done — see `assets/`)

| Asset | Spec | File |
|---|---|---|
| Show cover | 3000×3000 JPG, RGB, 428 KB (Apple target < 512 KB) | `assets/the-jordan-insurance-agency-podcast-cover-3000.jpg` |
| Episode thumbnail template (YouTube) | 1280×720 | `assets/the-jordan-insurance-agency-episode-thumb-template.jpg` |
| YouTube podcast-playlist square | 1280×1280 | `assets/the-jordan-insurance-agency-youtube-playlist-1280.jpg` |
| Editable sources | HTML → rendered with Playwright | `assets/src/*.html` |

Design rules used: navy/royal blue dominant, gold accent only, white logo band so the real logo
stays legible, 3 big words readable at 55px. The thumbnail uses the Birdeye avatar of Billy — a
face on every YouTube thumbnail, the episode lane (MEDICARE / HEALTH / LIFE / HOME & AUTO) in a
gold chip, and a 4–6 word hook.

> Two notes. (1) The logo file we had is 720px; swap in the vector logo (Webflow
> `Logo Image.svg`) for a crisper final. (2) The avatar has a gray beard, which conflicts with
> our image-generator brand rule (agents 42–48, no gray). That rule was written for generated
> scene photos, but decide once: either the avatar is "Billy" and exempt, or we regenerate it.

The thumbnail's footer shows **thejordaninsuranceagency.com** (not a city), so every view
points people back to the site. Still to produce: a 1200×630 social/OG image per episode
(same template, different crop).

**Avatar cover (Oct 10):** Billy asked why the cover doesn't use the same Pixar-style avatar
the website and episode thumbnails use. He's right. One face across the site, cover, and
thumbnails is stronger branding, and a face looking straight at the viewer reads well at small
sizes. Concept built: `assets/the-jordan-insurance-agency-podcast-cover-avatar-concept.jpg`.
**Recommendation: make the avatar version the official cover** once we have the original
high-resolution avatar file. The only copy we have is 1184×666, which looks soft at 3000×3000.
The brand-image skill's "no gray beard" rule is for generated agent scenes; the avatar is Billy
himself, so treat it as an approved exception.

### Voice

- Host: **Billy (cloned voice)**. Co-host: **one** consistent stock voice — give the co-host a
  role, not a fake backstory (e.g. "Maya, our producer"). The partner's invented "ex-Google
  analyst" persona is a trust risk we don't need in insurance.
- Tone: plain English, calm. Intro line: "…from The Jordan Insurance Agency, with offices in
  Charlotte, North Carolina and Nashville, Tennessee." Naming **both** offices on air gives AI
  engines a local signal for both markets without fencing out either one.
- Always say and write the full brand name exactly: **The Jordan Insurance Agency**. Never shortened, never initials, never a lowercase "the" (full forbidden list: `references/brand-name-rules.md`; enforced by `scripts/check-brand-name.sh`).

---

## 4. The production stack

| Job | Tool | Cost | Why |
|---|---|---|---|
| Script | Claude (skill prompt in `references/script-prompt.md`) | existing | Built from our own pages; compliance rules baked in |
| Compliance gate | Human approval step (n8n "wait for approval") | $0 | Required for Medicare |
| Audio | **ElevenLabs** (Billy already has an account) — Text to Dialogue API, `eleven_v3` model, Billy's voice + Rachel as host | existing plan | Already wired in our n8n workflow; natural two-person delivery with emotion tags |
| Intro/outro music | One 8–12 second jingle made once in ElevenLabs Music (paid plan = commercial license), stitched onto every episode in n8n | $0 extra | Same sound every episode = brand recognition |
| Backup audio | Gemini 3.8 Flash TTS (multi-speaker, consent-gated clone) | ~1.4¢/min | Cheapest fallback |
| Drafting / B2B tests | NotebookLM (now **Gemini Notebook**) | free/Pro | Fast, but no API, can't pick voices, unclear commercial terms |
| Hosting + distribution | **Transistor Starter** (confirm API access) | $19/mo | Unlimited shows (both brands), RSS to every app, embeddable players |
| YouTube | n8n YouTube node + MP4 render (ffmpeg or Cloudinary) | $0 | We build it once instead of paying Transistor $30/mo |
| Transcripts | Transistor AI transcripts or upload our own script as transcript | $5/mo | Our script = a perfect transcript, free |
| Automation | n8n: **existing "AI Coverage Coach — Blog to Podcast (Host + Guest)" workflow**, extended | existing | Half-built already (see below) |
| Thumbnails | HTML template → Playwright render | $0 | Already built |

**Total ≈ $45–60/month for both shows** (Transistor Starter + ElevenLabs + transcripts add-on, if used).

### Why not NotebookLM for the public show (honest take)

The belief was the partner uses NotebookLM. The evidence says they use a **cloned founder
voice**, which is why their show sounds branded. NotebookLM's problems for us:
1. **No consumer API** — can't automate it; the Enterprise API is Google Cloud-only and
   limited to one audio per notebook.
2. **Can't choose or name the hosts** — every episode sounds like every other NotebookLM show.
3. **Goes off-script** — it can editorialize beyond the sources. That's a CMS compliance risk on
   Medicare content.
4. **Commercial republishing terms are unclear** — Google doesn't claim ownership, but we found
   no explicit permission. Gray area.

Use it for: a fast first test, B2B episodes for Breakpoint, internal training. Its "Customize"
box works best with one sentence naming audience, scope, and what to avoid (see
`references/notebooklm-prompts.md`).

### How the voices actually work (NotebookLM vs. ElevenLabs)

These are **two separate machines.** They don't plug into each other.

| | NotebookLM (Gemini Notebook) | ElevenLabs |
|---|---|---|
| What you give it | Source pages + one short "Customize" instruction | A finished script we wrote (with Claude) |
| Who writes the words | NotebookLM's AI writes them as it talks | We do, and Billy approves them first |
| Voices | Its own two built-in hosts. **You can't load Billy's voice or anyone else's.** | Billy's cloned voice + one co-host we pick, same every episode |
| Says our name right? | Not guaranteed. It may shorten the name, and we can only catch it by listening or transcribing afterward | Yes. The script passes the brand-name gate before audio is made |
| Automation | None (no consumer API) | Full API, runs in n8n |
| Best for | A free test this week, Breakpoint early episodes, internal drafts | The public show for The Jordan Insurance Agency |

So the answer to "use the ElevenLabs voices inside NotebookLM" is **no**. If we want the show
to sound like Billy (the way the partner's show sounds like their founder), the path is:
**source page → Claude writes the script with our prompt → brand-name gate → Billy approves →
ElevenLabs reads it in Billy's voice.**

The prompts are what make this work, and they're already in the skill:
- `references/script-prompt.md` tells Claude **what to talk about** (the source page from the
  episode backlog), **who it's for**, **the exact structure**, and **the rules** (full brand
  name, compliance words to avoid, AI disclosure).
- `references/notebooklm-prompts.md` is the shorter "Customize" instruction for the NotebookLM
  path, including a ready-to-paste prompt for episode 1.

### What we still need

Everything left is an account, a recording, or a decision only Billy can make. The full list,
with who does what, is in `references/setup-checklist.md`. The short version:

1. **Confirm the partner's show** (re-paste the Spotify link).
2. **Start the Transistor Professional trial.** In ElevenLabs (account exists): confirm Billy's voice is in My Voices and copy its voice ID. Add the ElevenLabs and Transistor API keys as n8n credentials yourself (never in chat). The voice ID is not a secret; it can be shared.
3. **If Billy's voice in ElevenLabs is an Instant clone**, upgrade it to a Professional clone (30–120 minutes of clean audio) for the public show. Sign the consent form either way.
4. **Get the TPMO counts and the TN ad rules** from the FMO/carrier compliance contact.
5. **Pick the YouTube channel** and the booking link.
6. **Spotify:** no login needed for research. Allowing `open.spotify.com` in this environment's
   network settings lets Claude read public pages. Billy uses his own Spotify for Creators login
   only to check the old show and redirect it.

### What we already have (found Oct 10)

Billy's n8n already contains **"AI Coverage Coach — Blog to Podcast (Host + Guest)"** (built
July 10, never run). It does most of what the partner does:

| Step | Status |
|---|---|
| Pull the latest blog post from the website | ✅ built |
| GPT-4.1-mini writes a two-person dialogue: **Rachel** (host, ElevenLabs stock voice) interviews **Billy** (guest, Billy's own ElevenLabs voice) | ✅ built |
| Compliance gate: blocks "best plan," "guaranteed," "risk-free," missing disclosures, missing Medicare non-affiliation line, NPN statement | ✅ built |
| ElevenLabs Text to Dialogue (`eleven_v3`) → stitch chunks into one MP3 | ✅ built, **not connected** |
| ElevenLabs credential in n8n | ❌ missing (no ElevenLabs credential exists in n8n) |
| Billy's voice ID | ❌ placeholder `REPLACE_WITH_BILLY_ELEVENLABS_VOICE_ID` |
| Brand-name gate, human approval step, intro music, Transistor publish, episode page, YouTube | ❌ to add |

Changes it needs to match this playbook:
- **Show name:** it says "AI Coverage Coach." This playbook says "Smart Coverage. Real Advice."
  Pick one (recommendation: Smart Coverage. Real Advice., because it matches the website).
- **Two states:** its scripted intro says "licensed North Carolina insurance agent." Add
  Tennessee once TN rules are confirmed.
- **Co-host:** keep Rachel. She's already built in, and she's a host role, not a fake expert.
  (This replaces the "Maya" placeholder used elsewhere in this playbook.)

### How the partner makes theirs (and the intro music)

- Their site says episodes are scripted by their team, run through "the automation pipeline
  the company sells," and **"narrated in Vijay's voice"** with "proprietary voice technology."
  They don't name the tool. The most likely setup is a voice-clone text-to-speech API, the same
  kind of thing as our ElevenLabs workflow. **Not confirmed.**
- They don't say how they add intro music. The usual ways: a jingle file glued onto the front
  of every episode, or the host's ad-insertion feature (Transistor "Campaigns") adding it
  automatically when someone plays the episode.
- **NotebookLM never let anyone pick or change the host voices** (2024–2026). People who
  "changed the voices" ran the finished NotebookLM audio through ElevenLabs Voice Changer or a
  similar tool afterward.
- For context: AEO Engine sells this as part of managed plans at **$5,000–$10,000/month**.
  We're building the same thing for under $100/month in tools.

**Our intro plan:** make one 8–12 second jingle in ElevenLabs Music, export it as MP3 at the
same settings as the episode audio (44.1 kHz, 128 kbps), and prepend it in the workflow's
existing "Stitch Audio" step. Same trick for a short outro. No extra software.

### Transistor: which plan, and how it fits our website

**How it works:** we upload each episode (by API from n8n) → Transistor adds it to our RSS feed
→ Apple, Spotify, Amazon and the other apps check that feed and publish the episode on their
own. We submit the feed once; after that every app updates itself. YouTube is the exception;
Transistor pushes episodes there for us on Professional.

**What it does for the website:**
- **Embeddable players** (single episode, latest episode, full playlist) for `/podcast` and every
  episode page. The playlist player updates itself when a new episode publishes.
- **A webhook** fires when an episode publishes → n8n creates the episode page in Webflow
  automatically (Webflow is already connected in n8n).
- Transistor also gives a free hosted podcast website. **We won't use it as the main home.** Our
  domain gets the pages, the transcripts, and the AI-search value.

| | Starter $19/mo | Professional $49/mo |
|---|---|---|
| Shows | Unlimited (both brands) | Unlimited (both brands) |
| Downloads/month (shared by all shows) | 20,000 | 100,000 |
| API for n8n | Probably; **confirm with Transistor support before buying** | Yes |
| YouTube auto-posting | ❌ | ✅ |
| Campaigns (auto-insert intro/outro or sponsor spots) | ❌ | ✅ |
| Video podcasts (Apple, beta) | ❌ | ✅ |
| Your own transcript upload / AI transcripts add-on | ✅ / $5 | ✅ / $5 |
| Overage fees | None | None |

**Decision (Billy, Oct 10): Starter, $19/mo, with YouTube and intro music built in n8n.**
We already own n8n for exactly this. Building the two Professional features ourselves saves
$360 a year (one account covers both brands) and keeps everything in one workflow we control:

| Professional feature | Our n8n replacement | One-time catch |
|---|---|---|
| YouTube auto-posting | n8n YouTube node uploads the episode as a video (thumbnail + audio) | (1) **No YouTube credential exists in n8n yet**; Billy connects it. (2) YouTube needs a video file, so n8n turns the MP3 + thumbnail into an MP4 (ffmpeg on our self-hosted n8n, or the Cloudinary account already connected). (3) **Google keeps videos uploaded through a new, unaudited API project private** until the project passes a free compliance audit. Until then, n8n uploads and Billy flips each video to Public (one click). |
| Auto intro/outro | Prepend/append the jingle in the existing "Stitch Audio" step | None. The jingle must be exported at the episode's audio settings. |

Conditions before paying:
1. **Confirm Starter includes API access** (Transistor support, or test the API key during the
   14-day trial). If Starter has no API, n8n can't publish and the plan doesn't work.
2. Check whether the Google Cloud project behind our YouTube access is already audited.

Billing: start the free trial on Starter monthly, prove the API and the bench episode, then
switch to **Starter annual, $190/yr** (saves $38 vs. $228 monthly). Starter annual vs.
Professional annual ($490) is a $300/yr difference.

Fallback: if the YouTube audit drags on for weeks and the manual Public click becomes a chore,
upgrade to Professional for those months and drop back later. Plans change month to month.

### Why not just post on Spotify for Creators (free)?

Spotify for Creators is free and fine for a manual hobby show. For us it fails on one thing:
**there's no public API, so nothing can be automated.** Someone uploads every episode by hand in
a browser, three times a week. That's exactly the busy work this system exists to remove. Also:
- Its stats only cover Spotify listeners, not Apple, YouTube, or anyone else.
- It doesn't post to YouTube.
- One brand per login, no team roles.
- It **does** have one plus: native video on Spotify and the Spotify Partner Program
  (money starts at 1,000 engaged listeners). Neither matters for a lead-generation show.

Transistor still sends every episode to Spotify. Listeners on Spotify see no difference.

### Bench test (Oct 10)

Billy's ACA Special Enrollment article is the bench: the same article run through NotebookLM
(Path A, done by Billy) and through our script prompt for ElevenLabs (Path B). Our Path B
script is in `bench/the-jordan-insurance-agency-bench-aca-sep-nc/script.md` and passes the
brand-name gate and every rule in the existing n8n compliance check. Score both with
`bench/.../SCORECARD.md`. Path B audio is blocked only by the ElevenLabs key in n8n and Billy's
voice ID.

### Spotify → Transistor move

We were on Spotify for Creators. To move without losing anyone:
1. Create the show in Transistor by **importing the current Spotify RSS feed**.
2. Check the new feed.
3. In creators.spotify.com (web): **Settings → Redirect your podcast** → paste the Transistor
   feed. Turn off Spotify Subscriptions first if on.
4. The 301 redirect moves Apple and other apps automatically (up to 7 days).
5. Export Spotify analytics first; keep the account 2 weeks before deleting.

If the Spotify show has no real episodes, skip the import and just start fresh in Transistor.

---

## 5. Episode formula

**Length:** 10–14 minutes. **Format:** two voices, Q&A-segmented.

| Segment | Time | What happens |
|---|---|---|
| Cold open | 0:00–0:20 | The listener's question, word for word ("Should I switch to a Medicare Advantage plan this fall?") |
| Intro | 0:20–0:45 | "Welcome to Smart Coverage. Real Advice. from The Jordan Insurance Agency, with offices in Charlotte and Nashville. I'm Billy Jordan." + AI disclosure (one line) |
| 3–5 Q&A blocks | ~2–3 min each | **Spoken question → 2–3 sentence direct answer → detail.** Each answer must make sense quoted alone (that's what AI engines lift). |
| State specifics | 1–2 min | What's different in North Carolina vs. Tennessee (state regulator, Medigap rules, marketplace, weather risks). Covering both is a feature, not a split. |
| Recap | 30s | Three takeaways |
| CTA | 20s | One action: book a review / call the office. Same CTA every episode in a lane. |
| Compliance outro | 15–30s | Licensed agent statement; TPMO disclaimer **only if triggered** (see §7); "general education, not advice for your specific policy" |

**Titles:** question or keyword first, ≤ 60 characters, how people ask ChatGPT.
- ✅ "Medicare Advantage vs. Medigap in North Carolina"
- ✅ "Does Home Insurance Cover Wind and Hail Damage?"
- When a topic is genuinely state-specific, name the state in the title and make one episode
  per state ("ACA Open Enrollment in North Carolina", "ACA Open Enrollment in Tennessee").
  That doubles the episodes from one script, and each one is the best answer for its state.
- ❌ "Episode 4 — Smart Coverage Talks Medicare" (show name + number waste the title)
- Don't copy the partner's "A.E.O." periods trick in titles — it hurts search. Fix
  pronunciation with an ElevenLabs pronunciation dictionary instead (ACA, HMO, PPO, MAPD, Medigap, Mecklenburg).

**Description template:**
```
[First 150–200 chars: the direct answer + "The Jordan Insurance Agency".]

In this episode:
• Takeaway 1
• Takeaway 2
• Takeaway 3

00:00 The question
00:45 [Chapter]
...

Read the full guide: [matching blog/FAQ URL]
Book a free coverage review: [booking URL]

Billy Jordan is a licensed insurance agent with The Jordan Insurance Agency, with offices in
Charlotte, NC and Nashville, TN.
This episode uses AI-generated voices, including a digital replica of Billy's voice, from a
script reviewed by a licensed agent. General education only — not advice for your specific
situation. [TPMO disclaimer if triggered]
```
Timestamps (≥ 3, starting 00:00) give Apple our own chapters instead of auto-chapters.

---

## 6. The website — where the AEO value actually lands

Fix the existing `/podcast` hub and add one page per episode. This is the most important
section in this playbook.

**`/podcast` hub fixes (current audit, Aug 29 crawl):**
- [ ] Verify or remove the 4 Spotify episode links
- [ ] Fix the 5 placeholder links
- [ ] Add `PodcastSeries` JSON-LD (none today)
- [ ] Add an Open Graph image (none today) — use the cover art
- [ ] Add alt text to the 41 images with empty alt
- [ ] Follow/subscribe buttons: Apple, Spotify, YouTube, Amazon (real links)
- [ ] Grow from 295 words: what the show covers, who hosts, latest episodes list

**Each episode page `/podcast/{slug}`:**
- H1 = the episode question
- 2–3 sentence direct answer at the top
- Transistor player embed + YouTube embed
- **Full transcript** with each Q&A question as an H2
- Key takeaways, links to the matching product page and the source blog/FAQ
- `PodcastEpisode` + `VideoObject` JSON-LD tied to our site-wide organization `@id`
  (template in `references/episode-page-template.md`)
- Own 1200×630 OG image; in the sitemap
- Link back from the source blog post ("Listen to this as a podcast")

---

## 7. Compliance (Medicare, NC, AI voices)

**Default rule: Medicare episodes are educational.** No plan names, no carrier names, no
premiums/copays, no specific benefits, no steering. Under CMS's definition of marketing
(42 CFR 422.2260) content needs both **intent** to influence enrollment **and** **content**
about benefits/costs to count as marketing. Pure education does not.

**If an episode crosses into marketing** (mentions benefits like dental/vision/hearing in a way
that steers, names plans, costs):
- Read the **TPMO disclaimer verbatim** on air *before* the benefits discussion and put it in
  the show notes. CY2027 rule (effective Oct 1, 2026) removed the SHIP reference. Working text —
  **confirm exact wording with our FMO/carrier compliance before use**:
  > "We do not offer every plan available in your area. Currently we represent [#]
  > organizations which offer [#] products in your area. Please contact Medicare.gov or
  > 1-800-MEDICARE to get information on all of your options."
- Send it to the carrier for review before publishing.

**Always avoid:** "free," "best," "lowest," "#1" (superlatives need data on file), misuse of the
Medicare name/logo, implying government affiliation, benefits not available in the listener's
area.

**North Carolina:** NCDOI doesn't pre-approve agent ads; the carrier is responsible, so
plan-specific content goes to the carrier. Medicare Supplement, LTC, annuity, and
interest-sensitive life materials require prior approval — keep those episodes educational.

**Tennessee:** the show reaches Nashville clients too, so the Tennessee Department of Commerce
& Insurance advertising rules also apply. We did not research them in this pass. **Have our
FMO/compliance contact confirm TN requirements before the first Medicare episode publishes.**

**AI voices:** no federal rule requires labeling, but the FTC deception standard applies if
listeners would think a real person is speaking. Disclose in every intro + description (line in
§5 template). Get **Billy's written consent** on file for the voice clone (ElevenLabs requires
verification anyway).

**Human gate:** no Medicare or health episode publishes without Billy's (or a licensed agent's)
approval in the n8n approval step. This is the one step we don't automate.

---

## 8. Launch plan — aggressive and timed to enrollment season

| Date | Milestone |
|---|---|
| **Oct 10–12** | Confirm partner show · Transistor account · ElevenLabs Creator + record 30 min of Billy for the voice clone · consent form · verify/clean `/podcast` page |
| **Oct 13–14** | Produce trailer + episodes 1–3 (Medicare) · Billy approves scripts |
| **Oct 15** (AEP opens) | Publish trailer + 3 · submit to Apple, Spotify, Amazon, YouTube · announce to clients, GBP, email signature |
| **Oct 15 – Dec 7** | **3 episodes/week** (Mon/Wed/Fri): Medicare-heavy, ACA from late October |
| **Nov 1** (ACA OEP opens) | ACA/health lane episodes go weekly |
| **Week 2** | Ask clients, staff, carrier reps for Apple ratings + Spotify follows (direct links) |
| **Dec 8 →** | 2/week across all lanes; review KPIs; decide on daily |
| **Month 2** | Publish a "Best Medicare podcasts for North Carolina and Tennessee" listicle (honest, includes others) |

Why not daily from day one like the partner: our bottleneck is the compliance approval, not
production. Prove the pipeline at 3/week, then scale. The automation supports daily the moment
approval is fast.

The first 20 episodes are mapped in [`references/episode-backlog-the-jordan-insurance-agency.md`](references/episode-backlog-the-jordan-insurance-agency.md) — every one
built from a page we already have.

---

## 9. Repurposing — one episode, ten assets

1. Full YouTube upload (into a playlist marked **Podcast**, 1280×1280 playlist art)
2. Episode page with transcript on our site
3. 3–5 vertical clips (30–60s), one Q&A answer each, burned-in captions → YouTube Shorts,
   Reels, TikTok (via Blotato)
4. Google Business Profile post
5. 2 LinkedIn posts
6. Client newsletter section
7. Quote graphic (brand-image skill)
8. "Listen" link added to the source blog post
9. FAQ snippet added to the matching product page
10. Email signature "Latest episode" link

## KPIs (review monthly)

| Metric | Year-one target |
|---|---|
| Downloads per episode, 30 days | 30–100 |
| Apple + Spotify followers | 100 by end of AEP |
| Average listen-through | 50%+ |
| YouTube views per episode / CTR | track; CTR 2–10% |
| Episode-page organic sessions (GSC) | growing month over month |
| **AI citations** — monthly ChatGPT / Perplexity / AI Overview prompt checks (use the existing AI-visibility evidence system for The Jordan Insurance Agency) | brand named on ≥ 3 target prompts by Q1 2027 |
| **Booked reviews attributed to podcast** (UTM + "how did you hear") | the number that actually matters |

---

## 10. Breakpoint Systems — same engine, second show

**Setup:** second show in the **same Transistor account** (no extra cost), same skill with
`brand: breakpoint`.

**Name:** keyword-first like the partner. Options:
- **"Work ON Your Business: The AI Automation Podcast"** — owns your core message ✅
- "Breakpoint: AI Automation for Business Owners" — brand-first, weaker search
- "Automate the Grind" — catchy, no keyword

**Differences from the The Jordan Insurance Agency show:**
- No CMS rules → **NotebookLM/Gemini Notebook is acceptable** for early episodes; move to
  Billy's voice clone for consistency.
- Categories: **Technology** + Business › Entrepreneurship.
- Topics: lead follow-up automation, AI receptionists, CRM/GoHighLevel, n8n workflows, AI search
  visibility for local businesses, "the tools exist but are implemented badly" case stories.
- Proof engine: The Jordan Insurance Agency's own results are the case study.
- Cover art: **needs the Breakpoint brand kit** (logo, colors, fonts). We didn't have it in
  this session; the HTML template in `assets/src/` will be re-skinned once we do.

**The bigger opportunity (this is the real ROI):** AEO Engine sells "AI Podcast Creation for
Businesses." Once this engine runs for The Jordan Insurance Agency, Breakpoint can sell it as a done-for-you service —
to insurance agencies first (we know the compliance rules), then other local service businesses.
The Jordan Insurance Agency is the live demo. Price it, package it, and use the Breakpoint show to sell it.

---

## 11. Open questions for Billy (blocking items in bold)

1. **Is AEO Engine the right partner show?** (Spotify link was garbled.)
2. **Are the 4 Spotify episodes on `/podcast` ours?**
3. ~~Confirm the name~~ — city removed per Billy; recommendation is "Smart Coverage. Real Advice." Final yes/no.
3b. **Tennessee compliance** — who confirms TN Department of Commerce & Insurance ad rules?
4. **OK to clone your voice** with ElevenLabs (needs ~30 min of clean audio + consent)?
5. Who is the licensed approver for scripts if you're unavailable?
6. Exact TPMO counts (# organizations / # products) for the disclaimer.
7. Breakpoint brand kit — where does it live?
8. Where should this engine live long term? It's in the Cashville repo because that's this
   session's working branch; it belongs in the agency's blog-automation repo or
   `breakpoint-agentic-os`.

---

## Sources

- AEO Engine show: https://feeds.transistor.fm/aeo-engine-ai-search-show · https://aeoengine.ai/podcast · https://aeoengine.ai/platform/ai-podcast-automation · https://aeoengine.ai/blog/best-aeo-podcasts-in-2026 · https://podstatus.com/podcasts/answer-engine-optimization-aeo-the-ai-search-podca-1344767 · https://poddtoppen.se/podcast/1884409947/answer-engine-optimization-aeo-the-ai-search-podcast
- YouTube & AI visibility: https://ahrefs.com/blog/ai-brand-visibility-correlations · https://otterly.ai/blog/the-youtube-citation-study-2026 · https://podnews.net/press-release/edison-research-infinite-dial-2025
- Apple search & specs: https://podnews.net/article/who-indexes-what · https://podcasters.apple.com/support/5482-using-chapters-on-apple-podcasts · https://support.transistor.fm/en/article/specs-for-podcast-cover-art-on-apple-podcasts-spotify-etc-1dyjud8 · https://support.google.com/youtube/answer/12751636
- Benchmarks: https://www.buzzsprout.com/stats
- NotebookLM / Gemini Notebook: https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/ · https://support.google.com/notebooklm/answer/16212820 · https://docs.cloud.google.com/gemini/enterprise/notebooklm-enterprise/docs/api-audio-overview
- ElevenLabs podcast API: https://elevenlabs.io/docs/api-reference/studio/create-podcast
- Transistor: https://transistor.fm/features/host-multiple-podcasts-on-the-same-account/ · https://transistor.fm/changelog/api-upload/ · https://support.transistor.fm/en/article/how-to-use-youtube-auto-posting-xnybjb/
- Spotify redirect: https://support.spotify.com/us/creators/article/switching-away-from-spotify-for-creators-with-a-301-redirect/
- n8n template: https://n8n.io/workflows/11897-convert-blog-posts-to-podcast-episodes-with-gpt-4o-elevenlabs-and-google-drive/
- CMS / NC: https://www.psmbrokerage.com/blog/cms-memo-definition-of-marketing · https://tmsbrokerage.com/2026/09/18/the-cy2027-medicare-marketing-rules-go-live-october-1-heres-the-final-prep-playbook-for-independent-agents/ · https://www.ncdoi.gov/documents/agent-services/agent-advertising-guidelines/open
- AI disclosure: https://blog.promise.legal/startup-central/ftc-ai-disclosure-rules-creators-2026/

Research caveat: our research environment couldn't load Spotify, Apple, Transistor, CMS, or our
own live site directly; facts above come from search results of those pages, plus our own Aug 29
site crawl. Items marked "confirm" should be checked before relying on them.

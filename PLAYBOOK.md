# The Podcast Engine Playbook — The Jordan Insurance Agency (then Breakpoint Systems)

Version 1.0 · October 10, 2026 · Owner: Billy Jordan

This is the operating playbook for launching and running an AI-assisted podcast for
The Jordan Insurance Agency, modeled on the show run by our AEO partner, then cloned for
Breakpoint Systems. The draft skill that automates it lives in [`skill/`](skill/SKILL.md).

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
  and episode titles, so "Jordan Insurance Agency" and "Insurance Podcast" are both indexed.
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

### Look (done — see `art/`)

| Asset | Spec | File |
|---|---|---|
| Show cover | 3000×3000 JPG, RGB, 428 KB (Apple target < 512 KB) | `art/tjia-podcast-cover-3000.jpg` |
| Episode thumbnail template (YouTube) | 1280×720 | `art/tjia-episode-thumb-template.jpg` |
| YouTube podcast-playlist square | 1280×1280 | `art/tjia-youtube-playlist-1280.jpg` |
| Editable sources | HTML → rendered with Playwright | `art/src/*.html` |

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

### Voice

- Host: **Billy (cloned voice)**. Co-host: **one** consistent stock voice — give the co-host a
  role, not a fake backstory (e.g. "Maya, our producer"). The partner's invented "ex-Google
  analyst" persona is a trust risk we don't need in insurance.
- Tone: plain English, calm. Intro line: "…from The Jordan Insurance Agency, with offices in
  Charlotte, North Carolina and Nashville, Tennessee." Naming **both** offices on air gives AI
  engines a local signal for both markets without fencing out either one.
- Always say the **full** brand name. Never "Jordan Insurance," "JIA," or "TJIA."

---

## 4. The production stack

| Job | Tool | Cost | Why |
|---|---|---|---|
| Script | Claude (skill prompt in `skill/references/script-prompt.md`) | existing | Built from our own pages; compliance rules baked in |
| Compliance gate | Human approval step (n8n "wait for approval") | $0 | Required for Medicare |
| Audio | **ElevenLabs Creator** — Studio Podcast API + Professional Voice Clone of Billy | ~$22/mo | Real API, choose voices, Billy's voice is the brand |
| Backup audio | Gemini 3.8 Flash TTS (multi-speaker, consent-gated clone) | ~1.4¢/min | Cheapest fallback |
| Drafting / B2B tests | NotebookLM (now **Gemini Notebook**) | free/Pro | Fast, but no API, can't pick voices, unclear commercial terms |
| Hosting + distribution | **Transistor Professional** | $49/mo | API, unlimited shows (both brands), YouTube auto-post, transcripts |
| Transcripts | Transistor AI transcripts or upload our own script as transcript | $5/mo | Our script = a perfect transcript, free |
| Automation | n8n (already running our blog engine) | existing | Start from n8n template #11897 |
| Thumbnails | HTML template → Playwright render | $0 | Already built |

**Total ≈ $75–90/month for both shows.**

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
`skill/references/notebooklm-prompts.md`).

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
  (template in `skill/references/episode-page-template.md`)
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

The first 20 episodes are mapped in [`EPISODE-BACKLOG.md`](EPISODE-BACKLOG.md) — every one
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
| **AI citations** — monthly ChatGPT / Perplexity / AI Overview prompt checks (use the existing TJIA AI-visibility evidence system) | brand named on ≥ 3 target prompts by Q1 2027 |
| **Booked reviews attributed to podcast** (UTM + "how did you hear") | the number that actually matters |

---

## 10. Breakpoint Systems — same engine, second show

**Setup:** second show in the **same Transistor account** (no extra cost), same skill with
`brand: breakpoint`.

**Name:** keyword-first like the partner. Options:
- **"Work ON Your Business: The AI Automation Podcast"** — owns your core message ✅
- "Breakpoint: AI Automation for Business Owners" — brand-first, weaker search
- "Automate the Grind" — catchy, no keyword

**Differences from TJIA:**
- No CMS rules → **NotebookLM/Gemini Notebook is acceptable** for early episodes; move to
  Billy's voice clone for consistency.
- Categories: **Technology** + Business › Entrepreneurship.
- Topics: lead follow-up automation, AI receptionists, CRM/GoHighLevel, n8n workflows, AI search
  visibility for local businesses, "the tools exist but are implemented badly" case stories.
- Proof engine: TJIA's own results are the case study.
- Cover art: **needs the Breakpoint brand kit** (logo, colors, fonts). We didn't have it in
  this session; the HTML template in `art/src/` will be re-skinned once we do.

**The bigger opportunity (this is the real ROI):** AEO Engine sells "AI Podcast Creation for
Businesses." Once this engine runs for TJIA, Breakpoint can sell it as a done-for-you service —
to insurance agencies first (we know the compliance rules), then other local service businesses.
TJIA is the live demo. Price it, package it, and use the Breakpoint show to sell it.

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
   session's working branch; it belongs in `tjia-blog-automation-system` or
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

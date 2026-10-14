# Operating plan: daily production (decided with Billy, Oct 12, 2026)

This replaces the "3 episodes/week" launch plan in PLAYBOOK.md §8. When the two disagree,
this file wins.

## Cadence

- **Oct 15, 2026 to Jan 15, 2027: two episodes a day** (Billy, Oct 14), covering Medicare AEP and Marketplace open
  enrollment. **Medicare at 9:00 AM** and **Health at 3:00 PM** Eastern, every day. The blog goal for the same 90 days is
  two posts a day (one Medicare, one Health); each post becomes one episode. All on the one main show.
  - Voice budget: about 6,300 ElevenLabs credits an episode, so about 380,000 a month. The Creator plan has 211,000.
    **Billy upgrades ElevenLabs** before the month runs out, or production stops about halfway through the month.
- **After Jan 15: one episode per day, 7 days a week, released at 9:00 AM Eastern** (office hours, so the team can check it as it goes live; Billy, Oct 12).
- Episodes run **5 to 7 minutes**. Don't quote an exact length in public copy.
- **Batches of 7 to 14** blog posts are fine: each approved episode takes the next open slot for its topic (through Jan 15: Medicare 9 AM, Health 3 PM; after: the next open 9:00 AM).
- About 30 a month, around 180–200 in six months.
  This matches AEO Engine's pace (#224 → #256 in about 5 weeks).
- **Ramp:** 3 episodes in the first week to prove quality and the approval flow, then daily.
- **Reddit extras:** at most **2 per week**, on top of the daily episode, never 2 in the same
  day slot. Total about 38 a month.

## Weekly lane schedule

| Day | Lane | Notes |
|---|---|---|
| Mon / Wed / Fri | Medicare | Medicare AEP runs Oct 15 – Dec 7. After Dec 7 these slots go to Health until Jan 15. |
| Tue / Thu | Health (ACA) | Before Nov 1: "get ready for Open Enrollment" episodes. ACA OEP runs Nov 1 – Jan 15 (NC/TN). |
| Sat | Home | Year-round inbound lead source |
| Sun | Auto | Year-round inbound lead source |
| — | Life / Retirement | Only when there's a strong topic. Not a lead source, so no fixed slot. |

After Jan 15, rebalance toward Home, Auto and Health (special enrollment), and review
lead data first.

## Lanes (website topics)

- **Medicare, Health, Home and Auto are Billy's inbound lead sources for AEO calls. Each one
  stands alone.** Home and Auto are **split** into separate lanes. They are not combined.
- CMS `lane` options: Medicare · Health · Home · Auto · Life · Retirement.
- /podcast gets topic buttons: **All · Medicare · Health · Home · Auto** (Finsweet CMS
  filter, which the site already uses).
- One podcast feed on Apple and Spotify, not one show per lane. Episode titles carry the topic.
- Each episode links to its lane's topic guide on the site, so AI search sees depth per lane.

## Two production streams

### Stream 1: blog → podcast (automatic, daily)
- Billy's **blog generator** picks topics from the website AEO campaign and publishes one
  blog post a day. The podcast engine does **not** choose blog topics.
- When a new blog post is published, the factory turns it into that day's episode.
- Skip or merge: near-duplicate posts (the same topic for NC vs. TN or city variants) become
  one episode. Posts that hinge on numbers about to change (for example 2027 figures not yet
  released) wait.

### Stream 2: Reddit question → podcast (no blog)
- The radar reads public Reddit RSS feeds (r/medicare, r/HealthInsurance, r/Insurance,
  r/personalfinance, plus searches). No scraping, no login.
- It finds questions that keep recurring or are rising, then posts **one Slack message**:
  *"Reddit keeps asking: [question]. Make an episode? [Yes] [No]"*
- **Yes:** the episode is written straight from the question. The episode page and
  transcript are the AEO content, so no blog is needed.
- Before asking, the radar checks the episode ledger and the blog list. If the question is
  already covered, it skips it.
- Answer the **general** version of the question. Never quote or name the poster. Medicare
  stays general education.
- X/Twitter: **skipped** (paid data access, about $200/mo, not worth it). Google News RSS and
  DataForSEO cover what X amplifies.
- Optional later: send strong Reddit questions to the blog generator as blog topics.

## Duplicate rule

The factory keeps a **ledger of every question answered** (episode title, the question
in one line, lane, number). New candidates are checked against it. 200 episodes only help
AEO if they answer 200 different questions; duplicates compete with each other in search.

## Approvals

- Every episode script is **emailed to billy@agencyhlpc.com** with Approve / Decline buttons.
  Slack gets one short line saying it was sent.
- Weekend episodes: **auto-publish window**. They publish after the set time unless Billy
  taps Stop.
- Approval is the bottleneck. Keep it to about one tap per episode.

## Episode numbering and website fields

Every new CMS item **must** have all of these, or the card breaks:
- `episode-number`: sequential, matches the Transistor episode number
- `publish-date`: stored at midday UTC (`T16:00:00Z`), because midnight shows the previous
  day in Eastern time
- `episode-page-url`: `https://thejordaninsuranceagency.com/podcast/{slug}`. The /podcast
  cards link here; the built-in collection link 404s on this site.
- `lane`, `duration`, `quick-answer`, `show-notes`, `full-transcript`,
  `transistor-player-url`, `spotify-link`, `apple-podcasts-link`, `seo-title`,
  `meta-description`

## ElevenLabs credit budget

- Plan: **200,000 credits/month**.
- Today (v4 discounted): about **800 credits per episode**, so about 30,000 a month at 38
  episodes. Fine.
- **When the v4 discount ends:** about 6,000–6,500 credits per episode. At 38 a month that's
  about 240,000, **over the plan**. At 30 a month it's about 195,000, right at the limit.
- The factory logs credits per episode and warns in Slack at 75% of the month. When the
  discount ends, Billy chooses: drop the Reddit extras, use a cheaper voice model, or upgrade.

## Build order

1. **Built Oct 12, now in testing** (see [`episode-factory.md`](episode-factory.md)). Blog → podcast factory: batch mode plus the daily trigger, editor, gate, email
   approval, music, Transistor, and the Webflow CMS item.
2. /podcast topic buttons and the Home/Auto lane split.
3. Reddit radar.

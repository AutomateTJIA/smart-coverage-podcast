# Episode Factory v2 (n8n): how the daily podcast gets made

Built Oct 12, 2026. This is the machine behind [`operating-plan.md`](operating-plan.md).

**This is the only podcast production process.** Nothing was set up or used before Oct 12.
The older n8n workflows (AI Coverage Coach, the Oct 10 factory, bench and voice tests) are not
part of it. Four of them were archived on Oct 12. **Status: built, not yet proven.** The first full
test run (one blog link through the form) is the proof.
n8n instance: `systems.breakpointsystems.com`. All three workflows live in Billy's personal project.

## The three workflows

| Workflow | ID | What starts it | What it does |
|---|---|---|---|
| **Smart Coverage — Front Door (batch form + daily pick)** | `rPtQJ37gJT4o29t3` | (a) the batch form, (b) every morning at 10:15 AM ET | Collects blog links and sends them to the Producer **one at a time** |
| **Smart Coverage — Episode Producer (one episode)** | `JSKBgEYlncxIZMz0` | Called by the Front Door | Script, compliance edit, gate, duplicate check, email approval, voices, music, Transistor (scheduled), website draft, ledger |
| **Smart Coverage — Studio Page Requests** | `zmb6a0YAfxYXibfI` | The hosted Studio page (POST to webhook `smart-coverage-studio`) | Checks the email and links, answers the page right away, hands accepted requests to the Front Door |
| **Smart Coverage — Daily Release (website)** | `A3h2y2PVfOeJPZ8r` | Every hour at :58 ET (quiet when nothing is due) | Publishes the website page for each episode due (9:00 AM, plus the afternoon slot on two-episode days), sets the length to "X min Y sec" from the real Transistor audio length (Oct 13), marks it published, then checks the page loads and Transistor shows it published; reports pass or FAILED in Slack and by email |

All three run on Eastern time (`America/New_York`).

## Front Door

- **Who can request (Billy, Oct 13):** the form asks for a work email. Only `@agencyhlpc.com`,
  `@thejordaninsuranceagency.com` and `@breakpointsystems.com` addresses are accepted, with up to
  **14 links** per request. Accepted requests start right away, and Slack posts "Podcast request
  received". Anything else gets "request not accepted" in Slack. The email-confirmation step from
  Oct 12 was removed; Billy's email approval of each episode is the safety check.
- **Batch form** (path `smart-coverage-batch`) and the studio page. Paste links, one per line.
  Our blog posts (`thejordaninsuranceagency.com/blog/...`) and outside articles are both accepted
  (Oct 12). Outside articles use only the article's facts, credit it by name, and are flagged in the
  approval email as not checked by our team. Links that already have a live or
  scheduled episode are skipped. Declined or failed links *can* be re-run from the form.
- **Daily pick** (10:15 AM ET). Looks at blog posts published in the last 3 weeks that have no
  ledger row, and picks one:
  1. a post in **tomorrow's lane** (the day it will air) (Mon/Wed/Fri Medicare, Tue/Thu Health, Sat Home, Sun Auto;
     Dec 8 – Jan 15 the Medicare days go to Health),
  2. otherwise the newest Medicare/Health/Home/Auto post,
  3. otherwise the newest post.

  The lane is guessed from the post title and slug, because the Blog Posts collection has no
  category field.
- **Ramp week:** the daily pick is switched off in code until **Oct 19, 2026** (`START` in
  "Pick Today's Post"). Week one is the batch form only, 3 episodes. On a skipped day, Slack gets
  a ":zzz: No podcast episode started today" note.
- It calls the Producer with **"wait for sub-workflow"** on, so episodes go through in order and
  episode numbers can't collide.

## Producer: the steps

1. **Write and check the script.** Read the blog post → Write Dialogue (OpenAI gpt-4.1, temp 0.6)
   → Edit for Compliance (gpt-4.1, temp 0.1) → **Compliance and Brand Gate**. If the gate fails,
   it stops before any voice credits are spent and posts the problems in Slack.
   - **Our blog posts are already vetted (Billy, Oct 12).** The writer and editor treat every
     fact, number and date in the post as verified. They never soften, hedge or drop a fact, and
     never add "check the current figure". The editor only fixes: the brand name, "Billy and his
     team", the required lines, forbidden phrases, and Medicare plan, carrier or price mentions
     (those stay out by our compliance rule, even if the post has them).
   - **Target length:** 850 to 1,050 words, about 5 to 7 minutes with the music. Length never
     blocks an episode; a long or short script is flagged in the approval email and Billy decides.
     Only a broken script (under 500 or over 2,000 words) stops at the gate.
2. **Duplicate check and approval.**
   - Write Episode Details produces the title, slug, question, topic, quick answer, SEO fields,
     bullets and `duplicate_of`.
   - If the question is already answered in the ledger, it stops ("Skipped: already answered by
     episode N").
   - Otherwise the full script is **emailed to billy@agencyhlpc.com** with Approve / Decline
     buttons at the bottom (Gmail credential "Gmail account"). Slack gets one short line saying
     the script was emailed. (Changed from a long Slack post on Oct 12, Billy's request.)
   - No answer in 12 hours: on a **weekend it goes ahead**; on a weekday it is skipped.
3. **Make the audio.**
   - Plan Release assigns the next episode number and the next open slot. **Through Jan 15, 2027 (Billy, Oct 14): two
     a day**, Medicare in the 9:00 AM slot and Health (and any other topic) in the afternoon slot, each lane in its own
     queue. After Jan 15: the next open day at **9:00 AM ET** (one per day, after the last scheduled one).
   - ElevenLabs v4 text-to-dialogue voices the episode chunk by chunk.
   - The music parts are pulled from GitHub (`assets/audio/factory/`) and joined: hook → gap →
     intro → dialogue → gap → outro.
4. **Schedule.**
   - Upload the MP3 to Transistor → create the episode (number set) → add show notes and the
     transcript → **schedule** it for the release time.
   - Create the website CMS item as a **draft** with every required field, so a full-site
     publish can't put it live early.
   - Write the ledger row (`scheduled`, `release_at`).
   - Check ElevenLabs usage (warns at 75%) and post ":white_check_mark: Episode N is built and
     scheduled" in Slack. The finished MP3 is emailed to billy@agencyhlpc.com to hear before release.
     (The episode page link is not sent here: it only works after release.)
5. **Stopped early.** Gate failures, duplicates, declines and weekday no-answers are written to
   the ledger (`gate_failed`, `duplicate`, `declined`, `expired`), so the daily pick won't offer
   that post again.

## Ledger statuses (`podcast_ledger`, data table `5913jrW1llHq6pwD`)

| Status | Meaning | Counts for numbering and duplicates? |
|---|---|---|
| `scheduled` | Built; waiting for its release day | Yes |
| `published` | Live on Transistor and the website | Yes |
| `gate_failed`, `duplicate`, `declined`, `expired` | Not made | No |

## Billy's day-to-day

- **Approve or decline** from the approval email. That's the only daily touch.
- To make extra episodes, or to re-run a declined one, paste links into the batch form.
- Slack tells you when each episode is scheduled and when it goes live.

## Known limits and things to watch in the first test

- **Loudness:** factory episodes come out about -23.5 LUFS, versus -16 for episode 1. They
  sound quieter than episode 1 in podcast apps. Fix candidate: Auphonic (about $11/mo) as one
  extra step.
- **Approval wait inside a called workflow:** the Front Door waits for the Producer, which waits
  for the approval email for up to 12 hours. If n8n doesn't hand the result back after the wait, the fallback
  is to turn waiting off and rely on the one-per-day release slot. The first batch test answers
  this.
- **Batch speed:** with sequential processing, a batch of 5 links means 5 separate approval
  emails, each arriving after the previous one is answered.
- **Webflow:** the website item is created through the Webflow OAuth credential. If its scopes
  don't include CMS write, step 4 fails with a 403. Reconnect the credential with CMS read/write.
- **Music file location:** the Producer pulls music from `AutomateTJIA/smart-coverage-podcast`, branch `main`, folder `assets/audio/factory/` (switched from Cashville-Project on Oct 13, after a read test; the files are byte-identical).
  Switch it to `main` after this branch is merged.
- **Duration** on the website card is estimated from the file size (128 kbps), so it can be off
  by a few seconds.

## Release slots and studio gate (Oct 13)

- **Two a day through Jan 15, 2027 (Billy, Oct 14):** Medicare at 9:00 AM, Health and other topics in the afternoon slot. A dated request keeps its topic's slot on that day, or the next day that slot is free. The Front Door's 10:15 AM daily pick starts one Medicare post and one Health post (oldest unused first, each lane only; an empty lane leaves its slot empty). `PAIR_UNTIL` in Preview Air Date, Plan Release and Pick Today's Post holds the end date.
- **After Jan 15: one episode a day at 9:00 AM ET.** A second episode on a day only when someone picks that date on purpose. It airs in the afternoon slot, `second_slot_time` in the n8n table "Smart Coverage Studio Settings" (default `15:00`, 3:00 PM ET; Billy can change it to `17:00`). Same rule in the Producer's Preview Air Date and Plan Release.
- **Studio gate** (Studio Page Requests `Check Request` and Front Door `Check Requester`, same logic):
  - team passcode from "Smart Coverage Studio Settings" (`studio_passcode`; blank = nothing accepted)
  - agency email
  - links only from our site or "Smart Coverage Approved Sources"
  - lockout after 10 wrong passcodes in an hour, logged in "Smart Coverage Studio Wrong Tries"; one Slack alert when it locks; delete those rows to unlock early

## Show lanes (Oct 13)

Four lanes, each able to become its own Transistor show with its own RSS feed (Billy, Oct 13). There's no quota: a lane gets an episode only when there's a good post for it.

| Lane | Topics that route there | Show |
|---|---|---|
| `medicare` | Medicare | own show once its ID is filled in |
| `health` | Health (ACA/Marketplace, non-Medicare health) | own show once its ID is filled in |
| `home_auto` | Home, Auto | own show once its ID is filled in |
| `life` | Life, Retirement | own show once its ID is filled in |
| `main` | (fallback) | Smart Coverage. Real Advice., Transistor show `84410` |

- The routing table is the n8n data table **Smart Coverage Shows** (`vCxFnYRsxi2jLOyX`). A lane with an empty `transistor_show_id` airs on the `main` show, exactly as before.
- **To turn a lane on:** create the show in Transistor, then paste its show ID into that lane's `transistor_show_id`. Nothing else changes.
- `apple_podcasts_url` (added Oct 13): the show's Apple Podcasts link. **Build Web Fields** uses it for the episode page's "Listen on Apple" link and falls back to the main show when it's empty.
- Slots (9 AM, plus the purposeful afternoon slot) and episode numbers are counted **per show**, so three shows can each air at 9 AM on the same day, and each new show starts at Episode 1.
- The ledger has a `show_id` column. Rows without one count as the main show.
- The Producer reads the table in **Get Shows**, picks the show in **Preview Air Date** and **Plan Release**, uploads to that show in **Create Transistor Episode**, and the approval email shows a **Show:** line.
- **Not done yet (do it when the first new show launches):** a Show label and per-show Apple/Spotify links on the website cards and episode pages, plus /podcast filters. Each show restarts at EP 1, so cards need the show label.

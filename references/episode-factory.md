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
| **Smart Coverage — Episode Producer (one episode)** | `JSKBgEYlncxIZMz0` | Called by the Front Door | Script, compliance edit, gate, duplicate check, Slack approval, voices, music, Transistor (scheduled), website draft, ledger |
| **Smart Coverage — Daily Release (website)** | `A3h2y2PVfOeJPZ8r` | Every morning at 9:05 AM ET | Publishes the website page for each episode whose release time has passed, marks it published, posts the link in Slack |

All three run on Eastern time (`America/New_York`).

## Front Door

- **Batch form** (path `smart-coverage-batch`). Paste blog links, one per line. Only
  `thejordaninsuranceagency.com/blog/...` links are accepted. Links that already have a live or
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
2. **Duplicate check and approval.**
   - Write Episode Details produces the title, slug, question, topic, quick answer, SEO fields,
     bullets and `duplicate_of`.
   - If the question is already answered in the ledger, it stops ("Skipped: already answered by
     episode N").
   - Otherwise the full script goes to Slack **#podcast-approvals** with Approve/Decline buttons.
   - No answer in 12 hours: on a **weekend it goes ahead**; on a weekday it is skipped.
3. **Make the audio.**
   - Plan Release assigns the next episode number and the next open day at **9:00 AM ET** (office hours; Billy, Oct 12)
     (one per day, after the last scheduled one).
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
     scheduled" in Slack.
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

- **Approve or decline** in Slack #podcast-approvals. That's the only daily touch.
- To make extra episodes, or to re-run a declined one, paste links into the batch form.
- Slack tells you when each episode is scheduled and when it goes live.

## Known limits and things to watch in the first test

- **Loudness:** factory episodes come out about -23.5 LUFS, versus -16 for episode 1. They
  sound quieter than episode 1 in podcast apps. Fix candidate: Auphonic (about $11/mo) as one
  extra step.
- **Approval wait inside a called workflow:** the Front Door waits for the Producer, which waits
  in Slack for up to 12 hours. If n8n doesn't hand the result back after the wait, the fallback
  is to turn waiting off and rely on the one-per-day release slot. The first batch test answers
  this.
- **Batch speed:** with sequential processing, a batch of 5 links means 5 separate Slack
  approvals, each arriving after the previous one is answered.
- **Webflow:** the website item is created through the Webflow OAuth credential. If its scopes
  don't include CMS write, step 4 fails with a 403. Reconnect the credential with CMS read/write.
- **Music file location:** the Producer pulls music from branch `claude/laughing-cannon-hro47m`.
  Switch it to `main` after this branch is merged.
- **Duration** on the website card is estimated from the file size (128 kbps), so it can be off
  by a few seconds.

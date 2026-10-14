# Changelog — Smart Coverage. Real Advice.

Plain-English log of what we build, change, and remove for the podcast, newest date first.

**About the commit hashes:** everything up to Oct 13, 2026 was built inside the Cashville-Project
repository and moved here with its history. Hashes in those entries point to Cashville-Project
commits. Entries from Oct 13 on use this repository's own hashes.

---

## 2026-10-14

### Changed — two episodes a day through open enrollment (n8n Episode Producer, Front Door; Studio page; docs; commit 42154c3)
- From Oct 15 to Jan 15, every day gets two episodes on the main show: **Medicare at 9:00 AM** and **Health at 3:00 PM** Eastern. This matches the blog goal of two posts a day for the same 90 days. On Jan 16 it goes back to one a day at 9:00 AM automatically.
- **Scheduling:** Medicare and Health each have their own queue, so a busy Medicare week never pushes Health off its time, and the reverse. A date you pick keeps that topic's time slot.
- **Daily auto-pick (10:15 AM):** now starts two episodes a day, the oldest unused Medicare post and the oldest unused Health post from the last three weeks. It starts tomorrow, Oct 15, instead of Oct 19. If there's no new post for one topic, that slot stays empty for the day rather than doubling up the other topic.
- **Studio page:** the calendar shows both episodes on each day through Jan 15, and the wording explains the two time slots. The backup form's description says the same.
- Tested before going live: a week of Medicare and Health episodes against the real schedule, dated requests, and the switch back after Jan 15.
- **Action for Billy:** two a day needs about 380,000 ElevenLabs credits a month, and the current Creator plan has 211,000 (11,834 used so far this cycle, which resets about Nov 12). Without an upgrade, voicing stops around Nov 3.

## 2026-10-13

### Changed — the podcast no longer depends on Cashville-Project (n8n Episode Producer; docs; commit 02a4687)
- The Episode Producer used to download the intro, gap and outro music from Cashville-Project. It now downloads them from this repository. Before switching, a test confirmed n8n can read the files here and that they match byte for byte. No episodes were waiting for approval, so none were still pointed at the old location.
- Checked: the Daily Release, Front Door and Studio Page Requests workflows never pointed at Cashville. The Studio website on Vercel deploys from this repository.
- An old copy of the podcast files is still in Cashville-Project (branch `claude/laughing-cannon-hro47m`, `docs/podcast-engine/`). Every file is either identical to a file here or an older version of one. Nothing uses that copy anymore. It's waiting on Billy's OK to delete.

### Changed — ready for a separate Health Insurance show (n8n Episode Producer; n8n Shows table; docs; commit cdc2fb4)
- Plan: Medicare stays on the current show, and Health Insurance gets its own show. Home & Auto and Life stay on the current show for now.
- Website episode pages now send "Listen on Apple" to the show the episode actually airs on. Before, the link always pointed to the current show. The Shows table has a new `apple_podcasts_url` column for this, and the current show is the fallback.
- The step-by-step launch list is in `references/transistor-lane-shows.md`.

### Changed — cleaner icons on the four lane covers (assets; commit 6350262)
- Billy said the first icons looked a little cheesy. All four are redrawn as one matching set: a simple line icon inside a round badge, in white with a gold accent.
  - Medicare: a shield with a gold cross.
  - Health Insurance: a heart with a gold pulse line.
  - Home & Auto: a clean house outline with a gold car in front.
  - Life Insurance: a gold umbrella over two adults and a child.
- The title, lane bar, colors and logo are unchanged.

### Built — cover art for the four lane shows (assets; Transistor setup sheet)
- Four 3000x3000 covers in the same family as the current one: Medicare (shield with a cross), Health Insurance (heart with a pulse line), Home & Auto (house and car), Life Insurance (umbrella over a family). Each has the lane name in a big gold bar so it reads at phone-thumbnail size. Brand colors only.
- `references/transistor-lane-shows.md` has the title, categories and description for each show, ready to paste into Transistor.

### Built — four show lanes: Medicare, Health Insurance, Home & Auto, Life Insurance (n8n Episode Producer; new n8n table)
- Each lane can become its own podcast with its own RSS feed, so episodes are sorted by topic instead of all landing in one feed. There's no quota: a lane gets an episode only when there's a good post for it.
- **How a lane turns on:** create the show in Transistor, then paste its show ID into the n8n table "Smart Coverage Shows." Until then, the lane's episodes air on the current show, exactly as today.
- Each show keeps its own 9 AM slot and its own episode numbers, so three shows can each air at 9 AM on the same day without bumping each other.
- The approval email now has a "Show:" line telling you which feed the episode goes to.
- Life Insurance is its own lane, and retirement topics ride with it.
- Still to do when the first new show launches: the show label, per-show subscribe links and filters on the website.

### Changed — "$0 premium" from your post is allowed in any spoken form; rules written down as you stated them (n8n Episode Producer; docs)
- If your blog post mentions a $0 premium, the script can say it out loud as "zero-dollar premium" without the final check stopping it. Before, the spoken wording didn't match the post's "$0" and would have been flagged.
- Your policy is now written into the rules: your posts never name carriers, a "$0 premium" mention is general information, and your posts go to the podcast with no extra restrictions. Outside sources come only from the approved list (Medicare.gov, KFF and similar) and keep the stricter checks.

### Changed — your blog posts are now treated as approved content, start to finish (n8n Episode Producer; docs)
- **What happened:** the editor removed "copays" and "lower copays" from the Medicare plan review episode, citing "rule 4." That rule wasn't written by Billy. It came from his Oct 11 decision to skip the TPMO disclaimer, which depends on Medicare episodes staying general. The rule was meant for plan-specific prices ("Plan X has a $10 copay"), but the AI applied it to the plain word "copays." Both the writer and the editor were also told to drop prices from the post.
- **Now:** for our own blog posts, the writer keeps the post's words, numbers and cost terms (premiums, copays, deductibles, out-of-pocket limits) as written. The editor may only remove something the AI ADDED that isn't in the post: a plan or carrier name, a dollar amount, "$0 premium" or "giveback," or a superlative. The final check ignores any word that appears in the post. Tested on 8 cases: words from the post pass, words the AI adds are caught, and outside articles keep the full strict rules.
- **The pending email** for "What to Bring to Your Medicare Plan Review" was written by the old rules. Decline it (nothing is paid) and resend the link from the studio to get the version with copays kept.
- Docs updated: compliance notes, script guide, project rules.

### Fixed — episode length format, the "Read & listen" gold, and a false alarm in the final script check (n8n Daily Release and Episode Producer; website)
- **Episode 3 showed "6:30" instead of "6 min 30 sec."** It was built before the format fix. It's corrected now. To stop it for good, the release step now writes the length itself, as "X min Y sec", from the real audio length on Transistor, right when the episode goes live. Any episode built by an older version gets fixed automatically.
- **"Read & listen ›", the "EP 3" label and the "ALL EPISODES" label on /podcast** were a dark brownish gold (#9A7614). They're now the logo gold (#E0B43B). The site was republished, and the brown is gone from the live stylesheet.
- **The 1:12 PM "Script did not pass the checks" message was a false alarm.** Your annual review post says "a common mistake is assuming the preferred label means it's always the lowest cost." That's a warning, not a sales claim, but the final check blocked any use of "lowest." Now "lowest" and "best plan" block only when used as a claim ("this plan has the lowest premium"). Warnings and questions pass. Tested on that exact script, which now passes. A real claim is still caught, and the message now quotes the sentence. Nothing was spent on voices. **Resend that blog link from the studio to make the episode.**
- Episode 3's Transistor description now says "reviewed and approved," matching the website.
- The 10:55 AM "No answer in 12 hours" message was the first, duplicate divorce email timing out as planned. Nothing to do.

### Changed — Tanya no longer says "AI" on air; the written AI note stays everywhere (option B) (n8n Episode Producer; Transistor; website; docs, 11084f6)
- **Billy's call (option B):** Tanya now introduces herself as "I'm Tanya, your host." Nobody on air says they're AI, and nobody claims to be a live person. The script writer has that rule, and the final check now looks for "your host" instead of "your AI host".
- **The written disclosure stays on everything:** show notes, episode pages ("Tanya (AI host)" in transcripts), the show's main description on Transistor, and YouTube's "altered or synthetic content" box.
- **Episodes 1 and 2 updated** on Transistor and on the website: "written and approved" now reads "**reviewed** and approved". Both website items republished. Episode 3's (divorce) website notes were fixed too, before it goes live.
- **Show description on Transistor:** same wording fix, and removed "In 7–8 minute episodes", because public copy shouldn't quote a length.
- **Heads-up:** Episode 3 (divorce) was already voiced before these changes, so its audio still has the old style: "your AI host", the disclaimer mid-episode, and the old ending. Its transcript matches the audio, so it stays as is. Every episode from now on uses the new style.
- Docs updated to match: brand file, compliance notes, Playbook, script guide and checklist. The temporary Transistor helper workflow in n8n was archived.

### Changed — Billy signs off with "Until next time" (n8n Episode Producer; brand file)
- Billy's last line is now a warm hand-off: "I'm Billy Jordan with The Jordan Insurance Agency. Until next time, take care." No disclaimer at the end, since it's said once up front. Tanya still closes the show.
- **Wording fix, for accuracy:** the written note in show notes and on episode pages said scripts were "written and approved by Billy Jordan". They're written by the AI from Billy's posts and approved by Billy, so it now says "**reviewed** and approved". New episodes use it; Episodes 1 and 2 still show the old wording until updated.

### Built — second episode of a day airs at 3:00 PM, and a passcode lockout (n8n Episode Producer, Daily Release, Front Door, Studio Page Requests; studio page, playbook)
- **Schedule (Billy's rule):** one episode a day at 9:00 AM. A second one on the same day only happens on purpose, when someone picks a date that already has an episode. It now airs that **afternoon at 3:00 PM** instead of also at 9:00, so the two don't touch. If the morning slot has already passed when today is picked, it takes 3:00 PM. If both are taken, it goes to the next open day.
- The afternoon time is a setting Billy controls: `second_slot_time` in the n8n table "Smart Coverage Studio Settings" (15:00 now; change it to 17:00 for 5 PM). Tested on 11 cases.
- **Release check now runs every hour at :58** instead of only 8:58 AM, so afternoon episodes get published on the website and verified too. It's quiet when nothing is due, and it also catches any release that was missed earlier.
- **Lockout:** 10 wrong passcodes within an hour lock the studio (page and backup form) for an hour, even for the right passcode, so guessing can't work. Billy gets one Slack alert when it locks. Each wrong try is logged in "Smart Coverage Studio Wrong Tries"; deleting those rows unlocks it early. Tested on 4 cases plus a live wrong-passcode test, which was logged correctly.
- Studio page and playbook wording updated for the 3:00 PM second slot and the lockout message.

### Built — "Clear and start over" button on the studio page — d6a5a6e
- One click empties the links, the air date and any message, so nobody has to erase line by line. Email and passcode stay, because the page remembers them on purpose.
- Also: Billy set the team passcode in n8n. A test with a wrong passcode was refused ("That team passcode isn't right"), which confirms the lock is on and checking against his value.

### Fixed — Air date box no longer spills outside the white card on iPhones (studio page) — 52c8efb
- iPhone Safari draws date boxes wider than the card unless its built-in style is switched off. It now matches the other boxes.
- On the smallest phones, the decorative rings and the scrolling topic strip no longer make the page scroll sideways. The "Links" label also got a little breathing room under the new passcode box.
- Checked at 375 and 320 pixels wide, where every box lines up. Billy to confirm on his iPhone, since iPhone Safari itself couldn't be tested here.

### Changed — the disclaimer is said once, up front, as "A quick disclaimer" (n8n Episode Producer; brand file, PLAYBOOK.md)
- Billy's note: the old way had Billy blurt out "We're not affiliated with Medicare…" on its own, then repeat "general education" at the end. It sounded awkward and said the same thing twice.
- **Now:** Billy's first line is a warm hello, then "A quick disclaimer: …", then straight into the topic. Medicare episodes: "…we're not affiliated with or endorsed by Medicare or any government agency, and this is general education, not advice for your situation." Other episodes: "…this is general education, not advice for your situation."
- **Outro:** Billy just signs off ("I'm Billy Jordan with The Jordan Insurance Agency. Thanks for listening."). Tanya's line before it, "For a personalized look at your situation…", already tells listeners their case may be different.
- The written disclaimers in the show notes and on the website are unchanged.
- The writer and the editor both follow the new rule, and the final check still confirms the disclaimer is there. Brand file and PLAYBOOK.md updated.
- Applies to new episodes. The divorce episode waiting for approval was written before this change.

### Built — team passcode, approved sources, Studio Playbook (n8n Front Door, Studio Page Requests; studio page) — 68ad03b
- **Team passcode:** every request now needs it, on the studio page and on the backup form. Billy sets it himself in the n8n table "Smart Coverage Studio Settings" (it is never stored in code or chat). **While it is blank, the studio accepts no requests** (tested live: refused, nothing made). Wrong passcodes are refused and show up in Slack.
- The studio page has a "Team passcode" box, remembered on each computer. The Send button stays off until it's filled in.
- **Approved sources:** outside links are only accepted from sites in the n8n table "Smart Coverage Approved Sources" (12 starter sites: Medicare.gov, CMS, Social Security, HealthCare.gov, KFF, NC Department of Insurance, Tennessee state sites, NAIC, Insurance Information Institute, FloodSmart, FEMA, NHTSA). Our own site is always allowed. Other links are skipped and named on the page and in Slack. Lookalike addresses (e.g. "medicare.gov.someothersite.com") are refused. Tested on 8 cases.
- **Studio Playbook:** a one-page guide for the team at studio.thejordaninsuranceagency.com/playbook.html, linked from the studio page. It covers how to send, what makes a good pick, the season calendar, how many to send, what each message means, when to ask Billy, and three don'ts.
- Billy stays the only approver (option A).

### Fixed — Episode 2 no longer says "Check the current figure for employer size requirements" (Transistor, Webflow)
- Episode 2 was made before the "don't soften vetted facts" fix, so Billy's AI voice read that hedge out loud.
- Only the one section containing it (about 1,250 characters) was re-recorded with the line removed, then swapped into the live MP3. Before uploading, it checked the file was the exact size expected and that the section edges lined up, and it would have stopped if not.
- Same link and same episode on Apple, Spotify and the website. The new length is 7 min 51 sec. The transcript is corrected on Transistor and on the website.
- The original file is still stored at Transistor, so this can be undone if needed. The temporary workflow was archived.

### Changed — the usage line shows the reset date and how many episodes are left (n8n Episode Producer)
- Example: "6% used (11,682 of 211,000). Resets Nov 10 (29 days). Room for about 32 more episodes before then." This appears in the approval email, the finished-episode email and Slack.

### Built — ElevenLabs usage in every episode email (n8n Episode Producer)
- Before, the monthly ElevenLabs usage line only appeared in Slack ("Episode is built and scheduled"), after approval. It was never in the emails.
- **Approval email** now shows usage before you decide: "% used this month, and about where you'll be if you approve this one". It warns at 75% or more. A new usage check runs just before the email goes out; if ElevenLabs can't be reached, the email says so and still sends.
- **Finished-episode email** (the one with the MP3) now shows the usage line too. Slack keeps it as before.
- Reading after Episode 2: 5% used (10,292 of 211,000 characters).

### Fixed — our own blog posts were being fact-checked like outside articles (n8n Episode Producer)
- **What happened:** the step that reads the link used a web-address tool that n8n's sandbox doesn't have. It quietly failed, so the system couldn't tell the link was on thejordaninsuranceagency.com and treated Billy's own blog post as an **outside article**. That switched on the strict outside-article editor, which cut 10 things from the "Medicare and Divorce" script and labeled the email "OUTSIDE ARTICLE from ." (blank). This came in with the outside-article feature on Oct 13.
- **Fix:** the website name is now read with a simple pattern that works in n8n, **and** anything on our own website (or labeled "blog" by the Front Door) always counts as vetted. Tested on four sample links.
- **Editor rule for our posts, tightened:** it may not fact-check the post or the script against it, and may not remove, reword or hedge anything the post says, or remove examples and everyday color. The only fact edit allowed is removing a specific number, dollar amount, date, deadline or rule that appears nowhere in the post.
- **Result:** the same post re-run gave 2 editor notes instead of 10 (one drug-plan detail not in the post, and the required "not affiliated with Medicare" line), correctly labeled "our blog post (already checked)".
- The approval email now says exactly what **Decline** does: nothing is made, nothing airs, no voices are paid for, Slack confirms it, and the same link can be sent again any time.

### Changed — episode length reads "6 min 55 sec", not "6:55" (n8n Episode Producer; Webflow)
- "6:55" looked like a clock time. Episodes 1 and 2 were corrected on the website, and new episodes are written this way automatically.

### Live on the website (Webflow site published and checked on the live pages)
- **"All episodes" button** on each episode page now goes back to /podcast (it pointed nowhere).
- **Booking on the podcast pages** now uses the same routing form as the home page: the visitor picks the type of appointment and is sent to the right person's calendar, instead of one catch-all calendar.
- **"Schedule Your Consultation"** moved to the top of /podcast, under the heading, so it doesn't sink as episodes are added.

### Changed — studio page and request form wording (c6a2842; n8n Front Door)
- "Request an episode" is now **"Create a podcast episode"** (the top button says "Create an episode").
- The email box just says **"Email"**; the sample agency address is gone, on the page and on the form.

### Built — pick an air date, including a second episode on the same day (n8n Front Door, Studio Page Requests, Episode Producer; studio page)
- The studio page and the request form have an optional **Air date** box.
- **Left blank:** the episode takes the first open day at 9:00 AM. Undated episodes now fill the earliest empty day; before, they always went after the last scheduled one, which would have left gaps.
- **Date picked, nothing that day:** it airs that day.
- **Date picked, one episode already that day:** it airs that day as the **second** episode (Billy's rule: two per day only when asked for).
- **Date picked, already two that day:** it goes to the next open day after it.
- Several links with one date: the first link gets the date, the rest go on the open days after it.
- The approval email now shows **AIRS: [day and time]** with a plain note ("as the SECOND episode that day", "already has two episodes, so…", "that date has passed, so…"). Slack shows the air date too.
- The rule was tested on 7 cases (free day, second on a day, full day, batch follow-on, past date, unreadable date, no date) before going live.

### Fixed — a formatting slip no longer rejects an episode (n8n Episode Producer)
- Billy's request for the "North Carolina Medicare Eligibility" post was rejected. It was not the length (1,003 words, about 6.6 minutes). The recap was written as separate "One: / Two: / Three:" lines without "Tanya:" in front, and the final check rejects any line without a speaker.
- The script is now repaired automatically: a line without a speaker is joined to the line before it. The approval email notes when that happened. The writer and editor were also told to keep every recap item on a "Tanya:" line.
- Length never rejects an episode. Target 5 to 7 minutes; the approval email flags anything over 7 minutes, and anything over 10 minutes with "Consider declining". Only a broken script (under 500 or over 2,000 words) stops.

### Built — outside articles can become episodes (n8n Front Door, Studio Page Requests, Episode Producer; studio page)
- Any web link is now accepted, not just our blog posts.
- **Our blog posts** (already checked by Billy): every fact used as written, nothing hedged.
- **Outside articles** (not checked by our team): only facts in that article, credited out loud by name ("According to …"), explained in Billy's own words with no long copied passages. The approval email marks it "OUTSIDE ARTICLE … please check the facts", and the episode page credits the source.
- A link the system can't read (blocked or behind a login) now gets a Slack note instead of failing silently.

### Changed — Podcast Studio page wording (`c9d4893`, `3bbb4be`)
- The cover art floats more noticeably.
- "Request an episode" no longer says "agency email required" or shows a sample blog address. The box is just "Links".
- No Slack mentions on the page.
- "Turn a blog post into an episode" is now "From one link to a finished episode".
- Calendar copy: "Each day can have its own topic… Requested episodes take the next open 9:00 AM slot, whatever the topic."

### Released — Episode 2 went live tonight, and the release check passed
- At Billy's request, Episode 2 (Turning 65) was published Oct 12 at about 10:08 PM instead of waiting for 9:00 AM. The Daily Release then published the website page and its new check passed: the page loads and Transistor shows it published. The "live and checked" email was sent.
- Episode 1's website date was corrected to Oct 11 (both cards showed Oct 12).
- **Safeguard (n8n Daily Release):** when an episode goes live, the release now also sets the website date to the day it actually went live. Every episode already gets its own day (one per day), and this keeps the card date right even if a release is moved.
- The next approved episode takes the Tue Oct 13 9:00 AM slot.

### Fixed — no more links that only work later, and every release now proves itself (n8n)
- Billy clicked the episode link in the "built and scheduled" Slack message and got a 404. Nothing was broken: that page is a draft until release time. But a link that doesn't work yet is useless, and nobody had checked that a release really goes live.
- **Episode Producer:** the "built and scheduled" message no longer includes the not-yet-live page link. Instead, the finished MP3 is **emailed to billy@agencyhlpc.com** so he can listen before it airs.
- **Daily Release:** now runs at **8:58 AM** (was 9:05), so the website page goes up with Apple and Spotify at 9:00. Three minutes later it **checks** that the page loads and that Transistor shows the episode as published. Then it sends a pass ("live and checked", with working links) or a FAILED alert, in Slack and by email.
- The failure alert was tested with a simulated broken page and fired correctly. The first real release check runs Tue Oct 13 at 8:58 AM (Episode 2).

### Changed — episode approval now comes by email, not a long Slack post (n8n Episode Producer)
- Billy's call: reading a full script in Slack isn't productive, especially with several episodes in a batch.
- Each script is now **emailed to billy@agencyhlpc.com** with the title, topic, length, any editor changes, the source link, the full script, and **Approve / Decline** buttons at the bottom.
- Slack gets one short line: "script emailed for approval".
- Same rules as before: Approve makes the audio and schedules the next open 9:00 AM slot; Decline stops it with nothing spent; no answer in 12 hours goes ahead on weekends and is skipped on weekdays.
- The request form, the Slack "request received" note and the studio page's reply now say the script will be emailed for approval. The studio webhook also accepts the Vercel project address (`smart-coverage-podcast.vercel.app`).

### Fixed — the script writer no longer cuts or hedges facts from our own blog posts (n8n Episode Producer)
- Billy's call: a post from our website has already been fact-checked and approved, so the podcast must not remove, soften or "can't verify" anything in it.
- The writer and the editor now treat every fact, number and date in our post as verified. No more "check the current figure" lines.
- What the editor still fixes: the full brand name, "Billy and his team", the required intro/outro lines, forbidden sales phrases, and Medicare plan, carrier or price mentions (those stay out by our compliance rule).
- Length no longer blocks an episode. The target is 850 to 1,050 words (about 5 to 7 minutes). A long or short script is flagged in the approval email and Billy decides. Before this, a 1,447-word script for the Turning 65 post was rejected as "too long".

### Fixed — the hosted studio page shows only the page (`vercel.json`)
- The Vercel project serves the `studio/site` folder only. Before this it pointed at the whole repository, so the address showed nothing at the top level.

### Built — the Podcast Studio page can submit requests on the page itself (`6db464f`)
- Billy wanted to submit a request and see "received" on the same page, without being sent to another site.
- That isn't possible inside Claude, because Claude pages can't send data to outside systems. So the page now has a hosted version that will live at **studio.thejordaninsuranceagency.com**.
- On that address, **Send to the studio** submits right on the page and shows the result there: request received, or what's wrong.
- New n8n workflow **"Smart Coverage — Studio Page Requests"** (`zmb6a0YAfxYXibfI`) receives those submissions. It answers the page immediately, then hands the request to the Front Door, which now accepts requests from the page as well as from its form.
- The page source and build script are in `studio/`. Run `python3 studio/build.py` to rebuild both the hosted site and the Claude copy.
- Still to do (Billy): add the `studio` DNS record. (The Vercel project exists as `smart-coverage-podcast`; `vercel.json` points it at `studio/site`.)

### Changed — approved emails go straight through, no email click (n8n Front Door)
- Billy's call: a request from an approved agency email should just work. The "click Confirm in your email" step is removed.
- A request from @agencyhlpc.com, @thejordaninsuranceagency.com or @breakpointsystems.com now starts writing right away, and Slack posts "Podcast request received".
- Each episode still needs Billy's Approve in Slack before any audio is made or anything goes live.
- Anything else gets a "request not accepted" note in Slack.
- The studio page wording is updated to match.

### Fixed — every podcast request now reports back in Slack (n8n Front Door)
- Billy's first test request was turned away silently because the blog link landed in the email box, and the form still said "Thanks". His second request worked and was waiting for the Confirm click in the email, but nothing said so.
- #podcast-approvals now gets a message for every outcome:
  - "request received, click Confirm in the email"
  - "request not accepted" (with the reason)
  - "declined or expired"

### Moved — the podcast system now has its own repository
- Everything for the podcast moved out of Cashville-Project into this private repository, with its full history: the playbook, brand files, scripts, artwork, music and episode notes.
- Added: this changelog (the podcast entries from Cashville-Project), project rules for Claude (`CLAUDE.md`), a README, and the Podcast Studio page (`studio/podcast-studio.html`).
- The n8n Episode Producer still downloads its intro and outro music from Cashville-Project (branch `claude/laughing-cannon-hro47m`). Those files stay there until n8n is pointed at this repository.

## 2026-10-12

### Added — only the team can request podcast episodes (`0edf258`)
- The episode request form now asks for a work email. Only addresses ending in **@agencyhlpc.com, @thejordaninsuranceagency.com or @breakpointsystems.com** are accepted, with up to **14 blog links** per request.
- Every accepted request is emailed to **billy@agencyhlpc.com** with Confirm / Decline buttons. Nothing is made until Billy confirms (it waits up to 24 hours). Anyone can type an agency address, so this confirmation is what actually stops outsiders.
- The Podcast Studio page has a matching work-email box. It warns when the address isn't an agency email and fills the email into the form automatically.

### Changed — episodes go live at 9:00 AM, and the studio page is client-ready (`3665fdd`)
- **Release time moved from 6:00 AM to 9:00 AM Eastern**, so the office is open when episodes go live. Changed in the Episode Producer (scheduling), the Daily Release (now runs at 9:05 AM) and the batch form text. All three are live in n8n.
- Batches of 7 to 14 links each take the next open 9:00 AM slot, one per day.
- The daily auto-pick now chooses a post for **tomorrow's** topic, the day it will actually air.
- **Studio page updates:**
  - says "5 to 7 minutes" instead of an exact length
  - the 6:00 AM line, the host names and the internal items ("Billy and his team", licensed and approved) are removed
  - the uneven weekday tiles are replaced with a **monthly publishing calendar** showing each day's topic, today outlined
  - a short "what the studio delivers" section, so it can also be shown to someone interested in the service
- **Signature wording corrected** to "Built with ❤️ by Breakpoint Systems LLC." on the page, in `CLAUDE.md` and in the brand file.

### Built — internal Podcast Studio page (`259c541`)
- A branded page for the agency team, live at https://claude.ai/artifact/HptHHjCiAUL3XhHSKF3uJi. It has:
  - the logo and podcast cover
  - a **"Request an episode"** box: paste blog links and it opens the studio form with them filled in
  - the week's lane lineup, with today highlighted
  - the latest episode
- Uses only the approved brand colors: navy, royal, gold, white and light gray. The first draft's brown and green were removed.
- Ends with "Built with love ❤️ by Breakpoint Systems LLC." That signature, and the approved-colors-only rule, are now written into the project instructions (`CLAUDE.md`) and the brand file, so every future build follows them.

### Changed — one podcast process, old setup workflows retired (`62834dc`)
- Billy clarified that the podcast system was never set up or used before today. The **Episode Factory v2** built today is the only process.
- The playbook (now v1.5), the skill, the brand file and the factory guide now say this at the top. They list what's actually been proven so far: episode 1 (made by hand), the Slack and Transistor tests, and the audio join.
- Older material is labeled **history only**: AI Coverage Coach, the Oct 10 factory, the bench and voice tests, NotebookLM, and "3 a week".
- Archived 4 unused setup workflows in n8n (the Oct 10 factory, the bench test, and two voice tests). Archived workflows can be restored. The July "AI Coverage Coach" workflows were left in place, marked "not part of the process".

### Built — the podcast Episode Factory v2 in n8n (`822fcee`)
- Three new n8n workflows now make the daily podcast. They're built but **not switched on yet**; the first test run comes next.
  - **Front Door:** a form for pasting blog links (for batches), plus a daily 10:15 AM pick of the newest blog post in that day's lane. The daily pick starts Oct 19, after the 3-episode first week.
  - **Episode Producer:** writes the script, runs a compliance editor and checks, skips repeat questions, and asks Billy in Slack. Once approved, it makes the voices and music, schedules the episode on Transistor for the next open day at 6:00 AM, and creates the website page as a hidden draft.
  - **Daily Release:** every morning at 6:05 it puts that day's website page live and posts the link in Slack.
- Episodes that fail the checks, repeat a question, or get declined are logged, so the daily pick doesn't offer them again.
- How it all works, plus the known limits (quieter audio than episode 1, and the approval wait still needs testing), is in `docs/podcast-engine/references/episode-factory.md`. The playbook and skill link to it.

### Decided — daily podcast operating plan added to the playbook (`f69a3a8`)
- New file `docs/podcast-engine/references/operating-plan.md` records everything Billy decided today:
  - **one episode a day** (3 in the first week)
  - Medicare Mon/Wed/Fri, Health Tue/Thu, Home Sat, Auto Sun
  - **Home and Auto as separate lanes**, because they're separate lead sources
  - up to 2 Reddit-question episodes a week
  - a duplicate-question check
  - weekend auto-publish
  - the required website fields
  - the ElevenLabs budget: 200k credits a month, with a warning about the cost once the v4 discount ends
- The playbook (now v1.4) and the skill point to it. The old "3 a week" launch plan is marked superseded.

### Changed — podcast booking button now matches the rest of the website (`a5fd93d`)
- Billy flagged that the podcast pages' booking button didn't match the site's other "schedule a consult" buttons. /podcast and every episode page now use the site's own **"Schedule Your Consultation"** pop-up button, the same component as the home page, so the look and the pop-up are identical.
- Links ending in `#book`, like the one in the show notes, still open that pop-up automatically.
- Removed the separate custom button and calendar script.

### Fixed — clicking an episode card went to "Page not found" (`082fb9f`)
- The card link sent visitors to Webflow's internal template address (`/detail_podcast`), which shows a 404. Each episode now stores its own page address in a new **Episode Page URL** field, and the card links to it.
- Episode 1's date showed October 11 because of time zones. It now shows October 12.
- Added the Apple Podcasts link to episode 1's record.

### Rebuilt — /podcast episode list now matches the AEO Engine layout, with episode numbers (published live) (`2a13c3c`)
- Billy sent screenshots of AEO Engine's podcast page. The old list was one wide, heavy box. It is now a **centered grid of small cards**: 3 across, 2 on tablets, 1 on phones.
- Each card starts with **"EP 1 · date · length"**, the same numbering system AEO Engine uses. Then come the title, a short answer and "Read & listen ›". Newest episodes show first.
- Added "Listen on Apple Podcasts · Spotify · RSS feed" under the grid, kept the booking pop-up button, refreshed the hero text and tightened the gap under the hero.
- Each episode's page now shows the same "EP # · date · length" line under its title.
- I had built the first version without seeing AEO Engine's page, because this environment can't reach it. The redesign follows Billy's screenshots.

### Live — Smart Coverage. Real Advice. is on Apple Podcasts (`53d797e`)
- Apple Podcasts Connect shows the show as **Available**: https://podcasts.apple.com/us/podcast/id1772935091
- Noted that the Apple account itself is still named "AI Coverage Coach". Only Billy sees that name, not listeners, and Apple only changes it through its support team.

### Fixed — Podcast cover: every service name now capitalized (`7532842`)
- The cover tagline read "Medicare, health, life, home & auto". Billy flagged that only Medicare was capitalized. It now reads **"Medicare, Health, Life, Home & Auto — explained in plain English."**
- Re-rendered `docs/podcast-engine/assets/the-jordan-insurance-agency-podcast-cover-3000.jpg` (3000×3000, same design). Billy uploads it in Transistor → Show Settings → Artwork.
- Added this as a brand rule so future covers and thumbnails follow it.

### Set up — Transistor API key works; show ID recorded (`90e6ec1`)
- Billy added the Transistor API key to n8n. A one-click test pulled our show back from Transistor, so the factory can upload episodes on its own.
- Recorded the show ID (84410) in `docs/podcast-engine/references/transistor-show-settings.md`.
- Decision: the editor step that checks scripts will use **OpenAI**, the AI service already connected in n8n, not Claude.

### Set up — Slack approvals for the podcast are working (`cca5274`)
- Billy connected the n8n Podcast Bot to n8n and created **#podcast-approvals** in Slack.
- A one-click test in n8n ("Podcast - Slack Approval Test") posted a message to the channel, and tapping **Approve** in Slack sent the answer back to n8n. This is how each new episode will reach Billy for a yes or no.
- Recorded the channel, bot permissions and test result in `docs/podcast-engine/references/setup-checklist.md`.

### Built — AEO Engine-style episode pages and episode cards; calendar now a pop-up (published live Oct 12) (`246f126`)
Billy flagged that the big Spotify player wouldn't scale to dozens of episodes, and that the booking calendar was embedded on the page, which isn't how the rest of the site works. In Webflow:
- **/podcast:**
  - The big player is replaced by a list of **compact episode cards**: title, length, the one-line answer, and "Listen and read the transcript →". Each card opens that episode's own page.
  - The gold button now **opens the booking calendar as a pop-up**, like the rest of the site, instead of showing it on the page.
  - Show-notes links ending in `#book` open the pop-up automatically.
- **Episode pages** (/podcast/{episode}): built in the site's style with the normal header and footer. Each page has the title, length, a quick-answer box, a compact player for that episode, show notes, a booking box, and the **full transcript** (what Google and AI search read).
- **Episode 1** is the first entry, with its transcript, show notes, Spotify player, search title and description, and a link to the ACA blog post.

Billy approved, and it was published live on Oct 12 (episode 1 page published too). One setting (newest-first ordering of the cards) has to be clicked in the Webflow Designer, because the automation was refused.

### Launched — Episode 1 is live on Spotify; the website now shows the show (published live Oct 12) (`138a30c`)
Billy published episode 1 in Transistor, and it went live on Spotify the same day (show: https://open.spotify.com/show/1xYbNAPNgPHkc2FKOyhhfS).

Website changes, saved in Webflow:
- **/podcast:** "New episodes are coming soon" became "Listen to the latest episodes," with a Spotify player for the whole show placed above the booking button. New episodes appear in that player automatically as they're published.
- **Home page:** the Spotify icon in the podcast card is visible again and now links to the new show (opens in a new tab).

Billy approved, and they were published live on Oct 12. The Spotify link is saved in the brand file and the Transistor settings reference.

### Changed — Show-notes booking link now points to the /podcast page (`736ae11`)
Episode descriptions now send people to https://thejordaninsuranceagency.com/podcast#book, the page with the team calendar embedded, instead of straight to cal.com. That matches what the audio says, keeps visitors on our site, and still lands them on the calendar. Updated in the episode 1 show notes, the playbook's description template, and the brand file. Also caught a leftover "15-minute" in the description Billy pasted into Transistor; it's 30 minutes.

### Added — The new show's RSS feed is recorded (`d485f6c`)
Billy created the show on Transistor and uploaded episode 1 as a draft. Its RSS feed (https://feeds.transistor.fm/smart-coverage-real-advice-the-insurance-podcast-from-the-jordan-insurance-agency) is saved in the brand file and the Transistor settings reference. That's the link that goes into Apple Podcasts Connect, and that the automation will use later.

### Changed — Home page podcast section updated to the new show (published live Oct 12) (`015c1f2`)
The home page section still advertised the old "AI Coverage Coach" show with a Spotify link. In Webflow:
- the heading label changed from "OUR INSURANCE PROCESS" (a mislabel) to "OUR PODCAST";
- the text now introduces *Smart Coverage. Real Advice.*, the insurance podcast from The Jordan Insurance Agency;
- the card title changed to "Smart Coverage. Real Advice.";
- the "Listen Now" button became "Explore the Podcast" and now goes to the /podcast page (episodes plus the booking calendar);
- the old Spotify icon is hidden until the new show is live on Spotify;
- the image description was updated.

The cartoon "ON AIR" image of Billy stays. Billy approved, and it was published live on Oct 12, together with the /podcast calendar and button.

## 2026-10-11

### Built — Booking calendar right on the /podcast page (published live Oct 12) (`232e409`)
Billy's idea. Episodes send listeners to thejordaninsuranceagency.com/podcast, so that page is where they book. It now has:
- the team booking calendar (https://cal.com/team/agency-producer/t-agency) embedded directly under the "coming soon" notice, with the heading "Book a free 30-minute chat with Billy and his team";
- the gold button above it, which now jumps down to that calendar (`#book`) so visitors stay on the website.

If the calendar ever fails to load, a plain "Open the booking calendar" link shows in its place. Correction: the site's existing calendar pop-up code only runs on /faq and /guides pages, not /podcast, which is why the calendar is embedded on this page directly. Saved in Webflow; it goes live only when Billy says "publish."

### Removed — TPMO disclaimer taken out of the podcast standards; Medicare episodes stay general education (`ccb67b7`)
Billy's decision: the show is general education, and the TPMO conversation happens in appointments, not in podcast episodes. The disclaimer and the "get TPMO counts" to-dos were removed from the compliance guide, playbook, script template, setup checklist, episode-page template, and episode backlog. The decision itself is recorded in those files.

What keeps that position safe is now built into the Episode Factory:
- **Script writer:** Medicare content must stay general. No plan or insurance-company names, no plan premiums or copays, no "$0 premium" or "giveback," no specific plan benefits, and no push to enroll.
- **Safety check:** blocks any Medicare script that names a carrier or makes a $0-premium or giveback claim. Tested: episode 1 passes, and a sample "Humana zero premium" line is blocked.

### Built — Episode 1 re-recorded; booking button added to /podcast (published live Oct 12) (`ffbc4d8`)
- **Episode 1** was re-recorded with the new call to action ("thirty-minute chat with Billy and his team") and re-mixed with the same hook, intro, and outro. It's 6:55 at −16 LUFS. The Transistor fields in `docs/podcast-engine/episodes/ep01-aca-special-enrollment-nc.md` are unchanged apart from the 30-minute booking line.
- **/podcast page (Webflow):** added a gold "Book a free 30-minute chat with Billy and his team" button under the "New episodes are coming soon" notice. It uses the home page's existing `rev-cta-btn` style, so the site's code opens the same team calendar pop-up (link: https://cal.com/team/agency-producer/t-agency). It's saved in Webflow and **goes live only when Billy says "publish."**

### Changed — "Billy and his team" is now a permanent rule for every episode (`af4c2a6`)
Billy's decision: the appointment might be with Billy or with someone on his team, so episodes never promise a meeting with Billy alone. The rule is built in at three levels:
- **The script writer** (the Episode Factory's AI prompt) is told to always say "Billy and his team" for any booking or follow-up.
- **The safety check** (the Compliance and Brand Gate) now stops a script before any audio credits are spent if it:
  - leaves out "Billy and his team";
  - says "chat, call, meet, book… with Billy" without "and his team";
  - doesn't say "thirty-minute."

  It was tested against the episode 1 script (passes) and a bad sample line (blocked).
- **The rulebook** now carries the rule: the brand file, the script prompt template, and the episode done-checklist.

### Changed — The podcast chat is 30 minutes, not 15 (`e98bef2`)
Billy corrected the meeting length. Episodes now say "book a free **thirty**-minute chat with Billy and his team," and the written notes say "30-minute." Updated in the Episode Factory's script prompt, the episode 1 bench script, and the podcast docs. We also confirmed that the booking link (https://cal.com/team/agency-producer/t-agency) is the same team calendar the home page uses. The site's existing code already opens it as a pop-up from any button styled `rev-cta-btn`.

### Changed — The podcast's call to action now says "Billy and his team", with a new booking link (`7377c49`)
Billy's decision. Episodes now say: "book a free fifteen-minute chat with **Billy and his team** at thejordaninsuranceagency.com/podcast." That short web address stays in the audio because it's easy to say out loud. Everywhere written (episode show notes, episode pages, and the /podcast page), the booking link is now the team calendar: https://cal.com/team/agency-producer/t-agency. Updated in:
- the Episode Factory's script-writing prompt;
- the episode 1 script in the bench workflow (so episode 1 can be re-recorded in one click);
- the brand file, playbook, episode page template, setup checklist, and episode 1 show notes.

### Built — Episode 1 finished and ready for Transistor (`86db556`)
Episode 1, "Lost Your Health Insurance? The 60-Day Special Enrollment Clock in North Carolina," is mixed and done (6:55). The order is Tanya's hook, then the Rhodes and Rust intro, then the conversation, then the Sign-Off outro. Volume is set to the podcast standard (−16 LUFS). Billy listened all the way through and approved it. Everything needed for the Transistor upload is saved in `docs/podcast-engine/episodes/ep01-aca-special-enrollment-nc.md`: title, summary, show notes with chapter times, and the license and AI-voice lines. The MP3 itself isn't kept in the repo; Billy has the file.

### Fixed — Audio step now makes one piece at a time (bench and Episode Factory) (`2696c19`)
The ACA bench run failed with "aborted". ElevenLabs had made the first piece of audio, but the download was cut off partway through. The cause was the 30-second spacing between requests: finished audio sat on open connections until the server dropped them. Both n8n workflows now have a "One Chunk at a Time" loop. Each piece is sent, fully downloaded, and only then is the next one sent. The 3 automatic retries stay in place. This also prevents the earlier "5 at once" (429) error. Changed in n8n only (bench `uTpTirYLpR0yIPYT`, factory `DWpa5JgtEn5eloux`); no code files changed.

### Changed — Old NotebookLM episodes removed from the /podcast page (published live Oct 11) (`61fb217`)
In Webflow, the grid holding the 4 old Spotify episode cards was removed from the `/podcast` page. In its place is a short notice: "New episodes are coming soon." It uses the brand colors (light gray card with a gold left edge and navy text). Billy approved, and it was published live on Oct 11. The old Spotify show can now be deleted safely.

### Decided — Retire the old Spotify show instead of moving it (`30db317`)
The old "AI Coverage Coach" show on Spotify was never launched, has zero listeners, and its 4 episodes were NotebookLM tests. Nothing needs to be carried over. The plan:
1. Remove its players from the website.
2. Delete it in Spotify.
3. Keep the Spotify login, which is used later to claim the new show.

The decision is recorded in the playbook.

### Changed — ACA launch episode script cleaned up; Slack approval step added to the factory (`a9cc45f`)
- **ACA episode:** removed the old spoken disclaimer ("Quick note: this episode uses AI-generated voices…") and the NPN from Tanya's intro. Billy's outro is now one short line. The script file and the n8n bench workflow are both updated. One re-run of the bench workflow makes the clean launch episode (about 6,100 credits, or free if the v4 offer still applies).
- **Episode Factory:** every script is now posted to the Slack channel **#podcast-approvals** with Approve and Decline buttons. Nothing is sent to ElevenLabs, and no credits are spent, until Billy approves. It waits up to 3 days.
- **Needs Billy:** the Slack connection saved in n8n is no longer working (Slack returns "invalid_auth"). It has to be reconnected before approvals can arrive.
- Both voice workflows now space their ElevenLabs requests 30 seconds apart and retry up to 3 times.

### Changed — Episode Factory now uses the article Billy chooses (`3edd74e`)
The factory was grabbing the first link on the blog page, which turned out to be the critical illness post. It now has an **"Article to Use"** box at the start, set to the ACA Special Enrollment article. To make a different episode, paste a new blog link there.
- The AI writer now gets up to 20,000 characters of the article, up from 9,000, so long guides aren't cut off.
- The script rules now tell the AI to skip "NC Health Choice." That program was folded into NC Medicaid in April 2023, but the ACA article still mentions it.

### Fixed — Episode Factory audio step hit ElevenLabs' "too many requests" limit (`202f790`)
Billy's first run of the Episode Factory wrote a good AI script ("What Does Critical Illness Insurance Cover?", 1,115 words, about 7.6 minutes). The script passed every check, but the audio step failed.
- **Why:** the ElevenLabs plan allows only 5 voice requests running at the same time. This episode had 7 pieces, sent 1 second apart.
- **The fix:** the pieces now go 30 seconds apart, and each one retries up to 3 times.
- The AI-written script is saved in `bench/the-jordan-insurance-agency-factory-run1-critical-illness/` for review.

## 2026-10-10

### Added — Transistor show settings sheet (`0c02ddf`)
Every field Billy needs to create the show in Transistor is now saved in `docs/podcast-engine/references/transistor-show-settings.md`. It includes the show description, which carries the AI-voice note and the Medicare non-affiliation line, so the setup can be repeated, for example for the Breakpoint show. Script approvals will go to Slack.

### Added — "Podcast Episodes" collection on the website (unpublished) (`cfb4be3`)
This copies AEO Engine's approach: one page per episode on our own website, with the full transcript.
- Created a **Podcast Episodes** CMS collection in Webflow, set up the same way as the blog. Each episode will live at `thejordaninsuranceagency.com/podcast/episode-name`.
- **Fields:** episode number, date, length, a quick answer, show notes, full transcript, player and app links, YouTube, thumbnail, SEO title and description, topic lane, and a link to the related blog post.
- Nothing is published. Next: design the episode page and connect n8n so each approved episode fills in automatically.
- At launch, the 4 old Spotify players come off `/podcast` and the old Spotify show is redirected.

### Added — "Episode Factory" n8n workflow, copied from AI Coverage Coach (`42eda5a`)
Billy asked to copy the existing podcast automation and repurpose it. The new n8n workflow is **"Smart Coverage. Real Advice. — Episode Factory (ElevenLabs + Transistor)"** (id `DWpa5JgtEn5eloux`). The original is untouched.
- It takes the latest blog post and has an AI write a 7–8 minute Tanya + Billy script, using the new short intro and outro.
- It runs the compliance and brand-name checks, then voices the script with Eleven v4. Tanya's hook is made separately so the intro music can go right after it.
- The finished MP3 is saved to Google Drive.
- Still to add: Billy's approval step, the music, the Transistor upload, the episode page, and a weekly schedule.
- The playbook now explains what Transistor's "video publishing" is and why the Professional plan may be worth it: YouTube blocks public uploads from unaudited apps until Google audits them.

### Changed — Shorter on-air disclaimers (`ee582b7`)
At Billy's request, the long spoken disclaimers are gone from the episode template:
- **Removed from the intro:** the "Quick note: this episode uses AI-generated voices…" line and the National Producer Number.
- **The intro is now two sentences.** Tanya introduces herself as "your AI host," which is the on-air AI disclosure and is always required.
- **The outro is one short line:** "Quick reminder: this is general education, not advice for your situation." Then Billy signs off.
- **The written AI-voice note and the NPN move to the episode description and page.** YouTube uploads tick the "altered or synthetic content" box.
- Updated in the brand file, script prompt, compliance rules, skill checklist, and playbook. About 15 seconds and ~250 credits saved per episode.

### Added — Podcast theme music: "Rhodes and Rust" intro and sign-off (`3d2e5bb`)
Billy made the intro and outro in ElevenLabs Music. They're now named and stored as cleaned-up masters in `docs/podcast-engine/assets/audio/`:
- **Intro: "Rhodes and Rust"** (11.6 seconds).
- **Outro: "Rhodes and Rust (Sign-Off)"**, trimmed to 12 seconds with a fade. The full ~29-second version is kept for the YouTube end screen.
- Both are leveled slightly under the voices and saved at the same audio settings as the episodes, so n8n can join them cleanly.
- The original outro download used the agency's initials in its name. It was renamed to follow the brand rule.
- A start-to-finish preview (intro → Billy's test conversation → outro) was built and sent to Billy to listen to.

### Changed — Co-host is now "Tanya", plus a 2-minute sample to judge her (`c792b77`)
Billy picked the **Tawny** voice over Claire, then renamed her on air to **Tanya**. The ElevenLabs voice stays the same (`Rv3wiuHHQq0rSS4QVaQ8`); only the name she uses on the show changed. Rachel is retired from the new workflows.
- The 7-minute bench script and the n8n bench workflow now use Tanya.
- New n8n workflow **"Podcast Co-Host Sample — Tanya, 2 min (Eleven v4)"** makes a ~2-minute clip (the episode opening plus the wrap-up) where Tanya carries most of the lines. It costs about 2,000 credits and saves `the-jordan-insurance-agency-cohost-sample-tanya-2min.mp3` to Google Drive.
- The playbook, skill, setup checklist, scorecard, and brand file now say Tanya instead of Rachel.

### Added — Co-host voice comparison: Tawny vs Claire (`5f2313a`)
Billy narrowed the co-host to two ElevenLabs library voices, **Tawny** and **Claire**. Both are conversational, American, and guaranteed for at least 2 years. A new n8n workflow, "Podcast Co-Host Voice Test — Tawny vs Claire (Eleven v4)," makes the same 90-second opening of the ACA episode with each voice as host and Billy's voice as guest, then saves both MP3s to Google Drive (about 2,300 credits). Starting it remotely got stuck before the first step, so Billy runs it with one click inside n8n.

### Added — n8n bench test workflow, ready to run (`2206e92`)
Created a separate n8n workflow, **"Podcast Bench Test — ACA Special Enrollment (Eleven v4)."** It loads the approved 7-minute ACA script and runs the brand-name check before any credits are spent. It then sends the script to ElevenLabs Eleven v4 (host + Billy's Clone 2.0 voice) in sections, joins them into one MP3, and saves that file to The Jordan Insurance Agency's Google Drive. It has not been run yet, because Billy is choosing a replacement for the stock "Rachel" co-host voice first. The original "AI Coverage Coach" workflow was not changed.

### Fixed — Billy's voice is an Instant clone, so no v4 training is needed (`b88a264`)
ElevenLabs' My Voices list labels "Billy Jordan Clone Voice 2.0" as an **Instant Voice Clone**, not the Professional clone recorded earlier. Instant clones work with any model, v4 included, without separate training. The fine-tuning step now applies only if the show later moves to a Professional clone. The next check is to generate a sentence with v4 on ElevenLabs' Text to Speech page, because the small preview player may not list v4.

### Added — Fine-tune Billy's voice for Eleven v4 (`31f88bf`)
Billy upgraded ElevenLabs to Creator, but v4 still didn't appear for his voice. The reason: a Professional voice clone has to be trained separately for each model. The setup checklist now covers it: in My Voices, hover over "Billy Jordan Clone Voice 2.0," click the + next to Eleven v4, and wait 6–24 hours. ElevenLabs says v4 support for Professional clones is still rolling out.

### Added — 7-minute test script; ElevenLabs upgrade needed (`313e9be`)
- **Standard-length test script:** a 7-minute cut of the ACA Special Enrollment episode (1,077 words, about 6,350 credits). It keeps the article's facts, adds nothing new, and passes the brand-name check.
- **Why the upgrade:** Billy's Professional voice clone ("Billy Jordan Clone Voice 2.0") cannot use the v4 model on the Starter plan, because the model menu is grayed out. Upgrading to Creator ($22/month, monthly for now) unlocks it. Creator was already planned before launch, and the v4 discount runs through Oct 12.
- **Workflow fix noted:** the existing n8n compliance check rejects scripts under 1,200 words, so it would block every 7–8 minute episode. Its word range has to be lowered.

### Changed — Episode length set by ElevenLabs credit cost (`8a43494`)
ElevenLabs charges about 1 credit per character, and the bench script measured about 890 characters per minute of audio, so a 10-minute episode costs about 9,000 credits. Standard episodes are now **7–8 minutes (~6,500 credits)**, plus **~4-minute "quick answer" episodes (~3,500 credits)** built from FAQ pages. A month at 3 episodes a week is about 70,000 credits. Billy's ElevenLabs account is on Starter (30,000 credits a month) with 90,000 unused credits. The plan: run the test on the existing balance, then upgrade to Creator ($22 a month, 121,000 credits, Professional voice cloning) before launch. The script prompt and skill now target the shorter lengths.

### Added — ElevenLabs voice locked in and account setup steps (`8fbbf2b`)
The podcast voice is now on record: Billy's ElevenLabs voice "Billy Jordan Clone Voice 2.0" read by the new Eleven v4 model, the same combination as the demo Billy liked. The setup checklist adds a one-time ElevenLabs organization step to finish before the first real episode: choose a plan with enough credits for about 13 episodes a month, keep one official voice, pick a co-host voice, create a dedicated API key with a monthly spending cap, build a pronunciation list, and keep consent on file.

### Added — Podcast bench test and switch to Transistor Starter (`b9029fe`)
- **Bench test:** Billy's ACA Special Enrollment article (published Oct 6) is the test case. Claude pulled the article from the website's CMS and wrote our version of the episode: Rachel hosts, Billy is the guest, and the format is ready to paste into ElevenLabs. It passes the brand-name check and every rule in the existing n8n compliance check, says "The Jordan Insurance Agency" in full five times, and runs about 10.5 minutes. A scorecard compares it against Billy's NotebookLM version of the same article.
- **Plan change (Billy's call):** Transistor **Starter at $19/month** instead of Professional. YouTube posting and intro music will be built into n8n instead of paid for, saving about $360 a year. This only works if Starter includes API access, which must be confirmed during the free trial. Videos uploaded through a new, unaudited YouTube API project stay Private until Google audits it, so Billy may need to switch each one to Public by hand at first.
- **Blog accuracy flag:** the article still mentions "NC Health Choice," which was folded into NC Medicaid in 2023.

### Changed — Podcast plan updated: existing n8n workflow, Transistor plan, intro music, avatar cover (`14ed721`)
- **Found an existing n8n workflow**, "AI Coverage Coach — Blog to Podcast (Host + Guest)." It already turns a blog post into a two-voice episode, with Rachel as host and Billy in his own ElevenLabs voice, and includes a compliance check. It has never run, because the ElevenLabs connection and Billy's voice ID were never added. The playbook now builds on it instead of starting over.
- **Transistor recommendation:** the Professional plan ($49/month). The extra $30 over Starter buys automatic YouTube posting and automatic intro/outro insertion. The playbook explains how Transistor feeds every podcast app and the website player, and why Spotify for Creators alone can't be automated.
- **How the partner makes its show:** a cloned founder voice plus AI co-hosts, sold as part of $5,000–$10,000/month plans. NotebookLM has never allowed choosing voices.
- **Intro music plan:** one jingle made in ElevenLabs Music, added to every episode by the existing workflow.
- **Avatar cover concept:** the show cover now has a version with Billy's Pixar-style avatar, so it matches the website and episode thumbnails. It is waiting on the original high-resolution avatar file.

### Added — Podcast setup checklist and how-the-voices-work guide (`96e9a8f`)
Answers "what else do we need to set this up?" A new setup checklist inside the podcast skill lists every account, recording, compliance item, and decision needed before episode 1, and who has to do each one. The playbook now explains that NotebookLM and ElevenLabs are two separate tools: NotebookLM can't use Billy's voice, so a show that sounds like Billy is written by Claude, approved by Billy, and voiced by ElevenLabs. Also added a ready-to-paste NotebookLM prompt for a test episode, plus a rule that any NotebookLM audio must be transcribed and pass the brand-name check before it's published.

### Fixed — Brand name corrected everywhere; playbook moved inside the podcast skill (`c3aa8bb`)
The first version of the podcast playbook dropped "The" from the agency's name and used initials in text and file names. That broke the brand guidelines. Every instance is now **The Jordan Insurance Agency**, and every file name that used initials was renamed with the full slug `the-jordan-insurance-agency`.

To stop it from happening again:
- **The playbook now lives inside the `podcast-engine` skill** (`docs/podcast-engine/`) alongside its prompts, brand settings, artwork, and episode plan, so it is loaded every time the skill runs.
- **Step 0 of the skill is a brand lock:** it invokes The Jordan Insurance Agency brand-image skill and reads its name rules before writing anything, and it stops if that skill can't be loaded.
- **New brand-name gate (`scripts/check-brand-name.sh`)** scans scripts, titles, descriptions, page copy, and file names for any shortened or abbreviated form of the name. It runs before Billy's approval and again before publishing, and a failure blocks the episode. Tested: it blocks a sample script with the wrong name and a wrongly named audio file, and passes on all current podcast files.

### Added — Podcast Engine playbook, draft skill, and show artwork (`164c004`, `17610ff`)
A complete plan to launch a podcast for The Jordan Insurance Agency, modeled on our AEO partner's show, then copy it for Breakpoint Systems. This is planning material for the insurance agency and Breakpoint. It does **not** change the Cashville app; it is stored here only because this was the working branch, and it should move to a repo for The Jordan Insurance Agency or Breakpoint Systems.

- **Playbook:** teardown of the partner's podcast (daily 7–13 minute AI-voiced episodes, a transcript page per episode); recommended tools (ElevenLabs with Billy's cloned voice, Transistor hosting for both shows, n8n automation, roughly $75–90/month); Medicare/CMS and AI-voice compliance rules; a launch plan timed to Medicare open enrollment (Oct 15); and the Breakpoint version.
- **Show name:** "Smart Coverage. Real Advice." This already matches the website's podcast page headline. Per Billy, there is no city in the name, because the agency has offices in both Charlotte and Nashville.
- **Artwork:** 3000×3000 show cover, 1280×1280 YouTube playlist square, and a 1280×720 episode thumbnail template, made from the real logo and brand colors.
- **Episode backlog:** the first 20 episodes, each built from a page already on the website. It also flags that the site has no Tennessee or Nashville content.
- **Draft skill:** step-by-step `podcast-engine` instructions with the script prompt, compliance checklist, Transistor publishing calls, episode-page template with schema, and brand settings for both businesses.

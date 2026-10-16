# Breakpoint Systems podcast: the production system

Built Oct 16, 2026. A separate copy of the insurance podcast machine, for Breakpoint Systems.
**The insurance workflows, tables and shows are not touched.** Breakpoint has its own workflows, its own ledger,
and (once Billy creates it) its own Transistor show.

## Status (Oct 16)

| Piece | Status |
|---|---|
| n8n table **Breakpoint Podcast Ledger** (`fII8YCB84TQBpd5X`) | **Created in n8n** |
| Episode Producer workflow | **Built and tested offline, not in n8n yet.** File: `n8n/breakpoint-podcast-episode-producer.json` |
| Front Door (request form) workflow | **Built, not in n8n yet.** File: `n8n/breakpoint-podcast-front-door.json` |
| Transistor show | **Not created.** Only Billy can create a show (Transistor's API can't) |
| Website episode pages | **Not started.** The Breakpoint Webflow site has no Podcast collection or /podcast page |
| Apple and Spotify | After the first episode is published |

Why the workflows aren't in n8n yet: this session's safety filter blocked further changes to the n8n server once
the ledger was created, because the same server runs the live insurance shows. Billy can either approve Claude
installing them, or import the two files himself (n8n: **Workflows → Import from file**).

## How it works

1. **Front Door** (form at `/form/breakpoint-podcast-request`): an approved email plus the team passcode, then either
   links (up to 7) or a written **topic brief**, or both. Breakpoint has no real blog yet (the six posts on the
   website are archived template filler), so the brief is the main source for now.
2. **Producer**, one episode at a time:
   - Reads the link, or takes the brief.
   - The writer drafts a two-person script: the co-host plus Billy, 5 to 7 minutes.
   - The editor fixes made-up claims and wording.
   - The **Script Gate** checks the script.
   - The full script is emailed to Billy with Approve and Decline buttons.
   - After approval: ElevenLabs voices, upload to the Breakpoint Transistor show, schedule it, log it in the ledger, then Slack and email.
3. Nothing costs voice credits until Billy approves. If no Transistor show is set, it stops before voices.

## The Script Gate (Breakpoint's own rules; no insurance rules)

- Every line starts with the co-host's name or "Billy:". A speaker name in the middle of a line is blocked, because it would be read aloud.
- The call to action must contain `breakpointsystems.com`.
- "Break Point" (with a space) and initials are blocked.
- Hype the writer added is blocked: "guaranteed results/ROI/…", "risk-free", "set it and forget it", "will double", "number one".
- A percentage or dollar figure is blocked when the source has none, so the AI can't invent statistics.
- Length: under 500 or over 2,000 words is blocked; anything else is just flagged in the approval email.

## Settings Billy can change (one place: the **Show Settings** node at the start of the Producer)

| Setting | Now | Needs Billy? |
|---|---|---|
| `show_name` | Work ON Your Business (draft) | Confirm |
| `cohost_name` / `cohost_voice` | Tanya, same voice as the insurance shows | Confirm, or pick a different voice |
| `transistor_show_id` | blank | **Required**: paste after creating the show |
| `release_days` / `release_time` | Tue, 9:00 AM ET (weekly) | Confirm |
| `cta_line` | "…book an automation audit with Billy and his team at breakpointsystems.com." | Confirm wording |
| `spoken_ai_line` | blank (AI disclosure in show notes only, same as the insurance shows) | Decide |
| `use_music` | no (the insurance show's music is not reused) | Optional |
| `webflow_collection_id` | blank (no website pages yet) | Later |
| `slack_channel` | same channel as the insurance podcast; messages start with [Breakpoint] | Optional |

The Front Door's team passcode is typed by Billy into its **Check Requester** node. Blank means nothing is accepted.

## Install steps (whoever does it)

1. Import `breakpoint-podcast-episode-producer.json`. Check that the credentials are connected: OpenAI, ElevenLabs, Transistor, GitHub, Gmail, Slack, Webflow. They're referenced by ID only, and no keys are stored in the files.
2. Import `breakpoint-podcast-front-door.json`. In **Make Episode (one at a time)**, pick the Breakpoint Producer (replace `PASTE_BREAKPOINT_PRODUCER_ID`).
3. Billy types the team passcode into **Check Requester**.
4. Billy creates the Transistor show, then pastes its ID into `transistor_show_id`.
5. Publish (activate) the Front Door. The Producer runs when the Front Door calls it.
6. Test with one short brief. Approve it, then listen to the emailed MP3 before it airs.

## Transistor show: fields to copy (Billy, Dashboard → Add a new podcast)

All of these are drafts until Billy confirms the name and description.

- **Title:** Work ON Your Business
- **Author:** Billy Jordan | Breakpoint Systems · **Owner:** Breakpoint Systems LLC · **Language:** English · **Explicit:** No
- **Categories:** Business > Entrepreneurship; Technology
- **Website:** https://www.breakpointsystems.com
- **Description:** Work ON Your Business is the podcast from Breakpoint Systems for owners and founders of service businesses. Billy Jordan, founder of Breakpoint Systems, and AI co-host Tanya talk through the automation and AI tools that take day-to-day work off the owner's plate, in plain English: lead follow-up, AI receptionists, CRMs and workflows. The tools usually already exist; the difference is setting them up the right way. Voices are AI-generated from scripts reviewed and approved by Billy Jordan.
- **Artwork:** still needed (3000 x 3000). Needs the Breakpoint logo and colors.

Then send Claude the show ID, or paste it into `transistor_show_id`.

## Files

- `n8n/*.json`: the two importable workflows.
- `n8n/src/`: the Breakpoint code and prompts inside them, readable on their own.
- The Producer was built from a read-only copy of the insurance Producer (`JSKBgEYlncxIZMz0`). The insurance one was never edited.

Built with ❤️ by Breakpoint Systems LLC.

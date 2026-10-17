# Claude Code — Project Instructions: the Breakpoint Systems podcast

The podcast from Breakpoint Systems LLC. Owner: Billy Jordan (non-technical; explain things in plain English, bullets,
honest, tied to return on investment).

## What Breakpoint is
Automation and AI systems for business owners and founders, so they can work ON the business instead of IN it.
The tools usually already exist; most businesses set them up poorly or not at all. Breakpoint puts them to work.

## Changelog discipline — REQUIRED at the end of every build session
Before finishing any session in which you committed anything, add a dated, plain-English entry to `CHANGELOG.md`
(newest date at the TOP) saying what was built, changed or removed, with commit hashes.

## Signature — REQUIRED on everything we build
Every page, artifact, document, email template or tool ends with: **Built with ❤️ by Breakpoint Systems LLC.**

## Rules
- Never paste or store API keys or tokens. Billy adds credentials in n8n himself; reference them by ID only.
- Verify every change live (read it back from Transistor, n8n and the live site), not just that a save succeeded.
- Temporary n8n workflows used for one-off API calls get archived after use.
- **The insurance podcast (The Jordan Insurance Agency, repo `AutomateTJIA/smart-coverage-podcast`) is live.** Never edit
  its workflows, tables or shows from here. Shared code is proposed to Billy first, never done silently.
- The insurance compliance rules (Medicare, disclaimers, carrier names, "Billy and his team" wording rules) do NOT apply
  here, and the insurance agency's name and navy/royal/gold colors are not used for Breakpoint.
- The topic radar belongs to the insurance session: workflow `5dLRAmqNY6nHcpg5`, table `topic_radar`
  (`sEGyxPc8FQCmMicb`, rows with business = 'bps'). Read it; never change its columns without telling that session.
- Only topics Billy approved are ever used. Every script is emailed to Billy for approval before any voices are made.
- ElevenLabs is one account shared with the insurance shows. Budget voice characters across both.

## Open decisions (Billy) — keep this list current
- Show name (draft: "Work ON Your Business"), interviewer voice and name, intro/outro music, logo and colors for cover art,
  brand spelling (Billy's own guide and website use "BreakPoint Systems"; the signature line says "Breakpoint Systems LLC"), release cadence (draft: weekly, Tuesday 9:00 AM ET).
- Episode 1: a "Start Here" episode from the 19-page blueprint ebook (up to 10 minutes; teaches the core idea and
  sends listeners to the ebook rather than giving all of it away). Source received Oct 17; draft brief in `episodes/001-start-here/brief.md`.

## Where things live
- `n8n/`: the importable Producer and Front Door workflows, with their code and prompts in `n8n/src/`; setup steps in `n8n/SETUP.md`.
- `brand-draft.md`: the first brand notes. `PLAYBOOK.md`: the show strategy.

Built with ❤️ by Breakpoint Systems LLC.

---
name: podcast-engine
description: Turn an existing website page (blog post, FAQ, guide) into a published, branded, AI-voiced podcast episode for The Jordan Insurance Agency ("Smart Coverage. Real Advice.") or Breakpoint Systems. Covers the script, brand-name gate, compliance gate, audio, thumbnail, transcript page, Transistor publishing, YouTube, and repurposed clips. Use when Billy says "make an episode," "turn this blog into a podcast," "publish this week's episodes," "podcast this page," or gives a page URL with "podcast."
---

# Podcast Engine

Draft v0.2 (Oct 10, 2026).

## What's in this skill

| File | Use |
|---|---|
| `PLAYBOOK.md` | The full strategy: partner teardown, show name, stack, episode formula, website, compliance, launch plan, KPIs, Breakpoint version. **Read it before the first episode of a session.** |
| `references/setup-checklist.md` | Accounts, voice clone, compliance items, and decisions needed before episode 1 |
| `references/brand-name-rules.md` | The binding name rule and the forbidden variants |
| `scripts/check-brand-name.sh` | Brand-name gate. Fails on any forbidden variant in text or file names |
| `references/script-prompt.md` | Two-voice script prompt + description template |
| `references/compliance.md` | Medicare/CMS, NC, TN, and AI-voice checks |
| `references/episode-backlog-the-jordan-insurance-agency.md` | First 20 episodes mapped to existing site pages |
| `references/transistor-api.md` | Upload → create → publish calls |
| `references/episode-page-template.md` | Episode page layout + JSON-LD |
| `references/notebooklm-prompts.md` | Drafts, tests, Breakpoint only |
| `brands/the-jordan-insurance-agency.md`, `brands/breakpoint.md` | Show name, voices, CTA, compliance level, art |
| `assets/` | Show cover, YouTube playlist square, episode thumbnail template, editable HTML sources |

## Inputs

- `brand`: `the-jordan-insurance-agency` or `breakpoint` → load `brands/<brand>.md`.
- `source`: one page URL (or several on the same question).
- Optional: `state` (`NC` / `TN`) for state-specific insurance episodes, `publish_at`.

## Step 0 — Brand lock (mandatory, every session, before writing anything)

For `brand: the-jordan-insurance-agency`:

1. **Invoke the `the-jordan-insurance-agency-brand-image` skill** and read Section 1 (Brand Name
   Rules) of its `reference/brand-guidelines.md`. It is the binding source for the name, colors,
   and imagery.
2. Read `references/brand-name-rules.md`.
3. The name is **The Jordan Insurance Agency**, every time, in every output: spoken script,
   titles, descriptions, transcripts, pages, schema, posts, prompts, **file names, slugs, and
   config keys** (slug form: `the-jordan-insurance-agency`). No shortening, no initials, no
   lowercase "the."

If the brand-image skill can't be loaded, stop and tell Billy. Don't continue from memory.

## Hard rules

1. Brand lock above. `scripts/check-brand-name.sh` must PASS before the approval gate and again before publishing.
2. No city in the show name. For The Jordan Insurance Agency, the intro names both offices: Charlotte, NC and Nashville, TN.
3. Every Medicare or health episode for The Jordan Insurance Agency stops at the approval gate (step 5). Never auto-publish one.
4. Every episode ships with all of these, or it isn't done: YouTube upload, episode page with full transcript, AI-voice disclosure.
5. Don't invent facts. Script only from the source page and the official sources it cites. When a figure has a year, confirm it's the current year's.

## Steps

1. **Brief.** Read the source page. Extract the core question, 3–5 sub-questions people actually ask, the direct answer to each (2–3 sentences), state-specific differences, and the matching product page + booking CTA. Pick the lane from the brand file.
2. **Title + compliance class.** Title ≤ 60 characters, question or keyword first, no show name, no episode number. Classify **EDU** or **REVIEW** with `references/compliance.md`.
3. **Script.** Use `references/script-prompt.md` with the brand file's values. Two speakers, 10–14 minutes (~1,500–2,000 words). Also output the description, chapter estimates, 3–5 clip candidates, and a pull quote.
4. **Brand-name gate.** Save the script, title, and description to the episode folder (slug-named, e.g. `the-jordan-insurance-agency-ep-012/`) and run `scripts/check-brand-name.sh <episode folder>`. Fix every hit and re-run until PASS.
5. **Approval gate.** Send the script, title, description, and compliance class to Billy (n8n "wait for approval" → Slack/email). Breakpoint episodes may skip; Medicare/health episodes for The Jordan Insurance Agency never skip. Apply edits, then repeat step 4.
6. **Audio.** Use the existing n8n workflow's ElevenLabs Text to Dialogue step (`POST /v1/text-to-dialogue`, model `eleven_v3`): Rachel (host) and Billy's voice ID (guest), the approved script split into chunks, then stitched with the intro/outro jingle in front and behind. (ElevenLabs Studio Podcast API is the alternative.) Apply the pronunciation dictionary from the brand file. Wait for the webhook and download the MP3. Fallback: Gemini multi-speaker TTS. If NotebookLM was used instead, transcribe its audio and run `scripts/check-brand-name.sh` on the transcript; regenerate on failure. Listen to the first 30 seconds: the brand name must be spoken in full.
7. **Thumbnail.** Copy the brand's episode-thumbnail HTML from `assets/src/`, set the lane chip, episode number, and a 4–6 word hook taken from the title. Render 1280×720 with Playwright, plus 1200×630 for the episode page. Name files with the brand slug.
8. **Publish to Transistor.** `references/transistor-api.md`: authorize upload → PUT MP3 → create draft (title, summary, description, transcript = approved script) → publish or schedule. YouTube auto-post is on at the show level.
9. **Episode page.** Build `/podcast/{slug}` from `references/episode-page-template.md`. Add "Listen to this as a podcast" to the source page.
10. **Repurpose.** Clip candidates (captions burned in) → Shorts/Reels/TikTok via Blotato; Google Business Profile post; 2 LinkedIn posts; newsletter blurb. Links go to the episode page.
11. **Final gate + log.** Run `scripts/check-brand-name.sh` on everything produced (episode folder, page copy, post copy). Then log: date, number, title, lane, compliance class, approver, source URL, Transistor ID, YouTube URL, episode-page URL. Tell Billy in plain English what shipped and what needs him.

## Done checklist

- [ ] Step 0 done: brand-image skill invoked, name rules read
- [ ] `check-brand-name.sh` PASS (before approval and before publish)
- [ ] Title ≤ 60 characters, question/keyword first
- [ ] Brand name spoken in full in the intro and CTA
- [ ] AI-voice disclosure spoken and written
- [ ] Compliance class and approver recorded
- [ ] Transistor episode published or scheduled, with transcript and ≥ 3 timestamps
- [ ] YouTube upload live in the podcast playlist
- [ ] Episode page live with transcript and JSON-LD; source page links to it
- [ ] Clips scheduled; log updated

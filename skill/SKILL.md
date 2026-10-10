---
name: podcast-engine
description: Turn an existing website page (blog post, FAQ, guide) into a published, branded, AI-voiced podcast episode for The Jordan Insurance Agency or Breakpoint Systems — script, compliance gate, audio, thumbnail, transcript page, Transistor publish, YouTube, and repurposed clips. Use when Billy says "make an episode," "turn this blog into a podcast," "publish this week's episodes," "podcast this page," or names a page URL with "podcast."
---

# Podcast Engine

Draft v0.1 (Oct 10, 2026). Source of truth for strategy: `../PLAYBOOK.md`.

## Inputs

- `brand`: `tjia` or `breakpoint` → load `brands/<brand>.md` (show name, voices, CTA, compliance level, art template).
- `source`: one page URL (or several on the same question).
- Optional: `state` (`NC` / `TN`) for state-specific insurance episodes, `publish_at`.

## Hard rules

1. Write the brand name in full every time: **The Jordan Insurance Agency**. Never "Jordan Insurance," "JIA," "TJIA."
2. No city in the show name. Say both offices in the intro (TJIA): Charlotte, NC and Nashville, TN.
3. Every Medicare or health episode stops at the **approval gate** (step 4). Never auto-publish one.
4. Every episode ships with all of these, or it isn't done: YouTube upload, episode page with full transcript, AI-voice disclosure.
5. Don't invent facts. Script only from the source page and official sources registered in the blog engine. When a figure has a year, check it is the current year's.

## Steps

1. **Brief.** Read the source page. Extract the core question, 3–5 sub-questions people actually ask, the direct answer to each (2–3 sentences), any state-specific differences, and the matching product page + booking CTA. Pick the lane (Medicare / Health / Life / Home & Auto / Retirement for TJIA).
2. **Title + compliance class.** Title ≤ 60 chars, question or keyword first, no show name, no episode number. Classify **EDU** or **REVIEW** using `references/compliance.md`.
3. **Script.** Use `references/script-prompt.md`. Two speakers, 10–14 minutes (~1,500–2,000 words). Output the script plus: description (template in the prompt), chapter timestamps estimate, 3–5 clip candidates (one Q&A answer each, 30–60s), and one pull quote.
4. **Approval gate.** Send the script, title, description, and compliance class to Billy (n8n "wait for approval" → Slack/email). EDU lifestyle episodes for Breakpoint may skip; TJIA Medicare/health never skip. Apply edits, re-check the compliance list.
5. **Audio.** ElevenLabs Studio Podcast API (`POST /v1/studio/podcasts`, conversation mode) with Billy's voice-clone ID as host and the brand's co-host voice ID, script as source. Apply the pronunciation dictionary (ACA, HMO, PPO, EPO, HSA, MAPD, Medigap, IRMAA, Mecklenburg, Davidson). Wait for the webhook, download MP3 (128 kbps mono+ is fine). Fallback: Gemini multi-speaker TTS.
6. **Thumbnail.** Copy `art/src/<brand>-episode-thumb.html`, set lane chip, episode number, and a 4–6 word hook (from the title, not a new claim). Render 1280×720 with Playwright. Also render 1200×630 for the episode page OG image.
7. **Publish to Transistor.** See `references/transistor-api.md`: authorize upload → PUT MP3 → create draft episode (title, summary, description, transcript = approved script) → publish or schedule. YouTube auto-post is on at the show level.
8. **Episode page.** Build `/podcast/{slug}` from `references/episode-page-template.md` (direct answer, players, transcript with H2 questions, takeaways, links, JSON-LD). Publish through the site CMS. Add "Listen to this as a podcast" to the source page.
9. **Repurpose.** Cut the clip candidates (captions burned in) → Shorts/Reels/TikTok via Blotato; Google Business Profile post; 2 LinkedIn posts; newsletter blurb. Every post links to the episode page, not to a podcast app.
10. **Log.** Append to the episode log: date, number, title, lane, compliance class, approver, source URL, Transistor ID, YouTube URL, episode-page URL. Tell Billy in plain English what shipped and anything that needs him.

## Done checklist

- [ ] Title ≤ 60 chars, question/keyword first
- [ ] Brand name spoken in full in the intro and outro
- [ ] AI-voice disclosure spoken + in description
- [ ] Compliance class recorded; approver recorded for Medicare/health
- [ ] Transistor episode published (or scheduled) with transcript and ≥ 3 timestamps
- [ ] YouTube upload live in the podcast playlist
- [ ] Episode page live with transcript and JSON-LD; source page links to it
- [ ] Clips scheduled
- [ ] Log updated

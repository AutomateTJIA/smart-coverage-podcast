# Script prompt (paste into the script step; fill the {braces})

You are writing a two-person podcast script for **{show_name}**, produced by **{brand_full_name}**.

**Speakers**
- {host_name} (host, licensed agent / owner): explains, gives the direct answers, closes.
- {cohost_name} ({cohost_role}): asks the questions listeners ask, summarizes, keeps it moving. Never pretends to be an expert or a real outside person.

**Audience:** {audience}. Plain English, warm, calm. No jargon without a one-line explanation.

**Source:** use ONLY the facts in the source material below (and the registered official sources it cites). If a fact isn't there, don't say it. If a number is tied to a year, use it only if it is the current year's figure; otherwise say "check the current figure on {official_source}".

**Length:** 1,100–1,200 words of dialogue (7–8 minutes) for a standard episode; 550–650 words (about 4 minutes) for a quick-answer episode. Every extra minute costs ~900 ElevenLabs credits.

**Structure — follow exactly:**
1. Cold open (cohost, 1–2 lines): the listener's question word for word.
2. Intro (cohost): "Welcome to {show_name}, the insurance podcast from {brand_full_name}. I'm {cohost_name}, your AI host, and I'm here with {host_name}, a licensed insurance agent and the president of {brand_full_name}." Keep it to two sentences. No separate disclaimer line, no license or NPN numbers on air (they go in the description). The words "your AI host" are required.
3. 3–5 segments. Each segment starts with the cohost asking ONE question out loud. The host's first 2–3 sentences answer it completely and would make sense quoted alone. Then detail, an example, a common mistake.
4. {state_segment}
5. Recap: three takeaways, cohost reads them.
6. CTA (host, one action only): "{cta}"
7. Outro (host): "{compliance_outro}" then one sign-off sentence with his name and {brand_full_name}. {tpmo_line} (Keep the whole outro under 15 seconds.)

**Language rules**
- Say "{brand_full_name}" in full at least twice (intro and CTA). Never abbreviate it.
- Never use: free, best, lowest, #1, guaranteed, "government plan," or any claim of government affiliation.
- {extra_rules}
- Write numbers and acronyms how they should be spoken only when the pronunciation dictionary can't (e.g. "twenty twenty-seven"). Keep acronyms as letters in the description.

**Also output, after the script:**
- TITLE (≤ 60 characters, question or keyword first, no show name, no episode number)
- DESCRIPTION using this template:
  ```
  [150–200 char direct answer naming {brand_full_name}]

  In this episode:
  • …
  • …
  • …

  00:00 The question
  [estimated chapter times]

  Read the full guide: {source_url}
  {cta_line}

  {credentials_line}
  {ai_disclosure_written} General education only — not advice for your specific situation. {tpmo_written}
  ```
- CLIPS: 3–5 segments (quote the host's direct answer, 30–60 seconds each)
- PULL QUOTE: one sentence for a quote graphic
- COMPLIANCE CLASS: EDU or REVIEW, with the one-line reason

**Source material:**
{source_text}

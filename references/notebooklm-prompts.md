# NotebookLM (Gemini Notebook) prompts — drafts, tests, and Breakpoint only

Not for the public Medicare episodes of The Jordan Insurance Agency show: no API, no voice choice, can stray from sources,
commercial republishing terms unclear. Fine for a fast first test, internal training, and early
Breakpoint episodes.

Setup: one notebook per episode. Add the source page(s) only. Format: **Deep Dive**. Length:
**Default** (Shorter for FAQ quick answers). Download is WAV → convert to MP3.

The Customize box works best as one tight instruction: audience, scope, what to avoid, ending.

**NotebookLM can't use Billy's ElevenLabs voice.** It always uses its own two hosts. It also
writes its own words, so it may shorten our name. Before publishing any NotebookLM audio:
transcribe it (Transistor AI transcript or ElevenLabs speech-to-text), save the transcript, and
run `scripts/check-brand-name.sh` on it. If it fails, regenerate. Don't edit around it.

## Ready to paste — Episode 1 (test)

Sources to add: `/our-products/medicare` and the Medicare open enrollment FAQs on our site.
Format: Deep Dive. Length: Default.

> Audience: people on Medicare or turning 65 in North Carolina and Tennessee. Explain what someone can and can't change during Medicare's fall open enrollment, October 15 to December 7, using only these sources. Say the company name exactly as "The Jordan Insurance Agency," with the word "The," at the start and the end, and never shorten it. Do not name insurance companies or plans, quote prices, use the words "free" or "best," or tell anyone which plan to pick. End by suggesting listeners talk with a licensed agent at The Jordan Insurance Agency.

**The Jordan Insurance Agency — educational test**
> Audience: adults turning 65 in North Carolina and Tennessee. Explain only the difference between Original Medicare with a Medigap plan and Medicare Advantage, using only these sources. Do not name carriers or plans, quote premiums, use the words "free" or "best," or recommend a plan. Mention The Jordan Insurance Agency by its full name once at the start and once at the end, and end by suggesting listeners talk with a licensed agent.

**The Jordan Insurance Agency — FAQ quick answer**
> Answer the single question in this source in under 6 minutes for a non-expert. State the answer in the first 30 seconds, then explain why. No plan names, prices, or superlatives.

**Breakpoint**
> Audience: owners of 5–50 person service businesses who are stuck working in the business. Focus on the before-and-after example in the source and the hours saved. Explain the tools in plain English, no jargon. Mention Breakpoint Systems by name at the start and end. Keep it under 10 minutes.

**Critique format (internal QA)**
> Critique this draft episode script as a skeptical Medicare beneficiary would. Flag anything confusing, anything that sounds like a sales pitch, and any claim not supported by the sources.

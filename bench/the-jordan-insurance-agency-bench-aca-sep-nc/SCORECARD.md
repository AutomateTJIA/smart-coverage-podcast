# Bench test — same article, two ways

**Article:** ACA Special Enrollment Periods in North Carolina (2026) — published Oct 6, 2026
**Question this test answers:** can a finished blog post become a publish-ready podcast episode
that is accurate, on-brand, compliant, and cheap to repeat 3× a week?

| | Path A: NotebookLM | Path B: our script → ElevenLabs |
|---|---|---|
| Who writes the words | NotebookLM, as it talks | Claude with our prompt; Billy approves |
| Voices | NotebookLM's two built-in hosts | Tanya (host) + Billy's own voice |
| Status | Billy generated it this morning | Script done (`script.md`); audio waits on the ElevenLabs key in n8n + Billy's voice ID |

## Score each version (Billy listens to both)

| # | Test | Pass means | A | B |
|---|---|---|---|---|
| 1 | **Brand name** | Says "The Jordan Insurance Agency" in full every time; never shortened | | ✅ script (5×, gate PASS) |
| 2 | **Accuracy** | Every fact matches the article: 60-day window, enroll up to 60 days *before* loss, 30-day documents, newborn coverage retroactive, Open Enrollment Nov 1–Jan 15 | | ✅ script |
| 3 | **Nothing invented** | No facts, numbers, or promises that aren't in the article | | ✅ script |
| 4 | **Compliance** | No "best plan," "guaranteed," "risk-free," "will save you"; says education-not-advice; names a licensed agent | | ✅ workflow gate rules all PASS |
| 5 | **AI disclosure** | Tells listeners AI voices are used | | ✅ |
| 6 | **Sounds like us** | Billy's voice; warm, plain English; would a client trust it? | | listen test |
| 7 | **Call to action** | Sends people to the website / booking link | | ✅ |
| 8 | **Length** | 8–14 minutes | | ✅ ~10.5 min |
| 9 | **Repeatable without Billy's time** | Can run 3×/week from n8n with only an approval click | ❌ manual every time (no API) | ✅ once keys are in |
| 10 | **Cost per episode** | | free (manual time) | ElevenLabs credits only |

**Decision rule:** Path B becomes the production method if it passes 1–8 on the listen test.
Path A stays as the free drafting/test tool and for early Breakpoint episodes.

To score Path A, upload the NotebookLM audio (or its transcript) here and Claude will run the
brand-name gate and the accuracy check against the article.

## Found while building this test (fix on the blog)

- The article says people "transitioning out of Medicaid **or NC Health Choice**" get 90 days.
  NC Health Choice was folded into NC Medicaid in April 2023, so that name is outdated. The
  podcast script says "Medicaid" only. **Confirm the 90-day rule and update the blog line.**
- The article's byline box and the podcast both say "President of The Jordan Insurance Agency."
  Keep titles consistent across the site, podcast, and author schema.

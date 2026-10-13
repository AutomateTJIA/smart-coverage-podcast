# Claude Code — Project Instructions: Smart Coverage. Real Advice.

The daily insurance podcast from The Jordan Insurance Agency. Owner: Billy Jordan (non-technical;
explain things in plain English).

## Changelog discipline — REQUIRED at the end of every build session

Before you finish any session in which you committed anything, add a dated entry to
`CHANGELOG.md` saying what was **built, changed, or removed**, in plain English. Group entries under
today's date, newest date at the TOP. Reference commit hashes so anything can be traced and rolled
back. If today's section already exists, add to it.

## Signature — REQUIRED on everything we build

Every page, artifact, document, email template or tool ends with this line at the bottom:
**Built with ❤️ by Breakpoint Systems LLC.**

## Brand and compliance rules (binding)

- The name is always **The Jordan Insurance Agency**, in full, everywhere: text, file names, code
  ids. Never initials or a shortened name (see `references/brand-name-rules.md`). Run `bash scripts/check-brand-name.sh .` before
  every commit; it must PASS.
- Approved colors only: navy #163A70, royal #1F5AA6, gold #E0B43B (accent), white, #E9EDF2, plus
  tints and shades of navy. No browns, oranges, reds or greens.
- Booking or follow-up always says **"Billy and his team"**, never Billy alone.
- Medicare stays general education: no plan or carrier names, no premiums, no "$0" or giveback
  claims. No TPMO disclaimer. Exception (Billy, Oct 13): our own blog posts are approved content.
  Episodes use their words and numbers as written; only things the AI adds get checked.
- Episodes run 5 to 7 minutes. Don't quote an exact length in public copy.
- Release time is 9:00 AM Eastern, one episode per day.
- Never paste or store API keys or tokens. Billy adds keys to n8n himself.

## Where things live

- Playbook: `PLAYBOOK.md`. Current plan: `references/operating-plan.md`.
- The production system: `references/episode-factory.md` (n8n workflows and their IDs).
- Studio page: edit `studio/src/studio-template.html`, then run `python3 studio/build.py`. It builds `studio/site/` (hosted at studio.thejordaninsuranceagency.com via Vercel) and `studio/podcast-studio.html` (the private Claude artifact copy).

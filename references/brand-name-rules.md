# Brand name rules — binding

Source: the `the-jordan-insurance-agency-brand-image` skill, `reference/brand-guidelines.md`,
Section 1. That document wins if this file ever disagrees with it.

## The name

Always, exactly: **The Jordan Insurance Agency**

- Capital "T" on "The," every time, including mid-sentence.
- Never shortened, never abbreviated, never turned into initials.
- Applies to: scripts, spoken audio, titles, descriptions, show notes, transcripts, episode
  pages, schema, social posts, image prompts, **file names, folder names, variable names,
  config keys, and metadata.**
- In file names and slugs use `the-jordan-insurance-agency`.
- The website domain `thejordaninsuranceagency.com` is the only allowed run-together form.

## Forbidden variants (never write these anywhere else)

- Jordan Insurance
- Jordan Insurance Agency (without "The")
- the Jordan Insurance Agency (lowercase "the")
- JIA
- TJIA
- The Jordan Agency
- Jordan Agency

## Enforcement

`scripts/check-brand-name.sh <files or folders>` fails if any forbidden variant appears in file
contents or file names. It skips only this file. The skill runs it before the approval gate and
again before publishing. A failure blocks the episode until fixed.

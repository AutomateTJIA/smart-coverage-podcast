# Topic Radar

Two weekly radars find what people are asking **this week** and turn it into topic ideas. Billy approves
or skips each idea from an email. Nothing gets written until he approves.

## The two radars (n8n, project QlSqRe6YvoWZbXAg)

| | The Jordan Insurance Agency | Breakpoint Systems LLC |
|---|---|---|
| Workflow | `The Jordan Insurance Agency Blog \| 01c \| Topic Radar` (`6IAzZMS5WVw4bqLx`) | `Breakpoint Systems \| Podcast Topic Radar` (`5dLRAmqNY6nHcpg5`) |
| Runs | Mondays, 6:40 AM Eastern | Mondays, 6:50 AM Eastern |
| Listens to | Google autocomplete (68 searches), People Also Ask for **Charlotte** (6 searches), Google News (8 searches), KFF Health News | Google autocomplete (64 searches), People Also Ask for the **US** (6 searches), Google News on AI and automation (6 searches) |
| Already-done check | Every blog title in Airtable, plus every past radar idea | The breakpointsystems.com sitemap, plus every past radar idea |
| Rules | No carrier or plan names, no dollar amounts, "$0" or giveback claims, North Carolina first, no "best/top N" lists, Health is individual and family only | No hype, no guaranteed results, no "best/top N" lists |
| Approve means | New Airtable Subtopic plus a row in the blog topic queue data table (`NXP1umyxJNMg7yeu`, source `radar`). The blog gets written and reviewed as usual, and the podcast picks up the live post. | Status `approved` in `topic_radar`. The Breakpoint podcast build reads approved rows. |

Each radar keeps the best **8** ideas, with at most **3 from any one lane** so the list stays mixed.

## Pieces

- **Data table `topic_radar`** (`sEGyxPc8FQCmMicb`) is shared by both radars. The `business` column is `the-jordan-insurance-agency` or `bps`.
  - Status moves from `suggested` to `approved` or `skipped`.
  - `handoff_ref` records where an approved idea went.
- **`Topic Radar | Decide`** (`8e9KreFZoxImTeFp`) handles the email buttons.
  - A button only opens a confirm page (GET `/webhook/topic-radar-decide`).
  - The choice is recorded only when Billy presses Confirm (POST `/webhook/topic-radar-confirm`). This is so email security scanners that open links on their own can't approve anything.
  - Each link carries a secret token and works once.
- **Cost:** about $0.012 a week per radar in DataForSEO (6 searches at $0.002 each), plus one AI call through OpenRouter. Google autocomplete and Google News are free.

## Why the insurance radar goes through the blog first

The podcast's Episode Producer needs a source page.

- For The Jordan Insurance Agency, that page is Billy's own blog post. Its facts are already approved, which is what keeps Medicare episodes compliant.
- The blog is also what ranks on Google and gets quoted by AI answer engines. The episode adds a second format on top.
- Breakpoint has no insurance compliance rules, so its episodes can be written straight from an approved idea and its source articles. Each one still gets an episode page with the full transcript, because that page is what gets indexed.

## Known limits

- **Who writes the approved insurance topics.** The daily blog writer (the "watchman" runs in the blog run log data table, `svML4nN4UkKCNWYi`) runs from Billy's computer, outside n8n.
  - We have not confirmed that it picks new Airtable Subtopics ahead of the older draft pile.
  - If it doesn't, add one line to its instructions: "Write approved Subtopics whose topic-queue source is `radar` first."

- **Reddit** blocks requests from the n8n server (403), so it is not a source. Getting it back would need Reddit API access or an Apify Reddit scraper; Apify is already connected.
- **Source links** are Google News links that redirect to the real article. A podcast build that uses an article as its source has to resolve the redirect first.

Built with ❤️ by Breakpoint Systems LLC.

# Episode page template — `/podcast/{slug}`

```
H1: {episode question}
[2–3 sentence direct answer]
[Transistor player embed]   [YouTube embed]
Episode {n} · {date} · {duration} · Hosted by Billy Jordan, licensed agent

## Key takeaways
- … (3 bullets)

## Full transcript
## {Segment 1 question}
…
## {Segment 2 question}
…

Related: {source blog/FAQ link} · {product page link}
CTA: Book a free 30-minute chat with Billy and his team → https://cal.com/team/agency-producer/t-agency
Disclosure: AI-generated voices… · General education only…
```

OG image: 1200×630 render of the thumbnail template. Add to sitemap. Link from the source page.

## JSON-LD (tie `@id`s to the site-wide organization entity)

```json
{
  "@context": "https://schema.org",
  "@type": "PodcastEpisode",
  "@id": "https://thejordaninsuranceagency.com/podcast/{slug}#episode",
  "name": "{title}",
  "url": "https://thejordaninsuranceagency.com/podcast/{slug}",
  "datePublished": "{YYYY-MM-DD}",
  "episodeNumber": {n},
  "description": "{direct answer}",
  "partOfSeries": {
    "@type": "PodcastSeries",
    "@id": "https://thejordaninsuranceagency.com/podcast#series",
    "name": "Smart Coverage. Real Advice.",
    "url": "https://thejordaninsuranceagency.com/podcast",
    "webFeed": "{transistor RSS URL}"
  },
  "associatedMedia": {
    "@type": "AudioObject",
    "contentUrl": "{mp3 URL}",
    "encodingFormat": "audio/mpeg",
    "duration": "PT{mm}M{ss}S"
  },
  "video": {
    "@type": "VideoObject",
    "name": "{title}",
    "description": "{direct answer}",
    "thumbnailUrl": "{1280x720 thumbnail URL}",
    "uploadDate": "{YYYY-MM-DD}",
    "embedUrl": "https://www.youtube.com/embed/{id}"
  },
  "creator": {
    "@type": "Person",
    "name": "Billy Jordan",
    "worksFor": { "@id": "https://thejordaninsuranceagency.com/#organization" }
  },
  "publisher": { "@id": "https://thejordaninsuranceagency.com/#organization" },
  "about": [{ "@type": "Thing", "name": "{topic, e.g. Medicare Advantage}" }]
}
```

The `/podcast` hub gets the `PodcastSeries` block on its own, with `sameAs` links to the Apple,
Spotify, YouTube, and Amazon show pages.

## Webflow CMS collection (created Oct 10, unpublished)

**Podcast Episodes** — collection id `6acace0ef8f59eaf26c608c1`, slug `podcast`, so pages live at
`/podcast/{slug}` next to the static `/podcast` hub (same pattern as `/blog` + Blog Posts).
n8n fills one item per approved episode. Field slugs:

| Field | Slug | Type |
|---|---|---|
| Name (episode question / title) | `name` | Plain text |
| Slug | `slug` | Plain text |
| Episode Number | `episode-number` | Number |
| Publish Date | `publish-date` | Date |
| Duration | `duration` | Plain text, e.g. 7:12 |
| Quick Answer | `quick-answer` | Plain text, 150–200 chars |
| Show Notes | `show-notes` | Rich text |
| Full Transcript | `full-transcript` | Rich text |
| Transistor Player URL | `transistor-player-url` | Link |
| Spotify Link | `spotify-link` | Link |
| Apple Podcasts Link | `apple-podcasts-link` | Link |
| YouTube Video | `youtube-video` | Video link |
| Episode Thumbnail | `episode-thumbnail` | Image |
| SEO Title | `seo-title` | Plain text, < 60 chars |
| Meta Description | `meta-description` | Plain text, < 160 chars |
| Lane | `lane` | Option: Medicare, Health, Life, Home & Auto, Retirement |
| Related Blog Post | `related-blog-post` | Reference → Blog Posts |

Still to do: design the template page (layout above), bind SEO title/description, add PodcastEpisode
schema, and at launch swap the hub: remove the 4 old Spotify embeds and add the new show player plus
an episode grid. The old Spotify show is redirected to the Transistor feed the same day.

## Built in Webflow (Oct 12)

- **/podcast** (page 69579a026efc524887cf5759): "Listen to the latest episodes" box with a collection list of compact cards
  (title, length, quick answer, "Listen and read the transcript →"), each linking to its episode page, then the
  gold booking button. The booking button opens the team calendar as a pop-up (page footer script
  `podcast-calendar-popup`, same pattern as the site's /faq and /guides pop-up); arriving with `#book` opens it automatically.
  Sort newest-first is set in the Designer (the API rejected the sort setting).
- **Episode page template** (/podcast/{slug}, page 6acace0ff8f59eaf26c608c7): site Header and Footer components,
  then: ← All episodes · eyebrow · H1 (name) · length (duration) · quick-answer box · player iframe (src =
  `transistor-player-url`, renamed "Player Embed URL"; Spotify embed format) · Show notes (rich text) · navy booking box with
  the pop-up calendar button · Full transcript (rich text). SEO title/description bound to `seo-title` / `meta-description`.
- Classes: `podcast-ep-*` (episode page), `podcast-card*` (cards).
- Episode 1 CMS item: 6acc36cc026d1d5eb46109c8 (slug `lost-your-health-insurance-60-day-special-enrollment-clock-north-carolina`).

## Redesign to match the AEO Engine podcast page (Oct 12)

Billy's AEO Engine screenshots showed a centered grid of small cards, each starting with "EP 256 · Oct 11, 2026 · 10:51". /podcast now follows that pattern:

- Section `episodes-section` (light gray, rounded) with the eyebrow "ALL EPISODES", an H2, and one line of sub-copy.
- The collection list (`episodes-grid`) has 3 columns, 2 on tablet and 1 on phone, sorted by Publish Date with newest first.
- Card (`episodes-card`): the meta row "EP {episode-number} · {publish-date} · {duration}", then the title, a quick answer cut to about 4 lines, and "Read & listen ›".
- Below the grid: "Listen on Apple Podcasts · Spotify · RSS feed", then the gold booking button, which opens the pop-up.
- The episode page shows the same "EP # · date · length" row under the H1 (`podcast-ep-metarow`).
- **Every new CMS item needs `episode-number` and `publish-date` filled.** The Episode Factory must set both. Numbering is sequential and matches the Transistor episode number.
- **Card link fix (Oct 12):** Webflow's built-in "Current Podcast Episode" link sent visitors to `/detail_podcast`, a 404. The card now links through a CMS Link field, **`episode-page-url`**, set to `https://thejordaninsuranceagency.com/podcast/{slug}`. The Episode Factory must fill it on every new item.
- **Publish date:** store it at midday UTC (for example `2026-10-12T16:00:00Z`). Midnight UTC shows the previous day in Eastern time.
- **Booking button (Oct 12):** /podcast and the episode template now use the site's standard **"Consultation Popup Button"** component (`c46fb3d2-40d6-4fe6-fa14-97579497d88b`, "Schedule Your Consultation", Finsweet modal), the same one on the home page. The custom gold `rev-cta-btn` link and the separate Cal.com loader script are gone. The page footer script `podcast-book-link` opens that component's pop-up when the address ends in `#book`.

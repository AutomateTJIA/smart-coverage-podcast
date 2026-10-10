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
CTA: Book a free coverage review → {booking URL}
Disclosure: AI-generated voices… · General education only… · {TPMO if REVIEW}
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

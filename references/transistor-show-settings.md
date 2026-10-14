# Transistor show settings — The Jordan Insurance Agency (entered Oct 10)

| Field | Value |
|---|---|
| Podcast Title | Smart Coverage. Real Advice.: Medicare (Oct 14, Billy: this show became the Medicare show; set via the Transistor API) |
| Description | Smart Coverage. Real Advice.: Medicare is the Medicare podcast from The Jordan Insurance Agency. Licensed insurance agent Billy Jordan and AI host Tanya answer the questions people ask about Medicare, in plain English: when and how to enroll, the enrollment periods, Original Medicare, Medicare Advantage, Medicare Supplement and Part D drug coverage, and what to compare before you choose. General education, not personalized advice. Voices are AI-generated from scripts reviewed and approved by Billy Jordan. Not affiliated with or endorsed by Medicare or any government agency. Episodes and written guides: thejordaninsuranceagency.com/podcast |
| Artwork | assets/the-jordan-insurance-agency-podcast-cover-3000.jpg (Medicare cover, Oct 14; Billy uploads it in Transistor) |
| Type | Episodic |
| Explicit | No (unchecked) |
| Primary Category | Health & Fitness (Oct 14; was Business › Investing) |
| Secondary Category | Education |
| Author | Billy Jordan \| The Jordan Insurance Agency |
| Copyright | © 2026 The Jordan Insurance Agency |
| Keywords | medicare, medicare enrollment, medicare advantage, medicare supplement, medigap, medicare part d, original medicare, medicare annual enrollment, turning 65, insurance agent, North Carolina, Tennessee |
| Website | https://thejordaninsuranceagency.com/podcast |
| Spoken Language | English |
| Publishing Time Zone | Eastern Time (US & Canada) |
| Show Owner | The Jordan Insurance Agency |
| Owner Email | podcast@thejordaninsuranceagency.com (role address; checked "add to RSS feed" so Apple/Spotify can verify ownership) |

Approvals go to Slack (n8n credential "Slack account", id 4jLTmQxQFVzfybZX).

## Live show

- RSS feed: https://feeds.transistor.fm/smart-coverage-real-advice-the-insurance-podcast-from-the-jordan-insurance-agency
- Episode 1 (ACA Special Enrollment) uploaded Oct 11 as a draft; Billy publishes it, then submits to Spotify (Transistor → Distribution) and Apple (Apple Podcasts Connect, paste the RSS feed).
- Published Oct 12. Spotify show: https://open.spotify.com/show/1xYbNAPNgPHkc2FKOyhhfS. Apple: live ("Available") as of Oct 11, Apple Podcasts show ID 1772935091, https://podcasts.apple.com/us/podcast/id1772935091. The Apple Podcasts Connect account is named "AI Coverage Coach" (Apple ID aicoveragecoach@agencyhlpc.com). Listeners never see that name; renaming it needs Apple Podcasts Support.

## API (for the Episode Factory)

- Transistor show ID: `84410`. Episode 1 ID: `3641585`.
- n8n credential: "Transistor API key" (Header Auth, header `x-api-key`, id `YXjL8DQGdy1qxdmm`). Billy entered the key himself.
- Verified Oct 12 with n8n workflow "Podcast - Transistor Key Test" (`IOOQsiUmQGcAnNrT`, execution 314432): the API returned this show.
- Seen in the API on Oct 12: the secondary category is empty (the table above says Education › How To), and `apple_podcasts` is not set yet.

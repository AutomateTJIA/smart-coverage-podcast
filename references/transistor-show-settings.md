# Transistor show settings — The Jordan Insurance Agency (entered Oct 10)

| Field | Value |
|---|---|
| Podcast Title | Smart Coverage. Real Advice. — The Insurance Podcast from The Jordan Insurance Agency |
| Description | Smart Coverage. Real Advice. is the insurance podcast from The Jordan Insurance Agency. Licensed insurance agent Billy Jordan and AI host Tanya answer the questions real people ask about Medicare, health insurance, life insurance, and home and auto coverage, in plain English. One question per episode, like how long you have to get new coverage after losing a job, or what to compare before Medicare enrollment. General education, not personalized advice. Voices are AI-generated from scripts reviewed and approved by Billy Jordan. Not affiliated with or endorsed by Medicare or any government agency. Episodes and written guides: thejordaninsuranceagency.com/podcast |
| Artwork | assets/the-jordan-insurance-agency-podcast-cover-3000.jpg |
| Type | Episodic |
| Explicit | No (unchecked) |
| Primary Category | Business › Investing |
| Secondary Category | Education › How To |
| Author | Billy Jordan \| The Jordan Insurance Agency |
| Copyright | © 2026 The Jordan Insurance Agency |
| Keywords | insurance, medicare, health insurance, ACA marketplace, life insurance, home insurance, auto insurance, insurance agent, North Carolina, Tennessee |
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

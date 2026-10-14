# Transistor setup for the four lane shows (Oct 13)

Create each show in Transistor (Dashboard, then **Add a new podcast**). Copy the fields below. When a show exists,
send Claude its show ID, or paste it into that lane's `transistor_show_id` in the n8n table **Smart Coverage Shows**.
From then on that lane's episodes go to the new feed. Then use Transistor's **Distribution** page to submit to
Apple Podcasts and Spotify. Apple review usually takes 1 to 5 days.

## Plan (Billy, Oct 14): the original show is the Medicare show; Health Insurance has its own show

Billy's call: the two lanes we play in most get fed all the time. Home & Auto and Life stay on the main show
until they have steady volume.

- **Medicare** stays on the current show (`84410`). Its followers and reviews are there already, so no new Medicare show.
- **Health Insurance** gets its own show. Launch steps:
  1. Billy creates the show in Transistor using the Health Insurance fields below, and uploads
     `assets/the-jordan-insurance-agency-podcast-cover-health-3000.jpg`.
  2. Paste the new show ID into the `health` row's `transistor_show_id` in **Smart Coverage Shows** (or send it to Claude).
  3. Submit it to Apple Podcasts and Spotify from Transistor's **Distribution** page.
  4. When Apple approves it, paste the Apple Podcasts link into the `health` row's `apple_podcasts_url`. Until then,
     "Listen on Apple" on Health episode pages points to the main show.
  5. Before the first Health episode airs, add a show label to the website episode cards. The Health show starts at
     EP 1, so without the label the site would show two "EP 1" cards.
- Target: at least 2 Health episodes a week through Marketplace open enrollment (Nov 1 to Jan 15).

Every show: Author **Billy Jordan**, Owner **The Jordan Insurance Agency**, Language **English**, Explicit **No**.

## Medicare
- **Title:** Smart Coverage. Real Advice.: Medicare
- **Artwork:** `assets/the-jordan-insurance-agency-podcast-cover-medicare-3000.jpg`
- **Categories:** Health & Fitness > Medicine; Education
- **Description:** Smart Coverage. Real Advice.: Medicare is the Medicare podcast from The Jordan Insurance Agency. Licensed insurance agent Billy Jordan and AI host Tanya answer the questions people ask about Medicare, in plain English: when to enroll, how the parts work, and what to compare during Annual Enrollment. General education, not personalized advice. Voices are AI-generated from scripts reviewed and approved by Billy Jordan. Not affiliated with or endorsed by Medicare or any government agency. Episodes and written guides: thejordaninsuranceagency.com/podcast

## Health Insurance
Updated Oct 14 (Billy): the show covers every kind of health coverage, not just the Marketplace. The cover uses the
same clean design as the main show (no icon).
- **Status (Oct 14, Billy): LIVE.** Transistor show ID **84545**, feed https://feeds.transistor.fm/smart-coverage-real-advice-health-insurance. The `health` row in Smart Coverage Shows points here, so every Health episode goes to this show. Title, description, categories and keywords were set through the Transistor API. To do: once its first episode is published, submit it on Transistor's Distribution page (Apple, Spotify); when Apple approves, paste the Apple link into the `health` row's `apple_podcasts_url`.
- **Title:** Smart Coverage. Real Advice.: Health Insurance
- **Artwork:** `assets/the-jordan-insurance-agency-podcast-cover-health-3000.jpg`
- **Categories:** Health & Fitness; Education
- **Author:** Billy Jordan Jr | The Jordan Insurance Agency · **Show Owner:** The Jordan Insurance Agency (same as the main show)
- **Copyright:** © 2026 The Jordan Insurance Agency
- **Keywords:** health insurance, health insurance options, ACA marketplace, off-marketplace health insurance, individual and family health insurance, employer health insurance, short-term health insurance, insurance agent, North Carolina, Tennessee
- **Website:** https://thejordaninsuranceagency.com/podcast
- **Owner Email:** podcast@thejordaninsuranceagency.com (tick "add to RSS feed" if offered)
- **Description:** Smart Coverage. Real Advice.: Health Insurance is the health insurance podcast from The Jordan Insurance Agency. Licensed insurance agent Billy Jordan and AI host Tanya walk through every kind of health coverage in plain English: Marketplace plans and plans sold outside the Marketplace, employer and group coverage, short-term and other alternative plans, and how to compare them, so you can find more options and choose with confidence. General education, not personalized advice. Voices are AI-generated from scripts reviewed and approved by Billy Jordan. Episodes and written guides: thejordaninsuranceagency.com/podcast

## Home & Auto
- **Title:** Smart Coverage. Real Advice.: Home & Auto
- **Artwork:** `assets/the-jordan-insurance-agency-podcast-cover-home-auto-3000.jpg`
- **Categories:** Business; Education
- **Description:** Smart Coverage. Real Advice.: Home & Auto is the home and auto insurance podcast from The Jordan Insurance Agency. Licensed insurance agent Billy Jordan and AI host Tanya answer the questions people ask about protecting their home and their car, in plain English: what a policy covers, storm and flood season, new drivers, and how to compare coverage. General education, not personalized advice. Voices are AI-generated from scripts reviewed and approved by Billy Jordan. Episodes and written guides: thejordaninsuranceagency.com/podcast

## Life Insurance
- **Title:** Smart Coverage. Real Advice.: Life Insurance
- **Artwork:** `assets/the-jordan-insurance-agency-podcast-cover-life-3000.jpg`
- **Categories:** Business; Education
- **Description:** Smart Coverage. Real Advice.: Life Insurance is the life insurance podcast from The Jordan Insurance Agency. Licensed insurance agent Billy Jordan and AI host Tanya answer the questions people ask about protecting the people who count on them, in plain English: how much coverage makes sense, term and permanent, and planning ahead. General education, not personalized advice. Voices are AI-generated from scripts reviewed and approved by Billy Jordan. Episodes and written guides: thejordaninsuranceagency.com/podcast

Artwork sources (to change wording or icons, edit then re-render at 3000x3000):
`assets/src/the-jordan-insurance-agency-cover-{medicare,health,home-auto,life}.html`.

Built with ❤️ by Breakpoint Systems LLC.

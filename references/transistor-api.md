# Transistor API — publish flow

Base: `https://api.transistor.fm/v1` · Auth header: `x-api-key: $TRANSISTOR_API_KEY`
Rate limit: 10 requests / 10 seconds (429 → wait 10s). Space calls ≥ 1s apart in n8n.
Field names below come from Transistor's changelog and third-party docs — confirm against
developers.transistor.fm on first build.

```bash
# 0. Find the show id (once per brand)
curl -s -H "x-api-key: $TRANSISTOR_API_KEY" https://api.transistor.fm/v1/shows

# 1. Get a pre-signed upload URL
curl -s -H "x-api-key: $TRANSISTOR_API_KEY" \
  "https://api.transistor.fm/v1/episodes/authorize_upload?filename=ep-012.mp3"
# → data.attributes.upload_url, data.attributes.audio_url

# 2. Upload the MP3
curl -s -X PUT -H "Content-Type: audio/mpeg" -T ep-012.mp3 "$UPLOAD_URL"

# 3. Create the episode (draft)
curl -s -X POST -H "x-api-key: $TRANSISTOR_API_KEY" https://api.transistor.fm/v1/episodes \
  -d "episode[show_id]=$SHOW_ID" \
  -d "episode[title]=Medicare Advantage vs. Medigap: How to Decide" \
  -d "episode[summary]=<first 150-200 chars>" \
  --data-urlencode "episode[description]@description.html" \
  --data-urlencode "episode[transcript_text]@script.txt" \
  -d "episode[audio_url]=$AUDIO_URL" \
  -d "episode[number]=2" -d "episode[type]=full"
# trailer: episode[type]=trailer

# 4. Publish now or schedule
curl -s -X PATCH -H "x-api-key: $TRANSISTOR_API_KEY" \
  https://api.transistor.fm/v1/episodes/$EPISODE_ID/publish -d "episode[status]=published"
# scheduled: -d "episode[status]=scheduled" -d "episode[published_at]=2026-10-20T10:00:00-04:00"
```

Show-level settings (web app, once): YouTube auto-posting ON (Professional plan), show art,
categories, author, owner email, website = `/podcast` on our domain.
Starting point for the n8n workflow: template #11897 (blog → GPT → ElevenLabs); replace its
Drive/RSS nodes with the four HTTP Request calls above.

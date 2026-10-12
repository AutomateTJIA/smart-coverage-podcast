# Factory audio parts (used by the n8n Episode Factory)

ElevenLabs Text to Dialogue returns **mono, 44.1 kHz, 128 kbps MP3 at about -23.5 LUFS**.
These parts match that format exactly, so n8n can join them frame by frame in plain
JavaScript (no ffmpeg on the n8n server):

| File | What | Level |
|---|---|---|
| `the-jordan-insurance-agency-factory-intro-mono.mp3` | Rhodes and Rust intro, 11.7 s | about -25.8 LUFS (about 2 dB under the voices, like episode 1) |
| `the-jordan-insurance-agency-factory-outro-mono.mp3` | Rhodes and Rust sign-off, 12.0 s | about -26.3 LUFS |
| `the-jordan-insurance-agency-factory-gap-0.6s.mp3` | 0.6 s of silence between voice and music | — |

Order: hook (chunk 0) → gap → intro → rest of the dialogue → gap → outro.
No ID3 tags and no Xing header, so the joined file reports its true length.

Known gap: factory episodes come out at about -23.5 LUFS. Episode 1 was mastered to -16 LUFS
by hand. Spotify and Apple turn quieter shows up on playback; if the web player sounds too
quiet, add a mastering step (for example Auphonic, about $11 a month).
Regenerate with ffmpeg from the stereo masters in `../` (see the CHANGELOG entry for Oct 12).

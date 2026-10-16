// Join: hook -> gap -> [intro music] -> rest of the dialogue -> [gap -> sign-off music].
// Without Breakpoint music (Show Settings use_music) it is: hook -> gap -> rest of the dialogue.
// All parts are 44.1 kHz mono 128 kbps MP3, so frames can be joined directly once tags are stripped.
function cleanMp3(buf) {
  let start = 0, end = buf.length;
  if (buf.length > 10 && buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) {
    const size = (buf[6] & 0x7f) << 21 | (buf[7] & 0x7f) << 14 | (buf[8] & 0x7f) << 7 | (buf[9] & 0x7f);
    start = 10 + size + ((buf[5] & 0x10) ? 10 : 0);
  }
  if (end - start > 128 && buf[end - 128] === 0x54 && buf[end - 127] === 0x41 && buf[end - 126] === 0x47) end -= 128;
  while (start < end - 4 && !(buf[start] === 0xff && (buf[start + 1] & 0xe0) === 0xe0)) start++;
  const br = [0,32,40,48,56,64,80,96,112,128,160,192,224,256,320][(buf[start + 2] >> 4) & 0x0f] * 1000;
  const sr = [44100,48000,32000][(buf[start + 2] >> 2) & 0x03];
  const pad = (buf[start + 2] >> 1) & 0x01;
  const flen = br && sr ? Math.floor(144 * br / sr) + pad : 0;
  if (flen) {
    const frame = buf.slice(start, start + flen).toString('latin1');
    if (frame.includes('Xing') || frame.includes('Info') || frame.includes('VBRI')) start += flen;
  }
  return buf.slice(start, end);
}
const items = $input.all();
const voice = [];
const music = {};
for (let i = 0; i < items.length; i++) {
  const j = items[i].json || {};
  const bin = (items[i].binary && items[i].binary.data) || {};
  const tag = String(j.part || '') + ' ' + String(j.path || j.name || bin.fileName || '');
  const buf = cleanMp3(await this.helpers.getBinaryDataBuffer(i, 'data'));
  if (/^intro\b|factory-intro/.test(tag)) music.intro = buf;
  else if (/^outro\b|factory-outro/.test(tag)) music.outro = buf;
  else if (/^gap\b|factory-gap/.test(tag)) music.gap = buf;
  else voice.push(buf);
}
if (!music.gap) throw new Error('Mix: the silence part is missing');
const withMusic = !!(music.intro && music.outro);
if (voice.length < 2) throw new Error('Mix: expected the hook plus dialogue chunks, got ' + voice.length);
const parts = withMusic ? [voice[0], music.gap, music.intro, ...voice.slice(1), music.gap, music.outro] : [voice[0], music.gap, ...voice.slice(1)];
const merged = Buffer.concat(parts);
const p = $('Plan Release').first().json;
const seconds = Math.round(merged.length * 8 / 128000);
const duration = Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
const fileName = 'breakpoint-systems-podcast-ep' + String(p.episode_number).padStart(3, '0') + '-' + p.slug.slice(0, 50) + '.mp3';
const binary = await this.helpers.prepareBinaryData(merged, fileName, 'audio/mpeg');
return [{ json: { file_name: fileName, bytes: merged.length, seconds, duration, voice_chunks: voice.length }, binary: { data: binary } }];

// ---- Breakpoint release rule ----
// One episode per release day (Show Settings: release_days, release_time, Eastern time).
// No date asked: the next release day with no episode. Date asked: that day if it is free and not passed
// (any weekday is allowed on purpose), otherwise the next free release day after it.
// "after:YYYY-MM-DD" (extra links in a dated batch): the first free release day on or after that date.
const S = $('Show Settings').first().json;
const SHOW_ID = String(S.transistor_show_id || '').trim();
const NY = 'America/New_York';
const DAY = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 7 };
const days = String(S.release_days || 'Tue').split(/[\s,]+/).map(d => DAY[d.trim().slice(0, 3).toLowerCase()]).filter(Boolean);
const releaseDays = days.length ? days : [2];
const tm = String(S.release_time || '09:00').match(/^(\d{1,2}):(\d{2})$/);
const HM = tm ? [Math.min(23, +tm[1]), Math.min(59, +tm[2])] : [9, 0];
function pickSlot(rows, airDateRaw, now) {
  const taken = new Set();
  for (const r of rows) {
    if (!r || !['published', 'scheduled'].includes(r.status)) continue;
    const t = r.release_at || r.published_at;
    if (!t) continue;
    const dt = DateTime.fromISO(typeof t === 'string' ? t : new Date(t).toISOString(), { zone: NY });
    if (dt.isValid) taken.add(dt.toFormat('yyyy-LL-dd'));
  }
  const at = d => d.setZone(NY).set({ hour: HM[0], minute: HM[1], second: 0, millisecond: 0 });
  const soon = now.plus({ minutes: 30 });
  const free = d => !taken.has(d.toFormat('yyyy-LL-dd')) && at(d) > soon;
  const nextRelease = from => { let d = at(from); for (let i = 0; i < 730; i++, d = d.plus({ days: 1 })) if (releaseDays.includes(d.weekday) && free(d)) return at(d); return at(from.plus({ days: 1 })); };
  const raw = String(airDateRaw || '').trim();
  const after = /^after:/i.test(raw);
  const ds = raw.replace(/^after:/i, '');
  let slot = null, note = '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(ds)) {
    const day = DateTime.fromISO(ds, { zone: NY });
    if (!day.isValid) note = 'The date asked for could not be read, so this takes the next release day.';
    else if (after) slot = nextRelease(day < now ? now : day);
    else if (free(day)) { slot = at(day); note = 'Airs on the date you asked for.'; }
    else { slot = nextRelease(day < now ? now : day.plus({ days: 1 })); note = day.toFormat('LLL d') + ' is taken or has passed, so this airs on the next release day.'; }
  } else if (raw) note = 'The date asked for could not be read, so this takes the next release day.';
  if (!slot) slot = nextRelease(now);
  return {
    release_at_iso: slot.toISO(),
    release_at_utc: slot.toUTC().toISO(),
    release_label: slot.toFormat("cccc, LLL d 'at' h:mm a") + ' ET',
    publish_date_cms: slot.toFormat('yyyy-LL-dd') + 'T16:00:00.000Z',
    air_note: note
  };
}

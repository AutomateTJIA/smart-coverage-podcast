
// Preview the air date for the approval email (Plan Release re-checks it after approval)
const d = $('Read Episode Details').first().json;
const s = pickSlot($('Get Ledger').all().map(i => i.json), $('Episode Request').first().json.air_date, DateTime.now().setZone(NY));
return [{ json: { ...d, ...s, show_id: SHOW_ID, show_name: S.show_name, show_ready: !!SHOW_ID } }];

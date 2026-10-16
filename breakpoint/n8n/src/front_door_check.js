// Gate for every Breakpoint podcast request: team passcode, approved email, and at least one link or a brief.
// TEAM_PASSCODE: Billy types the passcode here in n8n himself. Blank = nothing is accepted.
const TEAM_PASSCODE = '';
const ALLOWED = ['breakpointsystems.com', 'agencyhlpc.com', 'thejordaninsuranceagency.com'];
const f = $input.first().json;
const given = String(f.passcode || '').trim();
const email = String(f.work_email || '').trim().toLowerCase();
const domain = email.includes('@') ? email.split('@').pop() : '';
const emailOk = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/.test(email) && ALLOWED.includes(domain);
const links = [...new Set(String(f.links || '').split(/\s+/).map(s => s.trim().replace(/[),.;]+$/, '')).filter(s => /^https?:\/\/[^\s\/]+\.[^\s\/]+/i.test(s)))].slice(0, 7);
const brief = String(f.brief || '').trim();
const ad = String(f.air_date || '').trim().slice(0, 10);
const reason = !TEAM_PASSCODE ? 'passcode not set up yet: Billy types it into the Check Requester node' : given !== TEAM_PASSCODE ? 'wrong team passcode' : !emailOk ? 'not an approved email domain' : (!links.length && brief.length < 200) ? 'no links and no brief (a brief needs at least a few sentences)' : '';
return [{ json: { allowed: reason === '', reason, email, link_list: links.join('\n'), brief, count: links.length + (brief.length >= 200 ? 1 : 0), air_date: /^\d{4}-\d{2}-\d{2}$/.test(ad) ? ad : '' } }];

// Read the episode details JSON from the AI and check it
const raw = String($input.first().json.text || '').trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
let d = null;
try { d = JSON.parse(raw); } catch (e) { const m = raw.match(/\{[\s\S]*\}/); if (m) d = JSON.parse(m[0]); }
if (!d) throw new Error('Episode details were not valid JSON');
const TOPICS = ['Lead Follow-Up', 'AI Receptionists', 'CRM', 'Workflow Automation', 'AI Search', 'Operations', 'Case Study'];
const topic = TOPICS.find(t => t.toLowerCase() === String(d.topic || '').toLowerCase()) || 'Operations';
const slugify = s => String(s || '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80).replace(/-+$/, '');
const gate = $('Script Gate').first().json;
const fix = s => String(s || '').replace(/\bBreak\s+Point\b/gi, 'Breakpoint').trim();
const out = {
  title: fix(d.title).slice(0, 110),
  slug: slugify(d.slug || d.title),
  question: String(d.question || '').trim(),
  topic: topic,
  quick_answer: fix(d.quick_answer).slice(0, 240),
  summary: fix(d.summary).slice(0, 300),
  seo_title: fix(d.seo_title).slice(0, 62),
  meta_description: fix(d.meta_description).slice(0, 160),
  bullets: Array.isArray(d.bullets) ? d.bullets.slice(0, 4).map(fix) : [],
  duplicate_of: (d.duplicate_of === null || d.duplicate_of === undefined || d.duplicate_of === '' || d.duplicate_of === false) ? null : d.duplicate_of,
  final_script: gate.final_script,
  word_count: gate.word_count,
  est_minutes: gate.est_minutes,
  script_chars: gate.script_chars,
  editor_issues: gate.editor_issues,
  source_url: $('Build Script Input').first().json.source_url
};
if (!out.title || !out.slug || !out.question) throw new Error('Episode details missing title, slug or question');
out.is_duplicate = out.duplicate_of !== null;
return [{ json: out }];

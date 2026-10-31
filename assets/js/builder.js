/* AI Makers team idea-builder: autosave (this browser only), idea card, copy, print, image. */
(function () {
  'use strict';
  const form = document.getElementById('builderForm');
  if (!form) return;
  const $ = (id) => document.getElementById(id);
  const status = $('builderStatus');
  const output = $('builderOutput');
  const content = $('builderContent');
  const KEY = 'nawat-ai-makers-draft-v1';

  const FIELDS = [
    ['teamName', 'Team name'], ['leader', 'Team leader'], ['members', 'Team members'],
    ['country', 'Country / countries'], ['roles', 'Roles in the team'],
    ['challenge', 'The challenge'], ['affected', 'Who is affected'], ['aiHelp', 'How AI could help'],
    ['solution', 'Our solution idea'], ['nextStep', 'Our next action']
  ];
  const value = (id) => $(id).value.trim();

  /* ---- Autosave: stored only in this browser (localStorage), never sent anywhere ---- */
  const storage = (() => { try { const s = window.localStorage; s.setItem('__t', '1'); s.removeItem('__t'); return s; } catch (e) { return null; } })();
  function save() {
    if (!storage) return;
    try {
      storage.setItem(KEY, JSON.stringify(Object.fromEntries(FIELDS.map(([id]) => [id, $(id).value]))));
      $('saveState').textContent = 'Draft saved on this device.';
    } catch (e) { /* storage full or blocked: ignore */ }
  }
  function restore() {
    if (!storage) { $('saveState').textContent = 'Autosave is not available in this browser.'; return; }
    try {
      const data = JSON.parse(storage.getItem(KEY) || 'null');
      if (data) {
        FIELDS.forEach(([id]) => { if (typeof data[id] === 'string') $(id).value = data[id]; });
        $('saveState').textContent = 'Your saved draft was restored.';
      }
    } catch (e) { /* corrupted draft: ignore */ }
  }
  let timer;
  form.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(save, 400); });
  restore();

  function entries() { return FIELDS.map(([id, label]) => [label, value(id)]).filter(([, v]) => v); }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    content.replaceChildren();
    const title = document.createElement('h3');
    title.textContent = value('teamName');
    content.append(title);
    entries().slice(1).forEach(([label, v]) => {
      const h = document.createElement('h4'); h.textContent = label;
      const p = document.createElement('p'); p.textContent = v;
      content.append(h, p);
    });
    output.hidden = false;
    window.NAWAT.say(status, 'Your idea card is ready. Copy it, print it or download it as an image.');
    output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  $('builderCopy').addEventListener('click', async () => {
    const text = 'FROM AI USERS TO AI MAKERS — TEAM IDEA\n\n' +
      entries().map(([l, v]) => `${l.toUpperCase()}\n${v}`).join('\n\n') +
      '\n\nProblem → AI → Solution → Action · NAWAT AI Youth Lab';
    const ok = await window.NAWAT.copy(text);
    window.NAWAT.say(status, ok ? 'Copied! Paste it into the showcase form or your team chat.' : 'Copy is blocked in this browser. Use Print instead.');
  });
  $('builderPrint').addEventListener('click', () => window.print());
  $('builderImage').addEventListener('click', () => {
    const e = Object.fromEntries(entries());
    window.NAWAT.downloadCard({
      label: 'From AI Users to AI Makers', title: value('teamName'),
      subtitle: [e['Country / countries'], e['Team leader'] && 'Led by ' + e['Team leader']].filter(Boolean).join(' · '),
      filename: 'team-' + window.NAWAT.slug(value('teamName')),
      sections: entries().slice(2).filter(([l]) => !/Country|leader/.test(l)).map(([heading, v]) => ({ heading, lines: [v] }))
    });
    window.NAWAT.say(status, 'Image downloaded.');
  });

  form.addEventListener('reset', (e) => {
    if (!confirm('Clear all fields and delete the saved draft?')) { e.preventDefault(); return; }
    if (storage) { try { storage.removeItem(KEY); } catch (err) { /* ignore */ } }
    output.hidden = true; content.replaceChildren();
    $('saveState').textContent = 'Draft cleared.';
  });
})();

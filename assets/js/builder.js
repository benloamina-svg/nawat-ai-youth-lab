/* AI Makers team idea-builder: autosave (this browser only), idea card, copy, print, image. Bilingual via t(). */
(function () {
  'use strict';
  const form = document.getElementById('builderForm');
  if (!form) return;
  const $ = (id) => document.getElementById(id);
  const t = window.t;
  const status = $('builderStatus');
  const output = $('builderOutput');
  const content = $('builderContent');
  const KEY = 'nawat-ai-makers-draft-v1';

  // [field id, label key]
  const FIELDS = [
    ['teamName', 'bTeam'], ['leader', 'bLeader'], ['members', 'bMembers'], ['country', 'bCountry'], ['roles', 'bRoles'],
    ['challenge', 'bChallenge'], ['affected', 'bAffected'], ['aiHelp', 'bAI'], ['solution', 'bSolution'], ['nextStep', 'bNext']
  ];
  const value = (id) => $(id).value.trim();
  // Filled fields after the team name: [id, translated label, value]
  const entries = () => FIELDS.slice(1).map(([id, k]) => [id, t(k), value(id)]).filter(([, , v]) => v);

  /* ---- Autosave: stored only in this browser (localStorage), never sent anywhere ---- */
  const storage = (() => { try { const s = window.localStorage; s.setItem('__t', '1'); s.removeItem('__t'); return s; } catch (e) { return null; } })();
  function save() {
    if (!storage) return;
    try {
      storage.setItem(KEY, JSON.stringify(Object.fromEntries(FIELDS.map(([id]) => [id, $(id).value]))));
      $('saveState').textContent = t('draftSaved');
    } catch (e) { /* storage full or blocked: ignore */ }
  }
  function restore() {
    if (!storage) { $('saveState').textContent = t('noAutosave'); return; }
    try {
      const data = JSON.parse(storage.getItem(KEY) || 'null');
      if (data) {
        FIELDS.forEach(([id]) => { if (typeof data[id] === 'string') $(id).value = data[id]; });
        $('saveState').textContent = t('draftRestored');
      }
    } catch (e) { /* corrupted draft: ignore */ }
  }
  let timer;
  form.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(save, 400); });
  restore();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    content.replaceChildren();
    const title = document.createElement('h3');
    title.textContent = value('teamName');
    content.append(title);
    entries().forEach(([, label, v]) => {
      const h = document.createElement('h4'); h.textContent = label;
      const p = document.createElement('p'); p.textContent = v;
      content.append(h, p);
    });
    output.hidden = false;
    window.NAWAT.say(status, t('cardReady'));
    output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  $('builderCopy').addEventListener('click', async () => {
    const text = `${t('teamIdeaTitle')}\n\n${t('bTeam').toUpperCase()}\n${value('teamName')}\n\n` +
      entries().map(([, l, v]) => `${l.toUpperCase()}\n${v}`).join('\n\n') +
      `\n\n${t('cardFooter')}`;
    const ok = await window.NAWAT.copy(text);
    window.NAWAT.say(status, ok ? t('builderCopied') : t('copyBlocked'));
  });
  $('builderPrint').addEventListener('click', () => window.print());
  $('builderImage').addEventListener('click', () => {
    const sub = [value('country'), value('leader') && t('ledBy', { name: value('leader') })].filter(Boolean).join(' · ');
    window.NAWAT.downloadCard({
      label: t('workshopLabel'), title: value('teamName'), subtitle: sub,
      filename: 'team-' + window.NAWAT.slug(value('teamName')),
      sections: entries().filter(([id]) => id !== 'leader' && id !== 'country').map(([, heading, v]) => ({ heading, lines: [v] }))
    });
    window.NAWAT.say(status, t('imageDownloaded'));
  });

  form.addEventListener('reset', (e) => {
    if (!confirm(t('clearDraft'))) { e.preventDefault(); return; }
    if (storage) { try { storage.removeItem(KEY); } catch (err) { /* ignore */ } }
    output.hidden = true; content.replaceChildren();
    $('saveState').textContent = t('draftCleared');
  });
})();

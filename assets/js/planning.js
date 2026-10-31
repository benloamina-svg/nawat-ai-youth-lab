/* "Plan it" page: Initiative Canvas (13 blocks, autosave) + SMART Court game + SMART goal builder. */
(function () {
  'use strict';
  const P = window.PLANNING_DATA;
  const grid = document.getElementById('canvasGrid');
  if (!P || !grid) return;
  const $ = (id) => document.getElementById(id);
  const N = window.NAWAT;
  const t = window.t;
  const AR = !!window.NAWAT_RTL;
  const status = $('canvasStatus');
  const KEY = 'nawat-canvas-v1';

  const store = (() => { try { const s = localStorage; s.setItem('__t', '1'); s.removeItem('__t'); return s; } catch (e) { return null; } })();
  const read = (k) => { try { return store ? JSON.parse(store.getItem(k) || 'null') : null; } catch (e) { return null; } };
  const write = (k, v) => { try { store && store.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } };

  /* =========================== CANVAS =========================== */
  P.canvas.forEach((b, i) => {
    const box = document.createElement('div');
    box.className = 'canvas-block' + (b.wide ? ' wide' : '');
    const label = document.createElement('label');
    label.htmlFor = 'canvas-' + b.id;
    const num = document.createElement('span'); num.className = 'canvas-num'; num.textContent = String(i + 1).padStart(2, '0');
    label.append(num, document.createTextNode(' ' + b.title));
    const hint = document.createElement('small'); hint.id = 'hint-' + b.id; hint.textContent = b.hint;
    const ta = document.createElement('textarea');
    Object.assign(ta, { id: 'canvas-' + b.id, rows: b.wide ? 4 : 3, maxLength: 1200, dir: 'auto' });
    ta.setAttribute('aria-describedby', hint.id);
    box.append(label, hint, ta);
    grid.append(box);
  });

  const nameInput = $('canvasName');
  const fields = () => P.canvas.map((b) => [b, $('canvas-' + b.id)]);

  /* Grow each box to fit its text (screen and print). */
  function autosize(ta) { ta.style.height = 'auto'; ta.style.height = Math.max(ta.scrollHeight + 2, 90) + 'px'; }
  const sizeAll = () => fields().forEach(([, ta]) => autosize(ta));
  window.addEventListener('beforeprint', sizeAll);

  function progress() {
    const filled = fields().filter(([, ta]) => ta.value.trim()).length;
    $('canvasProgress').textContent = t('blocksFilled', { n: filled, total: P.canvas.length });
    $('canvasBar').style.width = Math.round((filled / P.canvas.length) * 100) + '%';
    fields().forEach(([, ta]) => ta.parentElement.classList.toggle('filled', !!ta.value.trim()));
    sizeAll();
  }
  function save() {
    const data = { name: nameInput.value };
    fields().forEach(([b, ta]) => { data[b.id] = ta.value; });
    write(KEY, data);
    progress();
  }
  function load() {
    const d = read(KEY);
    if (d) {
      nameInput.value = d.name || '';
      fields().forEach(([b, ta]) => { if (typeof d[b.id] === 'string') ta.value = d[b.id]; });
    }
    progress();
  }
  let timer;
  $('canvasForm').addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(save, 400); });
  load();

  /* Fill empty blocks from the last Idea Game card */
  function fillFromGame() {
    const idea = read('nawat-last-idea');
    if (!idea) { N.say(status, t('noGameCard')); return; }
    const map = {
      problem: idea.problem,
      target: idea.target,
      solution: `${idea.name}: ${idea.pitch}`,
      goal: t('goalFromIdea', { target: AR ? idea.target : idea.target.toLowerCase(), problem: AR ? idea.problem : idea.problem.toLowerCase(), skill: idea.skill }),
      activities: idea.steps.map((s, i) => `${i + 1}. ${s}`).join('\n'),
      team: idea.roles.map((r) => `- ${r}`).join('\n'),
      resources: idea.resources,
      budget: idea.zero,
      indicators: idea.indicators.map((r) => `- ${r}`).join('\n')
    };
    let n = 0;
    Object.entries(map).forEach(([id, v]) => {
      const box = $('canvas-' + id);
      if (box && !box.value.trim() && v) { box.value = v; n++; }
    });
    if (!nameInput.value.trim()) nameInput.value = idea.name;
    save();
    N.say(status, n ? t('filledFrom', { n, name: idea.name }) : t('nothingReplaced'));
  }
  $('canvasFromGame').addEventListener('click', fillFromGame);
  if (new URLSearchParams(location.search).get('from') === 'game') fillFromGame();

  const entries = () => fields().map(([b, ta]) => [b.title, ta.value.trim()]).filter(([, v]) => v);
  $('canvasCopy').addEventListener('click', async () => {
    const text = `${(nameInput.value || t('ourInitiative')).toUpperCase()} — ${t('canvasTitle')}\n\n` +
      entries().map(([h, v]) => `${h.toUpperCase()}\n${v}`).join('\n\n') + `\n\n${t('madeWith')}`;
    const ok = await N.copy(text);
    N.say(status, ok ? t('canvasCopied') : t('copyBlocked'));
  });
  $('canvasPrint').addEventListener('click', () => { document.body.classList.add('printing-canvas'); window.print(); });
  window.addEventListener('afterprint', () => document.body.classList.remove('printing-canvas'));
  $('canvasImage').addEventListener('click', () => {
    if (!entries().length) { N.say(status, t('fillOne')); return; }
    N.downloadCard({
      label: t('canvasTitle'), title: nameInput.value.trim() || t('ourInitiative'),
      subtitle: t('blocksDone', { n: entries().length }), filename: 'canvas-' + N.slug(nameInput.value || 'initiative'),
      sections: entries().map(([heading, v]) => ({ heading, lines: v.split('\n') }))
    });
    N.say(status, t('canvasImage'));
  });
  $('canvasClear').addEventListener('click', () => {
    if (!confirm(t('clearCanvas'))) return;
    nameInput.value = ''; fields().forEach(([, ta]) => { ta.value = ''; });
    save(); N.say(status, t('canvasCleared'));
  });

  /* ========================= SMART COURT ======================== */
  const L = ['S', 'M', 'A', 'R', 'T'];
  let round = 0, score = 0, answered = false;
  const courtGoal = $('courtGoal'), courtFeedback = $('courtFeedback');
  const toggles = $('courtToggles');
  L.forEach((l) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'letter-toggle'; b.dataset.letter = l;
    b.setAttribute('aria-pressed', 'false');
    b.innerHTML = '';
    const big = document.createElement('b'); big.textContent = l;
    const small = document.createElement('span'); small.textContent = P.letters[l].name;
    b.append(big, small);
    b.title = P.letters[l].question;
    b.addEventListener('click', () => {
      if (answered) return;
      b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
    });
    toggles.append(b);
  });

  function showRound() {
    const r = P.court[round];
    answered = false;
    $('courtRound').textContent = t('goalOf', { n: round + 1, total: P.court.length });
    $('courtScore').textContent = t('score', { n: score });
    courtGoal.textContent = t('quote', { text: r.goal });
    toggles.querySelectorAll('button').forEach((b) => { b.setAttribute('aria-pressed', 'false'); b.classList.remove('right', 'wrong', 'missed'); });
    courtFeedback.hidden = true; courtFeedback.replaceChildren();
    $('courtCheck').hidden = false; $('courtNext').hidden = true;
  }
  $('courtCheck').addEventListener('click', () => {
    const r = P.court[round];
    const picked = [...toggles.querySelectorAll('[aria-pressed="true"]')].map((b) => b.dataset.letter);
    const correct = picked.length === r.fails.length && picked.every((l) => r.fails.includes(l));
    if (correct) score++;
    answered = true;
    toggles.querySelectorAll('button').forEach((b) => {
      const l = b.dataset.letter, p = picked.includes(l), f = r.fails.includes(l);
      if (p && f) b.classList.add('right'); else if (p && !f) b.classList.add('wrong'); else if (!p && f) b.classList.add('missed');
    });
    const h = document.createElement('p'); h.className = 'verdict ' + (correct ? 'ok' : 'ko');
    h.textContent = correct ? t('correct') : t('notQuite', { list: r.fails.length ? r.fails.map((l) => l + ' (' + P.letters[l].name + ')').join(AR ? '، ' : ', ') : t('alreadySmart') });
    const why = document.createElement('p'); why.textContent = r.why;
    const fx = document.createElement('p'); fx.className = 'fixed';
    const fl = document.createElement('strong'); fl.textContent = t('smartVersion');
    fx.append(fl, document.createTextNode(r.fixed));
    courtFeedback.append(h, why, fx); courtFeedback.hidden = false;
    $('courtScore').textContent = t('score', { n: score });
    $('courtCheck').hidden = true; $('courtNext').hidden = false;
    $('courtNext').textContent = round === P.court.length - 1 ? t('seeResult') : t('nextGoal');
    $('courtNext').focus();
  });
  $('courtNext').addEventListener('click', () => {
    if (round < P.court.length - 1) { round++; showRound(); return; }
    const msg = score === P.court.length ? t('perfect') : score >= 4 ? t('great') : t('goodStart');
    courtGoal.textContent = t('scored', { n: score, total: P.court.length, msg });
    courtFeedback.hidden = true; toggles.hidden = true;
    $('courtNext').hidden = true; $('courtReplay').hidden = false;
    $('courtReplay').focus();
  });
  $('courtReplay').addEventListener('click', () => {
    round = 0; score = 0; toggles.hidden = false; $('courtReplay').hidden = true; showRound();
  });
  showRound();

  /* ======================== SMART BUILDER ======================= */
  const sb = (id) => $('smart-' + id).value.trim();
  function goalText() {
    const when = sb('when'), who = sb('who'), where = sb('where'), what = sb('what'), measure = sb('measure');
    if (!who && !what) return '';
    return (when ? t('gBy', { when }) : '') + (who || t('gWho')) + (where ? t('gIn', { where }) : '') + t('gWill', { what: what || t('gWhat') }) + (measure ? t('gMeasured', { measure }) : '') + t('gEnd');
  }
  function check() {
    const ok = {
      S: !!(sb('who') && sb('what') && sb('where')),
      M: /\d/.test(sb('measure') + ' ' + sb('what')),
      A: $('smart-achievable').checked,
      R: !!sb('need'),
      T: !!sb('when')
    };
    L.forEach((l) => {
      const badge = $('badge-' + l);
      badge.classList.toggle('ok', ok[l]);
      badge.setAttribute('aria-label', `${P.letters[l].name}: ${ok[l] ? t('yes') : t('notYet')}`);
    });
    const count = L.filter((l) => ok[l]).length;
    const text = goalText();
    $('smartPreview').textContent = text || t('goalPlaceholder');
    $('smartVerdict').textContent = count === 5 ? t('isSmart') : `${count} / 5 — ${L.filter((l) => !ok[l]).map((l) => P.letters[l].question).join(' ')}`;
    return { count, text };
  }
  $('smartForm').addEventListener('input', check);
  $('smartForm').addEventListener('change', check);
  check();

  $('smartToCanvas').addEventListener('click', () => {
    const { count, text } = check();
    if (!text) { N.say($('smartStatus'), t('writeFirst')); return; }
    const box = $('canvas-smart');
    box.value = (box.value.trim() ? box.value.trim() + '\n' : '') + '- ' + text;
    save();
    N.say($('smartStatus'), count === 5 ? t('addedToCanvas') : t('addedPartial', { n: count }));
  });
  $('smartCopy').addEventListener('click', async () => {
    const { text } = check();
    const ok = text && await N.copy(text);
    N.say($('smartStatus'), ok ? t('goalCopied') : t('writeFirst'));
  });
})();

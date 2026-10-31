/* "Plan it" page: Initiative Canvas (13 blocks, autosave) + SMART Court game + SMART goal builder. */
(function () {
  'use strict';
  const P = window.PLANNING_DATA;
  const grid = document.getElementById('canvasGrid');
  if (!P || !grid) return;
  const $ = (id) => document.getElementById(id);
  const N = window.NAWAT;
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
    Object.assign(ta, { id: 'canvas-' + b.id, rows: b.wide ? 4 : 3, maxLength: 1200 });
    ta.setAttribute('aria-describedby', hint.id);
    box.append(label, hint, ta);
    grid.append(box);
  });

  const nameInput = $('canvasName');
  const fields = () => P.canvas.map((b) => [b, $('canvas-' + b.id)]);

  /* Grow each box to fit its text (screen and print). */
  function autosize(t) { t.style.height = 'auto'; t.style.height = Math.max(t.scrollHeight + 2, 90) + 'px'; }
  const sizeAll = () => fields().forEach(([, t]) => autosize(t));
  window.addEventListener('beforeprint', sizeAll);

  function progress() {
    const filled = fields().filter(([, t]) => t.value.trim()).length;
    $('canvasProgress').textContent = `${filled} / ${P.canvas.length} blocks filled`;
    $('canvasBar').style.width = Math.round((filled / P.canvas.length) * 100) + '%';
    fields().forEach(([, t]) => t.parentElement.classList.toggle('filled', !!t.value.trim()));
    sizeAll();
  }
  function save() {
    const data = { name: nameInput.value };
    fields().forEach(([b, t]) => { data[b.id] = t.value; });
    write(KEY, data);
    progress();
  }
  function load() {
    const d = read(KEY);
    if (d) {
      nameInput.value = d.name || '';
      fields().forEach(([b, t]) => { if (typeof d[b.id] === 'string') t.value = d[b.id]; });
    }
    progress();
  }
  let timer;
  $('canvasForm').addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(save, 400); });
  load();

  /* Fill empty blocks from the last Idea Game card */
  function fillFromGame() {
    const idea = read('nawat-last-idea');
    if (!idea) { N.say(status, 'No Idea Game card found on this device yet. Generate one first in the Initiative Idea Game.'); return; }
    const map = {
      problem: idea.problem,
      target: idea.target,
      solution: `${idea.name}: ${idea.pitch}`,
      goal: `Help ${idea.target.toLowerCase()} tackle "${idea.problem.toLowerCase()}" while building ${idea.skill}.`,
      activities: idea.steps.map((s, i) => `${i + 1}. ${s}`).join('\n'),
      team: idea.roles.map((r) => `- ${r}`).join('\n'),
      resources: idea.resources,
      budget: idea.zero,
      indicators: idea.indicators.map((r) => `- ${r}`).join('\n')
    };
    let n = 0;
    Object.entries(map).forEach(([id, v]) => {
      const t = $('canvas-' + id);
      if (t && !t.value.trim() && v) { t.value = v; n++; }
    });
    if (!nameInput.value.trim()) nameInput.value = idea.name;
    save();
    N.say(status, n ? `Filled ${n} empty blocks from "${idea.name}". Now write your SMART objectives below.` : 'Those blocks already have text, so nothing was replaced.');
  }
  $('canvasFromGame').addEventListener('click', fillFromGame);
  if (new URLSearchParams(location.search).get('from') === 'game') fillFromGame();

  const entries = () => fields().map(([b, t]) => [b.title, t.value.trim()]).filter(([, v]) => v);
  $('canvasCopy').addEventListener('click', async () => {
    const text = `${(nameInput.value || 'Our initiative').toUpperCase()} — Initiative Canvas\n\n` +
      entries().map(([h, v]) => `${h.toUpperCase()}\n${v}`).join('\n\n') + '\n\nMade with NAWAT AI Youth Lab';
    const ok = await N.copy(text);
    N.say(status, ok ? 'Canvas copied.' : 'Copy is blocked in this browser. Use Print instead.');
  });
  $('canvasPrint').addEventListener('click', () => { document.body.classList.add('printing-canvas'); window.print(); });
  window.addEventListener('afterprint', () => document.body.classList.remove('printing-canvas'));
  $('canvasImage').addEventListener('click', () => {
    if (!entries().length) { N.say(status, 'Fill at least one block first.'); return; }
    N.downloadCard({
      label: 'Initiative Canvas', title: nameInput.value.trim() || 'Our initiative',
      subtitle: `${entries().length} of 13 blocks completed`, filename: 'canvas-' + N.slug(nameInput.value || 'initiative'),
      sections: entries().map(([heading, v]) => ({ heading, lines: v.split('\n') }))
    });
    N.say(status, 'Canvas image downloaded.');
  });
  $('canvasClear').addEventListener('click', () => {
    if (!confirm('Clear the whole canvas on this device?')) return;
    nameInput.value = ''; fields().forEach(([, t]) => { t.value = ''; });
    save(); N.say(status, 'Canvas cleared.');
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
    $('courtRound').textContent = `Goal ${round + 1} of ${P.court.length}`;
    $('courtScore').textContent = `Score: ${score}`;
    courtGoal.textContent = `“${r.goal}”`;
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
    h.textContent = correct ? 'Correct verdict! ✓' : `Not quite. It fails: ${r.fails.length ? r.fails.map((l) => l + ' (' + P.letters[l].name + ')').join(', ') : 'nothing — it is already SMART'}.`;
    const why = document.createElement('p'); why.textContent = r.why;
    const fx = document.createElement('p'); fx.className = 'fixed';
    const fl = document.createElement('strong'); fl.textContent = 'SMART version: ';
    fx.append(fl, document.createTextNode(r.fixed));
    courtFeedback.append(h, why, fx); courtFeedback.hidden = false;
    $('courtScore').textContent = `Score: ${score}`;
    $('courtCheck').hidden = true; $('courtNext').hidden = false;
    $('courtNext').textContent = round === P.court.length - 1 ? 'See my result' : 'Next goal →';
    $('courtNext').focus();
  });
  $('courtNext').addEventListener('click', () => {
    if (round < P.court.length - 1) { round++; showRound(); return; }
    const msg = score === P.court.length ? 'Perfect score — you are a SMART judge!' : score >= 4 ? 'Great job! You can spot weak goals.' : 'Good start. Read the SMART versions again and replay.';
    courtGoal.textContent = `You scored ${score} / ${P.court.length}. ${msg}`;
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
    return `${when ? 'By ' + when + ', ' : ''}${who || '[who]'}${where ? ' in ' + where : ''} will ${what || '[do what]'}${measure ? ', measured by ' + measure : ''}.`;
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
      badge.setAttribute('aria-label', `${P.letters[l].name}: ${ok[l] ? 'yes' : 'not yet'}`);
    });
    const count = L.filter((l) => ok[l]).length;
    const text = goalText();
    $('smartPreview').textContent = text || 'Your goal will appear here as you type.';
    $('smartVerdict').textContent = count === 5 ? 'Your goal is SMART ✓' : `${count} / 5 — ${L.filter((l) => !ok[l]).map((l) => P.letters[l].question).join(' ')}`;
    return { count, text };
  }
  $('smartForm').addEventListener('input', check);
  $('smartForm').addEventListener('change', check);
  check();

  $('smartToCanvas').addEventListener('click', () => {
    const { count, text } = check();
    if (!text) { N.say($('smartStatus'), 'Write your goal first.'); return; }
    const t = $('canvas-smart');
    t.value = (t.value.trim() ? t.value.trim() + '\n' : '') + '- ' + text;
    save();
    N.say($('smartStatus'), count === 5 ? 'Added to block 05 of your canvas.' : `Added to the canvas (${count}/5 SMART — you can improve it later).`);
  });
  $('smartCopy').addEventListener('click', async () => {
    const { text } = check();
    const ok = text && await N.copy(text);
    N.say($('smartStatus'), ok ? 'Goal copied.' : 'Write your goal first.');
  });
})();

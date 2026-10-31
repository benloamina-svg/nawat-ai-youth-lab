/* Initiative Idea Game: builds option chips from GAME_DATA and generates an Initiative Card.
   Rule-based (no AI API, no keys): it combines the user's choices with curated templates. */
(function () {
  'use strict';
  const D = window.GAME_DATA;
  const form = document.getElementById('gameForm');
  if (!D || !form) return;

  const $ = (id) => document.getElementById(id);
  const t = window.t;
  const AR = !!window.NAWAT_RTL;
  const status = $('gameStatus');
  const out = $('ideaResult');
  let current = null; // last generated initiative

  const pick = (arr, avoid) => {
    const pool = arr.length > 1 && avoid !== undefined ? arr.filter((x) => x !== avoid) : arr;
    return pool[Math.floor(Math.random() * pool.length)];
  };
  const fill = (tpl, v) => tpl.replace(/\{(\w+)\}/g, (m, k) => (v[k] !== undefined ? v[k] : m));
  const lowerFirst = (s) => s.charAt(0).toLowerCase() + s.slice(1);

  /* ---- Build chip groups (radio buttons = keyboard accessible) ---- */
  function chips(containerId, name, entries) {
    const box = $(containerId);
    entries.forEach(([value, label], i) => {
      const id = `${name}-${value}`;
      const input = document.createElement('input');
      Object.assign(input, { type: 'radio', name, value, id, className: 'chip-input' });
      if (i === 0) input.required = true;
      const lab = document.createElement('label');
      lab.htmlFor = id; lab.className = 'chip'; lab.textContent = label;
      box.append(input, lab);
    });
  }
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  chips('themeChips', 'theme', Object.entries(D.themes).map(([k, t]) => [k, t.label]));
  chips('targetChips', 'target', Object.entries(D.targets).map(([k, t]) => [k, cap(t)]));
  chips('skillChips', 'skill', Object.entries(D.skills).map(([k, t]) => [k, cap(t)]));
  chips('formatChips', 'format', Object.entries(D.formats).map(([k, t]) => [k, t.label]));
  chips('orgChips', 'org', Object.entries(D.orgs).map(([k, t]) => [k, t.label]));
  chips('materialChips', 'material', Object.entries(D.materials).map(([k, t]) => [k, t.label]));

  /* ---- Problem suggestions follow the selected theme ---- */
  const problemInput = $('problem');
  const sugBox = $('problemSuggestions');
  function showSuggestions(themeKey) {
    sugBox.replaceChildren();
    const th = D.themes[themeKey];
    if (!th) { sugBox.textContent = t('pickTheme'); return; }
    th.problems.forEach((p) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'suggestion'; b.textContent = p;
      b.addEventListener('click', () => { problemInput.value = p; problemInput.focus(); });
      sugBox.append(b);
    });
  }
  form.addEventListener('change', (e) => { if (e.target.name === 'theme') showSuggestions(e.target.value); });
  showSuggestions(null);

  const val = (name) => (form.querySelector(`input[name="${name}"]:checked`) || {}).value;

  /* ---- Generate ---- */
  function generate(choice) {
    const theme = D.themes[choice.theme];
    const fmt = D.formats[choice.format];
    const org = D.orgs[choice.org];
    const mat = D.materials[choice.material];
    const twist = choice.twist || pick(theme.twists, current && current.twist);
    const word = pick(theme.names, current && current.word);
    const name = choice.name || (D.suffixFirst ? `${fmt.suffix} ${word}` : `${word} ${fmt.suffix}`);
    const v = {
      theme: theme.label.toLowerCase(), target: D.targets[choice.target], skill: D.skills[choice.skill],
      problem: lowerFirst(choice.problem), twist, format: fmt.label.toLowerCase(), name,
      aformat: AR ? fmt.label : (/^[aeiou]/i.test(fmt.label) ? 'an ' : 'a ') + fmt.label.toLowerCase(),
      org: org.inText || org.label, materials: mat.label.toLowerCase()
    };
    v.Aformat = cap(v.aformat);
    current = {
      choice, twist, name, v, word,
      pitch: fill(pick(D.pitches), v),
      steps: fmt.steps.map((s) => fill(s, v)),
      resources: mat.plan,
      zero: D.zeroBudget,
      roles: org.roles,
      indicators: fmt.indicators.map((s) => fill(s, v)),
      prompts: D.prompts.map((p) => ({ title: p.title, text: fill(p.text, v) }))
    };
    render();
  }

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function list(items, ordered) {
    const l = el(ordered ? 'ol' : 'ul');
    items.forEach((item) => l.append(el('li', '', item)));
    return l;
  }

  function render() {
    const c = current, v = c.v;
    const card = $('ideaCard');
    card.replaceChildren();

    const head = el('div', 'idea-head');
    head.append(el('p', 'tag', `${D.formats[c.choice.format].label} · ${D.orgs[c.choice.org].label} · ${D.themes[c.choice.theme].label}`));
    head.append(el('h3', 'idea-name', c.name));
    head.append(el('p', 'idea-pitch', c.pitch));
    card.append(head);

    const facts = el('dl', 'idea-facts');
    [[t('fProblem'), c.choice.problem], [t('fWho'), cap(v.target)], [t('fSkills'), cap(v.skill)], [t('fTwist'), cap(c.twist)]]
      .forEach(([k, val]) => { facts.append(el('dt', '', k), el('dd', '', val)); });
    card.append(facts);

    const sec = (title, node, cls) => {
      const s = el('section', 'idea-section' + (cls ? ' ' + cls : ''));
      s.append(el('h4', '', title), node);
      card.append(s);
    };
    sec(t('sPlan'), list(c.steps, true));
    sec(t('sHave'), el('p', '', c.resources));
    sec(t('sZero'), el('p', '', c.zero), 'zero');
    sec(t('sRoles'), list(c.roles));
    sec(t('sIndicators'), list(c.indicators));

    // AI prompts
    const pBox = $('promptList');
    pBox.replaceChildren();
    c.prompts.forEach((p, i) => {
      const item = el('article', 'prompt-card');
      item.append(el('h4', '', `${i + 1}. ${p.title}`));
      const pre = el('p', 'prompt-text', p.text);
      const btn = el('button', 'button button-small', t('copyPrompt'));
      btn.type = 'button';
      btn.addEventListener('click', async () => {
        const ok = await window.NAWAT.copy(p.text);
        window.NAWAT.say(status, ok ? t('promptCopied') : t('promptCopyFailed'));
      });
      item.append(pre, btn);
      pBox.append(item);
    });

    // Remember this idea (this device only) so the Initiative Canvas can pre-fill from it.
    try {
      localStorage.setItem('nawat-last-idea', JSON.stringify({
        name: c.name, pitch: c.pitch, problem: c.choice.problem, target: cap(v.target), skill: v.skill,
        steps: c.steps, roles: c.roles, resources: c.resources, zero: c.zero, indicators: c.indicators
      }));
    } catch (e) { /* storage blocked: canvas pre-fill just won't be offered */ }

    out.hidden = false;
    window.NAWAT.say(status, t('ideaReady', { name: c.name }));
    $('ideaCard').focus({ preventScroll: true });
    out.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function asText() {
    const c = current;
    return [
      `${c.name.toUpperCase()} — ${t('ideaByline')}`, c.pitch, '',
      `${t('fProblem')}: ${c.choice.problem}`, `${t('fWho')}: ${cap(c.v.target)}`, `${t('fSkills')}: ${cap(c.v.skill)}`, `${t('fTwist')}: ${cap(c.twist)}`, '',
      t('sPlan').toUpperCase(), ...c.steps.map((s, i) => `${i + 1}. ${s}`), '',
      t('sHave').toUpperCase(), c.resources, '', t('sZero').toUpperCase(), c.zero, '',
      t('sRoles').toUpperCase(), ...c.roles.map((r) => `- ${r}`), '',
      t('sIndicators').toUpperCase(), ...c.indicators.map((r) => `- ${r}`), '',
      t('sAI').toUpperCase(), ...c.prompts.map((p, i) => `${i + 1}. ${p.title}:\n${p.text}`)
    ].join('\n');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const keys = ['theme', 'target', 'skill', 'format', 'org', 'material'];
    const missing = keys.filter((k) => !val(k));
    if (missing.length) {
      const first = form.querySelector(`input[name="${missing[0]}"]`);
      window.NAWAT.say(status, t('pleaseChoose', { list: missing.map((k) => t('k_' + k)).join(AR ? '، ' : ', ') }));
      first && first.focus();
      return;
    }
    const choice = Object.fromEntries(keys.map((k) => [k, val(k)]));
    choice.problem = problemInput.value.trim() || D.themes[choice.theme].problems[0];
    current = null;
    generate(choice);
  });

  $('shuffleIdea').addEventListener('click', () => {
    if (!current) return;
    const choice = Object.assign({}, current.choice, { twist: undefined, name: undefined });
    generate(choice);
  });

  $('exampleIdea').addEventListener('click', () => {
    const ex = D.example;
    ['theme', 'target', 'skill', 'format', 'org', 'material'].forEach((k) => {
      const input = $(`${k}-${ex[k]}`);
      if (input) input.checked = true;
    });
    showSuggestions(ex.theme);
    problemInput.value = ex.problem;
    current = null;
    generate(Object.assign({}, ex));
  });

  $('copyIdea').addEventListener('click', async () => {
    const ok = await window.NAWAT.copy(asText());
    window.NAWAT.say(status, ok ? t('ideaCopied') : t('copyBlocked'));
  });
  $('printIdea').addEventListener('click', () => window.print());
  $('imageIdea').addEventListener('click', () => {
    const c = current;
    window.NAWAT.downloadCard({
      label: t('gameLabel'), title: c.name, subtitle: c.pitch, filename: window.NAWAT.slug(c.name),
      sections: [
        { heading: t('fProblem'), lines: [c.choice.problem] },
        { heading: t('sWhoSkills'), lines: [`${cap(c.v.target)} · ${cap(c.v.skill)}`] },
        { heading: t('sPlan'), lines: c.steps },
        { heading: t('sZero'), lines: [cap(c.zero.replace(/^[^:：]{0,40}[:：]\s*/, ''))] },
        { heading: t('sIndicators'), lines: c.indicators }
      ]
    });
    window.NAWAT.say(status, t('imageDone'));
  });
  $('newIdea').addEventListener('click', () => {
    out.hidden = true; current = null;
    form.reset(); showSuggestions(null);
    form.scrollIntoView({ behavior: 'smooth' });
  });
})();

/* Shared behaviour for every page: navigation, config links, copy, image cards. */
(function () {
  'use strict';
  const cfg = window.SITE_CONFIG || {};

  /* ---- Mobile navigation ---- */
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  /* ---- Mark current page in navigation ---- */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach((a) => {
    if (a.getAttribute('href') === page) a.setAttribute('aria-current', 'page');
  });

  /* ---- Fill links from config (forms, email) ---- */
  const links = { showcase: cfg.showcaseFormUrl, feedback: cfg.feedbackFormUrl };
  document.querySelectorAll('[data-form]').forEach((el) => {
    const url = links[el.dataset.form];
    if (url && /^https:\/\//.test(url)) {
      el.href = url; el.target = '_blank'; el.rel = 'noopener noreferrer';
    } else {
      el.removeAttribute('href');
      el.classList.add('is-disabled');
      el.setAttribute('aria-disabled', 'true');
      el.textContent = el.textContent.replace(/[↗→]/g, '').trim() + ' (link coming soon)';
    }
  });
  document.querySelectorAll('[data-email]').forEach((el) => {
    if (!cfg.contactEmail) return;
    el.href = 'mailto:' + cfg.contactEmail;
    if (!el.textContent.trim()) el.textContent = cfg.contactEmail;
  });
  document.querySelectorAll('[data-site-url]').forEach((el) => { el.textContent = cfg.siteUrl || ''; });
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ---- Helpers shared with other scripts ---- */
  const NAWAT = (window.NAWAT = window.NAWAT || {});

  /** Copy text to clipboard, with a fallback for older browsers. */
  NAWAT.copy = async function (text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      ta.remove();
      return ok;
    }
  };

  /** Show a short status message in an aria-live element. */
  NAWAT.say = function (el, msg) {
    if (!el) return;
    el.textContent = msg;
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.textContent = ''; }, 5000);
  };

  /* ---- Image card (PNG) drawn with the native Canvas API ---- */
  const C = { navy: '#0A1628', surface: '#0F2034', border: '#1E3A55', emerald: '#00C07A', gold: '#F0B429', sky: '#EBF4FF', muted: '#9FB6CC' };
  const FONT = 'Calibri, Inter, "Segoe UI", Arial, sans-serif';

  function wrap(ctx, text, maxW) {
    const out = [];
    String(text).split('\n').forEach((para) => {
      let line = '';
      para.split(/\s+/).forEach((word) => {
        const test = line ? line + ' ' + word : word;
        if (ctx.measureText(test).width > maxW && line) { out.push(line); line = word; } else { line = test; }
      });
      out.push(line);
    });
    return out;
  }

  function drawMark(ctx, x, y, r) {
    const hex = (rad) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 3 * i - Math.PI / 2;
        ctx[i ? 'lineTo' : 'moveTo'](x + rad * Math.cos(a), y + rad * Math.sin(a));
      }
      ctx.closePath();
    };
    ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,192,122,.45)'; hex(r); ctx.stroke();
    ctx.lineWidth = 3; ctx.strokeStyle = C.emerald; hex(r * 0.68); ctx.stroke();
    ctx.fillStyle = C.emerald; ctx.beginPath(); ctx.arc(x, y, r * 0.24, 0, 7); ctx.fill();
    ctx.fillStyle = C.navy; ctx.beginPath(); ctx.arc(x, y, r * 0.12, 0, 7); ctx.fill();
    ctx.fillStyle = C.gold; ctx.beginPath();
    ctx.arc(x + r * 0.68 * Math.cos(-Math.PI / 6), y + r * 0.68 * Math.sin(-Math.PI / 6), r * 0.1, 0, 7); ctx.fill();
  }

  /**
   * Build and download a branded PNG card.
   * data = { label, title, subtitle, sections: [{ heading, lines: [string] }], filename }
   */
  NAWAT.downloadCard = function (data) {
    const W = 1080, PAD = 80, inner = W - PAD * 2;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // First pass: measure height.
    const layout = [];
    let h = 230;
    ctx.font = `700 54px ${FONT}`;
    const titleLines = wrap(ctx, data.title, inner); h += titleLines.length * 64;
    ctx.font = `400 28px ${FONT}`;
    const subLines = data.subtitle ? wrap(ctx, data.subtitle, inner) : []; h += subLines.length * 40 + 30;
    data.sections.forEach((s) => {
      ctx.font = `400 27px ${FONT}`;
      const lines = [];
      s.lines.filter(Boolean).forEach((l, i, arr) => {
        const prefix = arr.length > 1 ? '•  ' : '';
        wrap(ctx, prefix + l, inner - 30).forEach((w) => lines.push(w));
      });
      layout.push({ heading: s.heading, lines });
      h += 60 + lines.length * 38 + 26;
    });
    h += 120;

    canvas.width = W; canvas.height = h;

    // Background
    ctx.fillStyle = C.navy; ctx.fillRect(0, 0, W, h);
    ctx.strokeStyle = 'rgba(0,192,122,.12)'; ctx.lineWidth = 2;
    [220, 320, 420].forEach((r) => { ctx.beginPath(); ctx.arc(W, 0, r, 0, 7); ctx.stroke(); });

    // Header
    drawMark(ctx, PAD + 34, 100, 34);
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = C.sky; ctx.font = `700 26px ${FONT}`;
    ctx.fillText('N A W A T   A I', PAD + 90, 96);
    ctx.fillStyle = C.emerald; ctx.font = `700 15px ${FONT}`;
    ctx.fillText((data.label || 'YOUTH LAB').toUpperCase(), PAD + 90, 124);

    let y = 230;
    ctx.fillStyle = C.sky; ctx.font = `700 54px ${FONT}`;
    titleLines.forEach((l) => { ctx.fillText(l, PAD, y); y += 64; });
    ctx.fillStyle = C.muted; ctx.font = `400 28px ${FONT}`;
    subLines.forEach((l) => { ctx.fillText(l, PAD, y); y += 40; });
    ctx.fillStyle = C.emerald; ctx.fillRect(PAD, y, 60, 4); y += 40;

    layout.forEach((s) => {
      y += 20;
      ctx.fillStyle = C.emerald; ctx.font = `700 19px ${FONT}`;
      ctx.fillText(s.heading.toUpperCase(), PAD, y); y += 40;
      ctx.fillStyle = C.sky; ctx.font = `400 27px ${FONT}`;
      s.lines.forEach((l) => { ctx.fillText(l, PAD + 4, y); y += 38; });
      y += 6;
    });

    // Footer
    ctx.fillStyle = 'rgba(0,192,122,.25)'; ctx.fillRect(PAD, h - 80, inner, 1);
    ctx.fillStyle = '#7A98B2'; ctx.font = `700 16px ${FONT}`;
    ctx.fillText('NAWAT AI YOUTH LAB  ·  PROBLEM → AI → SOLUTION → ACTION', PAD, h - 42);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = (data.filename || 'nawat-ai-card') + '.png';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }, 'image/png');
  };

  /* ---- Generic copy buttons: <button data-copy="elementId"> ---- */
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const src = document.getElementById(btn.dataset.copy);
      if (!src) return;
      const ok = await NAWAT.copy(src.textContent.trim());
      const old = btn.textContent;
      btn.textContent = ok ? 'Copied ✓' : 'Copy failed';
      setTimeout(() => { btn.textContent = old; }, 1800);
    });
  });

  /** Turn a title into a safe file name. */
  NAWAT.slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50) || 'card';
})();

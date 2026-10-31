/* Hero constellation: a "nucleus" cloud of tiny outlined triangles in NAWAT colours.
   Pure Canvas 2D, no library. Pauses when off-screen; static if the visitor prefers reduced motion. */
(function () {
  'use strict';
  const canvas = document.querySelector('.constellation');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const COLORS = ['#00C07A', '#12D58E', '#00C07A', '#F0B429', '#EBF4FF', '#7FE0B8', '#2DD4BF', '#00C07A'];
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, particles = [], running = false, raf = 0, t0 = performance.now();

  // Organic blob radius for angle a (0..1 of the half-size)
  const blob = (a) => 0.78 + 0.1 * Math.sin(3 * a + 0.6) + 0.06 * Math.sin(5 * a + 2.1) + 0.04 * Math.cos(7 * a);

  function build() {
    const n = Math.round(Math.min(W, H) * 1.35); // density scales with size
    particles = [];
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const ambient = Math.random() < 0.12;
      // denser towards the centre, plus a few ambient ones outside the cloud
      const rr = ambient ? blob(a) * (1.02 + Math.random() * 0.35) : blob(a) * Math.pow(Math.random(), 0.62);
      particles.push({
        a, rr,
        size: (ambient ? 1.6 : 2) + Math.random() * (ambient ? 2 : 3.6),
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.6,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        alpha: ambient ? 0.25 + Math.random() * 0.25 : 0.45 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2,
        drift: 0.015 + Math.random() * 0.03
      });
    }
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build(); draw(performance.now());
  }

  function tri(x, y, s, rot) {
    ctx.beginPath();
    for (let k = 0; k < 3; k++) {
      const ang = rot + k * 2.0944;
      const px = x + s * Math.cos(ang), py = y + s * Math.sin(ang);
      k ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
    }
    ctx.closePath(); ctx.stroke();
  }

  function draw(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2;
    ctx.lineWidth = 1.1;
    for (const p of particles) {
      const a = p.a + (reduce ? 0 : t * p.drift);
      const breathe = reduce ? 1 : 1 + 0.025 * Math.sin(t * 0.8 + p.phase);
      const x = cx + Math.cos(a) * p.rr * R * breathe;
      const y = cy + Math.sin(a) * p.rr * R * 0.92 * breathe;
      ctx.globalAlpha = reduce ? p.alpha : p.alpha * (0.65 + 0.35 * Math.sin(t * 1.4 + p.phase));
      ctx.strokeStyle = p.color;
      tri(x, y, p.size, p.rot + (reduce ? 0 : t * p.spin));
    }
    ctx.globalAlpha = 1;
  }

  function loop(now) { draw(now); if (running) raf = requestAnimationFrame(loop); }
  function start() { if (reduce || running) return; running = true; raf = requestAnimationFrame(loop); }
  function stop() { running = false; cancelAnimationFrame(raf); }

  resize();
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? start() : stop()))).observe(canvas);
  } else start();
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
})();

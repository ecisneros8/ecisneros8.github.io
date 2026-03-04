/**
 * Turbulent Reacting Flow Simulation
 * The Cisneros Group – ecisneros8.github.io
 *
 * Particle streamline visualization of a turbulent flow field.
 * Colors progress from deep blue (cold/inlet) → teal → orange → yellow-white
 * (hot/reacted), evoking a compressible reacting flow cross-section.
 */
(function () {
  'use strict';

  function init() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var W, H;

    function resize() {
      W = canvas.width  = canvas.offsetWidth  || canvas.parentElement.offsetWidth  || window.innerWidth;
      H = canvas.height = canvas.offsetHeight || canvas.parentElement.offsetHeight || 420;
    }
    resize();

    window.addEventListener('resize', function () {
      resize();
      ctx.fillStyle = '#060816';
      ctx.fillRect(0, 0, W, H);
    });

    /* ── Noise-based flow field ──────────────────────────────── */
    // Smooth turbulence via a sum of sine harmonics (no external library needed)
    function turbulence(x, y, t) {
      var nx = x / Math.max(W, 1);
      var ny = y / Math.max(H, 1);
      return (
        0.50 * Math.sin(nx *  6.28 + ny *  5.24 + t * 0.00038) +
        0.28 * Math.sin(nx * 14.14 - ny *  8.60 + t * 0.00061) +
        0.15 * Math.sin(nx * 28.27 + ny * 18.85 - t * 0.00028) +
        0.07 * Math.sin(nx * 51.42 - ny * 37.70 + t * 0.00094)
      ); // amplitude ∈ [-1, 1]
    }

    function flowAngle(x, y, t) {
      return turbulence(x, y, t) * Math.PI * 2.3;
    }

    /* ── Particle ────────────────────────────────────────────── */
    function Particle() { this.spawn(); }

    Particle.prototype.spawn = function () {
      // 70 % from the left inlet, 30 % scattered (mimics inflow + entrainment)
      if (Math.random() < 0.70) {
        this.x = Math.random() * W * 0.22;
        this.y = Math.random() * H;
      } else {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
      }
      this.px       = this.x;
      this.py       = this.y;
      this.age      = 0;
      this.lifespan = 140 + Math.floor(Math.random() * 200);
      this.speed    = 0.55 + Math.random() * 1.25;
      this.lw       = 0.8  + Math.random() * 1.4;   // line width
    };

    Particle.prototype.step = function (t) {
      this.px = this.x;
      this.py = this.y;

      var angle = flowAngle(this.x, this.y, t);
      // Turbulent intensity fluctuates slightly with particle age (intermittency)
      var ti = 0.65 + 0.45 * Math.sin(this.age * 0.043 + this.speed * 2.1);

      // Mean rightward flow  +  turbulent fluctuation (anisotropic: less in y)
      this.x += 0.55 + Math.cos(angle) * this.speed * ti;
      this.y += (-0.05 + Math.sin(angle) * this.speed * ti * 0.55);

      this.age += 1;

      return (
        this.age > this.lifespan ||
        this.x > W + 3 || this.x < -3 ||
        this.y > H + 3 || this.y < -3
      );
    };

    Particle.prototype.draw = function () {
      var p = this.age / this.lifespan; // progress 0 → 1

      // Fade-in fast, fade-out gradually
      var alpha = Math.min(p * 7, 1.0) * Math.pow(1.0 - p, 1.1) * 0.88;
      if (alpha < 0.005) return;

      // Color: hue 220° (blue) → 25° (orange) for p ∈ [0, 0.75]
      //        hue 25° → 56° (yellow) for p ∈ [0.75, 1.0]
      var hue;
      if (p < 0.75) {
        hue = 220 - (p / 0.75) * 195;  // 220 → 25
      } else {
        hue = 25 + ((p - 0.75) / 0.25) * 31; // 25 → 56
      }
      var sat   = 82  + p * 18;   // 82 % → 100 %
      var light = 42  + p * 30;   // 42 % → 72 %

      ctx.beginPath();
      ctx.moveTo(this.px, this.py);
      ctx.lineTo(this.x,  this.y);
      ctx.strokeStyle = (
        'hsla(' + hue.toFixed(0) + ',' +
        sat.toFixed(0)   + '%,' +
        light.toFixed(0) + '%,' +
        alpha.toFixed(3) + ')'
      );
      ctx.lineWidth = this.lw * (1.0 + p * 0.5);
      ctx.stroke();
    };

    /* ── Initialise particle pool ────────────────────────────── */
    var N = 390;
    var particles = [];
    for (var i = 0; i < N; i++) {
      var p = new Particle();
      // Stagger ages so we don't see a flash of particles all spawning at once
      p.age = Math.floor(Math.random() * p.lifespan);
      p.x   = Math.random() * W;
      p.y   = Math.random() * H;
      p.px  = p.x;
      p.py  = p.y;
      particles.push(p);
    }

    /* ── Animation loop ──────────────────────────────────────── */
    var frame = 0;

    function loop() {
      // Slow fade of the background → creates particle trails
      ctx.fillStyle = 'rgba(6, 8, 22, 0.13)';
      ctx.fillRect(0, 0, W, H);

      for (var i = 0; i < N; i++) {
        var dead = particles[i].step(frame);
        if (dead) {
          particles[i].spawn();
        } else {
          particles[i].draw();
        }
      }

      frame++;
      requestAnimationFrame(loop);
    }

    // Initial solid background fill
    ctx.fillStyle = '#060816';
    ctx.fillRect(0, 0, W, H);

    loop();
  }

  // Start once the DOM is ready (script is placed at end of <body>)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());

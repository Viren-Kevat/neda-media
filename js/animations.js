(function () {
  'use strict';

  if (typeof anime === 'undefined') return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Split text to chars ────────────────────────────── */
  function splitToChars(selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      var text = el.textContent;
      el.textContent = '';
      text.split('').forEach(function (ch) {
        var span = document.createElement('span');
        span.className = 'char-wrap';
        span.textContent = ch === ' ' ? ' ' : ch;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(110%)';
        el.appendChild(span);
      });
    });
  }

  /* ── Split text to words ────────────────────────────── */
  function splitToWords(el) {
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach(function (word, i) {
      var wrap = document.createElement('span');
      wrap.className = 'word-wrap';
      var inner = document.createElement('span');
      inner.className = 'word-inner';
      inner.textContent = word;
      inner.style.cssText = 'display:inline-block; transform:translateY(105%); opacity:0;';
      wrap.appendChild(inner);
      if (i < words.length - 1) wrap.appendChild(document.createTextNode(' '));
      el.appendChild(wrap);
    });
  }

  /* ══════════════════════════════════════════════════════
     HERO ENTRANCE (index.html)
  ══════════════════════════════════════════════════════ */
  function initHeroEntrance() {
    var heroLabel  = document.querySelector('.hero__label');
    var heroTitle  = document.querySelector('.hero__title');
    var heroSub    = document.querySelector('.hero__subtitle');
    var heroActs   = document.querySelector('.hero__actions');
    var heroScroll = document.querySelector('.hero__scroll');

    if (!heroTitle) return;

    /* Disable CSS animations — Anime.js takes over */
    [heroLabel, heroTitle, heroSub, heroActs, heroScroll].forEach(function (el) {
      if (el) { el.style.animation = 'none'; el.style.opacity = '1'; }
    });

    /* Split lines into chars */
    splitToChars('.hero__title .split-line[data-split]');

    var tl = anime.timeline({ easing: 'cubicBezier(0.16,1,0.3,1)', autoplay: true });

    if (heroLabel) {
      tl.add({ targets: heroLabel, opacity: [0, 1], translateY: [18, 0], duration: 700 }, 250);
    }

    var splitLines = document.querySelectorAll('.hero__title .split-line');
    var line1 = splitLines.length > 0 ? splitLines[0].querySelectorAll('.char-wrap') : [];
    if (line1.length) {
      tl.add({
        targets: line1,
        translateY: ['110%', '0%'],
        opacity: [0, 1],
        duration: 950,
        delay: anime.stagger(28, { from: 'first' }),
      }, 430);
    }

    var line2 = splitLines.length > 1 ? splitLines[1].querySelectorAll('.char-wrap') : [];
    if (line2.length) {
      tl.add({
        targets: line2,
        translateY: ['110%', '0%'],
        opacity: [0, 1],
        duration: 850,
        delay: anime.stagger(24, { from: 'first' }),
      }, 720);
    }

    if (heroSub) {
      tl.add({ targets: heroSub, opacity: [0, 1], translateY: [24, 0], duration: 700 }, 950);
    }

    if (heroActs && heroActs.children.length) {
      tl.add({
        targets: Array.from(heroActs.children),
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: anime.stagger(110),
      }, 1080);
    }

    if (heroScroll) {
      tl.add({ targets: heroScroll, opacity: [0, 1], duration: 600 }, 1450);
    }
  }

  /* ══════════════════════════════════════════════════════
     WORD REVEAL (brand story + philosophy text)
  ══════════════════════════════════════════════════════ */
  function initWordReveals() {
    var els = document.querySelectorAll('[data-word-reveal]');
    if (!els.length) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        splitToWords(el);
        anime({
          targets: el.querySelectorAll('.word-inner'),
          translateY: ['105%', '0%'],
          opacity: [0, 1],
          easing: 'cubicBezier(0.16,1,0.3,1)',
          duration: 750,
          delay: anime.stagger(42, { start: 80 }),
        });
        obs.unobserve(el);
      });
    }, { threshold: 0.25 });

    els.forEach(function (el) { obs.observe(el); });
  }

  /* ══════════════════════════════════════════════════════
     PREMIUM COUNTERS (Anime.js)
  ══════════════════════════════════════════════════════ */
  function initPremiumCounters() {
    var counters = document.querySelectorAll('[data-counter-premium]');
    if (!counters.length) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el     = entry.target;
        var target = parseFloat(el.getAttribute('data-target'));
        var suffix = el.getAttribute('data-suffix') || '';
        var obj    = { val: 0 };
        anime({
          targets: obj,
          val: target,
          duration: 2300,
          easing: 'easeOutExpo',
          update: function () {
            el.textContent = Math.floor(obj.val) + suffix;
          },
          complete: function () {
            el.textContent = target + suffix;
          },
        });
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { obs.observe(el); });
  }

  /* ══════════════════════════════════════════════════════
     STATS BANNER SCALE-IN
  ══════════════════════════════════════════════════════ */
  function initStatsBannerReveal() {
    if (!window.ScrollTrigger) return;

    ScrollTrigger.create({
      trigger: '.stats-banner',
      start: 'top 72%',
      onEnter: function () {
        anime({
          targets: '.stat-item',
          opacity: [0, 1],
          scale: [0.7, 1],
          translateY: [20, 0],
          easing: 'spring(1, 80, 10, 0)',
          duration: 900,
          delay: anime.stagger(100),
        });
      },
      once: true,
    });
  }

  /* ══════════════════════════════════════════════════════
     CLIP-PATH IMAGE REVEALS (GSAP + ScrollTrigger)
  ══════════════════════════════════════════════════════ */
  function initClipReveal() {
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('[data-clip-reveal]').forEach(function (el) {
      gsap.fromTo(el,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      var inner = el.querySelector('img, video');
      if (inner) {
        gsap.fromTo(inner,
          { scale: 1.1 },
          {
            scale: 1,
            duration: 1.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }

  /* ══════════════════════════════════════════════════════
     SECTION HEADINGS (GSAP scroll)
  ══════════════════════════════════════════════════════ */
  function initSectionHeadings() {
    if (!window.gsap || !window.ScrollTrigger) return;

    var headings = document.querySelectorAll(
      '.section-header h2, .about__content h2, .cases__content h3, ' +
      '.about-hero__title, .subhero__title, .about-mission__text, ' +
      '.pricing-approach__inner h2'
    );

    headings.forEach(function (el) {
      gsap.fromTo(el,
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 84%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  /* ══════════════════════════════════════════════════════
     CTA SVG PATH DRAW
  ══════════════════════════════════════════════════════ */
  function initSVGPathDraw() {
    if (!window.ScrollTrigger) return;

    document.querySelectorAll('.cta-svg-line path').forEach(function (path) {
      var length = path.getTotalLength();
      path.style.strokeDasharray  = length;
      path.style.strokeDashoffset = length;

      ScrollTrigger.create({
        trigger: path.closest('.cta-banner, .cta-banner--about'),
        start: 'top 72%',
        onEnter: function () {
          anime({
            targets: path,
            strokeDashoffset: [length, 0],
            duration: 1300,
            easing: 'cubicBezier(0.25,1,0.5,1)',
            delay: 250,
          });
        },
        once: true,
      });
    });
  }

  /* ══════════════════════════════════════════════════════
     PREMIUM ACCORDION (Anime.js height + fade)
  ══════════════════════════════════════════════════════ */
  function initPremiumAccordion() {
    var headers = document.querySelectorAll('.accordion__header');
    if (!headers.length) return;

    headers.forEach(function (header) {
      var body = header.nextElementSibling;
      if (body) { body.style.maxHeight = '0'; body.style.overflow = 'hidden'; }

      header.addEventListener('click', function () {
        var expanded = this.getAttribute('aria-expanded') === 'true';

        /* Close all */
        headers.forEach(function (other) {
          if (other.getAttribute('aria-expanded') === 'true') {
            other.setAttribute('aria-expanded', 'false');
            var otherBody = other.nextElementSibling;
            if (otherBody) {
              anime({ targets: otherBody, maxHeight: [otherBody.scrollHeight, 0], duration: 380, easing: 'cubicBezier(0.25,1,0.5,1)' });
            }
          }
        });

        if (!expanded) {
          this.setAttribute('aria-expanded', 'true');
          anime({
            targets: body,
            maxHeight: [0, body.scrollHeight + 40],
            duration: 480,
            easing: 'cubicBezier(0.16,1,0.3,1)',
          });
          anime({ targets: body, opacity: [0.3, 1], translateY: [-6, 0], duration: 420, easing: 'cubicBezier(0.16,1,0.3,1)' });
        }
      });
    });
  }

  /* ══════════════════════════════════════════════════════
     PAGE TRANSITIONS
  ══════════════════════════════════════════════════════ */
  function initPageTransitions() {
    var overlay = document.getElementById('page-transition');
    if (!overlay) return;

    /* Entrance — slide out on load */
    anime({
      targets: overlay,
      scaleY: [1, 0],
      duration: 950,
      easing: 'cubicBezier(0.16,1,0.3,1)',
      delay: 80,
      begin: function () { overlay.style.transformOrigin = 'top'; },
    });

    /* Exit — slide in before nav */
    document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"]):not([href^="mailto"]):not([href^="tel"])').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.href;
        if (!href || href === window.location.href) return;
        e.preventDefault();
        overlay.style.transformOrigin = 'bottom';
        anime({
          targets: overlay,
          scaleY: [0, 1],
          duration: 550,
          easing: 'cubicBezier(0.55,0,1,0.45)',
          complete: function () { window.location = href; },
        });
      });
    });
  }

  /* ══════════════════════════════════════════════════════
     PILLAR / PRICING CARD STAGGER
  ══════════════════════════════════════════════════════ */
  function initCardStagger() {
    if (!window.ScrollTrigger) return;

    ['.pillars__grid .pillar-card', '.pricing-approach__cards .pricing-card', '.platforms__grid .platform-card'].forEach(function (sel) {
      var cards = document.querySelectorAll(sel);
      if (!cards.length) return;

      gsap.fromTo(Array.from(cards),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: cards[0].closest('section'),
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  /* ── Bootstrap ──────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    if (reduced) {
      /* Still run counters even with reduced motion (numbers, just no animation) */
      initPremiumCounters();
      return;
    }

    initHeroEntrance();
    initWordReveals();
    initPremiumCounters();
    initClipReveal();
    initSectionHeadings();
    initStatsBannerReveal();
    initSVGPathDraw();
    initPremiumAccordion();
    initPageTransitions();
    initCardStagger();
  });
})();

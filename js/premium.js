(function () {
  'use strict';

  /* ── 3D Tilt on service + team-member cards ─────────── */
  var tiltEnabled =
    window.matchMedia('(hover: hover)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    window.innerWidth >= 1024;

  if (tiltEnabled) {
    document.querySelectorAll('[data-magnetic-card]').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width  - 0.5;
        var y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = 'perspective(700px) rotateY(' + (x * 9) + 'deg) rotateX(' + (-y * 6) + 'deg) translateY(-4px)';
        card.style.transition = 'transform 0.1s ease';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        card.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1)';
      });
    });
  }

  /* ── Navbar: hide on scroll-down, show on scroll-up ─── */
  var navbar = document.getElementById('navbar');
  if (navbar) {
    var prevY = 0;
    var hideThreshold = 320;

    window.addEventListener('scroll', function () {
      var y = window.scrollY;

      if (y > 80) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled', 'navbar--hidden');
        prevY = y;
        return;
      }

      if (y > prevY && y > hideThreshold) {
        navbar.classList.add('navbar--hidden');
      } else if (y < prevY) {
        navbar.classList.remove('navbar--hidden');
      }

      prevY = y;
    }, { passive: true });
  }

  /* ── Showcase grid hover reveal ─────────────────────── */
  document.querySelectorAll('.showcase__item').forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      item.style.transform = 'scale(1.02)';
      item.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
      item.style.zIndex = '2';
    });
    item.addEventListener('mouseleave', function () {
      item.style.transform = '';
      item.style.zIndex = '';
    });
  });

  /* ── Testimonial cards entrance ─────────────────────── */
  if (typeof anime !== 'undefined' && window.ScrollTrigger) {
    var testCards = document.querySelectorAll('.testimonial-card, .about-testimonial-card');
    if (testCards.length) {
      ScrollTrigger.create({
        trigger: '.testimonials, .about-testimonials',
        start: 'top 72%',
        onEnter: function () {
          anime({
            targets: testCards,
            opacity: [0, 1],
            translateY: [36, 0],
            duration: 850,
            easing: 'cubicBezier(0.16,1,0.3,1)',
            delay: anime.stagger(100),
          });
        },
        once: true,
      });
    }
  }

  /* ── Team member image hover ─────────────────────────── */
  document.querySelectorAll('.team-member__image-wrapper').forEach(function (wrap) {
    wrap.style.overflow = 'hidden';
    var img = wrap.querySelector('img');
    if (!img) return;
    img.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    wrap.addEventListener('mouseenter', function () { img.style.transform = 'scale(1.05)'; });
    wrap.addEventListener('mouseleave', function () { img.style.transform = ''; });
  });

  /* ── Scroll reveal fallback (if GSAP/ST not loaded) ─── */
  if (!window.ScrollTrigger) {
    var fallbackObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          fallbackObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-clip-reveal]').forEach(function (el) {
      fallbackObs.observe(el);
    });
  }
})();

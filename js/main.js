(function() {
  'use strict';

  // ========================================
  // SCROLL REVEAL (IntersectionObserver)
  // ========================================

  function initScrollReveal() {
    var revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!revealElements.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // ========================================
  // MOBILE MENU
  // ========================================

  function initMobileMenu() {
    var toggle = document.getElementById('nav-toggle');
    var menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function openMenu() {
      toggle.classList.add('is-active');
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('is-open');
      overlay.classList.add('is-visible');
      document.body.classList.add('no-scroll');
    }

    function closeMenu() {
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      overlay.classList.remove('is-visible');
      document.body.classList.remove('no-scroll');
    }

    toggle.addEventListener('click', function() {
      if (menu.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener('click', closeMenu);

    menu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  // ========================================
  // ANIMATED COUNTERS (fallback when Anime.js absent)
  // ========================================

  function initCounters() {
    if (typeof anime !== 'undefined') return;
    var counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(counter) { observer.observe(counter); });
  }

  function animateCounter(element) {
    var target = parseInt(element.getAttribute('data-target'), 10);
    var suffix = element.getAttribute('data-suffix') || '';
    var duration = 2000;
    var start = performance.now();

    function update(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 4);
      element.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  // ========================================
  // FAQ ACCORDION (fallback when Anime.js absent)
  // ========================================

  function initAccordion() {
    if (typeof anime !== 'undefined') return;
    var items = document.querySelectorAll('.accordion__header');
    if (!items.length) return;

    items.forEach(function(header) {
      header.addEventListener('click', function() {
        var isExpanded = this.getAttribute('aria-expanded') === 'true';
        var body = this.nextElementSibling;

        items.forEach(function(other) {
          if (other !== header) {
            other.setAttribute('aria-expanded', 'false');
            if (other.nextElementSibling) other.nextElementSibling.style.maxHeight = null;
          }
        });

        if (isExpanded) {
          this.setAttribute('aria-expanded', 'false');
          body.style.maxHeight = null;
        } else {
          this.setAttribute('aria-expanded', 'true');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });
  }

  // ========================================
  // SMOOTH SCROLL (fallback when Lenis absent)
  // ========================================

  function initSmoothScroll() {
    if (window.lenisInstance) return;
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var navbarHeight = (document.getElementById('navbar') || {}).offsetHeight || 0;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20,
          behavior: 'smooth'
        });
      });
    });
  }

  // ========================================
  // NAVBAR DROPDOWN
  // ========================================

  function initDropdown() {
    var dropdownToggles = document.querySelectorAll('.navbar__dropdown-toggle');
    if (!dropdownToggles.length) return;

    dropdownToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        var expanded = this.getAttribute('aria-expanded') === 'true';
        var menu = this.nextElementSibling;

        dropdownToggles.forEach(function(other) {
          if (other !== toggle) {
            other.setAttribute('aria-expanded', 'false');
            if (other.nextElementSibling) other.nextElementSibling.classList.remove('is-open');
          }
        });

        this.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        if (menu) menu.classList.toggle('is-open', !expanded);
      });
    });

    document.addEventListener('click', function(e) {
      if (!e.target.closest('.navbar__dropdown')) {
        dropdownToggles.forEach(function(toggle) {
          toggle.setAttribute('aria-expanded', 'false');
          if (toggle.nextElementSibling) toggle.nextElementSibling.classList.remove('is-open');
        });
      }
    });
  }

  // ========================================
  // INITIALIZE ALL
  // ========================================

  document.addEventListener('DOMContentLoaded', function() {
    initScrollReveal();
    initMobileMenu();
    initCounters();
    initAccordion();
    initSmoothScroll();
    initDropdown();
  });

})();

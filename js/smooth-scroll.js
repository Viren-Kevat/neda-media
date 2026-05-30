(function () {
  'use strict';

  // Custom smooth scrolling (Lenis) has been completely removed to restore native, instant scrolling speeds.

  // Native smooth scrolling for anchor links within the page
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      
      // Calculate position with offset for fixed header
      var headerOffset = 80;
      var elementPosition = target.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'auto'
      });
    });
  });
})();

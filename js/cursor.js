(function () {
  'use strict';

  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var cursor = document.getElementById('cursor');
  if (!cursor) return;

  var dot  = cursor.querySelector('.cursor__dot');
  var ring = cursor.querySelector('.cursor__ring');

  var mouseX = window.innerWidth / 2;
  var mouseY = window.innerHeight / 2;
  var ringX  = mouseX, ringY = mouseY;
  var dotX   = mouseX, dotY  = mouseY;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  var hovered = false;

  (function animate() {
    dotX  += (mouseX - dotX)  * 0.35;
    dotY  += (mouseY - dotY)  * 0.35;
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    dot.style.transform  = 'translate(' + dotX  + 'px, ' + dotY  + 'px) translate(-50%,-50%)';
    ring.style.transform = 'translate(' + ringX + 'px, ' + ringY + 'px) translate(-50%,-50%)';

    requestAnimationFrame(animate);
  })();

  var interactiveSelector = 'a, button, [data-magnetic], [data-magnetic-card], label, input, select, textarea';

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(interactiveSelector)) {
      if (!hovered) {
        hovered = true;
        dot.style.width  = '14px';
        dot.style.height = '14px';
        ring.style.width  = '58px';
        ring.style.height = '58px';
        ring.style.opacity = '1';
      }
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (!e.relatedTarget || !e.relatedTarget.closest(interactiveSelector)) {
      hovered = false;
      dot.style.width  = '8px';
      dot.style.height = '8px';
      ring.style.width  = '40px';
      ring.style.height = '40px';
      ring.style.opacity = '0.7';
    }
  });

  document.addEventListener('mousedown', function () {
    ring.style.transform = ring.style.transform + ' scale(0.85)';
    dot.style.width  = '5px';
    dot.style.height = '5px';
  });

  document.addEventListener('mouseup', function () {
    dot.style.width  = hovered ? '14px' : '8px';
    dot.style.height = hovered ? '14px' : '8px';
  });

  /* Magnetic buttons — [data-magnetic] */
  document.querySelectorAll('[data-magnetic]').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      var cx = rect.left + rect.width  / 2;
      var cy = rect.top  + rect.height / 2;
      var dx = (e.clientX - cx) * 0.38;
      var dy = (e.clientY - cy) * 0.38;
      el.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
      el.style.transition = 'transform 0.1s ease';
    });
    el.addEventListener('mouseleave', function () {
      el.style.transform = '';
      el.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    });
  });
})();

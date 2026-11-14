// Golden Key Recovery site scripts. No tracking, no third-party requests.

(function () {
  // Background video: only loads when the hero is switched on and motion is allowed.
  var hero = document.querySelector('.hero');
  var video = document.querySelector('.hero-video');
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (hero && video && hero.getAttribute('data-video') === 'on' && !calm) {
    video.src = video.getAttribute('data-src');
    video.muted = true;
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
  }

  // Inquiry form. Preview build: checks the fields, then shows a confirmation.
  // Nothing is sent or stored. Connect a secure intake service before launch.
  var form = document.getElementById('inquiry');
  var done = document.getElementById('done');
  var error = document.getElementById('form-error');
  if (!form || !done) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var required = form.querySelectorAll('[required]');
    var firstBad = null;
    for (var i = 0; i < required.length; i++) {
      var el = required[i];
      var ok = el.value && el.value.trim() !== '';
      el.classList.toggle('invalid', !ok);
      el.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok && !firstBad) firstBad = el;
    }
    if (firstBad) {
      error.hidden = false;
      firstBad.focus();
      return;
    }
    error.hidden = true;
    var first = form.elements.name.value.trim().split(/\s+/)[0];
    document.getElementById('done-name').textContent = first ? ', ' + first : '';
    form.reset();
    form.hidden = true;
    done.hidden = false;
    done.focus();
  });
})();

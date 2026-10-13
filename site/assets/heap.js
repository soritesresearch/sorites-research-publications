
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.getElementById('heap');
  var stage = document.getElementById('stage');
  var count = document.getElementById('count');
  var beats = Array.prototype.slice.call(document.querySelectorAll('.beat'));
  var ranges = [[0, .2], [.2, .46], [.46, .78], [.8, 1.01]];
  var rows = [15, 13, 11, 9, 7, 5, 3, 1], grains = [];
  rows.forEach(function (c, k) {
    var y = 330 - k * 22, xs = [], j;
    for (j = 0; j < c; j++) xs.push(280 + (j - (c - 1) / 2) * 26);
    xs.sort(function (a, b) { return Math.abs(a - 280) - Math.abs(b - 280); });
    xs.forEach(function (x) {
      var el = document.createElementNS(NS, 'circle');
      el.setAttribute('cx', x); el.setAttribute('cy', y);
      el.setAttribute('r', c === 1 ? 6.5 : 5);
      if (c === 1) el.setAttribute('class', 'apex');
      el.setAttribute('opacity', 0);
      svg.appendChild(el); grains.push(el);
    });
  });
  var n = grains.length;
  function clamp(v) { return Math.max(0, Math.min(1, v)); }
  function draw(p) {
    var f = clamp(p / .78) * (n + 4), landed = 0;
    grains.forEach(function (el, i) {
      var t = clamp((f - i) / 4), e = 1 - (1 - t) * (1 - t);
      el.setAttribute('opacity', e);
      el.setAttribute('transform', 'translate(0 ' + (-(1 - e) * 70) + ')');
      if (t >= 1) landed++;
    });
    count.textContent = 'Grain ' + landed;
    beats.forEach(function (b, i) {
      var a = ranges[i][0], z = ranges[i][1], fin = i === beats.length - 1;
      var o = Math.min(i === 0 ? 1 : clamp((p - a) / .04), fin ? 1 : clamp((z - p) / .04));
      b.style.opacity = o;
      b.style.pointerEvents = o > .5 ? 'auto' : 'none';
      b.inert = o <= .5;
      b.setAttribute('aria-hidden', o <= .5 ? 'true' : 'false');
    });
  }
  function progress() {
    var span = stage.offsetHeight - window.innerHeight;
    return span > 0 ? clamp(-stage.getBoundingClientRect().top / span) : 1;
  }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    document.documentElement.classList.add('rm');
    draw(1);
    beats.slice(0, -1).forEach(function (b) { b.style.display = 'none'; });
    beats[beats.length - 1].style.position = 'static';
    return;
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { draw(progress()); ticking = false; });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  draw(progress());
})();

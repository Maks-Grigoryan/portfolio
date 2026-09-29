// typing effect
const text = "whoami --cv-engineer";
const el = document.getElementById("typed");
let i = 0;
(function type() {
  if (i <= text.length) {
    el.textContent = text.slice(0, i++);
    setTimeout(type, 55);
  }
})();

// animated counters
const counters = document.querySelectorAll("[data-count]");
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const target = e.target;
    const end = parseInt(target.dataset.count, 10);
    const t0 = performance.now();
    (function tick(t) {
      const p = Math.min((t - t0) / 900, 1);
      target.textContent = Math.round(end * p) + (target.textContent.includes("+") || end > 2 ? "+" : "");
      if (p < 1) requestAnimationFrame(tick);
      else target.textContent = end + "+";
    })(t0);
    counterObs.unobserve(target);
  });
}, { threshold: 0.5 });
counters.forEach((c) => counterObs.observe(c));

// reveal on scroll
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((s) => revealObs.observe(s));

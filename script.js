const app = document.getElementById('app');
if (app) {
  app.style.opacity = '1';
  app.style.animation = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  // ---- Elements ----
  const dynamicRoleEl = document.getElementById('dynamic-role');
  const roleCards = document.querySelectorAll('button.role-card');
  const chipButtons = document.querySelectorAll('.chip[data-track]');
  const clearChip = document.querySelector('.chip.clear');
  const highlightCards = document.querySelectorAll('#highlights .card');

  // Tabs
  const tablist = document.querySelector('[role="tablist"]');
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  // ---- Typewriter (with reduced-motion fallback) ----
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const roles = ["Data Analytics", "Data Engineering", "Data Science", "Software Engineering", "AI/ML"];
  let roleIndex = 0, charIndex = 0, isDeleting = false;

  function typeWriter() {
    if (prefersReduced) {
      dynamicRoleEl.textContent = "Data Analytics / Data Engineering / Data Science / SWE / AI/ML";
      return;
    }
    const currentRole = roles[roleIndex];
    let displayText = isDeleting ? currentRole.substring(0, charIndex - 1) : currentRole.substring(0, charIndex + 1);
    dynamicRoleEl.textContent = displayText;

    let speed = isDeleting ? 75 : 150;
    if (!isDeleting && charIndex === currentRole.length) { speed = 1800; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 500; }
    else { isDeleting ? charIndex-- : charIndex++; }

    setTimeout(typeWriter, speed);
  }

  // ---- Highlights: chip filtering ----
  const selected = new Set();
  function applyHighlightFilter() {
    if (selected.size === 0) {
      highlightCards.forEach(c => c.style.display = '');
      return;
    }
    highlightCards.forEach(card => {
      const tags = (card.getAttribute('data-tags') || '').split(/\s+/);
      const show = tags.some(t => selected.has(t));
      card.style.display = show ? '' : 'none';
    });
  }

  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const track = btn.getAttribute('data-track');
      const on = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!on));
      if (on) selected.delete(track); else selected.add(track);
      applyHighlightFilter();
      if (window.sa_event) window.sa_event(`chip_${track}_${!on ? 'on' : 'off'}`);
    });
  });

  if (clearChip) {
    clearChip.addEventListener('click', () => {
      selected.clear();
      chipButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
      applyHighlightFilter();
      if (window.sa_event) window.sa_event('chip_clear');
    });
  }

  // ---- Tabs: activation & keyboard UX ----
  function activateTab(tab, pushHash = true) {
    tabs.forEach(t => {
      const selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !selected;
    });
    tab.focus({ preventScroll: true });

    const short = tab.id.replace('tab-', '');  // e.g., "da"
    if (pushHash) {
      if (history.pushState) history.pushState({ short }, '', `#${short}`);
      else location.hash = `#${short}`;
    }
    // Light analytics
    if (window.sa_event) window.sa_event(`open_${short}`);
    // Scroll the tabs into view (nice on mobile)
    document.getElementById('role-tabs').scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
  }

  // Keyboard nav for tabs
  if (tablist) {
    tablist.addEventListener('keydown', e => {
      const idx = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const next = tabs[(idx + dir + tabs.length) % tabs.length];
        activateTab(next);
      }
    });
  }

  // Clicking tabs
  tabs.forEach(t => t.addEventListener('click', () => activateTab(t)));

  // Role cards jump into tabs
  roleCards.forEach(card => {
    card.addEventListener('click', () => {
      const short = card.getAttribute('data-tab');
      const t = document.getElementById(`tab-${short}`);
      if (t) activateTab(t);
    });
  });

  // Deep-link on load (#da, #de, #ds, #swe, #aiml); default shows nothing until chosen
  function initFromHash() {
    const h = (location.hash || '').replace('#', '').toLowerCase();
    const valid = new Set(['da','de','ds','swe','aiml']);
    if (valid.has(h)) {
      const t = document.getElementById(`tab-${h}`);
      if (t) activateTab(t, /*pushHash*/false);
    } else {
      // Ensure all panels are hidden initially
      panels.forEach(p => p.hidden = true);
      tabs.forEach(t => { t.setAttribute('aria-selected', 'false'); t.tabIndex = -1; });
    }
  }
  window.addEventListener('popstate', initFromHash);
  window.addEventListener('hashchange', initFromHash);

  // Init
  typeWriter();
  applyHighlightFilter();
  initFromHash();
});

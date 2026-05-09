/* ─── script.js ─────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ═══════════════════════════════════
     1. NAVBAR FADE + MOBILE TOGGLE
  ═══════════════════════════════════ */
  const navbar = document.querySelector('.navbar');
  setTimeout(() => { if (navbar) { navbar.classList.add('visible'); } }, 50);

  const toggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  /* ═══════════════════════════════════
     2. SCROLL FADE-IN (Intersection Observer)
  ═══════════════════════════════════ */
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || '0');
        setTimeout(() => entry.target.classList.add('visible'), delay);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(el => fadeObserver.observe(el));

  /* ═══════════════════════════════════════════════
     3. GLASS CARD TOUCH / CLICK TOGGLE (mobile expand)
  ═══════════════════════════════════════════════ */
  const glassCards = document.querySelectorAll('.glass-card');
  glassCards.forEach(card => {
    // Toggle expanded on click/touch for touch devices
    card.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');
      // Collapse all others first
      glassCards.forEach(c => c.classList.remove('expanded'));
      if (!isExpanded) card.classList.add('expanded');
    });
    // Prevent link clicks inside from toggling
    card.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', e => e.stopPropagation());
    });
  });

  /* ═══════════════════════════════════
     4. HERO HEADING INITIAL ANIMATION
  ═══════════════════════════════════ */
  const heroWrap = document.querySelector('.hero-heading-wrap');
  if (heroWrap) {
    heroWrap.style.opacity = '0';
    heroWrap.style.transform = 'translateY(40px)';
    heroWrap.style.transition = 'opacity 0.9s cubic-bezier(0.25,0.1,0.25,1) 0.15s, transform 0.9s cubic-bezier(0.25,0.1,0.25,1) 0.15s';
    setTimeout(() => { heroWrap.style.opacity = '1'; heroWrap.style.transform = 'translateY(0)'; }, 100);
  }

  /* ═══════════════════════════════════
     4. MAGNETIC PORTRAIT
  ═══════════════════════════════════ */
  const magnetTarget = document.getElementById('magnetTarget');
  const magnetInner = document.getElementById('magnetInner');
  if (magnetTarget && magnetInner) {
    magnetTarget.addEventListener('mousemove', (e) => {
      const rect = magnetTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.12;
      const dy = (e.clientY - cy) * 0.12;
      magnetInner.style.transform = `translate3d(${dx}px,${dy}px,0)`;
    });
    magnetTarget.addEventListener('mouseleave', () => {
      magnetInner.style.transform = 'translate3d(0,0,0)';
    });
  }

  /* ═══════════════════════════════════
     5. MARQUEE SCROLL EFFECT
  ═══════════════════════════════════ */
  const gifs = [
    "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
    "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
    "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
    "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
    "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
    "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
    "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
    "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
    "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
    "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
    "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
    "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
    "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
    "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
    "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
    "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
    "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
    "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
    "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
  ];

  const row1Gifs = [...gifs.slice(0,11), ...gifs.slice(0,11), ...gifs.slice(0,11)];
  const row2Gifs = [...gifs.slice(11), ...gifs.slice(11), ...gifs.slice(11)];

  function buildTrack(track, gifArr) {
    gifArr.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.loading = 'lazy';
      img.alt = 'Project Showcase';
      track.appendChild(img);
    });
  }

  const track1 = document.getElementById('track1');
  const track2 = document.getElementById('track2');
  const marqueeSection = document.getElementById('marquee');

  if (track1 && track2 && marqueeSection) {
    buildTrack(track1, row1Gifs);
    buildTrack(track2, row2Gifs);

    let ticking = false;
    function updateMarquee() {
      const sectionTop = marqueeSection.offsetTop;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      track1.style.transform = `translate3d(${offset - 300}px,0,0)`;
      track2.style.transform = `translate3d(${-(offset - 300)}px,0,0)`;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(updateMarquee); ticking = true; }
    }, { passive: true });
    updateMarquee();
  }

  /* ═══════════════════════════════════
     6. ABOUT ANIMATED TEXT (scroll-linked opacity per word)
  ═══════════════════════════════════ */
  const aboutText = document.getElementById('aboutText');
  if (aboutText) {
    const words = aboutText.textContent.trim().split(/\s+/);
    aboutText.innerHTML = words.map((w,i) =>
      `<span class="aword" style="opacity:0.15;transition:opacity 0.4s ease ${i*0.04}s;display:inline-block;margin-right:0.25em">${w}</span>`
    ).join('');

    const wordEls = aboutText.querySelectorAll('.aword');

    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          wordEls.forEach((el, i) => {
            setTimeout(() => { el.style.opacity = '1'; }, i * 55);
          });
          aboutObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    aboutObserver.observe(aboutText);
  }

  /* ═══════════════════════════════════
     7. STICKY STACKING PROJECT CARDS (scale on scroll)
  ═══════════════════════════════════ */
  const cards = document.querySelectorAll('.project-card');
  const totalCards = cards.length;

  function updateCardScales() {
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // How far card has "passed" the sticky point
      const stickyTop = parseInt(card.id.split('-')[1]) * 28 + 80;
      const distanceScrolled = Math.max(0, stickyTop - rect.top);
      const targetScale = 1 - ((totalCards - 1 - i) * 0.03);
      const progressScale = Math.max(targetScale, 1 - (distanceScrolled / viewportH) * 0.06);
      card.style.transform = `scale(${Math.max(targetScale, Math.min(1, progressScale))})`;
      card.style.transformOrigin = 'top center';
    });
  }

  window.addEventListener('scroll', () => { requestAnimationFrame(updateCardScales); }, { passive: true });

  /* ═══════════════════════════════════
     8. BACK TO TOP
  ═══════════════════════════════════ */
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (backBtn) backBtn.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });
  if (backBtn) backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

});

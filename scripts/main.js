// ============================================================
//  main.js – Ana Sayfa Etkileşimleri
//  Typewriter | CountUp | Filtre | IntersectionObserver
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- 1) SCROLL PROGRESS BAR -----------------------------------
  const bar = document.getElementById('scrollBar');
  if (bar) {
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  }

  // ---- 2) TYPEWRITER --------------------------------------------
  const roles = [
    'Bilgisayar Mühendisliği Öğrencisi',
    'Web Geliştirici',
    'Frontend Öğrencisi',
    'HTML & CSS Meraklısı',
  ];
  const el = document.getElementById('typewriter');
  if (el) {
    let rIdx = 0, cIdx = 0, deleting = false;
    const speed = { type: 60, delete: 35, pause: 1800 };

    function tick() {
      const current = roles[rIdx];
      if (!deleting) {
        el.textContent = current.slice(0, ++cIdx);
        if (cIdx === current.length) {
          deleting = true;
          return setTimeout(tick, speed.pause);
        }
      } else {
        el.textContent = current.slice(0, --cIdx);
        if (cIdx === 0) {
          deleting = false;
          rIdx = (rIdx + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? speed.delete : speed.type);
    }
    tick();
  }

  // ---- 3) COUNT-UP ANIMASYONU -----------------------------------
  const counters = document.querySelectorAll('.stat-num');
  const countUp = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const step = Math.ceil(duration / target);
    let cur = 0;
    const timer = setInterval(() => {
      cur = Math.min(cur + 1, target);
      el.textContent = cur;
      if (cur >= target) clearInterval(timer);
    }, step);
  };

  // IntersectionObserver ile stat sayaçları görününce başlasın
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        countUp(e.target);
        statsObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => statsObserver.observe(c));

  // ---- 4) LAB KART FİLTRESİ -----------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const labCards   = document.querySelectorAll('.lab-card[data-cat]');
  const labGrid    = document.querySelector('.lab-grid');

  function applyFilter(cat) {
    let visibleCount = 0;
    labCards.forEach(card => {
      const match = cat === 'all' || card.dataset.cat === cat;
      card.style.display = match ? 'block' : 'none';
      if (match) visibleCount++;
    });

    // 3'ten az kart varsa grid sütununu dinamik ayarla — boş hücre kalmasın
    if (labGrid) {
      const cols = Math.min(visibleCount, 3);
      labGrid.style.gridTemplateColumns = cols > 0
        ? `repeat(${cols}, minmax(0, 1fr))`
        : 'repeat(3, minmax(0, 1fr))';
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  // Başlangıçta "Tümü" aktif olarak uygula
  applyFilter('all');

  // ---- 5) ENTRANCE ANİMASYONU (IntersectionObserver) -----------
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const fadeObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          fadeObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => fadeObs.observe(el));
  }

});

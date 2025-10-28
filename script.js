const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (15 + Math.random() * 10) + 's';
      particlesContainer.appendChild(particle);
    }

    window.addEventListener('load', () => {
      const loader = document.getElementById('loader');
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 800);
    });

    const el = document.getElementById('typewriter');
    const phrases = ["Full Stack Developer.", "AI & ML Enthusiast.", "Creative Web Designer.", "Problem Solver."];
    let i = 0, j = 0, isDeleting = false;
    
    (function type() {
      const word = phrases[i];
      el.textContent = word.substring(0, j);
      
      if (!isDeleting && j < word.length) {
        j++;
        setTimeout(type, 100);
      } else if (isDeleting && j > 0) {
        j--;
        setTimeout(type, 50);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) i = (i + 1) % phrases.length;
        setTimeout(type, 1000);
      }
    })();

    document.getElementById('downloadBtn').onclick = function() {
      fetch('Resumeezhaar.pdf')
        .then(response => {
          if (!response.ok) {
            throw new Error('Resume file not found');
          }
          return response.blob();
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'Ezhaar_Shariff_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch(error => {
          console.error('Download failed:', error);
          alert('Unable to download resume. Please ensure Resumeezhaar.pdf is in the same folder as this HTML file.');
        });
    };

    document.getElementById('menuToggle').onclick = () => {
      const navbar = document.getElementById('navbar');
      navbar.classList.toggle('show');
    };

    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          document.getElementById('navbar').classList.remove('show');
        }
      });
    });

    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    function setupInteractiveCards() {
      const isMobile = window.innerWidth <= 900;
      
      document.querySelectorAll('.interactive-card').forEach(card => {
        if (isMobile) {
          card.onclick = function(e) {
            if (e.target.closest('.drive-link')) return;
            
            const details = this.querySelector('.card-details');
            const preview = this.querySelector('.card-preview');
            
            modalBody.innerHTML = `
              <h3>${preview.querySelector('h3').textContent}</h3>
              <p>${preview.querySelector('p').innerHTML}</p>
              ${preview.querySelector('.tech-stack') ? `<p class="tech-stack">${preview.querySelector('.tech-stack').textContent}</p>` : ''}
              ${preview.querySelector('.tech-icons') ? `<div class="tech-icons">${preview.querySelector('.tech-icons').innerHTML}</div>` : ''}
              ${details.innerHTML}
            `;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
          };
        } else {
          card.onclick = function(e) {
            if (e.target.closest('.drive-link')) {
              e.stopPropagation();
            }
          };
        }
      });
    }

    setupInteractiveCards();

    modalClose.onclick = () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    };

    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });
    
    sections.forEach(s => observer.observe(s));

    const navLinks = document.querySelectorAll('nav a');
    window.addEventListener('scroll', () => {
      let fromTop = window.scrollY + 120;
      navLinks.forEach(link => {
        const sec = document.querySelector(link.getAttribute('href'));
        if (sec && sec.offsetTop <= fromTop && sec.offsetTop + sec.offsetHeight > fromTop) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    });

    window.addEventListener('scroll', () => {
      document.getElementById('header').classList.toggle('scrolled', window.scrollY > 80);
    });

    const topBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        topBtn.style.display = 'block';
      } else {
        topBtn.style.display = 'none';
      }
    });
    
    topBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setupInteractiveCards();
      }, 250);
    });

    document.addEventListener('DOMContentLoaded', () => {
      const splashScreen = document.getElementById('splashScreen');
      const mainContent = document.getElementById('mainContent');
      
      const hasSeenSplash = localStorage.getItem('jordanAgricultureSplashShown');
      
      if (hasSeenSplash) {
        splashScreen.style.display = 'none';
        mainContent.classList.add('show');
        initializeMainContent();
      } else {
        setTimeout(() => {
          splashScreen.classList.add('fade-out');
          
          setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.classList.add('show');
            
            localStorage.setItem('jordanAgricultureSplashShown', 'true');
            
            initializeMainContent();
          }, 1000); 
        }, 6500);
      }
    });

    function initializeMainContent() {
      const isDarkMode = document.body.classList.contains('dark-mode');
      updateWaveColors(isDarkMode ? 'dark' : 'light');

      createFloatingIcons();

      setupObservers();

      setupNavigation();

      setupScrollEvents();
    }

    function smoothScrollTo(target) {
      const element = document.querySelector(target);
      if (!element) return;

      const navHeight = 80;
      const targetPosition = element.offsetTop - navHeight;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = Math.min(Math.abs(distance) * 0.8, 1200); 
      let start = null;

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const easedProgress = easeInOutCubic(progress);
        const currentPosition = startPosition + distance * easedProgress;
        
        window.scrollTo(0, currentPosition);
        
        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      }
      
      requestAnimationFrame(animation);
    }

    function updateScrollProgress() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      document.getElementById('scrollProgress').style.height = scrollPercent + '%';
    }

    function updateActiveNav() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('nav a[data-section]');
      
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
          link.classList.add('active');
        }
      });
    }

    function toggleMode() {
      document.body.classList.toggle('dark-mode');
      const btn = document.querySelector('.toggle-btn');
      if (document.body.classList.contains('dark-mode')) {
        btn.textContent = '☀️ Light';
        updateWaveColors('dark');
      } else {
        btn.textContent = '🌙 Dark';
        updateWaveColors('light');
      }
      updateIconColors(document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    }

    function updateWaveColors(mode) {
      const wave1Start = document.querySelector('.wave1-start');
      const wave1End = document.querySelector('.wave1-end');
      const wave2Start = document.querySelector('.wave2-start');
      const wave2End = document.querySelector('.wave2-end');

      if (wave1Start && wave1End && wave2Start && wave2End) {
        if (mode === 'dark') {
          wave1Start.setAttribute('stop-color', 'rgba(15, 118, 44, 0.25)');
          wave1End.setAttribute('stop-color', 'rgba(20, 83, 45, 0.3)');
          wave2Start.setAttribute('stop-color', 'rgba(25, 77, 51, 0.2)');
          wave2End.setAttribute('stop-color', 'rgba(15, 118, 44, 0.2)');
        } else {
          wave1Start.setAttribute('stop-color', 'rgba(34, 197, 94, 0.1)');
          wave1End.setAttribute('stop-color', 'rgba(16, 185, 129, 0.2)');
          wave2Start.setAttribute('stop-color', 'rgba(20, 184, 166, 0.15)');
          wave2End.setAttribute('stop-color', 'rgba(34, 197, 94, 0.1)');
        }
      }
    }

    function setupObservers() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show', 'visible');
          }
        });
      }, observerOptions);

      const sections = document.querySelectorAll('section');
      const cards = document.querySelectorAll('.card');
      const diseaseContainer = document.querySelector('.disease-container');
      
      sections.forEach(section => observer.observe(section));
      cards.forEach(card => observer.observe(card));
      if (diseaseContainer) observer.observe(diseaseContainer);

      const cropsSection = document.getElementById('crops');
      if (cropsSection) observer.observe(cropsSection);

      const verticalHero = document.getElementById('vertical-hero');
      if (verticalHero) {
        observer.observe(verticalHero);
        
        const verticalObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
            }
          });
        }, observerOptions);
        
        verticalObserver.observe(verticalHero);
      }
    }

    function setupNavigation() {
      const navLinks = document.querySelectorAll('nav a[href^="#"]');
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = link.getAttribute('href');
          smoothScrollTo(target);
        });
      });
    }

    function setupScrollEvents() {
      window.addEventListener('scroll', () => {
        updateScrollProgress();
        updateActiveNav();
      });
    }

    const icons = {
      barChart: '<svg viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3v18h18M8 16V9m4 7V7m4 9V5"/></svg>',
      lineChart: '<svg viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3v18h18M7 12l4-4 4 4 4-4"/></svg>',
      pieChart: '<svg viewBox="0 0 24 24" stroke="currentColor"><path d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z"/></svg>',
      calculator: '<svg viewBox="0 0 24 24" stroke="currentColor"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M7 6h10M7 10h10m-5 4h5m-5 4h5M7 14h.01M7 18h.01"/></svg>',
      trendingUp: '<svg viewBox="0 0 24 24" stroke="currentColor"><polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/></svg>',
      trendingDown: '<svg viewBox="0 0 24 24" stroke="currentColor"><polyline points="22,17 13.5,8.5 8.5,13.5 2,7"/><polyline points="16,17 22,17 22,11"/></svg>',
      search: '<svg viewBox="0 0 24 24" stroke="currentColor"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
      target: '<svg viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
      activity: '<svg viewBox="0 0 24 24" stroke="currentColor"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>',
      circuit: '<svg viewBox="0 0 24 24" stroke="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01"/></svg>',
      database: '<svg viewBox="0 0 24 24" stroke="currentColor"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>',
      settings: '<svg viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
      zap: '<svg viewBox="0 0 24 24" stroke="currentColor"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/></svg>',
      eye: '<svg viewBox="0 0 24 24" stroke="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
      dollar: '<svg viewBox="0 0 24 24" stroke="currentColor"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
      users: '<svg viewBox="0 0 24 24" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      clock: '<svg viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>',
      arrowUp: '<svg viewBox="0 0 24 24" stroke="currentColor"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7,7 17,7 17,17"/></svg>',
      arrowDown: '<svg viewBox="0 0 24 24" stroke="currentColor"><line x1="17" y1="7" x2="7" y2="17"/><polyline points="17,17 7,17 7,7"/></svg>',
      more: '<svg viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>',
      grid: '<svg viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
      layers: '<svg viewBox="0 0 24 24" stroke="currentColor"><polygon points="12,2 2,7 12,12 22,7 12,2"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg>',
      monitor: '<svg viewBox="0 0 24 24" stroke="currentColor"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
      tablet: '<svg viewBox="0 0 24 24" stroke="currentColor"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
      phone: '<svg viewBox="0 0 24 24" stroke="currentColor"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>'
    };

    const iconData = [
      { icon: 'barChart', x: '10%', y: '15%', delay: 0.1, colorLight: '#22c55e', colorDark: '#4ade80' },
      { icon: 'lineChart', x: '85%', y: '20%', delay: 0.3, colorLight: '#10b981', colorDark: '#34d399' },
      { icon: 'pieChart', x: '15%', y: '75%', delay: 0.5, colorLight: '#14b8a6', colorDark: '#2dd4bf' },
      { icon: 'calculator', x: '80%', y: '70%', delay: 0.7, colorLight: '#16a34a', colorDark: '#4ade80' },
      { icon: 'trendingUp', x: '5%', y: '45%', delay: 0.9, colorLight: '#15803d', colorDark: '#22c55e' },
      { icon: 'trendingDown', x: '90%', y: '85%', delay: 1.1, colorLight: '#059669', colorDark: '#10b981' },
      { icon: 'search', x: '25%', y: '25%', delay: 1.3, colorLight: '#0d9488', colorDark: '#14b8a6' },
      { icon: 'target', x: '75%', y: '35%', delay: 1.5, colorLight: '#84cc16', colorDark: '#a3e635' },
      { icon: 'activity', x: '30%', y: '85%', delay: 1.7, colorLight: '#22c55e', colorDark: '#4ade80' },
      { icon: 'circuit', x: '70%', y: '15%', delay: 1.9, colorLight: '#10b981', colorDark: '#34d399' },
      { icon: 'database', x: '20%', y: '55%', delay: 2.1, colorLight: '#65a30d', colorDark: '#84cc16' },
      { icon: 'settings', x: '85%', y: '50%', delay: 2.3, colorLight: '#16a34a', colorDark: '#22c55e' },
      { icon: 'zap', x: '8%', y: '30%', delay: 2.5, colorLight: '#a3a922', colorDark: '#bef264' },
      { icon: 'eye', x: '92%', y: '40%', delay: 2.7, colorLight: '#14b8a6', colorDark: '#2dd4bf' },
      { icon: 'dollar', x: '12%', y: '65%', delay: 2.9, colorLight: '#15803d', colorDark: '#22c55e' },
      { icon: 'users', x: '78%', y: '60%', delay: 3.1, colorLight: '#059669', colorDark: '#10b981' },
      { icon: 'clock', x: '35%', y: '15%', delay: 3.3, colorLight: '#0d9488', colorDark: '#14b8a6' },
      { icon: 'arrowUp', x: '65%', y: '85%', delay: 3.5, colorLight: '#22c55e', colorDark: '#4ade80' },
      { icon: 'arrowDown', x: '40%', y: '75%', delay: 3.7, colorLight: '#84cc16', colorDark: '#a3e635' },
      { icon: 'more', x: '55%', y: '25%', delay: 3.9, colorLight: '#16a34a', colorDark: '#22c55e' },
      { icon: 'grid', x: '25%', y: '40%', delay: 4.1, colorLight: '#14b8a6', colorDark: '#2dd4bf' },
      { icon: 'layers', x: '60%', y: '65%', delay: 4.3, colorLight: '#10b981', colorDark: '#34d399' },
      { icon: 'monitor', x: '45%', y: '10%', delay: 4.5, colorLight: '#0d9488', colorDark: '#14b8a6' },
      { icon: 'tablet', x: '15%', y: '35%', delay: 4.7, colorLight: '#65a30d', colorDark: '#84cc16' },
      { icon: 'phone', x: '75%', y: '75%', delay: 4.9, colorLight: '#84cc16', colorDark: '#a3e635' }
    ];

    function createFloatingIcons() {
      const container = document.querySelector('.floating-icons');
      if (!container) return;
      
      iconData.forEach((iconConfig, index) => {
        const iconElement = document.createElement('div');
        iconElement.className = 'floating-icon';
        iconElement.style.left = iconConfig.x;
        iconElement.style.top = iconConfig.y;
        
        const isDarkMode = document.body.classList.contains('dark-mode');
        iconElement.style.color = isDarkMode ? iconConfig.colorDark : iconConfig.colorLight;
        iconElement.style.animationDelay = `${iconConfig.delay}s`;
        
        iconElement.dataset.colorLight = iconConfig.colorLight;
        iconElement.dataset.colorDark = iconConfig.colorDark;
        
        const size = Math.random() * 20 + 20;
        iconElement.style.width = `${size}px`;
        iconElement.style.height = `${size}px`;
        
        iconElement.innerHTML = icons[iconConfig.icon];
        
        container.appendChild(iconElement);
      });
    }

    function updateIconColors(mode) {
      const iconElements = document.querySelectorAll('.floating-icon');
      iconElements.forEach(icon => {
        if (mode === 'dark') {
          icon.style.color = icon.dataset.colorDark;
        } else {
          icon.style.color = icon.dataset.colorLight;
        }
      });
    }
  
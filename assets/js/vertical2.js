
    const darkToggle = document.getElementById('darkToggle');
    
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      darkToggle.innerHTML = '☀️ Light';
    }

    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      
      if (document.body.classList.contains('dark-mode')) {
        darkToggle.innerHTML = '☀️ Light';
        localStorage.setItem('darkMode', 'enabled');
      } else {
        darkToggle.innerHTML = '🌙 Dark';
        localStorage.setItem('darkMode', 'disabled');
      }
    });

    let current = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlide(index) {
      slides[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
    }

    function nextSlide() {
      showSlide(current + 1);
    }

    function prevSlide() {
      showSlide(current - 1);
    }
  
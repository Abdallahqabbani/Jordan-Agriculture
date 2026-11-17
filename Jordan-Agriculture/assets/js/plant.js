
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

    function showSection(sectionId, btn) {
      document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
      });
      document.getElementById(sectionId).classList.add('active');

      document.querySelectorAll('.buttons button').forEach(button => {
        button.classList.remove('active');
      });
      btn.classList.add('active');
    }
  
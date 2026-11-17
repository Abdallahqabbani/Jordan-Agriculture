
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

        document.addEventListener('DOMContentLoaded', () => {
            const navButtons = document.querySelectorAll('.nav-btn');
            
            navButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    
                    button.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        button.style.transform = '';
                    }, 150);
                    
                });
            });
        });

        function createWaterDroplets() {
            const cards = document.querySelectorAll('.system-card');
            
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            const droplet = document.createElement('div');
                            droplet.className = 'water-droplet';
                            droplet.style.left = Math.random() * 100 + '%';
                            droplet.style.animationDelay = Math.random() * 0.5 + 's';
                            card.appendChild(droplet);
                            
                            setTimeout(() => {
                                droplet.remove();
                            }, 2000);
                        }, i * 100);
                    }
                });
            });
        }

        function addClickEffects() {
            const cards = document.querySelectorAll('.system-card');
            
            cards.forEach(card => {
                card.addEventListener('click', () => {
                    card.style.transform = 'translateY(-15px) scale(0.98)';
                    setTimeout(() => {
                        card.style.transform = 'translateY(-15px) scale(1.02)';
                    }, 100);
                });
            });
        }

        function animateEfficiencyBadges() {
            const badges = document.querySelectorAll('.efficiency-badge');
            
            badges.forEach((badge, index) => {
                setTimeout(() => {
                    setInterval(() => {
                        badge.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            badge.style.transform = 'scale(1)';
                        }, 200);
                    }, 3000 + index * 500);
                }, 4000 + index * 200);
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            createWaterDroplets();
            addClickEffects();
            animateEfficiencyBadges();
            
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const cards = document.querySelectorAll('.system-card');
                
                cards.forEach((card, index) => {
                    const rate = scrolled * -0.2;
                    card.style.transform = `translate3d(0, ${rate}px, 0)`;
                });
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusedCard = document.activeElement;
                if (focusedCard.classList.contains('system-card')) {
                    focusedCard.style.transform = 'translateY(-15px) scale(1.02)';
                    focusedCard.style.boxShadow = '0 20px 40px rgba(74, 124, 89, 0.2)';
                }
            }
        });
    
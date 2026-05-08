document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Dark Mode Toggle - SMOOTH & PERFORMANT
       ========================================================================== */
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference, system preference, or default to 'light'
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Apply theme immediately to prevent flash (FOUC - Flash of Unstyled Content)
    if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
    }
    
    // Toggle theme function with smooth animation
    const toggleTheme = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply new theme with transition
        htmlElement.style.transition = 'none';
        htmlElement.setAttribute('data-theme', newTheme);
        
        // Force reflow
        void htmlElement.offsetHeight;
        
        // Re-enable transitions
        htmlElement.style.transition = '';
        
        // Save preference
        localStorage.setItem('theme', newTheme);
        
        // Add button animation for feedback
        themeToggle.style.transform = 'scale(0.85) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    };
    
    // Event listener
    themeToggle.addEventListener('click', toggleTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            htmlElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
    
    /* ==========================================================================
       Loading Screen
       ========================================================================== */
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);

    /* ==========================================================================
       Stats Counter Animation
       ========================================================================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            };

            updateCounter();
        });
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateStats();
                statsAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    /* ==========================================================================
       Sticky Navbar & Active State
       ========================================================================== */
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }

        // Active Nav Indicator
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       Mobile Hamburger Menu
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Toggle icon
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when link clicked
    document.querySelectorAll('.nav-link, .btn-rsvp-nav').forEach(n => n.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    }));

    /* ==========================================================================
       Modern Scroll Reveal (Intersection Observer)
       ========================================================================== */
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing after reveal for performance
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    /* ==========================================================================
       Countdown Timer
       ========================================================================== */
    // Set seminar date to June 21, 2026
    const countDate = new Date('Jun 21, 2026 09:00:00').getTime();

    const countdown = () => {
        const now = new Date().getTime();
        const gap = countDate - now;

        if (gap < 0) return; // Stop if date passed

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const d = Math.floor(gap / day);
        const h = Math.floor((gap % day) / hour);
        const m = Math.floor((gap % hour) / minute);
        const s = Math.floor((gap % minute) / second);

        document.getElementById('days').innerText = d < 10 ? '0' + d : d;
        document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
        document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
        document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
    };

    setInterval(countdown, 1000);
    countdown(); // Initial call

    /* ==========================================================================
       Testimonial Slider
       ========================================================================== */
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const sliderDots = document.getElementById('sliderDots');
    
    let currentSlide = 0;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    const goToSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };

    nextBtn.addEventListener('click', () => {
        let next = currentSlide + 1;
        if (next >= slides.length) next = 0;
        goToSlide(next);
    });

    prevBtn.addEventListener('click', () => {
        let prev = currentSlide - 1;
        if (prev < 0) prev = slides.length - 1;
        goToSlide(prev);
    });
    
    // Initialize first slide
    if(slides.length > 0) slides[0].classList.add('active');

    /* ==========================================================================
       FAQ Accordion
       ========================================================================== */
    const faqBtns = document.querySelectorAll('.faq-btn');

    faqBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    /* ==========================================================================
       RSVP Form Validation & Simulation
       ========================================================================== */
    const rsvpForm = document.getElementById('rsvpForm');
    const formMessage = document.getElementById('formMessage');

    if(rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const attendance = document.getElementById('attendance').value;
            
            // Simple validation
            if(name && email && attendance) {
                // Simulate API Call
                const btn = rsvpForm.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                btn.disabled = true;
                
                setTimeout(() => {
                    formMessage.textContent = `Thank you, ${name}! Your RSVP has been confirmed. We look forward to seeing you.`;
                    formMessage.className = 'form-message success';
                    rsvpForm.reset();
                    
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                }, 1500);
            } else {
                formMessage.textContent = 'Please fill out all required fields correctly.';
                formMessage.className = 'form-message error';
            }
        });
    }

    /* ==========================================================================
       Gallery Lightbox Implementation
       ========================================================================== */
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Create modal element
    const modal = document.createElement('div');
    modal.classList.add('gallery-modal');
    modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <img class="modal-content" id="modalImg">
    `;
    document.body.appendChild(modal);

    const modalImg = document.getElementById('modalImg');
    const closeModal = document.querySelector('.close-modal');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            modal.classList.add('active');
            modalImg.src = imgSrc;
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    });

    const closeGalleryModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeModal.addEventListener('click', closeGalleryModal);
    
    // Close on click outside image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeGalleryModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeGalleryModal();
        }
    });

    /* ==========================================================================
       RSVP Conditional Fields
       ========================================================================== */
    const attendanceSelect = document.getElementById('attendance');
    const reasonGroup = document.getElementById('reasonGroup');
    const reasonInput = document.getElementById('reason');

    if (attendanceSelect && reasonGroup) {
        attendanceSelect.addEventListener('change', function() {
            if (this.value === 'not-attending') {
                reasonGroup.style.display = 'block';
                reasonInput.setAttribute('required', 'required');
            } else {
                reasonGroup.style.display = 'none';
                reasonInput.removeAttribute('required');
            }
        });
    }


    /* ==========================================================================
       Hero Cursor Glow Effect
       ========================================================================== */
    const hero = document.querySelector('.hero');
    const heroGlow = document.getElementById('heroGlow');

    if (hero && heroGlow) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            heroGlow.style.left = `${x}px`;
            heroGlow.style.top = `${y}px`;
            
            // Subtle tilt effect for hero content
            const heroContent = document.querySelector('.hero-content');
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 50;
            const rotateY = (centerX - x) / 50;
            
            heroContent.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        hero.addEventListener('mouseleave', () => {
            const heroContent = document.querySelector('.hero-content');
            heroContent.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    }

    /* ==========================================================================
       Particle System for Hero Background
       ========================================================================== */
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = document.documentElement.getAttribute('data-theme') === 'dark' 
                    ? `rgba(107, 140, 255, ${Math.random() * 0.5})` 
                    : `rgba(91, 124, 250, ${Math.random() * 0.3})`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            const count = Math.floor(window.innerWidth / 15);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        init();
        animate();
        
        // Re-init on theme change to update colors
        const observer = new MutationObserver(() => init());
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }

});

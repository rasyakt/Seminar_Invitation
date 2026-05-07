document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Loading Screen
       ========================================================================== */
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

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
       Scroll Reveal Animation
       ========================================================================== */
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    setTimeout(revealOnScroll, 1000);

    /* ==========================================================================
       Countdown Timer
       ========================================================================== */
    // Set seminar date to October 24, 2026
    const countDate = new Date('Oct 24, 2026 09:00:00').getTime();

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

});

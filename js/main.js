document.addEventListener('DOMContentLoaded', () => {

    // Force Page to Top on Load (Aggressive Fix)
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Clear the hash from the URL to prevent browser jump
    if (window.location.hash) {
        window.history.replaceState(null, null, window.location.pathname);
    }

    window.scrollTo(0, 0);

    // Double-check after a brief delay to override any browser default behavior
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 10);

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // --- Hero Slider Logic ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 3500;
    let slideTimer;

    function showSlide(index) {
        if (slides.length === 0) return;

        // Remove active class from current
        slides[currentSlide].classList.remove('active');
        if (dots.length > 0 && dots[currentSlide]) dots[currentSlide].classList.remove('active');

        // Update index
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        // Add active class to new
        slides[currentSlide].classList.add('active');
        if (dots.length > 0 && dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Expose goToSlide to global scope for HTML onclick attributes
    window.goToSlide = function (index) {
        showSlide(index);
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, slideInterval);
    };

    // Start Slider immediately
    if (slides.length > 0) {
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    // --- Navbar Scroll Effect ---
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
            } else {
                navbar.style.boxShadow = "0 5px 15px rgba(0,0,0,0.03)";
            }
        }
    });

    // --- Scroll Animation (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // --- Project Filter Logic ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-grid .card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.classList.remove('hide');
                    } else {
                        if (card.getAttribute('data-category') === filterValue) {
                            card.classList.remove('hide');
                        } else {
                            card.classList.add('hide');
                        }
                    }
                });
            });
        });
    }

    // --- Theme Toggle Logic ---
    // --- Theme Toggle Logic ---
    // Handle multiple toggle buttons (Desktop & Mobile)
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    const body = document.body;

    // 1. Initialize State based on localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    // 2. Add Event Listeners to ALL buttons
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');

            // Save preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    });
});

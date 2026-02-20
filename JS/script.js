/**
 * script.js
 * Portfolio Interactions & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initScrollReveal();
    initStickyHeader();
    initProjectFilter();
    initContactForm();
    initMobileMenu();
});

/**
 * Custom Cursor Interaction
 */
function initCursor() {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot interaction
        cursorDot.style.translate = `${posX}px ${posY}px`;

        // Outline interaction (smooth lag using animate API)
        cursorOutline.animate({
            translate: `${posX}px ${posY}px`
        }, { duration: 400, fill: "forwards" });
    });

    // Hover Effects
    const interactiveElements = 'a, button, .work-card, .service-card, .solution-card, input, textarea';
    document.querySelectorAll(interactiveElements).forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
            cursorDot.style.opacity = '0';
        });

        item.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorDot.style.opacity = '1';
        });
    });
}

/**
 * Sticky Header on Scroll
 */
function initStickyHeader() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Project Filter Functionality
 */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            workItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Basic validation
        if (!data.name || !data.email || !data.message) {
            showFormStatus('Please fill in all fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormStatus('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission (replace with actual backend endpoint)
        try {
            // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });

            // For now, show success message
            showFormStatus('Thank you! Your message has been sent successfully.', 'success');
            form.reset();

            // In production, you would send to a backend like:
            // - Formspree
            // - Netlify Forms
            // - Custom API endpoint
            // - EmailJS

            console.log('Form data:', data);
        } catch (error) {
            showFormStatus('Oops! Something went wrong. Please try again.', 'error');
        }
    });
}

/**
 * Show Form Status Message
 */
function showFormStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';

    // Hide after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

/**
 * Scroll Reveal Animation (Intersection Observer)
 */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all elements with .reveal class
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

console.log("✨ Portfolio Logic Initialized");

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-links li a");

    if (!hamburger || !navMenu) return;

    // Toggle Menu
    hamburger.addEventListener("click", () => {
        const isActive = hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");

        // Accessibility
        hamburger.setAttribute("aria-expanded", isActive);

        // Lock scroll when menu is open
        if (isActive) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            hamburger.setAttribute("aria-expanded", false);
            document.body.style.overflow = ""; // Unlock scroll
        });
    });

    // Close menu on resize if above breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) { // lg breakpoint
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            hamburger.setAttribute("aria-expanded", false);
            document.body.style.overflow = "";
        }
    });
}

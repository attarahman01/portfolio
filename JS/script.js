/**
 * script.js
 * Portfolio Interactions & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initProjectFilter();
    initContactForm();
    initNavHighlighting();
    initLightbox();
});

/**
 * Image Lightbox Functionality
 */
function initLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    if (!lightbox || !lightboxImg || !closeBtn) return;

    // Open lightbox
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const imageSrc = trigger.getAttribute('src');
            const imageAlt = trigger.getAttribute('alt');
            
            if (imageSrc) {
                // Determine layout behavior, optional loading state could be added here
                lightboxImg.setAttribute('src', imageSrc);
                lightboxImg.setAttribute('alt', imageAlt || 'Full size preview');
                
                // Show lightbox and animate
                lightbox.classList.remove('hidden');
                lightbox.classList.add('flex');
                
                // Slight delay to allow display flex to apply before opacity transition
                requestAnimationFrame(() => {
                    lightbox.classList.remove('opacity-0');
                    lightbox.classList.add('opacity-100');
                    lightboxImg.classList.remove('scale-95');
                    lightboxImg.classList.add('scale-100');
                });
                
                // Prevent body scroll
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox function
    const closeLightbox = () => {
        // Animate out
        lightbox.classList.remove('opacity-100');
        lightbox.classList.add('opacity-0');
        lightboxImg.classList.remove('scale-100');
        lightboxImg.classList.add('scale-95');
        
        // Hide after transition ends
        setTimeout(() => {
            lightbox.classList.remove('flex');
            lightbox.classList.add('hidden');
            lightboxImg.setAttribute('src', ''); // Clear src
        }, 300); // match duration-300
        
        // Restore body scroll
        document.body.style.overflow = '';
    };

    // Close on button click
    closeBtn.addEventListener('click', closeLightbox);

    // Close on click outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.closest('.relative') && e.target !== lightboxImg) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            closeLightbox();
        }
    });
}



/**
 * Dynamic Navigation Highlighting & Scroll Spy
 */
function initNavHighlighting() {
    let page = window.location.pathname.split('/').pop() || 'index.html';
    
    // Select all navigation links
    const desktopLinks = document.querySelectorAll('.flex.space-x-8 a');
    const mobileLinks = document.querySelectorAll('#mobile-menu .space-y-4 > a:not(.btn)');

    const desktopInactiveClasses = ['text-text-main', 'font-medium', 'hover:text-primary', 'transition-colors', 'py-2'];
    const desktopActiveClasses = ['text-primary', 'font-medium', 'hover:text-primary', 'transition-colors', 'py-2', 'relative', 'after:absolute', 'after:bottom-0', 'after:left-0', 'after:w-full', 'after:h-0.5', 'after:bg-primary'];
    
    const mobileInactiveClasses = ['block', 'text-2xl', 'font-medium', 'text-text-main', 'hover:text-primary', 'transition-colors'];
    const mobileActiveClasses = ['block', 'text-2xl', 'font-bold', 'text-primary'];

    function updateNav(activeHref) {
        desktopLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            
            // Clean up old classes
            link.classList.remove(...desktopInactiveClasses, ...desktopActiveClasses);
            
            if (href === activeHref || (activeHref === 'index.html' && href === './')) {
                link.classList.add(...desktopActiveClasses);
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.add(...desktopInactiveClasses);
                link.removeAttribute('aria-current');
            }
        });

        mobileLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;

            link.classList.remove(...mobileInactiveClasses, ...mobileActiveClasses);
            
            if (href === activeHref || (activeHref === 'index.html' && href === './')) {
                link.classList.add(...mobileActiveClasses);
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.add(...mobileInactiveClasses);
                link.removeAttribute('aria-current');
            }
        });
    }

    function checkScrollSpy() {
        // Default highlight logic based on page
        let activeHref = page;

        // Portfolio project pages should highlight the "Portfolio" link (projects.html)
        const projectPages = ['loopin.html', 'memotrip.html', 'veura.html', 'receiptly.html', 'rahmani-wine.html'];
        if (projectPages.includes(page)) {
            activeHref = 'projects.html';
        }

        // Specifically for index.html, check if the contact section is in view
        if (page === 'index.html' || page === '') {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const rect = contactSection.getBoundingClientRect();
                const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50;
                // If top of contact section is within upper half of viewport or scrolled to bottom
                if (rect.top <= window.innerHeight / 2 || isAtBottom) {
                    activeHref = 'index.html#contact';
                } else {
                    activeHref = 'index.html';
                }
            }
        }

        updateNav(activeHref);
    }

    // Run on load
    checkScrollSpy();

    // Run on scroll
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(checkScrollSpy);
    }, { passive: true });
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

        // Handle form submission to Web3Forms
        try {
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const result = await response.json();

            if (response.status === 200) {
                showFormStatus('Thank you! Your message has been sent successfully.', 'success');
                form.reset();
            } else {
                console.error(result);
                showFormStatus(result.message || 'Oops! Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            console.error(error);
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
 * Smooth Scroll for Anchor Links
 */
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') return;

        const [path, hash] = href.split('#');
        let page = window.location.pathname.split('/').pop() || 'index.html';

        // ONLY intercept if link points to the same page
        if (path === '' || path === page || (path === 'index.html' && page === '')) {
            e.preventDefault();
            const target = document.querySelector('#' + hash);

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, '#' + hash);
            }
        }
    });
});

console.log("✨ Portfolio Logic Initialized");

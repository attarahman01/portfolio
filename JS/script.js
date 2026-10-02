/**
 * script.js
 * Portfolio Interactions & Animations
 */
document.addEventListener('DOMContentLoaded', () => {
    initAutoHidingNav();
    initProjectFilter();
    initContactForm();
    initNavHighlighting();
    initLightbox();
    initSmoothScroll();
    initReadingProgress();
    initScrollToTop();
    initScrollReveal();
    initArcCarousel();
    initFannedDeck();
});

/**
 * Image Lightbox Functionality
 */
function initLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');

    if (!lightbox || !lightboxImg || !closeBtn) return;

    // Attach click listeners to all lightbox triggers (delegate or direct)
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.lightbox-trigger');
        if (!trigger) return;

        const imageSrc = trigger.getAttribute('data-src') || trigger.getAttribute('src') || trigger.getAttribute('href');
        const imageAlt = trigger.getAttribute('alt') || trigger.getAttribute('data-alt') || '';
        const captionText = trigger.getAttribute('data-caption') || imageAlt;

        if (imageSrc) {
            e.preventDefault();
            lightboxImg.setAttribute('src', imageSrc);
            lightboxImg.setAttribute('alt', imageAlt || 'Full size preview');
            if (lightboxCaption) {
                lightboxCaption.textContent = captionText;
            }

            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');

            requestAnimationFrame(() => {
                lightbox.classList.remove('opacity-0');
                lightbox.classList.add('opacity-100');
                lightboxImg.classList.remove('scale-95');
                lightboxImg.classList.add('scale-100');
            });

            document.body.style.overflow = 'hidden';
        }
    });

    const closeLightbox = () => {
        lightbox.classList.remove('opacity-100');
        lightbox.classList.add('opacity-0');
        lightboxImg.classList.remove('scale-100');
        lightboxImg.classList.add('scale-95');

        setTimeout(() => {
            lightbox.classList.remove('flex');
            lightbox.classList.add('hidden');
            lightboxImg.setAttribute('src', '');
        }, 280);

        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || (e.target.closest('.relative') && e.target !== lightboxImg && e.target !== lightboxCaption)) {
            closeLightbox();
        }
    });

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
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const isHome = page === 'index.html' || page === '';

    const desktopLinks = document.querySelectorAll('header .nav-link');
    const mobileLinks = document.querySelectorAll('#mobile-menu-drawer .mobile-nav-item');

    function setActive(activeId) {
        desktopLinks.forEach(link => {
            if (link.id === activeId) {
                link.classList.add('nav-link-active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('nav-link-active');
                link.removeAttribute('aria-current');
            }
        });

        mobileLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            const matches = (activeId === 'nav-work' && href.includes('#work')) ||
                            (activeId === 'nav-about' && href.includes('about.html')) ||
                            (activeId === 'nav-experience' && href.includes('#experience')) ||
                            (activeId === 'nav-contact' && href.includes('#contact'));

            if (matches) {
                link.classList.add('font-bold', 'text-slate-900');
                link.classList.remove('font-medium', 'text-slate-600');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('font-bold', 'text-slate-900');
                link.classList.add('font-medium', 'text-slate-600');
                link.removeAttribute('aria-current');
            }
        });
    }

    if (!isHome) {
        if (page === 'about.html') {
            setActive('nav-about');
        } else {
            // Case study pages highlight Work
            setActive('nav-work');
        }
        return;
    }

    // Scroll spy for index.html
    const sections = [
        { id: 'contact', navId: 'nav-contact' },
        { id: 'about',   navId: 'nav-about' },
        { id: 'work',    navId: 'nav-work' },
    ];

    function checkScroll() {
        const scrollPosition = window.scrollY + 200;
        const pageBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 80);

        if (pageBottom) {
            setActive('nav-contact');
            return;
        }

        for (const section of sections) {
            const el = document.getElementById(section.id);
            if (el) {
                const top = el.offsetTop;
                const height = el.offsetHeight;
                if (scrollPosition >= top && scrollPosition < top + height) {
                    setActive(section.navId);
                    return;
                }
            }
        }

        if (window.scrollY < 400) {
            setActive('');
        }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
}

/**
 * Auto-Hiding Navigation on Scroll:
 * Fixed to the top, hidden when scrolling down (past 80px), revealed when scrolling up.
 * Throttled with requestAnimationFrame for 60fps performance and minimal CPU usage.
 */
function initAutoHidingNav() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    let ticking = false;
    const SCROLL_THRESHOLD = 80; // Always visible within top 80px
    const DELTA_THRESHOLD = 5;  // Filter out tiny scroll jitters

    function updateNav() {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

        // If mobile menu drawer is open, keep nav visible
        const drawer = document.getElementById('mobile-menu-drawer');
        if (drawer && !drawer.classList.contains('hidden')) {
            header.classList.remove('nav-hidden');
            lastScrollY = currentScrollY;
            ticking = false;
            return;
        }

        // At the very top (within threshold), always show regardless of direction
        if (currentScrollY <= SCROLL_THRESHOLD) {
            header.classList.remove('nav-hidden');
        } else {
            const delta = currentScrollY - lastScrollY;
            if (Math.abs(delta) >= DELTA_THRESHOLD) {
                if (delta > 0) {
                    // Scrolling DOWN -> slide out of view
                    header.classList.add('nav-hidden');
                } else {
                    // Scrolling UP -> slide back into view
                    header.classList.remove('nav-hidden');
                }
            }
        }

        lastScrollY = Math.max(0, currentScrollY);
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNav);
            ticking = true;
        }
    }, { passive: true });

    // Ensure nav is visible on page load
    updateNav();
}

/**
 * Project Filter Functionality (for projects.html archive & index.html)
 */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card, .work-item');

    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = btn.closest('.filter-container') || btn.parentElement;
            if (parent) {
                parent.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            } else {
                filterBtns.forEach(b => b.classList.remove('active'));
            }
            btn.classList.add('active');

            const filterValue = (btn.getAttribute('data-filter') || 'all').toLowerCase();

            // Find target cards (if within the same section on index.html, target those; else target page cards)
            const section = btn.closest('section');
            const sectionCards = section ? section.querySelectorAll('.project-card, .work-item') : [];
            const targetCards = (sectionCards.length > 0) ? sectionCards : projectCards;

            targetCards.forEach(card => {
                const category = (card.getAttribute('data-category') || '').toLowerCase();
                const categories = category.split(/\s+/).filter(Boolean);
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ══════════════════════════════════════════════════════════════════════════ */
/* ── CONTACT FORM HANDLING & VALIDATION ──────────────────────────────────── */
/* ══════════════════════════════════════════════════════════════════════════ */
const FORM_ENDPOINT = 'https://api.web3forms.com/submit'; // [PASTE FORMSPREE ENDPOINT / WEB3FORMS ENDPOINT HERE]

function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const companyInput = document.getElementById('contact-company');
    const messageInput = document.getElementById('contact-message');
    const honeypot = document.getElementById('contact-honeypot');

    const submitBtn = document.getElementById('contact-submit-btn');
    const submitText = document.getElementById('contact-submit-text');
    const statusAlert = document.getElementById('contact-status-alert');
    const successState = document.getElementById('contact-success-state');

    const errorName = document.getElementById('error-name');
    const errorEmail = document.getElementById('error-email');
    const errorMessage = document.getElementById('error-message');

    // Helper to clear error state
    function clearError(input, errorEl) {
        if (!input || !errorEl) return;
        input.classList.remove('is-invalid');
        errorEl.textContent = '';
        errorEl.classList.add('hidden');
    }

    // Helper to set error state
    function setError(input, errorEl, message) {
        if (!input || !errorEl) return;
        input.classList.add('is-invalid');
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
    }

    // Real-time input validation cleanup
    [nameInput, emailInput, messageInput].forEach(field => {
        if (!field) return;
        field.addEventListener('input', () => {
            if (field === nameInput) clearError(nameInput, errorName);
            if (field === emailInput) clearError(emailInput, errorEmail);
            if (field === messageInput) clearError(messageInput, errorMessage);
            if (statusAlert) statusAlert.classList.add('hidden');
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Check Honeypot spam trap
        if (honeypot && honeypot.value.trim() !== '') {
            // Silently swallow bot submission
            form.reset();
            return;
        }

        // 2. Client-side field validation
        let hasError = false;
        const nameVal = nameInput ? nameInput.value.trim() : '';
        const emailVal = emailInput ? emailInput.value.trim() : '';
        const messageVal = messageInput ? messageInput.value.trim() : '';

        if (!nameVal) {
            setError(nameInput, errorName, 'Please enter your name.');
            hasError = true;
        } else {
            clearError(nameInput, errorName);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal) {
            setError(emailInput, errorEmail, 'Please enter your email address.');
            hasError = true;
        } else if (!emailRegex.test(emailVal)) {
            setError(emailInput, errorEmail, 'Please enter a valid email address (e.g. name@domain.com).');
            hasError = true;
        } else {
            clearError(emailInput, errorEmail);
        }

        if (!messageVal) {
            setError(messageInput, errorMessage, 'Please write a brief message.');
            hasError = true;
        } else if (messageVal.length < 5) {
            setError(messageInput, errorMessage, 'Message is a bit too short. Please provide a little more detail.');
            hasError = true;
        } else {
            clearError(messageInput, errorMessage);
        }

        if (hasError) {
            // Focus the first invalid input for keyboard accessibility
            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        // 3. Prepare payload
        const payload = {
            name: nameVal,
            email: emailVal,
            company: companyInput ? companyInput.value.trim() : '',
            message: messageVal,
            _subject: `New portfolio inquiry from ${nameVal}`
        };

        // 4. Update button to "Sending…" (disabled)
        if (submitBtn) submitBtn.disabled = true;
        if (submitText) submitText.textContent = 'Sending…';
        if (statusAlert) statusAlert.classList.add('hidden');

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json().catch(() => ({}));

            if (response.ok && (result.success !== false)) {
                // Success: Hide form and show confirmation
                form.classList.add('hidden');
                if (successState) {
                    successState.classList.remove('hidden');
                    successState.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (error) {
            // Failure: Keep form filled in, display direct email fallback message
            if (statusAlert) {
                statusAlert.className = 'mb-6 p-4 rounded-xl text-xs font-mono bg-red-50 text-red-900 border border-red-200 block';
                statusAlert.innerHTML = `<strong>Unable to send message right now.</strong> Please email me directly at <a href="mailto:attarahman406@gmail.com" class="underline font-semibold hover:text-red-700">attarahman406@gmail.com</a>. Your message draft has been saved above.`;
                statusAlert.classList.remove('hidden');
                statusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        } finally {
            if (submitBtn) submitBtn.disabled = false;
            if (submitText) submitText.textContent = 'Send message';
        }
    });
}

/**
 * Smooth Scroll for In-Page Anchors
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const [path, hash] = href.split('#');
            const page = window.location.pathname.split('/').pop() || 'index.html';

            if (path === '' || path === page || (path === 'index.html' && (page === '' || page === 'index.html'))) {
                const target = document.getElementById(hash);
                if (target) {
                    e.preventDefault();
                    // Subtle offset so anchored section content has clean breathing room below top
                    const headerOffset = 24;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    history.pushState(null, null, '#' + hash);
                }
            }
        });
    });
}

/**
 * Reading Progress Bar — only on case study / long pages
 */
function initReadingProgress() {
    // Only add on long pages (case studies, about)
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const progressPages = ['loopin.html', 'receiptly.html', 'memotrip.html', 'veura.html', 'rahmani-wine.html', 'about.html'];
    if (!progressPages.includes(page)) return;

    const bar = document.createElement('div');
    bar.className = 'reading-progress-bar';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = Math.min(progress, 100) + '%';
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}

/**
 * Scroll-to-Top Button
 */
function initScrollToTop() {
    const btn = document.createElement('button');
    btn.className = 'scroll-to-top';
    btn.setAttribute('aria-label', 'Scroll to top of page');
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    document.body.appendChild(btn);

    const handleScroll = () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    };

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/**
 * Scroll Reveal for Section Elements (gentle fade-up)
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
        revealElements.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/**
 * Interactive Arc Carousel
 * Fluid revolving semicircular carousel with momentum physics, touch drag, and radial compass dial ticks.
 */
function initArcCarousel() {
    const root = document.getElementById('arc-carousel-root');
    const track = document.getElementById('arc-cards-track');
    const ticksSvg = document.getElementById('arc-ticks-svg');
    const centerContent = document.getElementById('arc-center-content');
    const prevBtn = document.getElementById('arc-prev-btn');
    const nextBtn = document.getElementById('arc-next-btn');

    if (!root || !track || !ticksSvg) return;

    const cards = Array.from(track.querySelectorAll('.arc-card'));
    if (!cards.length) return;

    const totalCards = cards.length;
    const anglePerCard = 360 / totalCards; // 360 / 20 = 18 degrees

    let currentAngle = 0;
    let targetAngle = 0;
    let velocity = 0;
    let isDragging = false;
    let startX = 0;
    let lastX = 0;
    let lastTime = 0;
    let hasDragged = false;
    let isHovered = false;
    let hoveredCardIdx = -1;
    const autoSpeed = -0.050; // 2X speed (~6s per card, ~45px/sec)

    // Responsive geometry state
    let containerWidth = 0;
    let containerHeight = 0;
    let Cx = 0;
    let Cy = 0;
    let R = 0;
    let cardW = 0;
    let cardH = 0;
    let Rticks = 0;
    let maxVisibleAngle = 62;
    let fadeStartAngle = 50;

    function updateDimensions() {
        containerWidth = root.offsetWidth;
        Cx = containerWidth / 2;

        if (containerWidth >= 1200) {
            // Large Desktop: Generous shallow arc with wide clearance and perfect card spacing
            containerHeight = 880;
            root.style.height = '880px';
            R = 860;
            Cy = 1160;
            cardW = 195;
            cardH = 260;
            maxVisibleAngle = 62;
            fadeStartAngle = 50;
            if (centerContent) {
                centerContent.style.top = '590px';
                centerContent.style.transform = 'translate(-50%, -50%)';
            }
        } else if (containerWidth >= 992) {
            // Laptop / Standard Desktop
            containerHeight = 830;
            root.style.height = '830px';
            R = 760;
            Cy = 1030;
            cardW = 170;
            cardH = 227;
            maxVisibleAngle = 62;
            fadeStartAngle = 50;
            if (centerContent) {
                centerContent.style.top = '550px';
                centerContent.style.transform = 'translate(-50%, -50%)';
            }
        } else if (containerWidth >= 768) {
            // Tablet: Scaled shallow arc with guaranteed inter-card clearance
            containerHeight = 770;
            root.style.height = '770px';
            R = 660;
            Cy = 900;
            cardW = 140;
            cardH = 186;
            maxVisibleAngle = 60;
            fadeStartAngle = 46;
            if (centerContent) {
                centerContent.style.top = '505px';
                centerContent.style.transform = 'translate(-50%, -50%)';
            }
        } else if (containerWidth >= 540) {
            // Small Tablet / Large Phone: Scaled cards
            containerHeight = 720;
            root.style.height = '720px';
            R = 560;
            Cy = 780;
            cardW = 140;
            cardH = 186;
            maxVisibleAngle = 54;
            fadeStartAngle = 40;
            if (centerContent) {
                centerContent.style.top = '480px';
                centerContent.style.transform = 'translate(-50%, -50%)';
            }
        } else {
            // Mobile (<540px): Cards enlarged for high visual impact and readability
            const isSmall = containerWidth < 380;
            containerHeight = isSmall ? 680 : 700;
            root.style.height = `${containerHeight}px`;
            R = isSmall ? 480 : 510;
            Cy = isSmall ? 680 : 715;
            cardW = isSmall ? 124 : 136;
            cardH = isSmall ? 165 : 181;
            maxVisibleAngle = 50;
            fadeStartAngle = 36;
            if (centerContent) {
                centerContent.style.top = isSmall ? '460px' : '480px';
                centerContent.style.transform = 'translate(-50%, -50%)';
            }
        }

        Rticks = R - (cardH / 2) - (containerWidth < 768 ? 10 : 16);

        // Apply responsive card dimensions
        cards.forEach((card) => {
            card.style.width = `${cardW}px`;
            card.style.height = `${cardH}px`;
        });

        // Redraw vector ticks
        drawTicks();
    }

    function drawTicks() {
        ticksSvg.setAttribute('viewBox', `0 0 ${containerWidth} ${containerHeight}`);
        let html = '';
        const startAngle = -maxVisibleAngle;
        const endAngle = maxVisibleAngle;
        const step = containerWidth < 768 ? 2 : 1.5;

        for (let a = startAngle; a <= endAngle; a += step) {
            const rad = a * (Math.PI / 180);
            const isMajor = (Math.round(a) % 6 === 0);
            const len = isMajor ? (containerWidth < 768 ? 10 : 14) : (containerWidth < 768 ? 6 : 9);
            const strokeColor = isMajor ? 'rgba(15, 23, 42, 0.22)' : 'rgba(15, 23, 42, 0.08)';
            const strokeWidth = isMajor ? 1.5 : 1;

            const x1 = (Cx + (Rticks - len) * Math.sin(rad)).toFixed(1);
            const y1 = (Cy - (Rticks - len) * Math.cos(rad)).toFixed(1);
            const x2 = (Cx + Rticks * Math.sin(rad)).toFixed(1);
            const y2 = (Cy - Rticks * Math.cos(rad)).toFixed(1);

            html += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" />`;
        }
        ticksSvg.innerHTML = html;
    }

    // Card Hover & Click Handling
    cards.forEach((card, idx) => {
        card.addEventListener('mouseenter', () => {
            isHovered = true;
            hoveredCardIdx = idx;
        });
        card.addEventListener('mouseleave', () => {
            isHovered = false;
            hoveredCardIdx = -1;
        });

        // Prevent navigation if user dragged
        card.addEventListener('click', (e) => {
            if (hasDragged) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });

    // Pointer Events for Drag & Touch-Swipe
    root.addEventListener('pointerdown', (e) => {
        if (e.target.closest('a, button, .arc-center-content')) return;
        isDragging = true;
        hasDragged = false;
        startX = e.clientX;
        lastX = e.clientX;
        lastTime = performance.now();
        velocity = 0;
        root.classList.add('is-dragging');
        try {
            root.setPointerCapture(e.pointerId);
        } catch (_) {}
    });

    root.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const now = performance.now();
        const dt = Math.max(1, now - lastTime);
        const dx = e.clientX - lastX;

        if (Math.abs(e.clientX - startX) > 6) {
            hasDragged = true;
        }

        const degPerPx = (1 / R) * (180 / Math.PI) * 0.75;
        const deltaAngle = dx * degPerPx;
        targetAngle += deltaAngle;
        currentAngle += deltaAngle;

        velocity = deltaAngle / (dt / 16.67);
        lastX = e.clientX;
        lastTime = now;
    });

    const onPointerUp = (e) => {
        if (!isDragging) return;
        isDragging = false;
        root.classList.remove('is-dragging');
        try {
            root.releasePointerCapture(e.pointerId);
        } catch (_) {}

        velocity = Math.max(-2.5, Math.min(2.5, velocity));
    };

    root.addEventListener('pointerup', onPointerUp);
    root.addEventListener('pointercancel', onPointerUp);

    // Prev / Next Button Navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            targetAngle = currentAngle + anglePerCard;
            velocity = 0;
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            targetAngle = currentAngle - anglePerCard;
            velocity = 0;
        });
    }

    let lastRenderTime = performance.now();

    // Animation Loop (Framerate-independent requestAnimationFrame)
    function render(now) {
        const currentTime = typeof now === 'number' ? now : performance.now();
        const deltaMs = Math.min(currentTime - lastRenderTime, 64);
        lastRenderTime = currentTime;
        const timeScale = deltaMs / 16.667;

        if (isDragging) {
            // Handled directly in pointermove
        } else if (Math.abs(velocity) > 0.002) {
            // Momentum decay after user drag release
            currentAngle += velocity * timeScale;
            targetAngle = currentAngle;
            velocity *= Math.pow(0.92, timeScale);
        } else if (Math.abs(targetAngle - currentAngle) > 0.05) {
            // Smoothly easing to target angle (after prev/next button click)
            currentAngle += (targetAngle - currentAngle) * Math.min(1, 0.08 * timeScale);
        } else {
            // True slow-motion continuous glide (steady, uninterrupted slow drift)
            currentAngle += autoSpeed * timeScale;
            targetAngle = currentAngle;
        }

        // Normalize angle periodically when steady
        if (Math.abs(targetAngle - currentAngle) <= 0.05) {
            currentAngle = ((currentAngle % 360) + 360) % 360;
            targetAngle = currentAngle;
        }

        // Position each card along the arc
        cards.forEach((card, idx) => {
            const rawAngle = (currentAngle + idx * anglePerCard) % 360;
            let cardAngle = rawAngle;
            if (cardAngle > 180) cardAngle -= 360; // range [-180, 180]

            const absAngle = Math.abs(cardAngle);

            if (absAngle > maxVisibleAngle) {
                card.style.visibility = 'hidden';
                card.style.opacity = '0';
                card.style.pointerEvents = 'none';
            } else {
                card.style.visibility = 'visible';
                card.style.pointerEvents = 'auto';

                // Fade out softly between fadeStartAngle and maxVisibleAngle
                let opacity = 1;
                if (absAngle > fadeStartAngle) {
                    opacity = (maxVisibleAngle - absAngle) / (maxVisibleAngle - fadeStartAngle);
                }
                card.style.opacity = opacity.toFixed(2);

                const rad = cardAngle * (Math.PI / 180);
                const x = Cx + R * Math.sin(rad) - cardW / 2;
                const y = Cy - R * Math.cos(rad) - cardH / 2;

                const isCardHovered = (hoveredCardIdx === idx);
                const scale = isCardHovered ? 1.06 : 1.0;

                card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${cardAngle.toFixed(2)}deg) scale(${scale})`;
            }
        });

        requestAnimationFrame(render);
    }

    // Initialize dimensions and start loop
    updateDimensions();
    render();

    // Debounced resize handler
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateDimensions();
        }, 100);
    });
}

/**
 * Fanned Deck Hover Coordination
 * Supports CSS :has() with JS class toggle for depth transitions across cards
 */
function initFannedDeck() {
    const deck = document.querySelector('.services-twozone-deck, .services-fanned-deck');
    if (!deck) return;
    const cards = deck.querySelectorAll('.deck-twozone-card, .fanned-card');

    cards.forEach(card => {
        const handleEnter = () => {
            deck.classList.add('deck-has-hover');
            cards.forEach(c => c.classList.remove('card-is-hovered'));
            card.classList.add('card-is-hovered');
        };

        const handleLeave = () => {
            card.classList.remove('card-is-hovered');
            // Check if any other card still has hover/focus
            setTimeout(() => {
                const anyHovered = Array.from(cards).some(c => c.matches(':hover') || c.contains(document.activeElement));
                if (!anyHovered) {
                    deck.classList.remove('deck-has-hover');
                }
            }, 50);
        };

        card.addEventListener('mouseenter', handleEnter);
        card.addEventListener('mouseleave', handleLeave);
        card.addEventListener('focusin', handleEnter);
        card.addEventListener('focusout', handleLeave);
    });
}


/**
 * components.js
 * Shared Nav & Footer injection — single source of truth for all pages.
 *
 * Provides:
 * - Clean editorial navigation (Work, About, Experience, Contact + Resume)
 * - Mobile responsive drawer with zero-dependency toggle
 * - Universal accessible footer
 * - Image Lightbox modal for case-study visuals
 */

const RESUME_URL = 'assets/Atta_Rahman_Resume.pdf';

/* ─── Social Links ───────────────────────────────────────────────────────────── */
const SOCIAL = {
    linkedin:  { href: 'https://www.linkedin.com/in/atta-rahman-/', label: 'LinkedIn' },
    github:    { href: 'https://github.com/attarahman',             label: 'GitHub' },
    behance:   { href: 'https://www.behance.net/attarahman',        label: 'Behance' },
    email:     { href: 'mailto:attarahman406@gmail.com',            label: 'Email' },
};

/* ─── SVG Icons ─────────────────────────────────────────────────────────────── */
const ICONS = {
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    github:   `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="16" height="16"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    behance:  `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="16" height="16"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></svg>`,
    email:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true" width="16" height="16"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    external: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true" width="11" height="11"><path d="M6 3H3v10h10v-3M10 2h4m0 0v4m0-4L6 10" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    menu:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true" class="w-6 h-6 icon-menu"><path d="M3.75 7.5h16.5M3.75 12h16.5m-16.5 4.5h16.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    close:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true" class="w-6 h-6 icon-close hidden"><path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/* ─── Nav Links Config ───────────────────────────────────────────────────────── */
const NAV_LINKS = [
    { href: 'index.html#work',    label: 'Work',    id: 'nav-work' },
    { href: 'about.html',         label: 'About',   id: 'nav-about' },
    { href: 'index.html#contact', label: 'Contact', id: 'nav-contact' },
];

/* ─── Helper for active link checking ────────────────────────────────────────── */
function isCurrentPage(href) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const [targetPath] = href.split('#');
    if (targetPath === 'about.html' && currentPath === 'about.html') return true;
    return false;
}

/* ─── Social Icon Button ─────────────────────────────────────────────────────── */
function socialBtn(key, size = 'sm') {
    const s = SOCIAL[key];
    const dim = size === 'lg' ? 'w-10 h-10' : 'w-9 h-9';
    return `<a href="${s.href}" target="_blank" rel="noopener noreferrer"
        class="${dim} rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-white hover:text-slate-900 transition-all duration-200"
        aria-label="${s.label}">${ICONS[key]}</a>`;
}

/* ─── Nav HTML ───────────────────────────────────────────────────────────────── */
function buildNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isHome = currentPath === 'index.html' || currentPath === '';

    const desktopLinks = NAV_LINKS.map(link => {
        let linkHref = link.href;
        if (isHome && link.href.startsWith('index.html#')) {
            linkHref = link.href.replace('index.html', '');
        }
        const isActive = isCurrentPage(link.href);
        return `<a href="${linkHref}" id="${link.id}"
            class="nav-link ${isActive ? 'nav-link-active' : ''}"
            ${isActive ? 'aria-current="page"' : ''}>${link.label}</a>`;
    }).join('');

    const mobileLinks = NAV_LINKS.map(link => {
        let linkHref = link.href;
        if (isHome && link.href.startsWith('index.html#')) {
            linkHref = link.href.replace('index.html', '');
        }
        const isActive = isCurrentPage(link.href);
        return `<a href="${linkHref}"
            class="mobile-nav-item block py-2.5 text-lg ${isActive ? 'font-bold text-slate-950' : 'font-medium text-slate-700'} hover:text-blue-900 transition-colors"
            ${isActive ? 'aria-current="page"' : ''}>${link.label}</a>`;
    }).join('');

    const headerClass = "fixed top-3 sm:top-4 inset-x-0 z-[1000] flex justify-center px-4 sm:px-6 pointer-events-none";

    return `
<header class="${headerClass}" id="site-header">
    <div class="relative w-full max-w-xl md:max-w-[1240px] flex flex-col items-center">
        <nav class="nav-floating-pill pointer-events-auto flex items-center justify-between w-full px-4 sm:px-6 md:px-8 py-2 md:py-3 h-14 sm:h-16 rounded-full"
             aria-label="Primary Navigation">

            <!-- Brand / Logo (Left) -->
            <div class="flex items-center md:flex-1 md:justify-start">
                <a href="index.html" class="flex items-center group" aria-label="Atta Rahman — Home">
                    <img src="images/logo-dark-contrast.webp" alt="atta" class="h-5 sm:h-6 w-auto object-contain transition-opacity group-hover:opacity-75">
                </a>
            </div>

            <!-- Desktop Nav Links (Center) -->
            <div class="hidden md:flex items-center justify-center gap-10 md:flex-1">
                ${desktopLinks}
            </div>

            <!-- Right: Resume Button -->
            <div class="hidden md:flex items-center md:flex-1 md:justify-end">
                <a href="${RESUME_URL}" target="_blank" rel="noopener noreferrer"
                    class="btn btn-primary !py-2 !px-4.5 !text-xs !font-medium"
                    aria-label="View Resume PDF">
                    <span>Resume</span>
                    ${ICONS.external}
                </a>
            </div>

            <!-- Mobile Controls -->
            <div class="flex items-center gap-2 md:hidden">
                <a href="${RESUME_URL}" target="_blank" rel="noopener noreferrer"
                    class="btn btn-primary !py-1.5 !px-3 !text-xs !font-medium"
                    aria-label="View Resume PDF">
                    Resume ↗
                </a>
                <button type="button" id="mobile-menu-btn"
                    class="inline-flex items-center justify-center p-2 rounded-full text-slate-900 hover:bg-black/5 transition-colors cursor-pointer"
                    aria-label="Toggle Navigation Menu" aria-expanded="false" aria-controls="mobile-menu-drawer">
                    ${ICONS.menu}
                    ${ICONS.close}
                </button>
            </div>
        </nav>

        <!-- Mobile Drawer -->
        <div id="mobile-menu-drawer" class="hidden md:hidden pointer-events-auto w-full mt-2 rounded-3xl nav-floating-pill px-6 py-6 shadow-2xl animate-fade-up">
            <div class="flex flex-col space-y-3">
                ${mobileLinks}
                <div class="pt-4 border-t border-slate-200/60 mt-2 flex flex-col gap-3">
                    <a href="${RESUME_URL}" target="_blank" rel="noopener noreferrer"
                        class="btn btn-primary w-full text-center py-2.5 text-xs font-medium"
                        aria-label="View Resume PDF">View Resume (PDF) ↗</a>
                    <div class="flex items-center justify-center gap-3 pt-2">
                        ${socialBtn('linkedin')}
                        ${socialBtn('github')}
                        ${socialBtn('behance')}
                        ${socialBtn('email')}
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>`;
}

/* ─── Footer HTML ────────────────────────────────────────────────────────────── */
function buildFooter() {
    return `
<footer class="bg-slate-950 text-white pt-16 pb-12" role="contentinfo">
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 mb-14">

            <!-- Col 1: Identity & Properly Organized Bio -->
            <div class="md:col-span-6 space-y-4">
                <a href="index.html" class="inline-block group" aria-label="Atta Rahman Home">
                    <img src="images/logo-white.webp" alt="atta" class="h-6 w-auto object-contain transition-opacity group-hover:opacity-80">
                </a>
                <p class="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
                    Product Designer crafting clear, structured digital experiences across software systems, mobile apps, and AI interfaces.
                </p>
                <div class="flex flex-wrap items-center gap-x-3 gap-y-2 pt-2 text-xs font-mono text-slate-400">
                    <span class="inline-flex items-center gap-2 text-slate-300">
                        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>Open to Product Design roles</span>
                    </span>
                    <span class="text-slate-600 hidden sm:inline">·</span>
                    <span>Based in Vancouver, Canada</span>
                </div>
            </div>

            <!-- Col 2: Navigation -->
            <div class="md:col-span-3 space-y-3">
                <span class="block text-xs font-mono font-medium tracking-wider text-slate-400 uppercase">Navigation</span>
                <nav class="flex flex-col gap-2.5" aria-label="Footer navigation">
                    <a href="index.html#work" class="text-slate-300 hover:text-white font-medium text-sm transition-colors">Selected Work</a>
                    <a href="about.html" class="text-slate-300 hover:text-white font-medium text-sm transition-colors">About &amp; Background</a>
                    <a href="projects.html" class="text-slate-300 hover:text-white font-medium text-sm transition-colors">All Projects Archive</a>
                    <a href="${RESUME_URL}" target="_blank" rel="noopener noreferrer" class="text-slate-300 hover:text-white font-medium text-sm transition-colors">Resume (PDF) ↗</a>
                </nav>
            </div>

            <!-- Col 3: Connect & Contact -->
            <div class="md:col-span-3 space-y-3">
                <span class="block text-xs font-mono font-medium tracking-wider text-slate-400 uppercase">Connect</span>
                <div class="space-y-3 text-sm">
                    <p>
                        <a href="mailto:attarahman406@gmail.com" class="text-slate-300 hover:text-white font-medium transition-colors">
                            attarahman406@gmail.com
                        </a>
                    </p>
                    <div class="flex items-center gap-2.5 pt-1">
                        ${socialBtn('linkedin')}
                        ${socialBtn('github')}
                        ${socialBtn('behance')}
                        ${socialBtn('email')}
                    </div>
                </div>
            </div>

        </div>

        <!-- Bottom bar -->
        <div class="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs pr-14 lg:pr-16">
            <p class="text-slate-400">© 2026 Atta Rahman. All rights reserved.</p>
            <p class="text-slate-400 font-mono">Product Design · UI/UX · Design Systems</p>
        </div>
    </div>
</footer>

<!-- Universal Image Lightbox Modal -->
<div id="image-lightbox"
    class="hidden fixed inset-0 z-[2000] items-center justify-center p-4 sm:p-8 opacity-0 transition-opacity duration-300"
    style="background:rgba(10,12,16,0.92);backdrop-filter:blur(10px);">
    <div class="relative max-w-6xl w-full flex flex-col items-center">
        <button id="lightbox-close"
            class="self-end mb-3 text-white/70 hover:text-white text-3xl font-light leading-none transition-colors p-2 cursor-pointer"
            aria-label="Close image preview">&times;</button>
        <img id="lightbox-img" src="" alt=""
            class="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl scale-95 transition-transform duration-300">
        <p id="lightbox-caption" class="text-slate-400 text-xs mt-3 font-mono text-center"></p>
    </div>
</div>`;
}

/* ─── Wire Up Components & Mobile Toggle ─────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    const navSlot    = document.getElementById('site-nav');
    const footerSlot = document.getElementById('site-footer');

    if (navSlot && !navSlot.children.length) navSlot.innerHTML = buildNav();
    if (footerSlot) footerSlot.innerHTML = buildFooter();

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-menu-drawer');

    if (menuBtn && drawer) {
        const iconMenu = menuBtn.querySelector('.icon-menu');
        const iconClose = menuBtn.querySelector('.icon-close');

        const toggleMenu = () => {
            const isHidden = drawer.classList.contains('hidden');
            if (isHidden) {
                drawer.classList.remove('hidden');
                menuBtn.setAttribute('aria-expanded', 'true');
                if (iconMenu) iconMenu.classList.add('hidden');
                if (iconClose) iconClose.classList.remove('hidden');
            } else {
                drawer.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
                if (iconMenu) iconMenu.classList.remove('hidden');
                if (iconClose) iconClose.classList.add('hidden');
            }
        };

        menuBtn.addEventListener('click', toggleMenu);

        // Close on link click in drawer
        drawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (!drawer.classList.contains('hidden')) {
                    toggleMenu();
                }
            });
        });
    }

    // Nav active underline styling
    const style = document.createElement('style');
    style.textContent = `
        .nav-link {
            position: relative;
            font-size: 0.9375rem;
            font-weight: 500;
            color: #0B1020;
            padding: 0.25rem 0.5rem;
            transition: color 180ms ease;
            font-family: 'Geist', 'Plus Jakarta Sans', sans-serif;
        }
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0.5rem;
            width: 0;
            height: 2px;
            background-color: #0B1020;
            transition: width 180ms cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link:hover { color: #1E3A8A; }
        .nav-link:hover::after { width: calc(100% - 1rem); background-color: #1E3A8A; }
        .nav-link[aria-current="page"], .nav-link-active {
            color: #0B1020;
            font-weight: 600;
        }
        .nav-link[aria-current="page"]::after, .nav-link-active::after {
            width: calc(100% - 1rem);
            background-color: #0B1020;
        }
    `;
    document.head.appendChild(style);
});

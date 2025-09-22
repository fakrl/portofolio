/**
 * Navigation Manager Module
 * Handles navigation functionality, mobile menu, and active section highlighting
 */
class NavigationManager {
    constructor() {
        this.mobileToggle = document.getElementById('mobile-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navbar = document.querySelector('.navbar');
        this.isMobileMenuOpen = false;
        this.currentSection = 'home';
        this.lastScrollY = 0;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeActiveNavigation();
        this.initializeScrollEffects();
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.mobileToggle && this.navMenu) {
            this.mobileToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMobileMenuOpen) {
                    this.toggleMobileMenu();
                }
            });
        });

        // Scroll events
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    toggleMobileMenu() {
        if (!this.navMenu || !this.mobileToggle) return;

        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        this.navMenu.classList.toggle('active');
        this.mobileToggle.classList.toggle('active');
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const target = document.querySelector(e.currentTarget.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    initializeActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        
        const observerOptions = {
            rootMargin: '-100px 0px -50% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    this.updateActiveNavLink(sectionId);
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    updateActiveNavLink(activeSection) {
        if (this.currentSection === activeSection) return;
        
        this.currentSection = activeSection;
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });

        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('sectionChanged', {
            detail: { section: activeSection }
        }));
    }

    initializeScrollEffects() {
        // Scroll-to-top button
        const scrollTopBtn = document.getElementById('scroll-top');
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    handleScroll() {
        const scrollY = window.pageYOffset;
        
        // Scroll-to-top button visibility
        const scrollTopBtn = document.getElementById('scroll-top');
        if (scrollTopBtn) {
            if (scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        // Navbar background effect
        if (this.navbar) {
            if (scrollY > 100) {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.1)';
                this.navbar.style.backdropFilter = 'blur(20px)';
            } else {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.1)';
                this.navbar.style.backdropFilter = 'blur(20px)';
            }
        }

        this.lastScrollY = scrollY;
    }

    getCurrentSection() {
        return this.currentSection;
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationManager;
} else {
    window.NavigationManager = NavigationManager;
}


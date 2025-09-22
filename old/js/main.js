// ==========================================
// DOM Elements and Global Variables
// ==========================================

const DOM = {
    themeToggle: document.getElementById('theme-toggle'),
    mobileToggle: document.getElementById('mobile-toggle'),
    navMenu: document.getElementById('nav-menu'),
    scrollTopBtn: document.getElementById('scroll-top'),
    contactForm: document.getElementById('contact-form'),
    currentYear: document.getElementById('current-year'),
    heroSubtitle: document.querySelector('.hero-subtitle'),
    navbar: document.querySelector('.navbar')
};

// Application state
const AppState = {
    isLoaded: false,
    currentSection: 'home',
    isMobileMenuOpen: false,
    lastScrollY: 0
};

// ==========================================
// Initialization
// ==========================================

class PortfolioApp {
    constructor() {
        this.init();
    }

    async init() {
        try {
            // Initialize AOS (Animate On Scroll)
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 1000,
                    once: true,
                    offset: 100,
                    easing: 'ease-in-out'
                });
            }

            // Initialize all components
            this.initializeTheme();
            this.initializeNavigation();
            this.initializeScrollEffects();
            this.initializeContactForm();
            this.initializeTypingEffect();
            this.initializeSkillBars();
            this.initializeProjectCards();
            this.initializeParallax();
            this.updateCurrentYear();
            
            // Mark app as loaded
            AppState.isLoaded = true;
            document.body.classList.add('loaded');
            
            console.log('Portfolio app initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio app:', error);
        }
    }

    // ==========================================
    // Theme Management
    // ==========================================

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);

        if (DOM.themeToggle) {
            DOM.themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        }
    }

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Trigger particle regeneration
        if (window.particleEffects) {
            window.particleEffects.regenerate();
        }

        // Add visual feedback
        if (window.particleEffects && DOM.themeToggle) {
            window.particleEffects.createParticleBurst(DOM.themeToggle);
        }
    }

    // ==========================================
    // Navigation
    // ==========================================

    initializeNavigation() {
        // Mobile menu toggle
        if (DOM.mobileToggle && DOM.navMenu) {
            DOM.mobileToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (AppState.isMobileMenuOpen) {
                    this.toggleMobileMenu();
                }
            });
        });

        // Active section highlighting
        this.initializeActiveNavigation();
    }

    toggleMobileMenu() {
        if (!DOM.navMenu || !DOM.mobileToggle) return;

        AppState.isMobileMenuOpen = !AppState.isMobileMenuOpen;
        DOM.navMenu.classList.toggle('active');
        DOM.mobileToggle.classList.toggle('active');
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
        const navLinks = document.querySelectorAll('.nav-link');

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
        if (AppState.currentSection === activeSection) return;
        
        AppState.currentSection = activeSection;
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }

    // ==========================================
    // Scroll Effects
    // ==========================================

    initializeScrollEffects() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Initialize scroll-to-top button
        if (DOM.scrollTopBtn) {
            DOM.scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    handleScroll() {
        const scrollY = window.pageYOffset;
        
        // Scroll-to-top button visibility
        if (DOM.scrollTopBtn) {
            if (scrollY > 500) {
                DOM.scrollTopBtn.classList.add('visible');
            } else {
                DOM.scrollTopBtn.classList.remove('visible');
            }
        }

        // Navbar background effect
        if (DOM.navbar) {
            if (scrollY > 100) {
                DOM.navbar.style.background = 'rgba(255, 255, 255, 0.1)';
                DOM.navbar.style.backdropFilter = 'blur(20px)';
            } else {
                DOM.navbar.style.background = 'rgba(255, 255, 255, 0.1)';
                DOM.navbar.style.backdropFilter = 'blur(20px)';
            }
        }

        AppState.lastScrollY = scrollY;
    }

    // ==========================================
    // Parallax Effects
    // ==========================================

    initializeParallax() {
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');

        if (!hero || !heroContent) return;

        const handleParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const opacity = 1 - scrolled / window.innerHeight;
            
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translate3d(0, ${rate}px, 0)`;
                hero.style.opacity = Math.max(0, opacity);
            }
        };

        window.addEventListener('scroll', handleParallax);
    }

    // ==========================================
    // Contact Form
    // ==========================================

    initializeContactForm() {
        if (!DOM.contactForm) return;

        DOM.contactForm.addEventListener('submit', this.handleContactSubmit.bind(this));
        
        // Add real-time validation
        const formInputs = DOM.contactForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('blur', this.validateInput.bind(this));
            input.addEventListener('focus', this.clearInputError.bind(this));
        });
    }

    async handleContactSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(DOM.contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form data
        if (!this.validateFormData(data)) return;
        
        const submitBtn = DOM.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        try {
            // Show loading state
            submitBtn.innerHTML = '<span>Sending...</span><span>⏳</span>';
            submitBtn.disabled = true;
            
            // Simulate API call (replace with actual endpoint)
            await this.simulateFormSubmission(data);
            
            // Show success state
            submitBtn.innerHTML = '<span>Message Sent!</span><span>✅</span>';
            this.showFormSuccess();
            
            // Reset form
            DOM.contactForm.reset();
            
            // Add particle effect
            if (window.particleEffects) {
                window.particleEffects.createParticleBurst(submitBtn, '#4ade80');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            submitBtn.innerHTML = '<span>Error! Try Again</span><span>❌</span>';
            this.showFormError();
        } finally {
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    }

    validateFormData(data) {
        const requiredFields = ['name', 'email', 'subject', 'message'];
        const errors = [];
        
        requiredFields.forEach(field => {
            if (!data[field] || data[field].trim().length === 0) {
                errors.push(`${field} is required`);
            }
        });
        
        // Email validation
        if (data.email && !this.isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (errors.length > 0) {
            this.showFormErrors(errors);
            return false;
        }
        
        return true;
    }

    validateInput(e) {
        const input = e.target;
        const value = input.value.trim();
        
        if (input.hasAttribute('required') && !value) {
            this.showInputError(input, 'This field is required');
        } else if (input.type === 'email' && value && !this.isValidEmail(value)) {
            this.showInputError(input, 'Please enter a valid email address');
        } else {
            this.clearInputError(input);
        }
    }

    showInputError(input, message) {
        this.clearInputError(input);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'input-error';
        errorElement.textContent = message;
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        
        input.style.borderColor = '#ef4444';
        input.parentNode.appendChild(errorElement);
    }

    clearInputError(input) {
        const errorElement = input.parentNode.querySelector('.input-error');
        if (errorElement) {
            errorElement.remove();
        }
        input.style.borderColor = '';
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async simulateFormSubmission(data) {
        // Replace this with actual form submission logic
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data:', data);
                resolve();
            }, 1500);
        });
    }

    showFormSuccess() {
        this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    }

    showFormError() {
        this.showNotification('Failed to send message. Please try again.', 'error');
    }

    showFormErrors(errors) {
        this.showNotification(errors.join('<br>'), 'error');
    }

    // ==========================================
    // Typing Effect
    // ==========================================

    initializeTypingEffect() {
        if (!DOM.heroSubtitle) return;

        const text = DOM.heroSubtitle.textContent;
        this.typeWriter(DOM.heroSubtitle, text, 50);
    }

    typeWriter(element, text, speed = 100) {
        element.innerHTML = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.add('typing-effect');
            }
        };
        
        // Delay start for better UX
        setTimeout(type, 1000);
    }

    // ==========================================
    // Skill Bars Animation
    // ==========================================

    initializeSkillBars() {
        const skillSections = document.querySelectorAll('.skill-category');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBars(entry.target);
                }
            });
        }, observerOptions);

        skillSections.forEach(section => observer.observe(section));
    }

    animateSkillBars(skillSection) {
        const skillBars = skillSection.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, index * 200);
        });
    }

    // ==========================================
    // Project Cards Enhancement
    // ==========================================

    initializeProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', this.handleProjectHover.bind(this));
            card.addEventListener('mouseleave', this.handleProjectLeave.bind(this));
            
            // Add click handlers for project links
            const links = card.querySelectorAll('.project-link');
            links.forEach(link => {
                link.addEventListener('click', this.handleProjectLinkClick.bind(this));
            });
        });
    }

    handleProjectHover(e) {
        const card = e.currentTarget;
        card.style.transform = 'translateY(-10px) scale(1.02)';
        
        // Add glow effect
        card.style.boxShadow = '0 20px 40px rgba(100, 255, 218, 0.2)';
    }

    handleProjectLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
    }

    handleProjectLinkClick(e) {
        const link = e.currentTarget;
        
        // Add particle burst effect
        if (window.particleEffects) {
            window.particleEffects.createParticleBurst(link);
        }
        
        // For demo purposes, prevent default link behavior
        // Remove this in production
        if (link.href === '#') {
            e.preventDefault();
            this.showNotification('This is a demo link. Replace with actual project URL.', 'info');
        }
    }

    // ==========================================
    // Utility Functions
    // ==========================================

    updateCurrentYear() {
        if (DOM.currentYear) {
            DOM.currentYear.textContent = new Date().getFullYear();
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = message;
        
        // Styling
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            background: type === 'error' ? '#ef4444' : 
                       type === 'success' ? '#22c55e' : '#3b82f6',
            color: 'white',
            borderRadius: '8px',
            zIndex: '10000',
            maxWidth: '400px',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // ==========================================
    // Performance Optimization
    // ==========================================

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ==========================================
// Initialize Application
// ==========================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PortfolioApp();
    });
} else {
    new PortfolioApp();
}

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause expensive animations when page is hidden
        console.log('Page hidden - optimizing performance');
    } else {
        console.log('Page visible - resuming animations');
    }
});

// Export for debugging
window.PortfolioApp = PortfolioApp;
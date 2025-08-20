/**
 * Portfolio App Main Controller
 * Orchestrates all modules and handles app initialization
 */
class PortfolioApp {
    constructor() {
        this.modules = {};
        this.isLoaded = false;
        this.init();
    }

    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeApp());
            } else {
                this.initializeApp();
            }
        } catch (error) {
            console.error('Error initializing portfolio app:', error);
        }
    }

    async initializeApp() {
        try {
            // Initialize AOS (Animate On Scroll) if available
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 1000,
                    once: true,
                    offset: 100,
                    easing: 'ease-in-out'
                });
            }

            // Initialize all modules
            await this.initializeModules();
            
            // Set up global event listeners
            this.setupGlobalEvents();
            
            // Update current year
            this.updateCurrentYear();
            
            // Mark app as loaded
            this.isLoaded = true;
            document.body.classList.add('loaded');
            
            console.log('Portfolio app initialized successfully');
            
            // Dispatch app ready event
            document.dispatchEvent(new CustomEvent('portfolioAppReady', {
                detail: { app: this }
            }));
            
        } catch (error) {
            console.error('Error initializing portfolio app:', error);
        }
    }

    async initializeModules() {
        // Initialize modules in order of dependency
        const moduleInitializers = [
            { name: 'theme', class: ThemeManager },
            { name: 'navigation', class: NavigationManager },
            { name: 'skills', class: SkillsManager },
            { name: 'testimonials', class: TestimonialsManager },
            { name: 'contact', class: ContactManager }
        ];

        for (const { name, class: ModuleClass } of moduleInitializers) {
            try {
                if (typeof ModuleClass !== 'undefined') {
                    this.modules[name] = new ModuleClass();
                    console.log(`${name} module initialized`);
                } else {
                    console.warn(`${name} module class not found`);
                }
            } catch (error) {
                console.error(`Error initializing ${name} module:`, error);
            }
        }
    }

    setupGlobalEvents() {
        // Listen for theme changes
        document.addEventListener('themeChanged', (e) => {
            console.log('Theme changed to:', e.detail.theme);
        });

        // Listen for section changes
        document.addEventListener('sectionChanged', (e) => {
            console.log('Active section changed to:', e.detail.section);
        });

        // Handle window resize
        window.addEventListener('resize', this.handleResize.bind(this));

        // Handle visibility change (tab switching)
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }

    handleResize() {
        // Notify modules about resize
        Object.values(this.modules).forEach(module => {
            if (typeof module.handleResize === 'function') {
                module.handleResize();
            }
        });
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden (user switched tabs)
            console.log('Page hidden');
        } else {
            // Page is visible again
            console.log('Page visible');
        }
    }

    updateCurrentYear() {
        const currentYearElement = document.getElementById('current-year');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
    }

    // Public API methods
    getModule(name) {
        return this.modules[name];
    }

    getAllModules() {
        return this.modules;
    }

    isAppLoaded() {
        return this.isLoaded;
    }

    // Theme management
    toggleTheme() {
        if (this.modules.theme) {
            this.modules.theme.toggleTheme();
        }
    }

    getCurrentTheme() {
        return this.modules.theme ? this.modules.theme.getCurrentTheme() : 'light';
    }

    // Navigation management
    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    getCurrentSection() {
        return this.modules.navigation ? this.modules.navigation.getCurrentSection() : 'home';
    }

    // Testimonials management
    getTestimonials() {
        return this.modules.testimonials ? this.modules.testimonials.getTestimonials() : [];
    }

    addTestimonial(testimonial) {
        if (this.modules.testimonials) {
            this.modules.testimonials.addTestimonial(testimonial);
        }
    }

    // Contact management
    submitContactForm(formData) {
        return this.modules.contact ? this.modules.contact.submitForm(formData) : Promise.reject('Contact module not available');
    }

    // Utility methods
    showNotification(message, type = 'info') {
        if (this.modules.contact && typeof this.modules.contact.showNotification === 'function') {
            this.modules.contact.showNotification(message, type);
        } else {
            console.log(`Notification (${type}):`, message);
        }
    }

    // Debug methods
    getDebugInfo() {
        return {
            isLoaded: this.isLoaded,
            modules: Object.keys(this.modules),
            currentTheme: this.getCurrentTheme(),
            currentSection: this.getCurrentSection(),
            testimonialCount: this.getTestimonials().length
        };
    }
}

// Initialize the app when script loads
let portfolioApp;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        portfolioApp = new PortfolioApp();
    });
} else {
    portfolioApp = new PortfolioApp();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
} else {
    window.PortfolioApp = PortfolioApp;
    window.portfolioApp = portfolioApp;
}


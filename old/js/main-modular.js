/**
 * Main Modular JavaScript Entry Point
 * This file loads and initializes all modules
 */

// Configuration object for easy customization
const PortfolioConfig = {
    // Animation settings
    animations: {
        duration: 1000,
        easing: 'ease-in-out',
        offset: 100
    },
    
    // Theme settings
    theme: {
        default: 'light',
        persistToStorage: true
    },
    
    // Testimonials settings
    testimonials: {
        autoPlay: true,
        autoPlayInterval: 5000,
        showCount: 3
    },
    
    // Contact form settings
    contact: {
        enableValidation: true,
        showNotifications: true
    },
    
    // Debug mode
    debug: false
};

// Global utilities
const PortfolioUtils = {
    // Debounce function for performance
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
    },

    // Throttle function for scroll events
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
        }
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Get CSS custom property value
    getCSSVariable(name) {
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    },

    // Set CSS custom property value
    setCSSVariable(name, value) {
        document.documentElement.style.setProperty(name, value);
    },

    // Format date
    formatDate(date, options = {}) {
        return new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options
        }).format(date);
    },

    // Generate unique ID
    generateId(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
};

// Performance monitoring
const PortfolioPerformance = {
    marks: {},
    
    mark(name) {
        this.marks[name] = performance.now();
        if (PortfolioConfig.debug) {
            console.log(`Performance mark: ${name} at ${this.marks[name]}ms`);
        }
    },
    
    measure(name, startMark, endMark = null) {
        const start = this.marks[startMark];
        const end = endMark ? this.marks[endMark] : performance.now();
        const duration = end - start;
        
        if (PortfolioConfig.debug) {
            console.log(`Performance measure: ${name} took ${duration.toFixed(2)}ms`);
        }
        
        return duration;
    }
};

// Error handling
const PortfolioErrorHandler = {
    errors: [],
    
    log(error, context = 'Unknown') {
        const errorInfo = {
            message: error.message || error,
            context,
            timestamp: new Date().toISOString(),
            stack: error.stack || null
        };
        
        this.errors.push(errorInfo);
        
        if (PortfolioConfig.debug) {
            console.error(`Portfolio Error [${context}]:`, error);
        }
        
        // You can add error reporting service here
        // this.reportError(errorInfo);
    },
    
    getErrors() {
        return this.errors;
    },
    
    clearErrors() {
        this.errors = [];
    }
};

// Module loader with dependency management
const ModuleLoader = {
    loadedModules: new Set(),
    
    async loadModule(moduleName, dependencies = []) {
        try {
            PortfolioPerformance.mark(`${moduleName}_load_start`);
            
            // Check if dependencies are loaded
            for (const dep of dependencies) {
                if (!this.loadedModules.has(dep)) {
                    throw new Error(`Dependency ${dep} not loaded for module ${moduleName}`);
                }
            }
            
            // Module is already loaded via script tags, just mark as loaded
            this.loadedModules.add(moduleName);
            
            PortfolioPerformance.mark(`${moduleName}_load_end`);
            PortfolioPerformance.measure(`${moduleName}_load`, `${moduleName}_load_start`, `${moduleName}_load_end`);
            
            if (PortfolioConfig.debug) {
                console.log(`Module ${moduleName} loaded successfully`);
            }
            
        } catch (error) {
            PortfolioErrorHandler.log(error, `ModuleLoader.loadModule(${moduleName})`);
            throw error;
        }
    },
    
    isModuleLoaded(moduleName) {
        return this.loadedModules.has(moduleName);
    }
};

// Main initialization function
async function initializePortfolio() {
    try {
        PortfolioPerformance.mark('app_init_start');
        
        if (PortfolioConfig.debug) {
            console.log('Initializing Portfolio App with config:', PortfolioConfig);
        }
        
        // Load modules in dependency order
        await ModuleLoader.loadModule('ThemeManager');
        await ModuleLoader.loadModule('NavigationManager');
        await ModuleLoader.loadModule('SkillsManager');
        await ModuleLoader.loadModule('TestimonialsManager');
        await ModuleLoader.loadModule('ContactManager');
        await ModuleLoader.loadModule('PortfolioApp', [
            'ThemeManager', 
            'NavigationManager', 
            'SkillsManager', 
            'TestimonialsManager', 
            'ContactManager'
        ]);
        
        PortfolioPerformance.mark('app_init_end');
        PortfolioPerformance.measure('app_initialization', 'app_init_start', 'app_init_end');
        
        if (PortfolioConfig.debug) {
            console.log('Portfolio App initialized successfully');
            console.log('Performance summary:', PortfolioPerformance.marks);
        }
        
    } catch (error) {
        PortfolioErrorHandler.log(error, 'initializePortfolio');
        console.error('Failed to initialize portfolio:', error);
    }
}

// Global API for external access
window.Portfolio = {
    config: PortfolioConfig,
    utils: PortfolioUtils,
    performance: PortfolioPerformance,
    errorHandler: PortfolioErrorHandler,
    moduleLoader: ModuleLoader,
    
    // Quick access to app instance
    get app() {
        return window.portfolioApp;
    },
    
    // Quick access to modules
    get modules() {
        return window.portfolioApp ? window.portfolioApp.getAllModules() : {};
    },
    
    // Debug helpers
    debug: {
        getInfo() {
            return window.portfolioApp ? window.portfolioApp.getDebugInfo() : null;
        },
        
        getErrors() {
            return PortfolioErrorHandler.getErrors();
        },
        
        getPerformance() {
            return PortfolioPerformance.marks;
        },
        
        enableDebug() {
            PortfolioConfig.debug = true;
            console.log('Debug mode enabled');
        },
        
        disableDebug() {
            PortfolioConfig.debug = false;
            console.log('Debug mode disabled');
        }
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioConfig, PortfolioUtils, initializePortfolio };
}


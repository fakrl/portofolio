// ==========================================
// Floating Particles System
// ==========================================

class ParticleSystem {
    constructor() {
        this.particles = [];
        this.particleCount = 50;
        this.container = document.getElementById('particles');
        this.isActive = true;
        
        this.init();
        this.bindEvents();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        // Clear existing particles
        this.container.innerHTML = '';
        this.particles = [];

        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and animation properties
        const startPositionX = Math.random() * 100;
        const animationDuration = Math.random() * 15 + 10; // 10-25 seconds
        const animationDelay = Math.random() * 15; // 0-15 seconds delay
        const size = Math.random() * 4 + 2; // 2-6px
        const opacity = Math.random() * 0.6 + 0.2; // 0.2-0.8 opacity
        
        // Apply styles
        particle.style.left = startPositionX + '%';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = animationDuration + 's';
        particle.style.animationDelay = animationDelay + 's';
        particle.style.opacity = opacity;
        
        // Add some particles with different colors
        if (Math.random() > 0.8) {
            particle.style.background = '#4facfe';
        } else if (Math.random() > 0.9) {
            particle.style.background = '#667eea';
        }
        
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            x: startPositionX,
            duration: animationDuration,
            delay: animationDelay
        });
    }

    animate() {
        if (!this.isActive) return;

        // Add some floating movement
        this.particles.forEach((particle, index) => {
            const time = Date.now() * 0.001;
            const offset = Math.sin(time + index) * 20;
            
            // Subtle horizontal movement
            const newX = particle.x + Math.sin(time * 0.5 + index) * 30;
            particle.element.style.left = Math.max(0, Math.min(100, newX)) + '%';
        });

        requestAnimationFrame(() => this.animate());
    }

    regenerateParticles() {
        this.createParticles();
    }

    bindEvents() {
        // Regenerate particles when theme changes
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                setTimeout(() => this.regenerateParticles(), 100);
            });
        }

        // Pause particles when page is not visible (performance optimization)
        document.addEventListener('visibilitychange', () => {
            this.isActive = !document.hidden;
            if (this.isActive) {
                this.animate();
            }
        });

        // Responsive particle count
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleResize() {
        const width = window.innerWidth;
        
        if (width < 768) {
            this.particleCount = 20; // Fewer particles on mobile
        } else if (width < 1200) {
            this.particleCount = 35;
        } else {
            this.particleCount = 50;
        }
        
        this.regenerateParticles();
    }

    destroy() {
        this.isActive = false;
        this.container.innerHTML = '';
        this.particles = [];
    }
}

// ==========================================
// Interactive Particle Effects
// ==========================================

class InteractiveParticles {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isEnabled = false;
        
        // Only initialize on larger screens for performance
        if (window.innerWidth > 1024) {
            this.init();
        }
    }

    init() {
        this.createCanvas();
        this.bindMouseEvents();
        this.animate();
        this.isEnabled = true;
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.3';
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        document.body.appendChild(this.canvas);
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindMouseEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            // Create particles on mouse movement
            if (Math.random() < 0.1) {
                this.createMouseParticle();
            }
        });
    }

    createMouseParticle() {
        const particle = {
            x: this.mouse.x,
            y: this.mouse.y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            size: Math.random() * 3 + 1,
            life: 1.0,
            decay: 0.02
        };
        
        this.particles.push(particle);
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            particle.size *= 0.98;
            
            if (particle.life <= 0 || particle.size < 0.5) {
                this.particles.splice(i, 1);
            }
        }
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life * 0.5;
            this.ctx.fillStyle = '#64ffda';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }

    animate() {
        if (!this.isEnabled) return;
        
        this.updateParticles();
        this.drawParticles();
        
        requestAnimationFrame(() => this.animate());
    }

    destroy() {
        this.isEnabled = false;
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// ==========================================
// Particle Manager - Main Controller
// ==========================================

class ParticleManager {
    constructor() {
        this.basicParticles = null;
        this.interactiveParticles = null;
        this.isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.init();
    }

    init() {
        // Check if user prefers reduced motion
        if (this.isReduced) {
            console.log('Reduced motion detected - particles disabled');
            return;
        }

        // Initialize basic floating particles
        this.basicParticles = new ParticleSystem();
        
        // Initialize interactive particles on desktop
        if (window.innerWidth > 1024 && !this.isMobile()) {
            setTimeout(() => {
                this.interactiveParticles = new InteractiveParticles();
            }, 1000);
        }

        this.bindEvents();
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    bindEvents() {
        // Handle reduced motion preference changes
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addListener((e) => {
            if (e.matches) {
                this.destroy();
            } else {
                this.init();
            }
        });

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    handleResize() {
        const width = window.innerWidth;
        
        // Enable/disable interactive particles based on screen size
        if (width <= 1024 && this.interactiveParticles) {
            this.interactiveParticles.destroy();
            this.interactiveParticles = null;
        } else if (width > 1024 && !this.interactiveParticles && !this.isMobile()) {
            this.interactiveParticles = new InteractiveParticles();
        }
    }

    destroy() {
        if (this.basicParticles) {
            this.basicParticles.destroy();
            this.basicParticles = null;
        }
        
        if (this.interactiveParticles) {
            this.interactiveParticles.destroy();
            this.interactiveParticles = null;
        }
    }

    regenerate() {
        if (this.basicParticles) {
            this.basicParticles.regenerateParticles();
        }
    }
}

// ==========================================
// Additional Particle Effects
// ==========================================

// Particle burst effect for button clicks
function createParticleBurst(element, color = '#64ffda') {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = color;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const angle = (i / 12) * Math.PI * 2;
        const velocity = 100 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        
        let x = 0, y = 0, life = 1;
        const animate = () => {
            x += vx * 0.02;
            y += vy * 0.02 + life * 2; // gravity
            life -= 0.03;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = Math.max(0, life);
            
            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Floating text effect
function createFloatingText(element, text, color = '#64ffda') {
    const rect = element.getBoundingClientRect();
    const floatingText = document.createElement('div');
    
    floatingText.textContent = text;
    floatingText.style.position = 'fixed';
    floatingText.style.left = rect.left + rect.width / 2 + 'px';
    floatingText.style.top = rect.top + 'px';
    floatingText.style.color = color;
    floatingText.style.fontSize = '14px';
    floatingText.style.fontWeight = 'bold';
    floatingText.style.pointerEvents = 'none';
    floatingText.style.zIndex = '9999';
    floatingText.style.transform = 'translateX(-50%)';
    
    document.body.appendChild(floatingText);
    
    let y = 0, opacity = 1;
    const animate = () => {
        y -= 2;
        opacity -= 0.02;
        
        floatingText.style.transform = `translate(-50%, ${y}px)`;
        floatingText.style.opacity = Math.max(0, opacity);
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            floatingText.remove();
        }
    };
    
    requestAnimationFrame(animate);
}

// ==========================================
// Export and Initialize
// ==========================================

// Global particle manager instance
let particleManager = null;

// Initialize particles when DOM is ready
function initializeParticles() {
    if (!particleManager) {
        particleManager = new ParticleManager();
    }
}

// Clean up particles
function destroyParticles() {
    if (particleManager) {
        particleManager.destroy();
        particleManager = null;
    }
}

// Export functions for use in main.js
window.particleEffects = {
    createParticleBurst,
    createFloatingText,
    regenerate: () => particleManager?.regenerate(),
    destroy: destroyParticles
};

// Auto-initialize when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeParticles);
} else {
    initializeParticles();
}
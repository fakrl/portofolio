/**
 * Skills Manager Module
 * Handles skill bars animation and project cards enhancement
 */
class SkillsManager {
    constructor() {
        this.init();
    }

    init() {
        this.initializeSkillBars();
        this.initializeProjectCards();
        this.initializeTypingEffect();
        this.initializeParallax();
    }

    // Skill Bars Animation
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

    // Project Cards Enhancement
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
        card.style.boxShadow = '0 20px 40px rgba(100, 255, 218, 0.2)';
    }

    handleProjectLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
    }

    handleProjectLinkClick(e) {
        const link = e.currentTarget;
        
        // Add particle burst effect if available
        if (window.particleEffects) {
            window.particleEffects.createParticleBurst(link);
        }
        
        // For demo purposes, prevent default link behavior
        if (link.href === '#') {
            e.preventDefault();
            console.log('Project link clicked:', link);
        }
    }

    // Typing Effect for Hero Section
    initializeTypingEffect() {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (!heroSubtitle) return;

        const text = heroSubtitle.textContent;
        this.typeWriter(heroSubtitle, text, 50);
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

    // Parallax Effects
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

    // Scroll Reveal Animation
    initializeScrollReveal() {
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        revealElements.forEach(element => observer.observe(element));
    }

    // Update Current Year
    updateCurrentYear() {
        const currentYearElement = document.getElementById('current-year');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
    }

    // Public API
    animateSkill(skillElement) {
        this.animateSkillBars(skillElement);
    }

    addProjectCard(projectData) {
        // Implementation for dynamically adding project cards
        console.log('Adding project card:', projectData);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SkillsManager;
} else {
    window.SkillsManager = SkillsManager;
}


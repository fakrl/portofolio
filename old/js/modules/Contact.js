/**
 * Contact Manager Module
 * Handles contact form functionality and validation
 */
class ContactManager {
    constructor() {
        this.contactForm = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (!this.contactForm) return;
        
        this.bindEvents();
        this.initializeValidation();
    }

    bindEvents() {
        this.contactForm.addEventListener('submit', this.handleContactSubmit.bind(this));
    }

    initializeValidation() {
        const formInputs = this.contactForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('blur', this.validateInput.bind(this));
            input.addEventListener('focus', this.clearInputError.bind(this));
        });
    }

    async handleContactSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form data
        if (!this.validateFormData(data)) return;
        
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
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
            this.contactForm.reset();
            
            // Add particle effect if available
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

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            maxWidth: '400px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to DOM
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

    // Public API
    submitForm(formData) {
        return this.simulateFormSubmission(formData);
    }

    validateEmail(email) {
        return this.isValidEmail(email);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactManager;
} else {
    window.ContactManager = ContactManager;
}


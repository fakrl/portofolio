/**
 * Testimonials Manager Module
 * Handles testimonials carousel, modal, and form functionality
 */
class TestimonialsManager {
    constructor() {
        this.commentsData = [
            {
                id: 1,
                name: "Sarah Johnson",
                company: "Tech Solutions Inc",
                position: "Marketing Director",
                comment: "Pelayanan yang sangat profesional dan hasil kerja melampaui ekspektasi. Fakhrul sangat detail dan komunikatif dalam setiap tahap project!",
                image: null
            },
            {
                id: 2,
                name: "Ahmad Rizki",
                company: "Digital Startup",
                position: "CEO",
                comment: "Kerjasama yang luar biasa! Timeline tepat waktu dan komunikasi sangat baik sepanjang project. Highly recommended untuk web development!",
                image: null
            },
            {
                id: 3,
                name: "Lisa Chen",
                company: "Creative Agency",
                position: "Lead Designer",
                comment: "Ide-ide yang fresh dan implementasi yang sangat detail. Fakhrul benar-benar memahami kebutuhan klien dan memberikan solusi terbaik!",
                image: null
            },
            {
                id: 4,
                name: "Budi Santoso",
                company: "E-commerce Platform",
                position: "Product Manager",
                comment: "Pengalaman kerja sama yang menyenangkan dengan hasil yang memuaskan. Top quality work dengan harga yang sangat reasonable!",
                image: null
            },
            {
                id: 5,
                name: "Maria Santos",
                company: "Fashion Brand",
                position: "Brand Manager",
                comment: "Kreativitas tinggi dan perhatian pada detail yang luar biasa. Hasil akhir sangat memukau dan sesuai dengan brand identity kami!",
                image: null
            }
        ];

        this.currentIndex = 0;
        this.isAutoPlay = true;
        this.isDragging = false;
        this.startPos = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.animationId = 0;

        this.init();
    }

    init() {
        this.renderComments();
        this.initializeCarousel();
        this.initializeModal();
        this.initializeTypingEffect();
        this.bindGlobalFunctions();
    }

    bindGlobalFunctions() {
        // Add global functions for HTML onclick handlers
        window.scrollToPortfolio = this.scrollToPortfolio.bind(this);
        window.moveCarousel = this.moveCarousel.bind(this);
        window.toggleAutoPlay = this.toggleAutoPlay.bind(this);
        window.openModal = this.openModal.bind(this);
        window.closeModal = this.closeModal.bind(this);
        window.closeCommentDetail = this.closeCommentDetail.bind(this);
        window.testimonialsManager = this;
    }

    // Navigation Functions
    scrollToPortfolio() {
        const portfolioSection = document.getElementById('projects');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    // Typing Effect for "Developer"
    initializeTypingEffect() {
        const typeElement = document.getElementById('type-it');
        if (!typeElement) return;

        const words = ['Developer', 'Designer', 'Creator', 'Problem Solver'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typeElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

            setTimeout(type, isDeleting ? 100 : 150);
        };

        type();
    }

    // Render Comments
    renderComments() {
        const carouselTrack = document.getElementById('carouselTrack');
        if (!carouselTrack) return;
        
        const isMobile = window.innerWidth <= 768;
        const commentsToRender = isMobile ? this.commentsData : [...this.commentsData, ...this.commentsData];
        
        carouselTrack.innerHTML = commentsToRender.map((comment, index) => `
            <div class="comment-card" onclick="testimonialsManager.handleCardClick(${comment.id})" 
                 onmousedown="${!isMobile ? 'testimonialsManager.touchStart(' + index + ')(event)' : ''}"
                 onmouseup="${!isMobile ? 'testimonialsManager.touchEnd()' : ''}"
                 onmousemove="${!isMobile ? 'testimonialsManager.touchMove(event)' : ''}"
                 ontouchstart="${isMobile ? 'testimonialsManager.touchStart(' + index + ')(event)' : ''}"
                 ontouchend="${isMobile ? 'testimonialsManager.touchEnd()' : ''}"
                 ontouchmove="${isMobile ? 'testimonialsManager.touchMove(event)' : ''}">
                <div class="comment-header">
                    ${comment.image ? 
                        `<img src="${comment.image}" alt="${comment.name}" class="avatar">` :
                        `<div class="avatar-placeholder">${this.getInitials(comment.name)}</div>`
                    }
                    <div class="author-info">
                        <h4>${comment.name}</h4>
                        <div class="author-details">${comment.position} - ${comment.company}</div>
                    </div>
                </div>
                <div class="comment-text">
                    "${comment.comment.length > 100 ? comment.comment.substring(0, 100) + '...' : comment.comment}"
                </div>
            </div>
        `).join('');
        
        this.currentIndex = 0;
        this.setPositionByIndex();
    }

    // Utility Functions
    getInitials(name) {
        return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
    }

    // Carousel Functions
    initializeCarousel() {
        this.initializeDragEvents();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.renderComments();
        });
    }

    moveCarousel(direction) {
        const track = document.getElementById('carouselTrack');
        if (!track) return;
        
        const isMobile = window.innerWidth <= 768;
        const cardWidth = isMobile ? track.offsetWidth : 410;
        
        const wasAutoPlay = this.isAutoPlay;
        if (this.isAutoPlay) {
            track.classList.remove('auto-scroll');
        }
        
        this.currentIndex += direction;
        
        const maxIndex = Math.max(0, this.commentsData.length - 1);
        if (this.currentIndex < 0) this.currentIndex = 0;
        if (this.currentIndex > maxIndex) this.currentIndex = maxIndex;
        
        const translateValue = -this.currentIndex * cardWidth;
        if (isMobile) {
            track.style.transform = `translateY(${translateValue}px)`;
        } else {
            track.style.transform = `translateX(${translateValue}px)`;
        }
        
        setTimeout(() => {
            if (wasAutoPlay) {
                track.classList.add('auto-scroll');
            }
        }, 3000);
    }

    toggleAutoPlay() {
        const track = document.getElementById('carouselTrack');
        const btn = document.getElementById('autoPlayBtn');
        
        if (!track || !btn) return;
        
        this.isAutoPlay = !this.isAutoPlay;
        
        if (this.isAutoPlay) {
            track.classList.add('auto-scroll');
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-pause"></i> Auto';
        } else {
            track.classList.remove('auto-scroll');
            btn.classList.remove('active');
            btn.innerHTML = '<i class="fas fa-play"></i> Manual';
        }
    }

    // Touch/Drag Events
    initializeDragEvents() {
        const track = document.getElementById('carouselTrack');
        if (!track) return;

        track.addEventListener('dragstart', (e) => e.preventDefault());
    }

    touchStart(index) {
        return (event) => {
            const track = document.getElementById('carouselTrack');
            if (!track) return;
            
            track.classList.remove('auto-scroll');
            track.classList.add('dragging');
            
            this.isDragging = true;
            this.startPos = this.getPositionX(event);
            this.animationId = requestAnimationFrame(() => this.animation());
        }
    }

    touchEnd() {
        this.isDragging = false;
        cancelAnimationFrame(this.animationId);
        
        const track = document.getElementById('carouselTrack');
        if (track) {
            track.classList.remove('dragging');
        }
        
        this.setSliderPosition();
        
        setTimeout(() => {
            if (this.isAutoPlay && track) {
                track.classList.add('auto-scroll');
            }
        }, 3000);
    }

    touchMove(event) {
        if (this.isDragging) {
            const currentPosition = this.getPositionX(event);
            this.currentPos = currentPosition - this.startPos;
        }
    }

    getPositionX(event) {
        return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    }

    setPositionByIndex() {
        const track = document.getElementById('carouselTrack');
        if (!track) return;
        
        const isMobile = window.innerWidth <= 768;
        const cardWidth = isMobile ? track.offsetWidth : 410;
        
        this.currentTranslate = this.currentIndex * -cardWidth;
        this.prevTranslate = this.currentTranslate;
        
        if (isMobile) {
            track.style.transform = `translateY(${this.currentTranslate}px)`;
        } else {
            track.style.transform = `translateX(${this.currentTranslate}px)`;
        }
    }

    animation() {
        const track = document.getElementById('carouselTrack');
        if (!track) return;
        
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            track.style.transform = `translateY(${this.currentTranslate}px)`;
        } else {
            track.style.transform = `translateX(${this.currentTranslate}px)`;
        }
        
        if (this.isDragging) requestAnimationFrame(() => this.animation());
    }

    setSliderPosition() {
        const isMobile = window.innerWidth <= 768;
        const track = document.getElementById('carouselTrack');
        if (!track) return;
        
        this.currentTranslate = this.prevTranslate + this.currentPos;
        
        const movedBy = this.currentTranslate - this.prevTranslate;
        
        if (movedBy < -100 && this.currentIndex < this.commentsData.length - 1) {
            this.currentIndex += 1;
        }
        
        if (movedBy > 100 && this.currentIndex > 0) {
            this.currentIndex -= 1;
        }
        
        this.setPositionByIndex();
    }

    // Card Click Handler
    handleCardClick(commentId) {
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('clicked');
            setTimeout(() => {
                event.currentTarget.classList.remove('clicked');
            }, 150);
        }
        
        if (this.isDragging) return;
        
        setTimeout(() => {
            this.openCommentDetail(commentId);
        }, 100);
    }

    // Comment Detail Modal
    openCommentDetail(commentId) {
        const comment = this.commentsData.find(c => c.id === commentId);
        if (!comment) return;

        const overlay = document.getElementById('commentDetailOverlay');
        const header = document.getElementById('commentDetailHeader');
        const text = document.getElementById('commentDetailText');

        if (!overlay || !header || !text) return;

        header.innerHTML = `
            ${comment.image ? 
                `<img src="${comment.image}" alt="${comment.name}" class="comment-detail-avatar">` :
                `<div class="comment-detail-avatar-placeholder">${this.getInitials(comment.name)}</div>`
            }
            <div class="comment-detail-info">
                <h3>${comment.name}</h3>
                <div class="position">${comment.position}</div>
                <div class="company">${comment.company}</div>
            </div>
        `;

        text.innerHTML = `"${comment.comment}"`;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeCommentDetail() {
        const overlay = document.getElementById('commentDetailOverlay');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // Modal Functions
    initializeModal() {
        const form = document.getElementById('commentForm');
        if (form) {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        const fileInput = document.getElementById('profileImage');
        if (fileInput) {
            fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        }

        // Close modal when clicking overlay
        const modalOverlay = document.getElementById('modalOverlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    this.closeModal();
                }
            });
        }

        const commentDetailOverlay = document.getElementById('commentDetailOverlay');
        if (commentDetailOverlay) {
            commentDetailOverlay.addEventListener('click', (e) => {
                if (e.target === commentDetailOverlay) {
                    this.closeCommentDetail();
                }
            });
        }

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (modalOverlay && modalOverlay.classList.contains('active')) {
                    this.closeModal();
                }
                if (commentDetailOverlay && commentDetailOverlay.classList.contains('active')) {
                    this.closeCommentDetail();
                }
            }
        });
    }

    openModal() {
        const overlay = document.getElementById('modalOverlay');
        if (overlay) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const overlay = document.getElementById('modalOverlay');
        const form = document.getElementById('commentForm');
        
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        if (form) {
            form.reset();
        }
        
        const fileLabel = document.querySelector('.file-input-label');
        if (fileLabel) {
            fileLabel.textContent = '📷 Pilih Foto';
        }
        
        const fileInput = document.getElementById('profileImage');
        if (fileInput && fileInput.dataset.imageData) {
            delete fileInput.dataset.imageData;
        }
    }

    // File Input Handler
    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                event.target.dataset.imageData = e.target.result;
            };
            reader.readAsDataURL(file);
            
            const label = event.target.nextElementSibling;
            if (label) {
                label.textContent = `✓ ${file.name}`;
            }
        }
    }

    // Form Submit Handler
    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const fileInput = document.getElementById('profileImage');
        
        const commentData = {
            name: formData.get('name'),
            company: formData.get('company'),
            position: formData.get('position'),
            comment: formData.get('comment'),
            image: fileInput && fileInput.dataset.imageData ? fileInput.dataset.imageData : null
        };

        if (!commentData.name || !commentData.company || !commentData.position || !commentData.comment) {
            alert('Mohon isi semua field yang wajib diisi!');
            return;
        }

        this.addComment(commentData);
    }

    // Add Comment
    addComment(commentData) {
        const newComment = {
            id: this.commentsData.length + 1,
            name: commentData.name,
            company: commentData.company,
            position: commentData.position,
            comment: commentData.comment,
            image: commentData.image
        };

        this.commentsData.push(newComment);
        this.renderComments();
        
        alert('Testimoni berhasil ditambahkan! Terima kasih atas feedback Anda.');
        this.closeModal();
    }

    // Public API
    getTestimonials() {
        return this.commentsData;
    }

    addTestimonial(testimonial) {
        this.addComment(testimonial);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestimonialsManager;
} else {
    window.TestimonialsManager = TestimonialsManager;
}


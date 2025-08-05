// Metriqore Style - Super Fast Animations (Light Theme)

class MetriqoreAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.initLoadingAnimations();
        this.setupNavbarAnimations();
    }

    setupScrollAnimations() {
        // Super fast scroll-triggered animations
        const scrollElements = document.querySelectorAll('.feature-card, .solution-card, .hero-content, .section-header');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    scrollObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        scrollElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
            scrollObserver.observe(element);
        });
    }

    setupHoverEffects() {
        // Super fast hover effects for buttons and cards
        const hoverElements = document.querySelectorAll('.btn, .feature-card, .solution-card, .nav-link');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transition = 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }

    setupNavbarAnimations() {
        // Navbar sabit kalsın - scroll animasyonu yok (Metriqore tarzı)
        const navbar = document.querySelector('.navbar');
        
        // Sadece scrollda hafif gölge efekti
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                navbar.style.boxShadow = 'var(--shadow-md)';
                navbar.style.transition = 'box-shadow 0.2s ease';
            } else {
                navbar.style.boxShadow = 'var(--shadow-sm)';
                navbar.style.transition = 'box-shadow 0.2s ease';
            }
        }, { passive: true });
    }

    initLoadingAnimations() {
        // Fast page load animation
        document.addEventListener('DOMContentLoaded', () => {
            const body = document.body;
            body.style.opacity = '0';
            body.style.transition = 'opacity 0.2s ease';
            
            requestAnimationFrame(() => {
                body.style.opacity = '1';
            });
        });
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MetriqoreAnimations();
});

// Modern SaaS Dashboard JavaScript

class SaaSDashboard {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.initializeCounters();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');

        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu(mobileMenuBtn, navMenu);
            });
        }

        // Instant navigation for nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                // Eğer aynı sayfaya gidiyorsa preventDefault
                if (link.href === window.location.href) {
                    e.preventDefault();
                    return;
                }
                // Diğer durumlarda instant navigation
                window.location.href = link.href;
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Profile dropdown toggle
        const profileBtn = document.querySelector('.profile-btn');
        if (profileBtn) {
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleProfileDropdown();
            });
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            this.closeAllDropdowns();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu(button, menu) {
        const isActive = menu.classList.contains('active');
        
        if (isActive) {
            menu.classList.remove('active');
            button.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            menu.classList.add('active');
            button.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    toggleProfileDropdown() {
        // Implement profile dropdown logic here
        console.log('Profile dropdown toggled');
    }

    closeAllDropdowns() {
        // Close any open dropdowns
        document.querySelectorAll('.dropdown-active').forEach(dropdown => {
            dropdown.classList.remove('dropdown-active');
        });
    }

    setupMobileMenu() {
        // Close mobile menu when resizing to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    }

    setupScrollEffects() {
        let ticking = false;

        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            
            // Parallax effect for hero visual
            const heroVisual = document.querySelector('.hero-visual');
            if (heroVisual) {
                const parallaxSpeed = 0.5;
                const yPos = -(scrolled * parallaxSpeed);
                heroVisual.style.transform = `translateY(${yPos}px)`;
            }

            ticking = false;
        };

        const requestScrollTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollTick);
    }

    initializeAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.feature-card, .solution-card, .section-header, .hero-text'
        );
        
        animateElements.forEach(el => {
            observer.observe(el);
        });

        // Dashboard mockup hover effect
        const dashboardMockup = document.querySelector('.dashboard-mockup');
        if (dashboardMockup) {
            dashboardMockup.addEventListener('mouseenter', () => {
                this.animateDashboardMetrics();
            });
        }
    }

    animateDashboardMetrics() {
        const metricValues = document.querySelectorAll('.metric-value');
        metricValues.forEach((metric, index) => {
            setTimeout(() => {
                metric.style.transform = 'scale(1.1)';
                metric.style.color = 'var(--accent-purple)';
                
                setTimeout(() => {
                    metric.style.transform = 'scale(1)';
                    metric.style.color = '';
                }, 200);
            }, index * 100);
        });
    }

    initializeCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const text = element.textContent;
        const isPercentage = text.includes('%');
        const isPlus = text.includes('+');
        const numericValue = parseFloat(text.replace(/[^\d.]/g, ''));
        
        if (isNaN(numericValue)) return;

        let currentValue = 0;
        const increment = numericValue / 60; // 60 frames for 1 second at 60fps
        const duration = 2000; // 2 seconds
        const frameTime = duration / 60;

        const updateCounter = () => {
            currentValue += increment;
            
            if (currentValue >= numericValue) {
                currentValue = numericValue;
            }

            let displayValue = Math.floor(currentValue);
            if (numericValue % 1 !== 0) {
                displayValue = currentValue.toFixed(1);
            }

            let finalText = displayValue.toString();
            if (isPercentage) finalText += '%';
            if (isPlus) finalText += '+';

            element.textContent = finalText;

            if (currentValue < numericValue) {
                setTimeout(updateCounter, frameTime);
            }
        };

        updateCounter();
    }

    // Utility methods
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
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

    // Performance monitoring
    measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page load time: ${pageLoadTime}ms`);
            });
        }
    }

    // Error handling
    handleError(error, context = 'Unknown') {
        console.error(`Error in ${context}:`, error);
        
        // You can send errors to monitoring service here
        if (window.analytics) {
            window.analytics.track('JavaScript Error', {
                error: error.message,
                context: context,
                userAgent: navigator.userAgent
            });
        }
    }
}

// Form handling utilities
class FormHandler {
    constructor() {
        this.setupFormValidation();
    }

    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateInput(input) {
        const value = input.value.trim();
        const type = input.type;
        let isValid = true;

        // Remove existing error states
        input.classList.remove('error');
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Required field validation
        if (input.hasAttribute('required') && !value) {
            this.showError(input, 'Bu alan zorunludur');
            isValid = false;
        }

        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(input, 'Geçerli bir e-posta adresi girin');
                isValid = false;
            }
        }

        // Phone validation
        if (type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                this.showError(input, 'Geçerli bir telefon numarası girin');
                isValid = false;
            }
        }

        return isValid;
    }

    showError(input, message) {
        input.classList.add('error');
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        input.parentNode.appendChild(errorElement);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        const dashboard = new SaaSDashboard();
        const formHandler = new FormHandler();
        
        // Measure performance in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            dashboard.measurePerformance();
        }
        
        console.log('Happy Customers Dashboard initialized successfully');
    } catch (error) {
        console.error('Failed to initialize dashboard:', error);
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SaaSDashboard, FormHandler };
}

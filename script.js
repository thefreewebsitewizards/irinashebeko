// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Scroll Animation System
const scrollAnimationOptions = {
    threshold: [0.1, 0.3, 0.5],
    rootMargin: '0px 0px -100px 0px'
};

const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            const element = entry.target;
            const animationType = element.dataset.animation || 'fade-in';
            const delay = element.dataset.delay || '0s';
            
            // Add a slight delay for more elegant timing
            setTimeout(() => {
                element.style.animationDelay = delay;
                element.classList.add('animate', animationType);
                
                // Add a subtle transform for better visual flow
                element.style.willChange = 'transform, opacity';
                
                // Clean up after animation completes
                setTimeout(() => {
                    element.style.willChange = 'auto';
                }, 2000);
            }, 100);
            
            // Unobserve after animation to improve performance
            scrollAnimationObserver.unobserve(element);
        }
    });
}, scrollAnimationOptions);

// Initialize scroll animations
function initializeScrollAnimations() {
    // Select all elements with scroll-animate class
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    // Observe each element
    animatedElements.forEach(element => {
        scrollAnimationObserver.observe(element);
    });
    
    // Add scroll animations to sections automatically
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (!section.classList.contains('hero')) {
            section.classList.add('scroll-animate');
            
            // Alternate animation types for variety
            const animations = ['slide-up', 'fade-in', 'scale-in'];
            const animationType = animations[index % animations.length];
            section.dataset.animation = animationType;
            
            scrollAnimationObserver.observe(section);
        }
    });
    
    // Add animations to service cards with stagger effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('scroll-animate');
        card.dataset.animation = 'slide-up';
        card.dataset.delay = `${index * 0.1}s`;
        scrollAnimationObserver.observe(card);
    });
    
    // Add animations to mockup elements
    const mockups = document.querySelectorAll('.iphone-mockup');
    mockups.forEach((mockup, index) => {
        mockup.classList.add('scroll-animate');
        mockup.dataset.animation = index % 2 === 0 ? 'slide-left' : 'slide-right';
        mockup.dataset.delay = `${index * 0.2}s`;
        scrollAnimationObserver.observe(mockup);
    });
    
    // Add animations to brand showcase images
    const brandImages = document.querySelectorAll('.product-grid img');
    brandImages.forEach((img, index) => {
        img.classList.add('scroll-animate');
        img.dataset.animation = 'scale-in';
        img.dataset.delay = `${index * 0.1}s`;
        scrollAnimationObserver.observe(img);
    });
}

// Enhanced smooth scroll for navigation
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax effect for hero section
function initializeParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }, 16));
    }
}

// Performance optimization: throttle function
function throttle(func, wait) {
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

// Page loader and initialization
window.addEventListener('load', () => {
    // Hide page loader after everything is loaded
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.remove();
            }, 800);
        }, 500);
    }
});

// Initialize all scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeScrollAnimations();
    initializeSmoothScroll();
    initializeParallax();
    forceVisibilityForSpecificSections();
    
    // Add elegant entrance animations to key elements
    addEntranceAnimations();
});

// Add entrance animations to key elements
function addEntranceAnimations() {
    // Add subtle animations to navigation items
    const navItems = document.querySelectorAll('.nav-menu li');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        item.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 2000 + (index * 150));
    });
    
    // Add entrance animation to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.8)';
        logo.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1)';
        }, 1800);
    }
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Legacy animation observer for specific elements
const legacyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Force visibility for specific sections that should always be visible
function forceVisibilityForSpecificSections() {
    // Force about section to be visible immediately
    const aboutElements = document.querySelectorAll('.about-grid, .stats');
    aboutElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.visibility = 'visible';
    });
    
    // Force galleries to be visible immediately
    const galleries = document.querySelectorAll('.brand-grid, .product-grid');
    galleries.forEach(gallery => {
        gallery.style.display = 'grid';
        gallery.style.opacity = '1';
        gallery.style.visibility = 'visible';
        gallery.style.transform = 'none';
    });
    
    // Force brand carousel and logos to be visible immediately
    const brandCarousel = document.querySelector('.brand-carousel');
    const brandCarouselContainer = document.querySelector('.brand-carousel-container');
    const brandLogos = document.querySelectorAll('.brand-logo');
    const brandSection = document.querySelector('.brand-collabs');
    
    if (brandSection) {
        brandSection.style.display = 'block';
        brandSection.style.opacity = '1';
        brandSection.style.visibility = 'visible';
    }
    
    if (brandCarouselContainer) {
        brandCarouselContainer.style.display = 'block';
        brandCarouselContainer.style.opacity = '1';
        brandCarouselContainer.style.visibility = 'visible';
    }
    
    if (brandCarousel) {
        brandCarousel.style.display = 'flex';
        brandCarousel.style.opacity = '1';
        brandCarousel.style.visibility = 'visible';
        brandCarousel.style.transform = 'none';
    }
    
    brandLogos.forEach(logo => {
         logo.style.display = 'flex';
         logo.style.opacity = '1';
         logo.style.visibility = 'visible';
         logo.style.transform = 'none';
         
         const img = logo.querySelector('img');
         if (img) {
             img.style.display = 'block';
             img.style.opacity = '1';
             img.style.visibility = 'visible';
         }
     });
}

// Initialize specific element animations and visibility
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.reviews-container, .testimonials-grid');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        legacyObserver.observe(el);
    });
    
    forceVisibilityForSpecificSections();
});

// Horizontal scroll for reviews and recipes on desktop
const reviewsContainer = document.querySelector('.reviews-container');
const recipesContainer = document.querySelector('.recipes-container');
let isDown = false;
let startX;
let scrollLeft;

if (reviewsContainer) {
    reviewsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        reviewsContainer.style.cursor = 'grabbing';
        startX = e.pageX - reviewsContainer.offsetLeft;
        scrollLeft = reviewsContainer.scrollLeft;
    });

    reviewsContainer.addEventListener('mouseleave', () => {
        isDown = false;
        reviewsContainer.style.cursor = 'grab';
    });

    reviewsContainer.addEventListener('mouseup', () => {
        isDown = false;
        reviewsContainer.style.cursor = 'grab';
    });

    reviewsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - reviewsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        reviewsContainer.scrollLeft = scrollLeft - walk;
    });

    // Touch support for mobile
    reviewsContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - reviewsContainer.offsetLeft;
        scrollLeft = reviewsContainer.scrollLeft;
    });

    reviewsContainer.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - reviewsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        reviewsContainer.scrollLeft = scrollLeft - walk;
    });
}

// Horizontal scroll for recipes container
if (recipesContainer) {
    recipesContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        recipesContainer.style.cursor = 'grabbing';
        startX = e.pageX - recipesContainer.offsetLeft;
        scrollLeft = recipesContainer.scrollLeft;
    });

    recipesContainer.addEventListener('mouseleave', () => {
        isDown = false;
        recipesContainer.style.cursor = 'grab';
    });

    recipesContainer.addEventListener('mouseup', () => {
        isDown = false;
        recipesContainer.style.cursor = 'grab';
    });

    recipesContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - recipesContainer.offsetLeft;
        const walk = (x - startX) * 2;
        recipesContainer.scrollLeft = scrollLeft - walk;
    });

    // Touch support for mobile
    recipesContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - recipesContainer.offsetLeft;
        scrollLeft = recipesContainer.scrollLeft;
    });

    recipesContainer.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - recipesContainer.offsetLeft;
        const walk = (x - startX) * 2;
        recipesContainer.scrollLeft = scrollLeft - walk;
    });
}

// Lazy loading for images (excluding brand logos and about image)
const lazyImages = document.querySelectorAll('img:not(.brand-logo img):not(.about-image img)');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.addEventListener('load', () => {
                img.style.transition = 'opacity 0.3s ease';
                img.style.opacity = '1';
            });
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Ensure brand logo images are always visible
const brandLogoImages = document.querySelectorAll('.brand-logo img');
brandLogoImages.forEach(img => {
    img.style.opacity = '1';
    img.style.visibility = 'visible';
    img.style.display = 'block';
});

// Ensure about image is always visible
const aboutImage = document.querySelector('.about-image img');
if (aboutImage) {
    aboutImage.style.opacity = '1';
    aboutImage.style.visibility = 'visible';
    aboutImage.style.display = 'block';
}

// Gallery lightbox functionality
const galleryImages = document.querySelectorAll('.brand-grid img, .product-grid img');
let lightbox = null;

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="" alt="">
                </div>
            `;
            document.body.appendChild(lightbox);

            // Add lightbox styles
            const lightboxStyles = `
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .lightbox.active {
                    opacity: 1;
                }
                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                }
                .lightbox img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
                .lightbox-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    color: #fff;
                    font-size: 30px;
                    cursor: pointer;
                    z-index: 2001;
                }
            `;
            
            const style = document.createElement('style');
            style.textContent = lightboxStyles;
            document.head.appendChild(style);

            // Close lightbox events
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                    lightbox.classList.remove('active');
                    setTimeout(() => {
                        lightbox.style.display = 'none';
                    }, 300);
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                    lightbox.classList.remove('active');
                    setTimeout(() => {
                        lightbox.style.display = 'none';
                    }, 300);
                }
            });
        }

        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.style.display = 'flex';
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericTarget = parseInt(target.replace(/\D/g, ''));
        const suffix = target.replace(/\d/g, '');
        let current = 0;
        const increment = numericTarget / 100;
        
        const updateCounter = () => {
            if (current < numericTarget) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        });
        
        observer.observe(counter);
    });
};

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);
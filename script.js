// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Hide page loader
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 300);
        }, 1000);
    }

    const mobileMenuBtn = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
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

    // Header scroll effect
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Make navbar translucent when in hero section
        if (hero) {
            const heroHeight = hero.offsetHeight;
            if (window.scrollY < heroHeight) {
                header.classList.add('translucent');
            } else {
                header.classList.remove('translucent');
            }
        }
    });

    // Force visibility for brand carousel and combined content
    const brandCarousel = document.querySelector('.brand-carousel-container');
    const combinedContent = document.querySelector('.combined-content-container');
    
    if (brandCarousel) {
        brandCarousel.style.visibility = 'visible';
        brandCarousel.style.opacity = '1';
    }
    
    if (combinedContent) {
        combinedContent.style.visibility = 'visible';
        combinedContent.style.opacity = '1';
    }

    // Initialize translucent navbar on page load
    if (hero) {
        header.classList.add('translucent');
    }

    // Initialize typing animation
    initializeTypingAnimation();

    // Initialize carousel functionality
    initializeCarousel();
});

function initializeTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;
    
    const text = typingElement.getAttribute('data-text');
    const speed = 150; // Typing speed in milliseconds
    const delay = 1500; // Delay before starting typing
    
    // Clear the text initially
    typingElement.textContent = '';
    
    setTimeout(() => {
        typingElement.classList.add('typing');
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Animation finished, remove cursor after a delay
                setTimeout(() => {
                    typingElement.classList.remove('typing');
                    typingElement.classList.add('finished');
                }, 1000);
            }
        }
        
        typeWriter();
    }, delay);
}

function initializeCarousel() {
    const carousels = document.querySelectorAll('.combined-content-container');
    if (carousels.length === 0) return;

    // Carousels already have carousel-active class from HTML

    // Process each carousel separately
    carousels.forEach((carousel, index) => {

        // Pause on hover for this specific carousel
        carousel.addEventListener('mouseenter', () => {
            carousel.classList.add('carousel-paused');
        });

        carousel.addEventListener('mouseleave', () => {
            // Only resume if no videos in this carousel are playing
            const playingVideos = carousel.querySelectorAll('.iphone-mockup video.playing');
            if (playingVideos.length === 0) {
                carousel.classList.remove('carousel-paused');
            }
        });

        // Handle video play/pause events for this specific carousel
        const videos = carousel.querySelectorAll('.iphone-mockup video');
        const playButtons = carousel.querySelectorAll('.play-button');

        playButtons.forEach((button, index) => {
            const video = videos[index];
            if (!video) return;

            button.addEventListener('click', () => {
                if (video.paused) {
                    // Pause all other videos in this carousel
                    videos.forEach(v => {
                        if (v !== video && !v.paused) {
                            v.pause();
                            v.classList.remove('playing');
                        }
                    });

                    // Play this video
                    video.play();
                    video.classList.add('playing');
                    carousel.classList.add('carousel-paused');
                    button.style.display = 'none';
                }
            });

            video.addEventListener('pause', () => {
                video.classList.remove('playing');
                button.style.display = 'block';
                
                // Resume carousel if no other videos in this carousel are playing
                const playingVideos = carousel.querySelectorAll('.iphone-mockup video.playing');
                if (playingVideos.length === 0 && !carousel.matches(':hover')) {
                    carousel.classList.remove('carousel-paused');
                }
            });

            video.addEventListener('ended', () => {
                video.classList.remove('playing');
                button.style.display = 'block';
                
                // Resume carousel if no other videos in this carousel are playing
                const playingVideos = carousel.querySelectorAll('.iphone-mockup video.playing');
                if (playingVideos.length === 0 && !carousel.matches(':hover')) {
                    carousel.classList.remove('carousel-paused');
                }
            });
        });

        // Handle video clicks directly on video elements
        videos.forEach(video => {
            video.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    video.classList.add('playing');
                    carousel.classList.add('carousel-paused');
                } else {
                    video.pause();
                    video.classList.remove('playing');
                    
                    // Resume carousel if no other videos in this carousel are playing
                    const playingVideos = carousel.querySelectorAll('.iphone-mockup video.playing');
                    if (playingVideos.length === 0 && !carousel.matches(':hover')) {
                        carousel.classList.remove('carousel-paused');
                    }
                }
            });
        });

        // Handle clicks on iPhone mockups to pause/resume carousel
        const mockups = carousel.querySelectorAll('.iphone-mockup');
        mockups.forEach(mockup => {
            // Add a data attribute to track pause state
            mockup.addEventListener('click', (e) => {
                // Don't interfere with video or play button clicks
                if (e.target.closest('video') || e.target.closest('.play-button')) {
                    return;
                }
                
                // Toggle carousel pause state
                if (carousel.classList.contains('carousel-paused')) {
                    // Only resume if no videos are playing
                    const playingVideos = carousel.querySelectorAll('.iphone-mockup video.playing');
                    if (playingVideos.length === 0) {
                        carousel.classList.remove('carousel-paused');
                        mockup.classList.remove('mockup-clicked');
                    }
                } else {
                    carousel.classList.add('carousel-paused');
                    mockup.classList.add('mockup-clicked');
                }
            });


        });
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

// Luxurious scroll animations with advanced stagger effects
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || '0s';
            const animationType = entry.target.dataset.animation || 'fade-in';
            
            setTimeout(() => {
                entry.target.classList.add('animate');
                
                // Add floating effect to specific elements for continuous elegance
                if (animationType === 'luxury-stagger' || entry.target.classList.contains('service-card')) {
                    setTimeout(() => {
                        entry.target.classList.add('floating');
                    }, 1500);
                }
            }, parseFloat(delay) * 1000);
        }
    });
}, observerOptions);

// Enhanced stagger for grid layouts
const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('.scroll-animate');
            children.forEach((child, index) => {
                const delay = (index * 0.15) + 's';
                setTimeout(() => {
                    child.classList.add('animate');
                }, parseFloat(delay) * 1000);
            });
        }
    });
}, { threshold: 0.2 });

// Observe all scroll-animate elements
document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
});

// Observe grid containers for staggered animations
document.querySelectorAll('.stats, .services-grid, .about-grid, .testimonials-grid').forEach(grid => {
    gridObserver.observe(grid);
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Parallax scroll effect removed

const animateCounters = () => {
    // Counter animation removed - numbers display immediately
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        // Numbers are already visible, no animation needed
    });
};

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);
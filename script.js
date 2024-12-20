// Initialize fullPage.js
new fullpage('#fullpage', {
    autoScrolling: true,
    scrollingSpeed: 1000,
    onLeave: (origin, destination, direction) => {
        // Reset all animations
        gsap.set('.content, .device-wrapper', { clearProps: 'all' });
        
        // Animate content and device for the new section
        const section = destination.item;
        const content = section.querySelector('.content');
        const device = section.querySelector('.device-wrapper');
        
        if (content && device) {
            // Determine positions based on section index
            const isEven = destination.index % 2 === 0;
            
            // Content animation
            gsap.fromTo(content, 
                { 
                    x: isEven ? -100 : 100,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.5,
                    ease: 'power2.out'
                }
            );

            // Device animation
            gsap.fromTo(device,
                {
                    x: isEven ? 100 : -100,
                    opacity: 0,
                    rotateY: isEven ? 45 : -45
                },
                {
                    x: 0,
                    opacity: 1,
                    rotateY: 0,
                    duration: 1,
                    delay: 0.5,
                    ease: 'power2.out'
                }
            );
        }

        // Special animation for intro section
        if (destination.index === 0) {
            animateIntroSection();
        }
    }
});

// Function to animate the intro section
function animateIntroSection() {
    gsap.fromTo('.intro-title',
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: 'power2.out'
        }
    );

    gsap.fromTo('.intro-subtitle',
        {
            y: 30,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.4,
            ease: 'power2.out'
        }
    );
}

// Initial animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Animate intro section
    animateIntroSection();

    // Update time in status bar
    updateTime();
    setInterval(updateTime, 60000); // Update every minute

    // Initialize hover effects for devices
    initializeDeviceHover();

    // Initialize project card hover effects
    initializeProjectCards();

    // Initialize contact button effects
    initializeContactButtons();
});

// Function to update time in status bar
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    document.querySelectorAll('.status-bar .time').forEach(el => {
        el.textContent = timeString;
    });
}

// Function to initialize device hover effects
function initializeDeviceHover() {
    document.querySelectorAll('.device').forEach(device => {
        device.addEventListener('mousemove', (e) => {
            const rect = device.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = -(x - centerX) / 20;
            
            gsap.to(device, {
                rotateX,
                rotateY,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        device.addEventListener('mouseleave', () => {
            gsap.to(device, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// Function to initialize project card hover effects
function initializeProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Function to initialize contact button effects
function initializeContactButtons() {
    document.querySelectorAll('.contact-btn').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        // Add click animation
        button.addEventListener('click', () => {
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Handle mobile navigation
document.addEventListener('click', (e) => {
    if (e.target.closest('.nav-item')) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        e.target.closest('.nav-item').classList.add('active');
    }
});

// Add scroll-based parallax effect to devices
window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        document.querySelectorAll('.device').forEach(device => {
            const rect = device.getBoundingClientRect();
            const scrollPercentage = (window.innerHeight - rect.top) / window.innerHeight;
            if (scrollPercentage > 0 && scrollPercentage < 1) {
                gsap.to(device, {
                    rotateY: scrollPercentage * 10,
                    duration: 0.1
                });
            }
        });
    });
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Refresh fullpage.js
        fullpage_api.reBuild();
        
        // Reset device animations
        document.querySelectorAll('.device').forEach(device => {
            gsap.set(device, { clearProps: 'all' });
        });
    }, 250);
});
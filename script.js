// Initialize fullPage.js
new fullpage('#fullpage', {
    autoScrolling: true,
    scrollOverflow: true,
    scrollingSpeed: 1000,
    onLeave: (origin, destination, direction) => {
        const section = destination.item;
        
        // Only trigger animations for the visible section and defer heavy animations
        if (section.querySelector('.content') && section.querySelector('.device-wrapper')) {
            // Reset animations if needed and only animate when entering relevant section
            animateSection(section, destination.index);
        }

        // Special animation for intro section, ensures this doesn't run on every transition
        if (destination.index === 0) {
            animateIntroSection();
        }
    }
});

function animateSection(section, sectionIndex) {
    const content = section.querySelector('.content');
    const device = section.querySelector('.device-wrapper');
    const isEven = sectionIndex % 2 === 0;

    // Animate content and device
    if (content && device) {
        // Content animation
        gsap.fromTo(content,
            { x: isEven ? -100 : 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.3 }
        );

        // Device animation
        gsap.fromTo(device,
            { x: isEven ? 100 : -100, opacity: 0, rotateY: isEven ? 45 : -45 },
            { x: 0, opacity: 1, rotateY: 0, duration: 1, ease: 'power2.out', delay: 0.3 }
        );
    }
}

// Optimized intro section animation with additional performance tweaks
function animateIntroSection() {
    gsap.fromTo('.intro-title', {
            y: 50, opacity: 0
        }, {
            y: 0, opacity: 1, duration: 1, ease: 'power2.out'
        });

    gsap.fromTo('.intro-subtitle', {
            y: 30, opacity: 0
        }, {
            y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.3
        });
}

// Throttle scroll-based parallax effect for devices to avoid lag
window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        document.querySelectorAll('.device').forEach(device => {
            const rect = device.getBoundingClientRect();
            const scrollPercentage = (window.innerHeight - rect.top) / window.innerHeight;
            if (scrollPercentage > 0 && scrollPercentage < 1) {
                // Instead of animating every scroll, apply minimal transforms
                gsap.to(device, {
                    rotateY: scrollPercentage * 10,
                    duration: 0.1,
                    ease: 'power2.out'
                });
            }
        });
    });
});

// Handle window resizing with debounce to minimize excess triggers
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        fullpage_api.reBuild();
        document.querySelectorAll('.device').forEach(device => {
            gsap.set(device, { clearProps: 'all' });
        });
    }, 200);
});

// Implement optimized hover functions
function initializeDeviceHover() {
    document.querySelectorAll('.device').forEach(device => {
        const hoverEffect = (e) => {
            const rect = device.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            gsap.to(device, {
                rotateX: (y - centerY) / 20,
                rotateY: -(x - centerX) / 20,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        device.addEventListener('mousemove', hoverEffect);
        device.addEventListener('mouseleave', () => {
            gsap.to(device, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Add GSAP animation
document.addEventListener('DOMContentLoaded', () => {
    // Title and subtitle animations with delay for sequential effect
    gsap.fromTo('.intro-title', {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.5
    });

    gsap.fromTo('.intro-subtitle', {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.8
    });

    gsap.fromTo('.scroll-indicator', {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
        delay: 1
    });

    gsap.fromTo('.glowing-circles', {
        opacity: 0
    }, {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.6
    });

    // Animate the circles’ pulsating glow effect
    gsap.to('.glowing-circles', {
        opacity: 0.5,
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut'
    });

    // Add scrolling effect for the scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator.addEventListener('click', () => {
        fullpage_api.moveSectionDown();
    });

    // Hover effect on title and subtitle with scale and color change
    const introTitle = document.querySelector('.intro-title');
    introTitle.addEventListener('mouseenter', () => {
        gsap.to(introTitle, { scale: 1.1, color: '#ffcc00', duration: 0.5 });
    });

    introTitle.addEventListener('mouseleave', () => {
        gsap.to(introTitle, { scale: 1, color: '#fff', duration: 0.5 });
    });

    const introSubtitle = document.querySelector('.intro-subtitle');
    introSubtitle.addEventListener('mouseenter', () => {
        gsap.to(introSubtitle, { scale: 1.05, color: '#ffcc00', duration: 0.5 });
    });

    introSubtitle.addEventListener('mouseleave', () => {
        gsap.to(introSubtitle, { scale: 1, color: '#ddd', duration: 0.5 });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const images = ['D:/z_material/web/portfolio-andde-web/img/spacerr__app.png', 'img2.png', 'img3.png']; // Add your image paths here
    let currentIndex = 0;
    const introBg = document.querySelector('.intro-bg img');

    function changeImage() {
        currentIndex = (currentIndex + 1) % images.length;
        introBg.src = images[currentIndex];
    }

    setInterval(changeImage, 3000); // Change image every 3 seconds (adjust as needed)
});
// Timeline interaction handlers
document.addEventListener('DOMContentLoaded', () => {
    // Experience section data
    const experienceData = {
        clickretina: {
            title: 'ClickRetina.com',
            description: 'Developed commercial Android apps for SEO-related projects, implemented modern Android architecture patterns.',
            image: '/api/placeholder/280/200', // Replace with actual image path
            tech: ['Kotlin', 'Jetpack Compose', 'MVVM']
        },
        aivirex: {
            title: 'AiVirex Innovations LLP',
            description: 'Created high-performing mobile apps using modern Android development practices.',
            image: '/api/placeholder/280/200', // Replace with actual image path
            tech: ['Kotlin', 'Clean Architecture', 'Firebase']
        },
        radionics: {
            title: 'Radionics Technology',
            description: 'Led development of core Android applications with focus on performance optimization.',
            image: '/api/placeholder/280/200', // Replace with actual image path
            tech: ['Android', 'Java', 'Real-time Sync']
        }
    };

    // Education section data
    const educationData = {
        btech: {
            title: 'B.Tech in Computer Science',
            description: 'Specialized in Computer Science with focus on Mobile Application Development.',
            image: '/api/placeholder/280/200', // Replace with actual image path
            achievements: ['Dean\'s List', 'Research Project']
        },
        internship: {
            title: 'DRDO Internship',
            description: 'Android Development Internship focusing on secure communication applications.',
            image: '/api/placeholder/280/200', // Replace with actual image path
            achievements: ['Security Certification', 'Project Excellence']
        }
    };

    // Handle experience timeline interactions
    const experienceItems = document.querySelectorAll('.timeline-item[data-company]');
    experienceItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.timeline-item[data-company]').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update preview
            const company = item.dataset.company;
            const data = experienceData[company];
            
            const preview = document.getElementById('experience-preview');
            preview.classList.remove('fade-in');
            void preview.offsetWidth; // Trigger reflow
            preview.classList.add('fade-in');

            document.getElementById('experience-image').src = data.image;
            document.getElementById('preview-title').textContent = data.title;
            document.getElementById('preview-description').textContent = data.description;

            // Update tech stack
            const techStack = preview.querySelector('.tech-stack');
            techStack.innerHTML = data.tech.map(tech => 
                `<span class="tech-badge">${tech}</span>`
            ).join('');
        });
    });

    // Handle education timeline interactions
    const educationItems = document.querySelectorAll('.timeline-item[data-education]');
    educationItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.timeline-item[data-education]').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update preview
            const education = item.dataset.education;
            const data = educationData[education];
            
            const preview = document.getElementById('education-preview');
            preview.classList.remove('fade-in');
            void preview.offsetWidth; // Trigger reflow
            preview.classList.add('fade-in');

            document.getElementById('education-image').src = data.image;
            document.getElementById('edu-preview-title').textContent = data.title;
            document.getElementById('edu-preview-description').textContent = data.description;

            // Update achievement badges
            const achievementBadges = preview.querySelector('.achievement-badges');
            achievementBadges.innerHTML = data.achievements.map(achievement => 
                `<span class="achievement-badge">${achievement}</span>`
            ).join('');
        });
    });

    // Initialize first items as active
    document.querySelector('.timeline-item[data-company]').click();
    document.querySelector('.timeline-item[data-education]').click();
});
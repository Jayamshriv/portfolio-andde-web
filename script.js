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

    function changeImage(imageIndex) {
        const imageElement = document.querySelector('.current-slide-image');
        if (!imageElement) {
            console.error('Image element not found in DOM.');
            return;
        }
    
        const newSrc = 'img/spacerr__app.png';
        fetch(newSrc)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Image not found: ${newSrc}`);
                }
                return res.blob();
            })
            .then(() => {
                imageElement.src = newSrc;
            })
            .catch((err) => {
                console.error(err);
                imageElement.src = `img/placeholder.jpg`; // Fallback placeholder
            });
    }
    

    setInterval(changeImage, 3000); // Change image every 3 seconds (adjust as needed)
});
// Timeline interaction handlers
document.addEventListener('DOMContentLoaded', () => {
    // Experience section data
    const experienceData = {
        sspl: {
            title: 'SSPL - DRDO',
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

// Project image data
const projectImages = {
    safety: [
        'https://images.unsplash.com/photo-1709917241494-48fdf74f2640?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfDF8MHx8fDI%3D',
        'https://images.unsplash.com/photo-1709917241494-48fdf74f2640?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfDF8MHx8fDI%3D',
        'https://images.unsplash.com/photo-1709917241494-48fdf74f2640?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfDF8MHx8fDI%3D',
        'https://images.unsplash.com/photo-1709917241494-48fdf74f2640?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfDF8MHx8fDI%3D',
        'https://images.unsplash.com/photo-1709917241494-48fdf74f2640?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfDF8MHx8fDI%3D',
        'https://images.unsplash.com/photo-1709917241494-48fdf74f2640?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfDF8MHx8fDI%3D',
    ],
    spacerr: [
        'https://images.unsplash.com/photo-1709917241494-48fdf74f2640?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfDF8MHx8fDI%3D',
        'https://images.unsplash.com/photo-1709917241494-48fdf74f2640?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfDF8MHx8fDI%3D',
        'https://images.unsplash.com/photo-1709917241494-48fdf74f2640?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfDF8MHx8fDI%3D',
        'https://images.unsplash.com/photo-1709917241494-48fdf74f2640?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfDF8MHx8fDI%3D',
        'https://images.unsplash.com/photo-1709917241494-48fdf74f2640?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfDF8MHx8fDI%3D',
        'https://images.unsplash.com/photo-1709917241494-48fdf74f2640?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfDF8MHx8fDI%3D',
    ]
};

class Slideshow {
    constructor() {
        this.slideshowContainer = document.querySelector('.slideshow-container');
        this.slidesContainer = document.querySelector('.slides');
        this.currentIndex = 0;
        this.slides = [];
        this.slideInterval = null;
        this.projectCards = document.querySelectorAll('.project-card');

        if (this.slideshowContainer && this.slidesContainer && this.projectCards.length) {
            this.initializeEventListeners();
        } else {
            console.error('Required DOM elements for the slideshow are missing.');
        }
    }

    initializeEventListeners() {
        // Project card click handlers
        this.projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const project = card.dataset.project;
                if (projectImages[project]) {
                    this.loadProject(project);
                } else {
                    console.error(`No images found for project: ${project}`);
                }
            });
        });

        // Navigation button handlers
        document.querySelector('.prev').addEventListener('click', () => this.navigate(-1));
        document.querySelector('.next').addEventListener('click', () => this.navigate(1));
        document.querySelector('.close-slideshow').addEventListener('click', () => this.close());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.slideshowContainer.classList.contains('hidden')) return;

            switch (e.key) {
                case 'ArrowLeft':
                    this.navigate(-1);
                    break;
                case 'ArrowRight':
                    this.navigate(1);
                    break;
                case 'Escape':
                    this.close();
                    break;
            }
        });
    }

    loadProject(project) {
        this.currentIndex = 0;
        this.slidesContainer.innerHTML = '';
        this.slides = [];

        // Create slides
        projectImages[project].forEach((src, index) => {
            const slide = document.createElement('div');
            slide.className = `slide ${index === 0 ? 'active' : ''}`;

            const img = document.createElement('img');
            img.src = src.startsWith('http') ? src : `img/${src}`;
            img.alt = `${project} screenshot ${index + 1}`;

            slide.appendChild(img);
            this.slidesContainer.appendChild(slide);
            this.slides.push(slide);
        });

        // Show slideshow
        this.slideshowContainer.classList.remove('hidden');

        // Start auto-advance
        this.startAutoAdvance();
    }

    navigate(direction) {
        // Remove active class from current slide
        this.slides[this.currentIndex].classList.remove('active');

        // Calculate new index
        this.currentIndex = (this.currentIndex + direction + this.slides.length) % this.slides.length;

        // Add active class to new slide
        this.slides[this.currentIndex].classList.add('active');

        // Reset auto-advance timer
        this.startAutoAdvance();
    }

    startAutoAdvance() {
        // Clear existing interval
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }

        // Start new interval
        this.slideInterval = setInterval(() => {
            this.navigate(1);
        }, 1000);
    }

    close() {
        this.slideshowContainer.classList.add('hidden');
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
    }
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Slideshow();
});
document.addEventListener('DOMContentLoaded', () => {
    // Initialize fullPage.js
    new fullpage('#fullpage', {
        autoScrolling: true,
        scrollOverflow: true,
        scrollingSpeed: 1000,
        onLeave: (origin, destination) => {
            const section = destination.item;
            if (section.querySelector('.content') && section.querySelector('.device-wrapper')) {
                animateSection(section, destination.index);
            }
        }
    });

    // Section Animation Function
    function animateSection(section, sectionIndex) {
        const content = section.querySelector('.content');
        const device = section.querySelector('.device-wrapper');
        const isEven = sectionIndex % 2 === 0;

        // Content and Device Animation
        if (content && device) {
            gsap.fromTo(content,
                { x: isEven ? -100 : 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }
            );

            gsap.fromTo(device,
                { x: isEven ? 100 : -100, opacity: 0, rotateY: isEven ? 45 : -45 },
                { x: 0, opacity: 1, rotateY: 0, duration: 1, ease: 'power2.out' }
            );
        }
    }

    // Device Tilt on Mouse Movement
    document.querySelectorAll('.device').forEach(device => {
        device.addEventListener('mousemove', (e) => {
            const rect = device.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            gsap.to(device, {
                rotateX: (y - centerY) / 20,
                rotateY: -(x - centerX) / 20,
                duration: 0.3
            });
        });
        device.addEventListener('mouseleave', () => {
            gsap.to(device, { rotateX: 0, rotateY: 0, duration: 0.3 });
        });
    });

    // Timeline Interaction with Flip Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            timelineItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const relatedDevice = document.querySelector(`#${item.dataset.target}`);
            if (relatedDevice) {
                gsap.to(relatedDevice, {
                    rotateX: 360,
                    duration: 1,
                    onComplete: () => {
                        relatedDevice.textContent = `Data for ${item.dataset.target}`;
                    }
                });
            }
        });
    });
});

const androidLogoContainer = document.createElement('div');
androidLogoContainer.style.position = 'fixed';
androidLogoContainer.style.top = '20px';
androidLogoContainer.style.right = '20px';
androidLogoContainer.style.width = '200px';
androidLogoContainer.style.height = '200px';
androidLogoContainer.style.zIndex = '9999'; // Ensure it's on top of everything
androidLogoContainer.style.pointerEvents = 'none'; // Prevent interaction
androidLogoContainer.style.display = 'flex';
androidLogoContainer.style.alignItems = 'center';
androidLogoContainer.style.justifyContent = 'center';
document.body.appendChild(androidLogoContainer);

// Insert the Android SVG logo
androidLogoContainer.innerHTML = `
<svg height="600" width="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" transform="translate(-30, 50)">
  <!-- Android head -->
  <g transform="translate(-130 ,-500) scale(2)" >
    <path d="m263.837 306.59 21.9331-37.9944c1.2377-2.12998.48933-4.83565-1.61189-6.07335-2.1012-1.23768-4.83565-.5181-6.04456 1.61189l-22.221 38.4837c-16.9536-7.74281-36.0371-12.0604-56.5599-12.0604-20.5227 0-39.6063 4.31754-56.5599 12.0604l-22.221-38.4837c-1.2377-2.12999-3.94336-2.84957-6.07335-1.61189-2.13 1.2377-2.84959 3.94337-1.61189 6.07335l21.9331 37.9944c-37.8217 20.494-63.4392 58.7762-67.6703 103.592h264.407c-4.2312-44.8161-29.8487-83.0984-67.6991-103.592zm-125.209 66.4614c-6.13092 0-11.0817-4.97957-11.0817-11.0817 0-6.13093 4.97957-11.0817 11.0817-11.0817 6.13092 0 11.0817 4.97956 11.0817 11.0817.0289 6.10212-4.95079 11.0817-11.0817 11.0817zm121.381 0c-6.13091 0-11.0817-4.97957-11.0817-11.0817 0-6.13093 4.97958-11.0817 11.0817-11.0817 6.13093 0 11.0817 4.97956 11.0817 11.0817.0288 6.10212-4.95077 11.0817-11.0817 11.0817z"
    fill="#32de84" stroke-width=".288"/>
  </g>
  <!-- Left Eye -->
<g id="leftEye">
  <ellipse cx="155" cy="220" ry="40" rx="30" fill="#fff"></ellipse> <!-- White Sclera -->
  <ellipse cx="155" cy="230" ry="22" rx="15" fill="#000"></ellipse> <!-- Pupil -->
</g>
<!-- Right Eye -->
<g id="rightEye">
  <ellipse cx="385" cy="220" ry="40" rx="30" fill="#fff"></ellipse> <!-- White Sclera -->
  <ellipse cx="385" cy="230" ry="22" rx="15" fill="#000"></ellipse> <!-- Pupil -->
</g>

</svg>
`;


// References to the eye pupil elements (now <ellipse>)
const leftPupil = androidLogoContainer.querySelector('#leftEye ellipse:nth-child(2)');
const rightPupil = androidLogoContainer.querySelector('#rightEye ellipse:nth-child(2)');

// Eye movement logic
document.addEventListener('mousemove', (event) => {
  // Get center coordinates of the eyes
  const containerRect = androidLogoContainer.getBoundingClientRect();
  const logoCenterX = containerRect.left + containerRect.width / 2;
  const logoCenterY = containerRect.top + containerRect.height / 2;

  // Eye centers
  const leftEyeCenterX = logoCenterX - 100; // Adjusted based on svg
  const rightEyeCenterX = logoCenterX + 100;
  const eyesCenterY = logoCenterY - 30;

  // Sclera dimensions
  const scleraRX = 30; // Horizontal radius
  const scleraRY = 40; // Vertical radius

  // Pupil movement limit (constrained to sclera)
  const maxOffsetX = scleraRX - 15; // Leave padding to keep within sclera
  const maxOffsetY = scleraRY - 15;

  // Calculate new position for the pupil
  function calculatePupilOffset(centerX, centerY) {
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;

    // Get angle and restrict movement within the boundary
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxOffsetX);
    const offsetX = Math.min(maxOffsetX, distance * Math.cos(angle));
    const offsetY = Math.min(maxOffsetY, distance * Math.sin(angle));

    return { offsetX, offsetY };
  }

  // Calculate offsets for both eyes
  const leftOffset = calculatePupilOffset(leftEyeCenterX, eyesCenterY);
  const rightOffset = calculatePupilOffset(rightEyeCenterX, eyesCenterY);

  // Apply constrained movements to the pupils
  leftPupil.setAttribute('cx', 155 + leftOffset.offsetX);
  leftPupil.setAttribute('cy', 230 + leftOffset.offsetY);
  rightPupil.setAttribute('cx', 385 + rightOffset.offsetX);
  rightPupil.setAttribute('cy', 230 + rightOffset.offsetY);

});

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

function updateTime() {
    const timeElements = document.querySelectorAll('.time-display');
    const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // 24-hour format

    timeElements.forEach(element => {
        element.textContent = currentTime;
    });
}

// Call updateTime function to update the time
updateTime();

// Optionally, you can set an interval to update the time every minute
setInterval(updateTime, 60000);

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.intro-slideshow img');
    let currentImageIndex = 0;

    function showNextImage() {
        // Remove active class from current image
        images[currentImageIndex].classList.remove('active');
        
        // Update index
        currentImageIndex = (currentImageIndex + 1) % images.length;
        
        // Add active class to next image
        images[currentImageIndex].classList.add('active');
    }

    // Show first image immediately
    images[0].classList.add('active');
    
    // Change image every 3 seconds
    setInterval(showNextImage, 3000);
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
            description: 'Worked on an Android app using Kotlin and XML, assisting the elderly and disabled by connecting to a haptic hardware device.',
            image: 'img/sspll.png', // Replace with actual image path
            tech: ['Kotlin', 'XML', 'Biometric Authentication']
        },
        aivirex: {
            title: 'AiVirex Innovations LLP',
            description: 'Contributed to Attendify app using Clean Architecture and Jetpack Compose, adding user features that boosted engagement by 35%.',
            image: 'img/attendify.png', // Replace with actual image path
            tech: ['Kotlin', 'Jetpack Compose', 'MVVM']
        },
        radionics: {
            title: 'Radionics Technology',
            description: 'Enhanced AstroPeoples app by optimizing Kotlin code and UI, and integrated Razorpay and SignalR for payments and chat.',
            image: 'img/astropeap.png', // Replace with actual image path
            tech: ['Kotlin', 'Hilt', 'Retrofit', 'UI Optimization']
        }
    };

    // Education section data
        const educationData = {
            btech: {
                title: 'Guru Gobind Singh Indraprastha University',
                description: 'Bachelors in Technology - Computer Science Engineering',
                image: 'img/ggsipu%20imgae.png', // Replace with actual image path
                achievements: ['CGPA: 9.1', 'Passout Batach: 2025']
            },
            school: {
                title: 'Mount Olivet Senior Secondary School',
                description: '12th Grade - Science, CBSE\n10th Grade - CBSE',
                image: 'img/schoolimage.png', // Replace with actual image path
                achievements: ['10th: 86.6%', '12th: 83%']
            }
        };

    // Handle experience timeline interactions
    const experienceItems = document.querySelectorAll('.timeline-item[data-company]');
    experienceItems.forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.timeline-item[data-company]').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const company = item.dataset.company;
            const data = experienceData[company];
            const preview = document.getElementById('experience-preview');
            preview.classList.remove('fade-in');
            void preview.offsetWidth;
            preview.classList.add('fade-in');

            document.getElementById('experience-image').src = data.image;
            document.getElementById('preview-title').textContent = data.title;
            document.getElementById('preview-description').textContent = data.description;

            const techStack = preview.querySelector('.tech-stack');
            techStack.innerHTML = data.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('');
        });
    });

    const educationItems = document.querySelectorAll('.timeline-item[data-education]');
    educationItems.forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.timeline-item[data-education]').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const education = item.dataset.education;
            const data = educationData[education];
            const preview = document.getElementById('education-preview');
            preview.classList.remove('fade-in');
            void preview.offsetWidth;
            preview.classList.add('fade-in');

            document.getElementById('education-image').src = data.image;
            document.getElementById('edu-preview-title').textContent = data.title;
            document.getElementById('edu-preview-description').textContent = data.description;

            const achievementBadges = preview.querySelector('.achievement-badges');
            achievementBadges.innerHTML = data.achievements.map(achievement => `<span class="achievement-badge">${achievement}</span>`).join('');
        });
    });

    document.querySelector('.timeline-item[data-company]').click();
    document.querySelector('.timeline-item[data-education]').click();
});

// // Project image data
// Select all project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        if (url) {
            window.open(url, '_blank');
        }
    });
});

// const projectImages = {
//     safety: [
//         'https://via.placeholder.com/500/FF0000',
//         'https://via.placeholder.com/500/00FF00',
//         'https://via.placeholder.com/500/0000FF',
//     ],
//     spacerr: [
//         'https://via.placeholder.com/500/FFFF00',
//         'https://via.placeholder.com/500/FF00FF',
//         'https://via.placeholder.com/500/00FFFF',
//     ],
// };

// class Slideshow {
//     constructor() {
//         this.slideshowContainer = document.querySelector('.slideshow-container');
//         this.slidesContainer = document.querySelector('.slides');
//         this.currentIndex = 0;
//         this.slides = [];
//         this.slideInterval = null;
//         this.projectCards = document.querySelectorAll('.project-card');

//         if (this.slideshowContainer && this.slidesContainer && this.projectCards.length) {
//             this.initializeEventListeners();
//         } else {
//             console.error('Required DOM elements for the slideshow are missing.');
//         }
//     }

//     initializeEventListeners() {
//         // Project card click handlers
//         this.projectCards.forEach(card => {
//             card.addEventListener('click', () => {
//                 const project = card.dataset.project;
//                 if (projectImages[project]) {
//                     this.loadProject(project);
//                 } else {
//                     console.error(`No images found for project: ${project}`);
//                 }
//             });
//         });

//         // Navigation button handlers
//         document.querySelector('.prev').addEventListener('click', () => this.navigate(-1));
//         document.querySelector('.next').addEventListener('click', () => this.navigate(1));
//         document.querySelector('.close-slideshow').addEventListener('click', () => this.close());

//         // Keyboard navigation
//         document.addEventListener('keydown', (e) => {
//             if (this.slideshowContainer.classList.contains('hidden')) return;

//             switch (e.key) {
//                 case 'ArrowLeft':
//                     this.navigate(-1);
//                     break;
//                 case 'ArrowRight':
//                     this.navigate(1);
//                     break;
//                 case 'Escape':
//                     this.close();
//                     break;
//             }
//         });
//     }

//     loadProject(project) {
//         this.currentIndex = 0;
//         this.slidesContainer.innerHTML = '';
//         this.slides = [];

//         // Create slides
//         projectImages[project].forEach((src, index) => {
//             const slide = document.createElement('div');
//             slide.className = `slide ${index === 0 ? 'active' : ''}`;

//             const img = document.createElement('img');
//             img.src = src;
//             img.alt = `${project} screenshot ${index + 1}`;

//             slide.appendChild(img);
//             this.slidesContainer.appendChild(slide);
//             this.slides.push(slide);
//         });

//         // Show slideshow
//         this.slideshowContainer.classList.remove('hidden');

//         // Start auto-advance
//         this.startAutoAdvance();
//     }

//     navigate(direction) {
//         if (!this.slides.length) return;

//         // Remove active class from current slide
//         this.slides[this.currentIndex].classList.remove('active');

//         // Calculate new index
//         this.currentIndex = (this.currentIndex + direction + this.slides.length) % this.slides.length;

//         // Add active class to new slide
//         this.slides[this.currentIndex].classList.add('active');

//         // Reset auto-advance timer
//         this.startAutoAdvance();
//     }

//     startAutoAdvance() {
//         if (this.slideInterval) {
//             clearInterval(this.slideInterval);
//         }
//         this.slideInterval = setInterval(() => {
//             this.navigate(1);
//         }, 3000);
//     }

//     close() {
//         this.slideshowContainer.classList.add('hidden');
//         if (this.slideInterval) {
//             clearInterval(this.slideInterval);
//             this.slideInterval = null;
//         }
//     }
// }

// // Initialize slideshow when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     new Slideshow();
// });

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

// Initialize Android SVG with enhanced realistic eyes
androidLogoContainer.innerHTML = 
`
<svg height="600" width="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" transform="translate(-30, 50)">
  <!-- Android head -->
  <g transform="translate(-130 ,-500) scale(2)" >
    <path d="m263.837 306.59 21.9331-37.9944c1.2377-2.12998.48933-4.83565-1.61189-6.07335-2.1012-1.23768-4.83565-.5181-6.04456 1.61189l-22.221 38.4837c-16.9536-7.74281-36.0371-12.0604-56.5599-12.0604-20.5227 0-39.6063 4.31754-56.5599 12.0604l-22.221-38.4837c-1.2377-2.12999-3.94336-2.84957-6.07335-1.61189-2.13 1.2377-2.84959 3.94337-1.61189 6.07335l21.9331 37.9944c-37.8217 20.494-63.4392 58.7762-67.6703 103.592h264.407c-4.2312-44.8161-29.8487-83.0984-67.6991-103.592zm-125.209 66.4614c-6.13092 0-11.0817-4.97957-11.0817-11.0817 0-6.13093 4.97957-11.0817 11.0817-11.0817 6.13092 0 11.0817 4.97956 11.0817 11.0817.0289 6.10212-4.95079 11.0817-11.0817 11.0817zm121.381 0c-6.13091 0-11.0817-4.97957-11.0817-11.0817 0-6.13093 4.97958-11.0817 11.0817-11.0817 6.13093 0 11.0817 4.97956 11.0817 11.0817.0288 6.10212-4.95077 11.0817-11.0817 11.0817z"
    fill="#32de84" stroke-width=".288"/>
  </g>
  
  <!-- Enhanced Left Eye -->
  <g id="leftEye">
    <mask id="leftEyeMask">
      <ellipse cx="155" cy="220" ry="40" rx="30" fill="white"/>
    </mask>
    
    <g mask="url(#leftEyeMask)">
      <defs>
        <radialGradient id="enhancedScleraGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1" />
          <stop offset="80%" style="stop-color:rgb(245,245,245);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(230,230,230);stop-opacity:1" />
        </radialGradient>
        <radialGradient id="enhancedIrisGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#4CAF50"/>
          <stop offset="70%" style="stop-color:#388E3C"/>
          <stop offset="100%" style="stop-color:#2E7D32"/>
        </radialGradient>
      </defs>
      
      <ellipse cx="155" cy="220" ry="40" rx="30" fill="url(#enhancedScleraGradient)"/>
      
      <g id="leftEyeComponents">
        <ellipse id="leftIris" cx="155" cy="220" ry="25" rx="20" fill="url(#enhancedIrisGradient)">
          <animate attributeName="ry" values="25;24;25" dur="3s" repeatCount="indefinite"/>
        </ellipse>
        
        <ellipse id="leftPupil" cx="155" cy="220" ry="15" rx="12" fill="#000">
          <animate attributeName="ry" values="15;14;15" dur="3s" repeatCount="indefinite"/>
        </ellipse>
        
        <g id="leftHighlights">
          <ellipse cx="148" cy="210" rx="6" ry="4" fill="#fff" opacity="0.9" transform="rotate(-15)"/>
          <ellipse cx="162" cy="205" rx="3" ry="2" fill="#fff" opacity="0.6"/>
          <ellipse cx="155" cy="230" rx="8" ry="2" fill="#fff" opacity="0.3"/>
          <circle cx="155" cy="215" r="1" fill="#fff" opacity="0.8"/>
        </g>
      </g>
    </g>
  </g>

  <!-- Enhanced Right Eye (mirror of left) -->
  <g id="rightEye">
    <mask id="rightEyeMask">
      <ellipse cx="385" cy="220" ry="40" rx="30" fill="white"/>
    </mask>
    
    <g mask="url(#rightEyeMask)">
      <ellipse cx="385" cy="220" ry="40" rx="30" fill="url(#enhancedScleraGradient)"/>
      
      <g id="rightEyeComponents">
        <ellipse id="rightIris" cx="385" cy="220" ry="25" rx="20" fill="url(#enhancedIrisGradient)">
          <animate attributeName="ry" values="25;24;25" dur="3s" repeatCount="indefinite"/>
        </ellipse>
        
        <ellipse id="rightPupil" cx="385" cy="220" ry="15" rx="12" fill="#000">
          <animate attributeName="ry" values="15;14;15" dur="3s" repeatCount="indefinite"/>
        </ellipse>
        
        <g id="rightHighlights">
          <ellipse cx="378" cy="210" rx="6" ry="4" fill="#fff" opacity="0.9" transform="rotate(-15)"/>
          <ellipse cx="392" cy="205" rx="3" ry="2" fill="#fff" opacity="0.6"/>
          <ellipse cx="385" cy="230" rx="8" ry="2" fill="#fff" opacity="0.3"/>
          <circle cx="385" cy="215" r="1" fill="#fff" opacity="0.8"/>
        </g>
      </g>
    </g>
  </g>
</svg>
`;

class EnhancedAndroidEyesAnimation {
    constructor() {
        this.container = androidLogoContainer;
        this.setupElements();
        this.setupConfig();
        this.setupState();
        this.init();
    }

    setupElements() {
        this.leftPupil = this.container.querySelector('#leftPupil');
        this.rightPupil = this.container.querySelector('#rightPupil');
        this.leftIris = this.container.querySelector('#leftIris');
        this.rightIris = this.container.querySelector('#rightIris');
        this.leftHighlights = this.container.querySelector('#leftHighlights');
        this.rightHighlights = this.container.querySelector('#rightHighlights');
        this.leftEyeComponents = this.container.querySelector('#leftEyeComponents');
        this.rightEyeComponents = this.container.querySelector('#rightEyeComponents');
    }

    setupConfig() {
        this.config = {
            maxPupilOffset: 15,
            blinkInterval: { min: 1500, max: 4000 },
            surpriseDuration: 1000,
            followSpeed: 0.12,
            zoomRange: {
                min: 0.7,
                max: 1.3
            },
            maxDistance: 600,
            idleMovementRange: 0.3,
            cursorIdleTimeout: 30000, // 30 seconds
            lastMouseMoveTime: Date.now()
        };
    }

    setupState() {
        this.state = {
            isBlinking: false,
            isSurprised: false,
            isSpinning: false,
            lastBlinkTime: Date.now(),
            currentPupilPos: { x: 0, y: 0 },
            blinkCount: 0,
            mouseX: window.innerWidth / 2,
            mouseY: window.innerHeight / 2
        };
    }

    init() {
        this.startBlinking();
        this.addEventListeners();
        this.startIdleMovement();
        this.startCursorIdleCheck();
        this.startEyeTracking();
    }

    addEventListeners() {
        document.addEventListener('mousemove', (e) => {
            if (!this.state.isSpinning) {
                this.state.mouseX = e.clientX;
                this.state.mouseY = e.clientY;
                this.config.lastMouseMoveTime = Date.now();
                this.handleZoom(e);
            }
        });
        document.addEventListener('click', this.handleClick.bind(this));
    }

    startEyeTracking() {
        const trackEyes = () => {
            if (!this.state.isSpinning) {
                const rect = this.container.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Calculate quadrant-aware angle
                const dx = this.state.mouseX - centerX;
                const dy = this.state.mouseY - centerY;
                const angle = Math.atan2(dy, dx);
                
                // Distance calculation with quadrant adjustment
                const distance = Math.sqrt(dx * dx + dy * dy);
                const normalizedDistance = Math.min(distance, this.config.maxDistance) / this.config.maxDistance;
                
                // Quadrant-specific movement intensity
                const baseIntensity = this.config.maxPupilOffset * normalizedDistance;
                let moveX = Math.cos(angle) * baseIntensity;
                let moveY = Math.sin(angle) * baseIntensity;

                // Boundary adjustments
                const isBottom = dy > rect.height / 3;
                const isTop = dy < -rect.height / 3;
                
                if (isBottom) {
                    moveY = Math.min(moveY * 1.2, this.config.maxPupilOffset);
                } else if (isTop) {
                    moveY = Math.max(moveY * 1.2, -this.config.maxPupilOffset);
                }

                // Apply quadrant-aware eye movement
                gsap.to([this.leftPupil, this.leftIris, this.rightPupil, this.rightIris], {
                    duration: 0.12,
                    x: moveX,
                    y: moveY,
                    ease: "power1.out"
                });

                // Highlight movement with quadrant adjustment
                gsap.to([this.leftHighlights, this.rightHighlights], {
                    duration: 0.12,
                    x: moveX * -0.2,
                    y: moveY * -0.2,
                    ease: "power1.out"
                });

                // Dynamic pupil scaling
                const pupilScale = gsap.utils.clamp(
                    0.8,
                    1.1,
                    1 - (normalizedDistance * 0.2)
                );
                
                gsap.to([this.leftPupil, this.rightPupil], {
                    duration: 0.15,
                    scale: pupilScale,
                    transformOrigin: "center center"
                });
            }
            requestAnimationFrame(trackEyes);
        };
        trackEyes();
    }

    startCursorIdleCheck() {
        setInterval(() => {
            const now = Date.now();
            if (now - this.config.lastMouseMoveTime >= this.config.cursorIdleTimeout) {
                this.triggerHilariousBlink();
                this.config.lastMouseMoveTime = now; // Reset timer
            }
        }, 1000); // Check every second
    }

    handleZoom(event) {
        const rect = this.container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const normalizedDistance = Math.min(distance, this.config.maxDistance) / this.config.maxDistance;
        const zoomFactor = this.config.zoomRange.max - 
            (normalizedDistance * (this.config.zoomRange.max - this.config.zoomRange.min));

        gsap.to([this.leftEyeComponents, this.rightEyeComponents], {
            duration: 0.4,
            scale: zoomFactor,
            transformOrigin: "center center",
            ease: "power2.out"
        });
    }

    handleMouseMove(event) {
        if (this.state.isSpinning) return;

        const rect = this.container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let dx = (event.clientX - centerX) / rect.width;
        let dy = (event.clientY - centerY) / rect.height;
        
        dx = Math.max(-0.5, Math.min(0.5, dx));
        dy = Math.max(-0.5, Math.min(0.5, dy));

        this.moveEyes(dx, dy);
    }

    moveEyes(dx, dy) {
        const targetX = dx * this.config.maxPupilOffset;
        const targetY = dy * this.config.maxPupilOffset;

        gsap.to([this.leftPupil, this.rightPupil, this.leftIris, this.rightIris], {
            duration: 0.3,
            ease: "power2.out",
            x: targetX,
            y: targetY
        });

        gsap.to([this.leftHighlights, this.rightHighlights], {
            duration: 0.3,
            ease: "power2.out",
            x: targetX * -0.3,
            y: targetY * -0.3
        });

        const distance = Math.sqrt(dx * dx + dy * dy);
        const pupilScale = Math.max(0.7, 1 - (distance * 0.3));
        
        gsap.to([this.leftPupil, this.rightPupil], {
            duration: 0.3,
            scale: pupilScale,
            transformOrigin: "center center"
        });
    }

    handleClick() {
        if (this.state.isSpinning || this.state.isSurprised) return;
        
        this.state.isSurprised = true;
        this.state.isSpinning = true;

        // Funny spin animation
        gsap.timeline()
            .to([this.leftEyeComponents, this.rightEyeComponents], {
                duration: 0.8,
                rotation: 360,
                transformOrigin: "center center",
                ease: "power2.inOut"
            })
            .to([this.leftPupil, this.rightPupil], {
                duration: 0.2,
                scale: 1.5,
                ease: "bounce.out",
                onComplete: () => {
                    this.state.isSurprised = false;
                    this.state.isSpinning = false;
                    this.triggerHilariousBlink();
                }
            });
    }

    triggerHilariousBlink() {
        this.state.blinkCount = 0;
        this.rapidBlink();
    }

    rapidBlink() {
        if (this.state.blinkCount >= 3) return;
        
        this.state.isBlinking = true;
        
        gsap.timeline()
            .to([this.leftEyeComponents, this.rightEyeComponents], {
                duration: 0.1,
                scaleY: 0.1,
                transformOrigin: "center center",
                ease: "power1.in"
            })
            .to([this.leftEyeComponents, this.rightEyeComponents], {
                duration: 0.1,
                scaleY: 1,
                ease: "power1.out",
                onComplete: () => {
                    this.state.isBlinking = false;
                    this.state.blinkCount++;
                    if (this.state.blinkCount < 3) {
                        setTimeout(() => this.rapidBlink(), 150);
                    }
                }
            });
    }

    startIdleMovement() {
        const makeRandomMovement = () => {
            if (!this.state.isSurprised && !this.state.isSpinning) {
                const randomX = (Math.random() - 0.5) * this.config.idleMovementRange;
                const randomY = (Math.random() - 0.5) * this.config.idleMovementRange;
                this.moveEyes(randomX, randomY);
            }
            
            setTimeout(makeRandomMovement, Math.random() * 4000 + 2000);
        };
        
        setTimeout(makeRandomMovement, 2000);
    }

    startBlinking() {
        const checkBlink = () => {
            const now = Date.now();
            const timeSinceLastBlink = now - this.state.lastBlinkTime;
            const randomInterval = Math.random() * 
                (this.config.blinkInterval.max - this.config.blinkInterval.min) + 
                this.config.blinkInterval.min;

            if (timeSinceLastBlink > randomInterval && !this.state.isSurprised && !this.state.isSpinning) {
                this.rapidBlink();
                this.state.lastBlinkTime = now;
            }
            requestAnimationFrame(checkBlink);
        };
        checkBlink();
    }
}

// Initialize the enhanced eyes animation
const androidEyes = new EnhancedAndroidEyesAnimation();


// Initialize EmailJS with your User ID
emailjs.init("pix-hlGvx0mZtmiOq"); // Replace with your User ID

// Add an event listener to the contact form's submit event
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Retrieve form data
    const fromName = document.getElementById('name').value;  // Name field in the form
    const fromEmail = document.getElementById('email').value; // Email field in the form
    const subject = document.getElementById('subject').value; // Optional, for Subject field
    const message = document.getElementById('body').value;   // Message field in the form

    // Validate form fields
    if (!fromName || !fromEmail || !message) {
        alert("Please fill in all the required fields.");
        return;
    }

    // Send email via EmailJS
    emailjs.send("service_berm399", "template_qrbg4le", {
        from_name: fromName,
        from_email: fromEmail,
        message: message,
        to_name: "Administrator" // Change to your desired name or title
    }).then(
        () => {
            // Display confirmation and reset form
            document.getElementById('confirmation-message').style.display = 'block';
            document.getElementById('contact-form').reset();
        },
        (error) => {
            // Handle errors
            console.error('Error:', error);
            alert('Failed to send message. Please try again later.');
        }
    );
});

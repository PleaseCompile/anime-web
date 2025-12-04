/* ============================================
   🌸 Elf's Flower Field - 2.5D Parallax JavaScript
   Using GSAP for Animations
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initCustomCursor();
    initParallax();
    initParticleSystem();
    initEntryAnimations();
    initScrollAnimations();
    initButtonEffects();
});

/* ============================================
   🖱️ Custom Cursor
   ============================================ */
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power2.out'
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
        cursor.textContent = '💫';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
        cursor.textContent = '✨';
    });
    
    // Change cursor on interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .cta-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.textContent = '🌸';
            gsap.to(cursor, { scale: 1.5, duration: 0.2 });
        });
        el.addEventListener('mouseleave', () => {
            cursor.textContent = '✨';
            gsap.to(cursor, { scale: 1, duration: 0.2 });
        });
    });
}

/* ============================================
   🎮 Parallax Effect (Mouse-based)
   Creates 360° illusion by moving layers at different speeds
   ============================================ */
function initParallax() {
    const container = document.getElementById('parallax-container');
    const layers = document.querySelectorAll('.parallax-layer');
    
    // Parallax intensity multiplier
    const intensity = 30;
    
    // Track mouse movement for parallax
    container.addEventListener('mousemove', (e) => {
        // Get mouse position relative to center
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Apply parallax to each layer based on depth
        layers.forEach(layer => {
            const depth = parseFloat(layer.dataset.depth) || 0;
            const moveX = (mouseX * depth * intensity) / centerX;
            const moveY = (mouseY * depth * intensity * 0.5) / centerY;
            
            gsap.to(layer, {
                x: -moveX,
                y: -moveY,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    });
    
    // Reset position when mouse leaves
    container.addEventListener('mouseleave', () => {
        layers.forEach(layer => {
            gsap.to(layer, {
                x: 0,
                y: 0,
                duration: 1,
                ease: 'power2.out'
            });
        });
    });
    
    // Touch/Mobile parallax using device orientation
    if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
        window.addEventListener('deviceorientation', (e) => {
            const beta = e.beta || 0; // -180 to 180 (front/back tilt)
            const gamma = e.gamma || 0; // -90 to 90 (left/right tilt)
            
            layers.forEach(layer => {
                const depth = parseFloat(layer.dataset.depth) || 0;
                const moveX = (gamma * depth * 2);
                const moveY = (beta * depth);
                
                gsap.to(layer, {
                    x: moveX,
                    y: moveY,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
    }
}

/* ============================================
   🌸 Particle System - Floating Flowers
   ============================================ */
function initParticleSystem() {
    const particlesContainer = document.getElementById('particles-container');
    const flowers = ['🌸', '🌺', '🌼', '💮', '🌷', '✿', '❀'];
    const particleCount = 25;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, flowers);
    }
    
    // Continuously create new particles
    setInterval(() => {
        if (particlesContainer.children.length < 40) {
            createParticle(particlesContainer, flowers);
        }
    }, 2000);
}

function createParticle(container, flowers) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    
    // Random properties for depth illusion
    const size = 15 + Math.random() * 30; // 15px to 45px
    const startX = Math.random() * 100; // 0% to 100% of viewport width
    const duration = 8 + Math.random() * 12; // 8s to 20s
    const delay = Math.random() * 5; // 0s to 5s delay
    const horizontalDrift = -100 + Math.random() * 200; // -100px to 100px drift
    
    // Apply styles
    particle.style.cssText = `
        left: ${startX}%;
        font-size: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        --drift: ${horizontalDrift}px;
        filter: blur(${size > 30 ? 0 : (30 - size) / 20}px);
        z-index: ${Math.floor(size)};
    `;
    
    // Update animation keyframes for horizontal drift
    particle.style.animation = `floatParticle ${duration}s linear ${delay}s`;
    
    container.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        particle.remove();
    }, (duration + delay) * 1000);
}

/* ============================================
   ✨ Entry Animations (Page Load)
   ============================================ */
function initEntryAnimations() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Character fade-in animation
    const character = document.getElementById('character');
    gsap.to(character, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    // Hero content animations with stagger
    const timeline = gsap.timeline({ delay: 0.8 });
    
    timeline
        .to('.title-line', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        })
        .to('.title-main', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.5')
        .to('.title-sub', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .to('.hero-description', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.3')
        .to('.cta-btn', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        }, '-=0.3')
        .to('.scroll-indicator', {
            opacity: 0.8,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.3');
}

/* ============================================
   📜 Scroll Animations
   Character runs faster, background moves faster on scroll
   ============================================ */
function initScrollAnimations() {
    const character = document.getElementById('character');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Create scroll-based animation for character bobbing speed
    let currentSpeed = 1.2;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollY / maxScroll;
        
        // Increase bobbing speed based on scroll (1.2s to 0.5s)
        const newSpeed = Math.max(0.5, 1.2 - (scrollPercent * 0.7));
        
        if (Math.abs(newSpeed - currentSpeed) > 0.1) {
            currentSpeed = newSpeed;
            character.style.animationDuration = `${currentSpeed}s`;
        }
        
        // Fade out scroll indicator
        if (scrollY > 50) {
            gsap.to(scrollIndicator, { opacity: 0, duration: 0.3 });
        } else {
            gsap.to(scrollIndicator, { opacity: 0.8, duration: 0.3 });
        }
    });
    
    // ScrollTrigger for content section
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.content-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });
    
    gsap.from('.section-title', {
        scrollTrigger: {
            trigger: '.content-section',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
}

/* ============================================
   🔘 Button Effects
   ============================================ */
function initButtonEffects() {
    const exploreBtn = document.getElementById('explore-btn');
    
    // Add sparkle effect on click
    exploreBtn.addEventListener('click', (e) => {
        // Create sparkle burst
        createSparkles(e.clientX, e.clientY);
        
        // Scroll to content
        document.getElementById('content').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Add sparkle effect on secondary button click
    const secondaryBtns = document.querySelectorAll('.cta-btn.secondary');
    secondaryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            createSparkles(e.clientX, e.clientY);
        });
    });
}

function createSparkles(x, y) {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    const count = 8;
    
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('span');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 20px;
            pointer-events: none;
            z-index: 10001;
        `;
        document.body.appendChild(sparkle);
        
        // Animate sparkle
        const angle = (i / count) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        
        gsap.to(sparkle, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => sparkle.remove()
        });
    }
}

/* ============================================
   🌸 Utility: Debounce function
   ============================================ */
function debounce(func, wait) {
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

/* ============================================
   📱 Handle window resize
   ============================================ */
window.addEventListener('resize', debounce(() => {
    // Recalculate particle positions if needed
    // Currently particles handle their own positions
}, 250));

/* ============================================
   🎨 Console Easter Egg
   ============================================ */
console.log(`
🌸✨ Welcome to the Enchanted Garden! ✨🌸
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Built with 💕 using:
  - GSAP (GreenSock) for smooth animations
  - CSS Parallax for 2.5D depth effect
  - Vanilla JavaScript
  
  Move your mouse to explore!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme') || 'dark';

// Set initial theme
body.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add animation to toggle
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 200);
});

// Navigation Toggle for Mobile
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
    
    // Add animation to menu items
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        item.classList.toggle('fade-in');
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Set active nav link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    const scrollTopBtn = document.getElementById('scroll-top');
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

// Scroll to top functionality
document.getElementById('scroll-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate skill bars when scrolled into view
const skillBars = document.querySelectorAll('.skill-bar');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (barPosition < screenPosition) {
            const skillLevel = bar.getAttribute('data-skill');
            bar.style.setProperty('--skill-level', `${skillLevel / 100}`);
            bar.classList.add('animated');
        }
    });
};

// Animate project cards when scrolled into view
const projectCards = document.querySelectorAll('.project-card');

const animateProjectCards = () => {
    projectCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            // Stagger the animation for each card
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 200);
        }
    });
};

// Create particle background
const createParticles = () => {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size, position, and animation
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        particlesContainer.appendChild(particle);
    }
};

// Contact form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    
    // Add animation to submit button
    const submitBtn = contactForm.querySelector('button');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // In a real application, you would send this data to a server
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you at ${email} as soon as possible.`);
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Add success animation
        submitBtn.style.backgroundColor = 'var(--success)';
        setTimeout(() => {
            submitBtn.style.backgroundColor = '';
        }, 1000);
    }, 1500);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Hover effect enhancement for cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        setTimeout(() => {
            card.style.zIndex = '1';
        }, 300);
    });
});

// Initialize on load
window.addEventListener('load', () => {
    // Create particle background
    createParticles();
    
    // Animate elements
    animateSkillBars();
    animateProjectCards();
    
    // Add initial animation to hero section
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    heroText.style.animation = 'fadeInUp 1s ease-out 0.3s both';
    heroImage.style.animation = 'fadeInUp 1s ease-out 0.6s both';
});

// Animate elements on scroll
window.addEventListener('scroll', () => {
    animateSkillBars();
    animateProjectCards();
});
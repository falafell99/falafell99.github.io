// ================================
// HAMBURGER MENU
// ================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.style.display = 'none';
            if (hamburger) hamburger.classList.remove('active');
        }
    });
});

// ================================
// SMOOTH SCROLL FOR NAVIGATION
// ================================

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

// ================================
// NAVBAR BACKGROUND ON SCROLL
// ================================

const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.borderBottomColor = 'rgba(45, 59, 92, 0.5)';
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        } else {
            navbar.style.borderBottomColor = 'rgb(45, 59, 92)';
            navbar.style.background = 'rgba(10, 14, 39, 0.8)';
        }
    });
}

// ================================
// CONTACT FORM HANDLING
// ================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!data.name || !data.email || !data.subject || !data.message) {
            showMessage('Please fill in all fields', 'error', formMessage);
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address', 'error', formMessage);
            return;
        }
        
        // Simulate form submission (in real app, send to backend)
        try {
            // Here you would normally send the data to your backend
            // For now, we'll just simulate success
            console.log('Form data:', data);
            
            showMessage('Message sent successfully! I\'ll get back to you soon.', 'success', formMessage);
            contactForm.reset();
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } catch (error) {
            showMessage('Error sending message. Please try again.', 'error', formMessage);
        }
    });
}

function showMessage(message, type, element) {
    if (!element) return;
    
    element.textContent = message;
    element.className = `form-message ${type}`;
    element.style.display = 'block';
}

// ================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all elements with animation class
document.querySelectorAll('.project-item, .achievement-card, .project-preview-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ================================
// SCROLL PROGRESS INDICATOR
// ================================

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    // You can use this to update a progress bar if needed
    // document.getElementById('progress-bar').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ================================
// LAZY LOADING FOR IMAGES
// ================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ================================
// MOBILE MENU DROPDOWN
// ================================

if (window.innerWidth <= 768) {
    // Make nav menu mobile-friendly
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.style.display = 'none';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.background = 'var(--bg-secondary)';
        navMenu.style.borderBottom = '1px solid var(--border-color)';
        navMenu.style.padding = 'var(--spacing-lg)';
        navMenu.style.zIndex = '999';
    }
}

// ================================
// KEYBOARD NAVIGATION
// ================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.style.display = 'none';
            const hamburger = document.querySelector('.hamburger');
            if (hamburger) hamburger.classList.remove('active');
        }
    }
});

// ================================
// ACTIVE SECTION HIGHLIGHTING
// ================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ================================
// CONSOLE MESSAGE
// ================================

console.log(
    '%cHello! 👋',
    'color: #6366f1; font-size: 24px; font-weight: bold;'
);
console.log(
    '%cWelcome to Rafael\'s Portfolio',
    'color: #a8b5d4; font-size: 16px;'
);
console.log(
    '%cLooking at the code? Get in touch!',
    'color: #ec4899; font-size: 14px;'
);
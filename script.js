// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
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

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.querySelectorAll('.about-content, .project-card, .contact-form').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// EmailJS Configuration
// Initialize EmailJS with your Public Key
// Get your Public Key from: https://dashboard.emailjs.com/admin/account
emailjs.init('Y73xQeP5-PQUu9-AZ'); // Your EmailJS Public Key

// Contact Form Handling with EmailJS
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Disable button and show loading state
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    submitButton.style.opacity = "0.6";

    status.textContent = "";

    // Get form data
    const templateParams = {
        from_name: form.name.value,
        from_email: form.email.value,
        message: form.message.value,
        to_email: 'kirankumarreddy74161@gmail.com'
    };

    try {
        // Send email using EmailJS
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
        const response = await emailjs.send(
            'service_q7hpwte',      // Your Service ID
            'template_lhnzkpe',     // Your Template ID
            templateParams
        );

        if (response.status === 200) {
            status.textContent = "✅ Message sent successfully! I'll get back to you soon.";
            status.style.color = "#4ade80";
            status.style.fontWeight = "500";
            form.reset();
        }
    } catch (error) {
        console.error('EmailJS Error:', error);
        status.textContent = "❌ Failed to send message. Please try again or contact me directly.";
        status.style.color = "#ef4444";
        status.style.fontWeight = "500";
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        submitButton.style.opacity = "1";
    }
});

// Typing effect for hero text (optional enhancement)
const heroSubtitle = document.querySelector('.hero-subtitle');
const titles = ['Video Editor', 'Motion Graphic Designer'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        heroSubtitle.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroSubtitle.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect after a delay
setTimeout(typeEffect, 1000);

// Add active state to navigation links on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Video Modal Functions
function openVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoFrame');

    // Google Drive embed URL with autoplay
    const driveId = '1w_E7Pt28PREvCV7E7Kv39eanCUkH_A4i';
    iframe.src = `https://drive.google.com/file/d/${driveId}/preview?autoplay=1`;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoFrame');

    modal.style.display = 'none';
    iframe.src = '';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the content
window.addEventListener('click', (e) => {
    const modal = document.getElementById('videoModal');
    if (e.target === modal) {
        closeVideoModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeVideoModal();
    }
});

// Console welcome message
console.log('Portfolio loaded successfully!');
console.log('Feel free to customize this template.');

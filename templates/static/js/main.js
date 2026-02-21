// ============================================
// AFA Website - Main JavaScript
// ============================================

// DOM Ready Function
document.addEventListener('DOMContentLoaded', function () {
    // Initialize components
    initNavbarToggle();
    initSmoothScroll();
    initAnimations();
});

// ========== NAVBAR TOGGLE FOR MOBILE ==========
function initNavbarToggle() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function () {
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('active');

            // Change icon
            const icon = navbarToggle.querySelector('i');
            if (navbarMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link (mobile)
        const navLinks = navbarMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 992) {
                    navbarMenu.classList.remove('active');
                    navbarToggle.classList.remove('active');
                    const icon = navbarToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== ANIMATIONS ==========
function initAnimations() {
    // Add animation class to elements when they enter viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements with animation class
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}

// ========== FORM VALIDATION ==========
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }

        // Email validation
        if (input.type === 'email' && input.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });

    return isValid;
}

// ========== DATA LOADING FUNCTIONS ==========
// These functions will be used to load announcements, events, and newsletters
async function loadAnnouncements() {
    // This would typically fetch from an API or JSON file
    // For static site, we'll use embedded data
    return [
        {
            id: 1,
            title: "Annual General Meeting 2026",
            date: "2026-03-15",
            description: "Notice for all AFA members regarding the upcoming Annual General Meeting scheduled for June 2026 in Nairobi, Kenya.",
            link: "#"
        },
        {
            id: 2,
            title: "New Partnership Initiative",
            date: "2026-02-28",
            description: "AFA announces a new partnership with Catholic Relief Services for educational programs in West Africa.",
            link: "#"
        }
    ];
}

async function loadEvents() {
    return [
        {
            id: 1,
            title: "Youth Leadership Conference",
            date: "2026-04-10",
            endDate: "2026-04-12",
            location: "Accra, Ghana",
            description: "A gathering of young Augustinian leaders from across Africa to discuss faith in action.",
            type: "upcoming"
        },
        {
            id: 2,
            title: "Spiritual Retreat",
            date: "2026-05-05",
            endDate: "2026-05-08",
            location: "Limuru, Kenya",
            description: "A retreat focusing on Augustinian spirituality for religious and lay members.",
            type: "upcoming"
        }
    ];
}

async function loadNewsletters() {
    return [
        {
            id: 1,
            title: "AFA Quarterly Newsletter",
            date: "2026-01-15",
            description: "Q1 2026 - Read about our latest initiatives, community stories, and spiritual reflections from across Africa.",
            file: "afa-newsletter-q1-2026.pdf"
        }
    ];
}

// ========== UTILITY FUNCTIONS ==========
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function truncateText(text, maxLength = 150) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// ========== EXPORT FOR MODULE USE ==========
// Note: This is for future modularization if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        loadAnnouncements,
        loadEvents,
        loadNewsletters,
        formatDate,
        truncateText
    };
}
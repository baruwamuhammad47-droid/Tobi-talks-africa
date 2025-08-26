// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Initialize form handlers
    initializeRegistrationForm();
    initializeContactForm();
    initializePaymentMethodToggle();
});

// Registration Form Validation and Handling
function initializeRegistrationForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateRegistrationForm()) {
            submitRegistrationForm();
        }
    });

    // Real-time validation for better UX
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateRegistrationForm() {
    let isValid = true;
    const form = document.getElementById('registerForm');
    
    // Clear previous errors
    clearErrors();

    // Validate first name
    const firstName = document.getElementById('firstName');
    if (!firstName.value.trim()) {
        showError('firstNameError', 'First name is required');
        isValid = false;
    } else if (firstName.value.trim().length < 2) {
        showError('firstNameError', 'First name must be at least 2 characters');
        isValid = false;
    }

    // Validate last name
    const lastName = document.getElementById('lastName');
    if (!lastName.value.trim()) {
        showError('lastNameError', 'Last name is required');
        isValid = false;
    } else if (lastName.value.trim().length < 2) {
        showError('lastNameError', 'Last name must be at least 2 characters');
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError('emailError', 'Email address is required');
        isValid = false;
    } else if (!emailPattern.test(email.value)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate phone
    const phone = document.getElementById('phone');
    if (!phone.value.trim()) {
        showError('phoneError', 'Phone number is required');
        isValid = false;
    } else if (phone.value.trim().length < 10) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate country
    const country = document.getElementById('country');
    if (!country.value) {
        showError('countryError', 'Please select your country');
        isValid = false;
    }

    // Payment is bank transfer only - no validation needed

    // Validate terms agreement
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        showError('termsError', 'You must agree to the Terms of Service and Privacy Policy');
        isValid = false;
    }

    return isValid;
}


function validateField(field) {
    const errorElement = document.getElementById(fieldName + 'Error');
    
    if (!errorElement) return;

    // Clear previous error
    errorElement.textContent = '';
    field.classList.remove('error');

    // Validate based on field type
    switch (fieldName) {
        case 'firstName':
        case 'lastName':
            if (!field.value.trim() || field.value.trim().length < 2) {
                showError(fieldName + 'Error', `${fieldName === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`);
            }
            break;
        case 'email':
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (field.value.trim() && !emailPattern.test(field.value)) {
                showError(fieldName + 'Error', 'Please enter a valid email address');
            }
            break;
        case 'phone':
            if (field.value.trim() && field.value.trim().length < 10) {
                showError(fieldName + 'Error', 'Please enter a valid phone number');
            }
            break;
    }
}

function submitRegistrationForm() {
    const form = document.getElementById('registerForm');
    const submitButton = form.querySelector('.submit-button');
    
    // Show loading state
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');

     // Store user info before submission
    const formData = new FormData(form);
    localStorage.setItem('registrationSuccess', 'true');
    localStorage.setItem('userEmail', formData.get('email'));
    localStorage.setItem('userName', `${formData.get('firstName')} ${formData.get('lastName')}`);
    // Submit form to Formspree (no timeout needed - real submission)
    form.submit();

}

// Contact Form Validation and Handling
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateContactForm()) {
            submitContactForm();
        }
    });
}

function validateContactForm() {
    let isValid = true;
    
    // Clear previous errors
    clearErrors();

    // Validate name
    const name = document.getElementById('contactName');
    if (!name.value.trim()) {
        showError('contactNameError', 'Full name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError('contactNameError', 'Name must be at least 2 characters');
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('contactEmail');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError('contactEmailError', 'Email address is required');
        isValid = false;
    } else if (!emailPattern.test(email.value)) {
        showError('contactEmailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate subject
    const subject = document.getElementById('contactSubject');
    if (!subject.value) {
        showError('contactSubjectError', 'Please select a subject');
        isValid = false;
    }

    // Validate message
    const message = document.getElementById('contactMessage');
    if (!message.value.trim()) {
        showError('contactMessageError', 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError('contactMessageError', 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

function submitContactForm() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('.submit-button');
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');

     // Submit form to Formspree (no timeout needed - real submission)
    form.submit();
}

// Payment Method Toggle - Not needed for bank transfer only
function initializePaymentMethodToggle() {
    // Bank transfer details are always visible
    return;
}

// Utility Functions
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Add error styling to the input
        const inputElement = errorElement.previousElementSibling;
        if (inputElement && (inputElement.tagName === 'INPUT' || inputElement.tagName === 'SELECT')) {
            inputElement.classList.add('error');
            inputElement.style.borderColor = '#e74c3c';
        }
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });

    // Remove error styling from inputs
    const inputs = document.querySelectorAll('input.error, select.error');
    inputs.forEach(input => {
        input.classList.remove('error');
        input.style.borderColor = '';
    });
}

// Card formatting code removed - not needed for bank transfer only

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

// Form auto-save functionality (optional)
function initializeAutoSave() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            // Load saved data
            const savedValue = localStorage.getItem(`form_${form.id}_${input.name}`);
            if (savedValue && input.type !== 'password') {
                if (input.type === 'checkbox') {
                    input.checked = savedValue === 'true';
                } else {
                    input.value = savedValue;
                }
            }

            // Save data on change
            input.addEventListener('change', function() {
                if (input.type === 'password') return; // Don't save passwords
                
                const value = input.type === 'checkbox' ? input.checked : input.value;
                localStorage.setItem(`form_${form.id}_${input.name}`, value);
            });
        });

        // Clear auto-save data on successful submission
        form.addEventListener('submit', function() {
            inputs.forEach(input => {
                localStorage.removeItem(`form_${form.id}_${input.name}`);
            });
        });
    });
}

// Initialize auto-save if desired
// initializeAutoSave();

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    // Enable keyboard navigation for hamburger menu
    if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target;
        if (target.classList.contains('hamburger')) {
            e.preventDefault();
            target.click();
        }
    }

    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Error handling for external resources
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
        // Optionally replace with placeholder image
        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="200" y="150" text-anchor="middle" fill="%23666" font-family="Arial, sans-serif">Image not available</text></svg>';
    }
});

// Analytics tracking (placeholder for actual implementation)
function trackEvent(eventName, eventData) {
    console.log('Analytics Event:', eventName, eventData);
    // Implement actual analytics tracking here (Google Analytics, etc.)
}

// Track form submissions
document.addEventListener('submit', function(e) {
    const formId = e.target.id;
    trackEvent('form_submission', { form_id: formId });
});

// Track CTA button clicks
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('cta_click', { 
            button_text: this.textContent.trim(),
            page: window.location.pathname 
        });
    });
});
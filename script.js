/**
 * NOVUS Solutions - Premium JavaScript v3.2
 * FIXES: Phone number validation (10 digits max, no +91)
 * Advanced animations, form handling, and interactive features
 * Font: Segoe UI | Buttons: 14px | Headings: 32px | Body: 16px
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwyIFnQkN9X_U1iuj6XEs8GZVV3bpDTa6KHpGQeCbMinhG6lPkwtCQiHr5zm4Oe1zllCA/exec';

// ============================================================================
// PAGE INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c NOVUS Solutions v3.2 Premium ', 'background: linear-gradient(135deg, #6cccbd, #32526a); color: #fff; padding: 10px 20px; font-size: 16px; font-weight: bold;');
    
    initializeAnimations();
    initializeNavigation();
    initializeCounters();
    initializeIntersectionObserver();
    initializeFormModal();
    
    console.log('All systems initialized successfully');
});

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

function initializeAnimations() {
    // Add scroll-based header shadow
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.scrollY;
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ============================================================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================================================

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.animate-fade-up').forEach(el => {
        observer.observe(el);
    });
}

// ============================================================================
// ANIMATED COUNTERS
// ============================================================================

function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ============================================================================
// NAVIGATION
// ============================================================================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    closeMobileMenu();
                    
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', highlightActiveSection);
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================================================
// MOBILE MENU
// ============================================================================

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================================================
// CONTACT MODAL
// ============================================================================

function initializeFormModal() {
    // Generate form HTML dynamically
    const formHTML = generateFormHTML();
    const formContainer = document.querySelector('#contactModal .contact-form');
    
    if (formContainer) {
        formContainer.innerHTML = formHTML;
        
        // Attach event listeners
        attachFormEventListeners();
    }
}

function generateFormHTML() {
    return `
        <!-- Personal Information -->
        <div class="form-section">
            <h3 class="form-section-title">Personal Information</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="fullName">Full Name *</label>
                    <input type="text" id="fullName" name="fullName" required placeholder="Enter your full name">
                </div>
                <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" name="email" required placeholder="your@email.com">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="phone">Phone Number (10 digits) *</label>
                    <input type="tel" id="phone" name="phone" required placeholder="9876543210" maxlength="10" pattern="[0-9]{10}">
                </div>
                <div class="form-group">
                    <label for="preferredContact">Preferred Contact Method</label>
                    <select id="preferredContact" name="preferredContact">
                        <option value="Email">Email</option>
                        <option value="Phone">Phone</option>
                        <option value="WhatsApp">WhatsApp</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Company Information -->
        <div class="form-section">
            <h3 class="form-section-title">Company Information</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="projectFor">This Project is For *</label>
                    <select id="projectFor" name="projectFor" required>
                        <option value="">Select...</option>
                        <option value="Personal">Personal</option>
                        <option value="Company">Company</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="companyName">Company Name</label>
                    <input type="text" id="companyName" name="companyName" placeholder="Your company name">
                </div>
            </div>
            <div class="form-row" id="companyFields" style="display: none;">
                <div class="form-group">
                    <label for="companySize">Company Size</label>
                    <select id="companySize" name="companySize">
                        <option value="">Select...</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="500+">500+ employees</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="designation">Your Designation</label>
                    <input type="text" id="designation" name="designation" placeholder="e.g., CEO, Manager, Owner">
                </div>
            </div>
        </div>

        <!-- Project Details -->
        <div class="form-section">
            <h3 class="form-section-title">Project Details</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="projectType">Project Type *</label>
                    <select id="projectType" name="projectType" required>
                        <option value="">Select...</option>
                        <option value="Website Development">Website Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="E-commerce Platform">E-commerce Platform</option>
                        <option value="Business Software/ERP">Business Software/ERP</option>
                        <option value="CRM System">CRM System</option>
                        <option value="Inventory Management">Inventory Management</option>
                        <option value="Custom Software">Custom Software</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="budget">Budget Range *</label>
                    <select id="budget" name="budget" required>
                        <option value="">Select...</option>
                        <option value="Under ₹25,000">Under ₹25,000</option>
                        <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                        <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                        <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                        <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 - ₹5,00,000</option>
                        <option value="Above ₹5,00,000">Above ₹5,00,000</option>
                        <option value="Not Sure Yet">Not Sure Yet</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="projectDescription">Project Description *</label>
                <textarea id="projectDescription" name="projectDescription" required rows="4" placeholder="Describe your project, goals, and key features you need..."></textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="timeline">When Do You Need This? *</label>
                    <select id="timeline" name="timeline" required>
                        <option value="">Select...</option>
                        <option value="Urgent (Within 2 weeks)">Urgent (Within 2 weeks)</option>
                        <option value="Within 1 month">Within 1 month</option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="Flexible timeline">Flexible timeline</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="referralSource">How Did You Find Us?</label>
                    <select id="referralSource" name="referralSource">
                        <option value="">Select...</option>
                        <option value="Google Search">Google Search</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Referral">Referral</option>
                        <option value="Previous Client">Previous Client</option>
                        <option value="Advertisement">Advertisement</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Technical Requirements -->
        <div class="form-section">
            <h3 class="form-section-title">Technical Requirements</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="domainPurchased">Do You Have a Domain? *</label>
                    <select id="domainPurchased" name="domainPurchased" required>
                        <option value="">Select...</option>
                        <option value="Yes">Yes, I have a domain</option>
                        <option value="No">No, I need help with this</option>
                    </select>
                </div>
                <div class="form-group" id="domainNameField" style="display: none;">
                    <label for="domainName">Domain Name</label>
                    <input type="text" id="domainName" name="domainName" placeholder="www.yourwebsite.com">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="hostingRequired">Do You Need Hosting?</label>
                    <select id="hostingRequired" name="hostingRequired">
                        <option value="">Select...</option>
                        <option value="Yes">Yes, please include hosting</option>
                        <option value="No">No, I have hosting</option>
                        <option value="Not Sure">Not sure, need guidance</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="technicalRequirements">Technical Requirements</label>
                    <input type="text" id="technicalRequirements" name="technicalRequirements" placeholder="e.g., Mobile responsive, Payment gateway, etc.">
                </div>
            </div>
            <div class="form-group">
                <label for="designPreferences">Design Preferences</label>
                <textarea id="designPreferences" name="designPreferences" rows="2" placeholder="Describe your design preferences, color schemes, examples of websites you like..."></textarea>
            </div>
            <div class="form-group">
                <label for="additionalNotes">Additional Notes</label>
                <textarea id="additionalNotes" name="additionalNotes" rows="3" placeholder="Any other information you'd like to share..."></textarea>
            </div>
        </div>

        <!-- Submit Button -->
        <div class="form-actions">
            <button type="submit" class="btn btn-primary btn-large btn-glow" id="submitBtn">
                <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span id="btnText">Submit Inquiry</span>
                <span id="btnLoader" style="display: none;">Submitting...</span>
            </button>
            <p class="form-note">We'll respond within 24 hours with a detailed proposal</p>
        </div>
    `;
}

function attachFormEventListeners() {
    const form = document.querySelector('#contactModal .contact-form');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Dynamic field toggles
        const projectForSelect = document.getElementById('projectFor');
        if (projectForSelect) {
            projectForSelect.addEventListener('change', toggleCompanyFields);
        }
        
        const domainPurchasedSelect = document.getElementById('domainPurchased');
        if (domainPurchasedSelect) {
            domainPurchasedSelect.addEventListener('change', toggleDomainField);
        }
        
        // Phone number validation - only allow numbers, max 10 digits
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                // Remove any non-digit characters
                this.value = this.value.replace(/\D/g, '');
                
                // Limit to 10 digits
                if (this.value.length > 10) {
                    this.value = this.value.slice(0, 10);
                }
            });
            
            phoneInput.addEventListener('keypress', function(e) {
                // Only allow numbers
                if (e.key < '0' || e.key > '9') {
                    e.preventDefault();
                }
            });
        }
    }
}

function toggleCompanyFields() {
    const projectFor = document.getElementById('projectFor').value;
    const companyFields = document.getElementById('companyFields');
    const companyNameInput = document.getElementById('companyName');
    
    if (projectFor === 'Company') {
        companyFields.style.display = 'grid';
        companyNameInput.setAttribute('required', 'required');
    } else {
        companyFields.style.display = 'none';
        companyNameInput.removeAttribute('required');
    }
}

function toggleDomainField() {
    const domainPurchased = document.getElementById('domainPurchased').value;
    const domainNameField = document.getElementById('domainNameField');
    const domainNameInput = document.getElementById('domainName');
    
    if (domainPurchased === 'Yes') {
        domainNameField.style.display = 'block';
        domainNameInput.setAttribute('required', 'required');
    } else {
        domainNameField.style.display = 'none';
        domainNameInput.removeAttribute('required');
        domainNameInput.value = '';
    }
}

function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================================================
// FORM SUBMISSION
// ============================================================================

async function handleFormSubmit(e) {
    e.preventDefault();
    
    console.log('Form submission started');
    
    const formData = getFormData();
    
    if (!validateForm(formData)) {
        return;
    }
    
    setLoadingState(true);
    
    try {
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        console.log('Form submitted successfully');
        
        // Close contact modal
        closeContactModal();
        
        // Show success modal
        showSuccessModal();
        
        // Reset form
        document.querySelector('#contactModal .contact-form').reset();
        document.getElementById('companyFields').style.display = 'none';
        document.getElementById('domainNameField').style.display = 'none';
        
    } catch (error) {
        console.error('Form submission error:', error);
        alert('Failed to submit form. Please try again or contact us directly at alsoftware@gmail.com');
    } finally {
        setLoadingState(false);
    }
}

function getFormData() {
    return {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        preferredContact: document.getElementById('preferredContact').value,
        projectFor: document.getElementById('projectFor').value,
        companyName: document.getElementById('companyName').value.trim(),
        companySize: document.getElementById('companySize').value,
        designation: document.getElementById('designation').value.trim(),
        projectType: document.getElementById('projectType').value,
        budget: document.getElementById('budget').value,
        projectDescription: document.getElementById('projectDescription').value.trim(),
        timeline: document.getElementById('timeline').value,
        referralSource: document.getElementById('referralSource').value,
        domainPurchased: document.getElementById('domainPurchased').value,
        domainName: document.getElementById('domainName').value.trim(),
        hostingRequired: document.getElementById('hostingRequired').value,
        technicalRequirements: document.getElementById('technicalRequirements').value.trim(),
        designPreferences: document.getElementById('designPreferences').value.trim(),
        additionalNotes: document.getElementById('additionalNotes').value.trim()
    };
}

function validateForm(data) {
    // Required fields
    if (!data.fullName || !data.email || !data.phone || !data.projectFor || 
        !data.projectType || !data.budget || !data.projectDescription || 
        !data.timeline || !data.domainPurchased) {
        alert('Please fill in all required fields.');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Phone validation - exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(data.phone)) {
        alert('Please enter a valid 10-digit phone number (without +91).');
        return false;
    }
    
    // Domain name required if purchased
    if (data.domainPurchased === 'Yes' && !data.domainName) {
        alert('Please enter your domain name.');
        return false;
    }
    
    return true;
}

function setLoadingState(isLoading) {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    
    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
    } else {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
    }
}

// ============================================================================
// SUCCESS MODAL
// ============================================================================

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            closeSuccessModal();
        }, 5000);
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// ============================================================================
// GLOBAL FUNCTIONS
// ============================================================================

window.toggleMobileMenu = toggleMobileMenu;
window.openContactModal = openContactModal;
window.closeContactModal = closeContactModal;
window.closeSuccessModal = closeSuccessModal;

// ============================================================================
// CONSOLE BRANDING
// ============================================================================

console.log('%c Transform Your Ideas Into Digital Reality ', 'color: #6cccbd; font-size: 14px; font-weight: bold;');
console.log('%c Email: alsoftware@gmail.com | Phone: +91 8879706046 ', 'color: #666; font-size: 12px;');
console.log('%c Segoe UI Font | Premium Animations | v3.2 FIXED ', 'color: #32526a; font-size: 11px;');
console.log('%c ✅ Services overlap fixed | ✅ Process alignment fixed | ✅ Phone validation (10 digits) | ✅ Logo background fixed ', 'color: #6cccbd; font-size: 11px;');

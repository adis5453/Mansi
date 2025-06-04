window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 1000);
});

// Custom cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('py-4', 'md:py-3', 'bg-cream/98', 'shadow-xl');
        navbar.classList.remove('py-6');
    } else {
        navbar.classList.remove('py-4', 'md:py-3', 'bg-cream/98', 'shadow-xl');
        navbar.classList.add('py-6');
    }
});

// Mobile navigation
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const mobileNav = document.getElementById('mobileNav');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.remove('-right-full');
    mobileNav.classList.add('right-0');
    document.body.style.overflow = 'hidden';
});

closeMobileMenu.addEventListener('click', () => {
    mobileNav.classList.remove('right-0');
    mobileNav.classList.add('-right-full');
    document.body.style.overflow = '';
});

// Close mobile nav when clicking links
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('right-0');
        mobileNav.classList.add('-right-full');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Animate on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
});

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Set initial active state
document.querySelector('.filter-btn.active').classList.add('bg-teal', 'text-white');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => {
            b.classList.remove('bg-teal', 'text-white', 'active');
            b.classList.add('bg-transparent', 'text-teal');
        });
        
        // Add active class to clicked button
        this.classList.add('bg-teal', 'text-white', 'active');
        this.classList.remove('bg-transparent', 'text-teal');
        
        const filter = this.getAttribute('data-filter');
        
        // Handle "All Work" case
        if (filter === 'all') {
            portfolioItems.forEach(item => {
                item.style.display = 'block';
            });
        } else {
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    });
});

// FORM SUBMISSION - Robust handling with fallback
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add loading state to submit button
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner animate-spin mr-2"></i>Sending...';
    submitBtn.disabled = true;
    
    // Create form data
    const formData = new FormData(this);
    
    // Create fallback data string for traditional form submission
    const params = new URLSearchParams(formData).toString();
    
    // Attempt to submit via Fetch API first
    let fetchSuccess = false;
    
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => {
        if (response.ok) {
            fetchSuccess = true;
            showSuccessMessage();
            this.reset();
            return;
        } 
        throw new Error('Network response was not ok.');
    })
    .catch(error => {
        console.log('Fetch error:', error.message);
        
        // If fetch fails, try traditional form submission as fallback
        if (!fetchSuccess) {
            console.log('Attempting traditional form submission');
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = this.action;
            form.style.display = 'none';
            
            // Create input elements for each form value
            for (const [key, value] of formData.entries()) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                form.appendChild(input);
            }
            
            // Add special headers to bypass ad blockers
            const headers = document.createElement('input');
            headers.type = 'hidden';
            headers.name = '_headers';
            headers.value = JSON.stringify({
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json'
            });
            form.appendChild(headers);
            
            document.body.appendChild(form);
            form.submit();
            
            // Show success message optimistically
            setTimeout(() => {
                showSuccessMessage();
                this.reset();
                document.body.removeChild(form);
            }, 1500);
        }
    })
    .finally(() => {
        if (!fetchSuccess) return;
        
        // Reset button state only for fetch success
        submitBtn.innerHTML = originalHTML;
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
    
    function showSuccessMessage() {
        document.getElementById('contactFormContainer').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
    }
});

// Back to form button
document.getElementById('backToForm').addEventListener('click', function() {
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('contactFormContainer').style.display = 'block';
    
    // Reset button state
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = 'Send Message';
    submitBtn.disabled = false;
});

// Interactive portfolio hover effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.querySelector('.portfolio-bg').style.opacity = '0.95';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.querySelector('.portfolio-bg').style.opacity = '0.9';
    });
});

// Service card interactive effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
        this.querySelector('.service-icon').style.transform = 'rotateY(360deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.querySelector('.service-icon').style.transform = 'rotateY(0deg)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroCircle = document.querySelector('.hero-circle');
    if (heroCircle) {
        heroCircle.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Detect ad blockers and show warning if form submission fails
function checkForAdBlocker() {
    return new Promise((resolve) => {
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox';
        testAd.style.position = 'absolute';
        testAd.style.left = '-999px';
        testAd.style.height = '1px';
        document.body.appendChild(testAd);
        
        window.setTimeout(() => {
            if (testAd.offsetHeight === 0) {
                resolve(true);
            } else {
                resolve(false);
            }
            document.body.removeChild(testAd);
        }, 100);
    });
}

// Initialize ad blocker check
window.addEventListener('load', async () => {
    const hasAdBlocker = await checkForAdBlocker();
    if (hasAdBlocker) {
        console.log('Ad blocker detected');
        // Add a class to body to potentially show warnings
        document.body.classList.add('ad-blocker-detected');
    }
});
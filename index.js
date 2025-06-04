 // Loading animation
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

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state to submit button
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Create form data
            const formData = new FormData(this);
            
            // Simulate form submission (since FormSubmit requires actual HTTP request)
            setTimeout(() => {
                // Show success message
                document.getElementById('contactFormContainer').style.display = 'none';
                document.getElementById('successMessage').style.display = 'block';
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Reset form
                this.reset();
            }, 1500);
        });

        // Back to form button
        document.getElementById('backToForm').addEventListener('click', function() {
            document.getElementById('successMessage').style.display = 'none';
            document.getElementById('contactFormContainer').style.display = 'block';
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
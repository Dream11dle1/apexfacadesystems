document.addEventListener('DOMContentLoaded', function() {

    // ========== PHONE & EMAIL OBFUSCATION ==========
    function renderContactInfo() {
        var p1 = '(855) 557';
        var p2 = '-7574';
        var phone = p1 + p2;
        var phoneRaw = '8555577574';

        var e1 = 'bid';
        var e2 = '@';
        var e3 = 'apexfacadesystems';
        var e4 = '.tech';
        var email = e1 + e2 + e3 + e4;

        document.querySelectorAll('[data-phone]').forEach(function(el) {
            if (el.tagName === 'A') {
                el.href = 'tel:+1' + phoneRaw;
                var icon = el.querySelector('i');
                if (icon) {
                    el.innerHTML = '';
                    el.appendChild(icon);
                    el.appendChild(document.createTextNode(' ' + phone));
                } else {
                    el.textContent = phone;
                }
            } else {
                el.textContent = phone;
            }
        });

        document.querySelectorAll('[data-email]').forEach(function(el) {
            if (el.tagName === 'A') {
                el.href = 'mai' + 'lto:' + email;
                var icon = el.querySelector('i');
                if (icon) {
                    el.innerHTML = '';
                    el.appendChild(icon);
                    el.appendChild(document.createTextNode(' ' + email));
                } else {
                    el.textContent = email;
                }
            } else {
                el.textContent = email;
            }
        });
    }
    renderContactInfo();

    // ========== HERO SLIDER ==========
    var sliderSection = document.querySelector('.hero-slider');
    if (sliderSection) {
        var slides = sliderSection.querySelectorAll('.slider-slide');
        var dots = sliderSection.querySelectorAll('.slider-dot');
        var prevBtn = sliderSection.querySelector('.slider-prev');
        var nextBtn = sliderSection.querySelector('.slider-next');
        var currentSlide = 0;
        var slideCount = slides.length;
        var autoplayInterval;

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (index + slideCount) % slideCount;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function startAutoplay() {
            autoplayInterval = setInterval(function() {
                goToSlide(currentSlide + 1);
            }, 5000);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        prevBtn.addEventListener('click', function() {
            goToSlide(currentSlide - 1);
            resetAutoplay();
        });

        nextBtn.addEventListener('click', function() {
            goToSlide(currentSlide + 1);
            resetAutoplay();
        });

        dots.forEach(function(dot) {
            dot.addEventListener('click', function() {
                goToSlide(parseInt(this.getAttribute('data-slide')));
                resetAutoplay();
            });
        });

        startAutoplay();
    }

    // ========== MOBILE NAVIGATION ==========
    var navToggle = document.querySelector('.nav-toggle');
    var navMenu = document.querySelector('.nav-menu');
    var mobileOverlay = document.querySelector('.mobile-overlay');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Mobile dropdown toggles
    var dropdownParents = document.querySelectorAll('.nav-menu > li');
    dropdownParents.forEach(function(item) {
        var link = item.querySelector('a');
        var dropdown = item.querySelector('.dropdown');
        if (dropdown && window.innerWidth <= 768) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('dropdown-open');
                }
            });
        }
    });

    // ========== SCROLL ANIMATIONS ==========
    var animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right, .service-area-section, .products-section');

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function(el) {
        observer.observe(el);
    });

    // Stagger animations for grid children
    var staggerContainers = document.querySelectorAll('[data-stagger]');
    staggerContainers.forEach(function(container) {
        var children = container.children;
        Array.from(children).forEach(function(child, index) {
            child.style.transitionDelay = (index * 0.1) + 's';
        });
    });

    // ========== PORTFOLIO FILTERS ==========
    var filterBtns = document.querySelectorAll('.filter-btn');
    var portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(function(item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(function() { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(function() { item.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // ========== PROJECT MODALS ==========
    var projectTriggers = document.querySelectorAll('[data-project]');
    var projectModals = document.querySelectorAll('.project-modal');

    projectTriggers.forEach(function(trigger) {
        trigger.addEventListener('click', function() {
            var projectId = trigger.getAttribute('data-project');
            var modal = document.getElementById('project-' + projectId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    document.querySelectorAll('.modal-close, .modal-backdrop').forEach(function(el) {
        el.addEventListener('click', function() {
            document.querySelectorAll('.project-modal').forEach(function(m) {
                m.classList.remove('active');
            });
            document.body.style.overflow = '';
        });
    });

    // ========== FORM HANDLING ==========
    var forms = document.querySelectorAll('form[data-form]');
    forms.forEach(function(form) {
        var timestampField = form.querySelector('[name="form_timestamp"]');
        if (timestampField) {
            timestampField.value = Date.now();
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Honeypot check
            var honeypot = form.querySelector('.ohnohoney input');
            if (honeypot && honeypot.value !== '') {
                return;
            }

            // Timestamp check (submitted too quickly = bot)
            if (timestampField) {
                var elapsed = Date.now() - parseInt(timestampField.value);
                if (elapsed < 3000) {
                    return;
                }
            }

            // Show success
            var formContent = form.querySelector('.form-content');
            var formSuccess = form.querySelector('.form-success');

            if (formContent && formSuccess) {
                formContent.style.display = 'none';
                formSuccess.classList.add('active');
            }

            // Trigger Facebook Pixel Lead event if available
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead');
            }

            // Trigger Google Ads conversion if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-XXXXXXXX/YYYYYYYY'
                });
            }
        });
    });

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== LAZY LOADING IMAGES ==========
    if ('IntersectionObserver' in window) {
        var imgObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imgObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(function(img) {
            imgObserver.observe(img);
        });
    }

});

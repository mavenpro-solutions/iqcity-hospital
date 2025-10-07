// Use only one $(document).ready() to wrap all your jQuery code.
$(document).ready(function() {

    // =================================================================
    // SECTION 1: HEADER & NAVIGATION (FINAL POLISHED VERSION)
    // =================================================================

    // --- Cache jQuery objects for performance ---
    const header = $('#main-header');
    const primaryNav = $('#primary-navigation');
    const navPlaceholder = $('#nav-menu-placeholder');
    const expandedContainer = $('#expanded-nav-container');
    const shrunkContainer = $('#shrunk-nav-container');
    const scrollThreshold = 1;
    let isShrunk = false;
    const desktopBreakpoint = 1280;

    // --- Debounce function for performance on resize ---
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // --- Main function to handle the header state on scroll ---
    function handleHeaderScroll() {
        if ($(window).width() < desktopBreakpoint) {
            if (header.hasClass('header-shrunk')) {
                header.removeClass('header-shrunk');
            }
            return;
        }

        if ($(window).scrollTop() > scrollThreshold) {
            header.addClass('header-shrunk');
        } else {
            header.removeClass('header-shrunk');
        }
    }


    handleHeaderScroll();
    $(window).on('scroll', handleHeaderScroll);
    $(window).on('resize', handleHeaderScroll);

    // --- Mobile Menu (Hamburger) Functionality ---
    $('#mobile-menu-button').on('click', function() {
        $('#mobile-menu').slideToggle(300); 
    });

    // --- Mobile Menu Accordion ---
    $('#mobile-menu').on('click', '.mobile-submenu-toggle', function(e) {
        e.preventDefault(); 
        const submenu = $(this).closest('.mobile-menu-item-has-children').find('> .mobile-submenu').first();
        $(this).find('svg').toggleClass('rotate-180');
        submenu.slideToggle(300);
    });
    // =================================================================
    // SECTION 2: SLIDERS & CAROUSELS
    // =================================================================

    // --- Generic Horizontal Scroll Slider ---
    function setupGenericSlider(sliderId, prevClass, nextClass) {
        const sliderWrapper = $('#' + sliderId).parent();
        const card = $('#' + sliderId).children().first();
        if (!card.length) return;
        const scrollAmount = card.outerWidth(true);
        // Use a more specific selector to avoid conflicts
        $('.' + prevClass).on('click', () => sliderWrapper.animate({ scrollLeft: `-=${scrollAmount}` }, 400));
        $('.' + nextClass).on('click', () => sliderWrapper.animate({ scrollLeft: `+=${scrollAmount}` }, 400));
    }
    
    // Initialize all your simple sliders
    setupGenericSlider('departments-slider', 'departments-prev', 'departments-next');
    setupGenericSlider('doctors-slider', 'doctors-prev', 'doctors-next');
    setupGenericSlider('home-services-slider', 'home-services-prev', 'home-services-next');
    setupGenericSlider('testimonials-slider', 'testimonials-prev', 'testimonials-next');
    setupGenericSlider('partners-slider', 'partners-prev', 'partners-next');

    
    // --- Expert Opinions Slider with Pagination ---
    const opinionsTrack = $('#opinions-slider-track');
    if (opinionsTrack.length) { // Check if the slider exists on the page
        const opinionSlides = $('.opinion-slide');
        const slideCount = opinionSlides.length;
        let currentIndex = 0;

        const paginationContainer = $('.opinion-pagination-dots');

        function goToSlide(index) {
            opinionsTrack.css('transform', `translateX(-${index * 100}%)`);
            currentIndex = index;
            updatePagination();
        }

        function updatePagination() {
            paginationContainer.empty();
            for (let i = 0; i < slideCount; i++) {
                const dot = $('<span class="w-2.5 h-2.5 rounded-full cursor-pointer transition-colors"></span>');
                dot.addClass(i === currentIndex ? 'bg-brand-teal' : 'bg-gray-300 hover:bg-gray-400');
                dot.on('click', () => goToSlide(i));
                paginationContainer.append(dot);
            }
        }

        $('.opinion-next-btn').on('click', () => goToSlide((currentIndex + 1) % slideCount));
        $('.opinion-prev-btn').on('click', () => goToSlide((currentIndex - 1 + slideCount) % slideCount));

        if(slideCount > 0) {
            updatePagination(); // Initial render
        }
    }


    // =================================================================
    // SECTION 3: OTHER UI COMPONENTS
    // =================================================================

    // --- Accordion Logic (for Expert Opinions) ---
    $('.opinion-slide').on('click', '.accordion-button', function() {
        const content = $(this).next('.accordion-content');
        const minusIcon = $(this).find('.icon-minus');
        const plusIcon = $(this).find('.icon-plus');

        $(this).closest('.opinion-slide').find('.accordion-content').not(content).slideUp(200);
        $(this).closest('.opinion-slide').find('.icon-minus').not(minusIcon).addClass('hidden');
        $(this).closest('.opinion-slide').find('.icon-plus').not(plusIcon).removeClass('hidden');

        content.slideToggle(200);
        minusIcon.toggleClass('hidden');
        plusIcon.toggleClass('hidden');
    });

    // --- Counter Animation on Scroll ---
    const statsSection = document.getElementById('statistics-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $('.counter-value').each(function() {
                        const $this = $(this);
                        const countTo = $this.attr('data-count');
                        $({ countNum: $this.text() }).animate({ countNum: countTo }, {
                            duration: 2000,
                            easing: 'swing',
                            step: function() { $this.text(Math.ceil(this.countNum)); },
                            complete: function() { $this.text('5K+'); }
                        });
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(statsSection);
    }

     // =================================================================
    // NEW: Page Tab Functionality
    // =================================================================
    $('#tabs .tab-button').on('click', function() {
        const $this = $(this);
        const tabToShow = $this.data('tab'); // Gets 'upcoming' or 'past'

        // 1. Update the buttons' active state
        $('#tabs .tab-button').removeClass('active');
        $this.addClass('active');

        // 2. Hide all content panels
        $('.tab-panel').hide();

        // 3. Show the target panel with a nice fade-in effect
        $('#' + tabToShow + '-panel').fadeIn(300);
    });
    // =================================================================
    // SECTION 4: TAB SYSTEMS
    // =================================================================

    // --- Doctor Profile Tabs ---
    $('#doctor-profile-tabs .tab-button').on('click', function() {
        const $this = $(this);
        // Prevent action if the button is already active
        if ($this.hasClass('active')) {
            return;
        }

        const tabToShow = $this.data('tab'); // Gets 'overview', 'expertise', etc.

        // 1. Update Buttons: Remove 'active' from all buttons, then add it to the clicked one.
        $('#doctor-profile-tabs .tab-button').removeClass('active');
        $this.addClass('active');

        // 2. Update Content: Hide all panels, then fade in the target panel.
        $('#doctor-profile-tabs .tab-panel').hide();
        $('#' + tabToShow + '-panel').fadeIn(200); // A 200ms fade-in effect
    });

    // --- Existing Page Tab Functionality ---
    // Note: I've made your existing function more specific to avoid conflicts.
    $('#tabs .tab-button').on('click', function() {
        // ... your existing code for upcoming/past tabs
    });

    
}); // This is the single, closing tag for $(document).ready()
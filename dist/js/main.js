$(document).ready(function() {

    // =================================================================
    // SECTION 1: YOUR EXISTING WORKING CODE
    // =================================================================

    // --- Mobile Menu (Hamburger) Functionality ---
    $('#mobile-menu-button').on('click', function() {
        $('#mobile-menu').slideToggle(300); 
    });

          // Use event delegation for click events on the toggle buttons
    $('#mobile-menu').on('click', '.mobile-submenu-toggle', function(e) {
        // Stop the button click from doing anything else
        e.preventDefault(); 

        const $this = $(this);
        // Find the submenu that is a direct child of the same list item
        const submenu = $this.closest('.mobile-menu-item-has-children').find('> .mobile-submenu');
        
        // Toggle a class on the SVG icon to handle rotation
        $this.find('svg').toggleClass('rotate-180');
        
        // Animate the opening/closing of the submenu
        submenu.slideToggle(300);
    });

    
    
    // --- Header Shrink on Scroll ---
    $(window).on('scroll', function() {
        const header = $('#main-header');
        if ($(this).scrollTop() > 200) {
            header.addClass('header-shrunk');
            if ($(window).width() > 1024) {
                $('#top-bar').slideUp(200);
                $('#expanded-nav').fadeOut(100, function() {
                    $('#shrunk-nav-content').fadeIn(200);
                });
            }
        } else {
            header.removeClass('header-shrunk');
             if ($(window).width() > 1024) {
                $('#shrunk-nav-content').fadeOut(100, function() {
                    $('#expanded-nav').fadeIn(200);
                    $('#top-bar').slideDown(200);
                });
            }
        }
    });


    // --- Generic Horizontal Scroll Slider (for Departments & Doctors) ---
    function setupGenericSlider(sliderId, prevClass, nextClass) {
        const sliderWrapper = $('#' + sliderId).parent();
        const card = $('#' + sliderId).children().first();
        if (!card.length) return;
        const scrollAmount = card.outerWidth(true);
        $('.' + nextClass).on('click', () => sliderWrapper.animate({ scrollLeft: `+=${scrollAmount}` }, 400));
        $('.' + prevClass).on('click', () => sliderWrapper.animate({ scrollLeft: `-=${scrollAmount}` }, 400));
    }
    setupGenericSlider('departments-slider', 'departments-prev', 'departments-next');
    setupGenericSlider('doctors-slider', 'doctors-prev', 'doctors-next');
    
    // NEW: Initialize the Home Services slider
    setupGenericSlider('home-services-slider', 'home-services-prev', 'home-services-next');
    setupGenericSlider('testimonials-slider', 'testimonials-prev', 'testimonials-next');
    setupGenericSlider('partners-slider', 'partners-prev', 'partners-next');

    // --- Original Accordion Logic (for Expert Opinions) ---
    // This is scoped to only work inside the new section
    $('.opinion-slide').on('click', '.accordion-button', function() {
        const content = $(this).next('.accordion-content');
        const minusIcon = $(this).find('.icon-minus');
        const plusIcon = $(this).find('.icon-plus');

        // Close other panels in the same slide before opening the new one
        $(this).closest('.opinion-slide').find('.accordion-content').not(content).slideUp(200);
        $(this).closest('.opinion-slide').find('.icon-minus').not(minusIcon).addClass('hidden');
        $(this).closest('.opinion-slide').find('.icon-plus').not(plusIcon).removeClass('hidden');

        content.slideToggle(200);
        minusIcon.toggleClass('hidden');
        plusIcon.toggleClass('hidden');
    });


    // =================================================================
    // SECTION 2: NEW SLIDER LOGIC FOR "EXPERT OPINIONS"
    // =================================================================
    
    const opinionsTrack = $('#opinions-slider-track');
    const opinionSlides = $('.opinion-slide');
    const slideCount = opinionSlides.length;
    let currentIndex = 0;

    if (slideCount > 0) {
        const paginationContainer = $('.opinion-pagination-dots');

        // Function to move to a specific slide
        function goToSlide(index) {
            opinionsTrack.css('transform', `translateX(-${index * 100}%)`);
            currentIndex = index;
            updatePagination();
        }

        // Function to create and update pagination dots
        function updatePagination() {
            paginationContainer.empty(); // Clear old dots
            for (let i = 0; i < slideCount; i++) {
                const dot = $('<span class="w-2.5 h-2.5 rounded-full cursor-pointer transition-colors"></span>');
                dot.addClass(i === currentIndex ? 'bg-brand-teal' : 'bg-gray-300 hover:bg-gray-400');
                dot.on('click', () => goToSlide(i));
                paginationContainer.append(dot);
            }
        }

        // Event Listeners for the STATIC Next/Prev buttons
        $('.opinion-next-btn').on('click', function() {
            goToSlide((currentIndex + 1) % slideCount); // Loop to start
        });

        $('.opinion-prev-btn').on('click', function() {
            goToSlide((currentIndex - 1 + slideCount) % slideCount); // Loop to end
        });

        // Initialize the slider
        updatePagination();
    }



        // --- 4. Counter Animation on Scroll ---
    // This function will be triggered by the Intersection Observer.
    function animateCounters(entries, observer) {
        entries.forEach(entry => {
            // Check if the statistics section is now visible on the screen.
            if (entry.isIntersecting) {
                
                // Find every element with the 'counter-value' class.
                $('.counter-value').each(function() {
                    const $this = $(this);
                    const countTo = $this.attr('data-count'); // Get the target number from the data-count attribute.

                    // Use jQuery's animate() method to create the counting effect.
                    $({ countNum: $this.text() }).animate({
                        countNum: countTo
                    },
                    {
                        duration: 2000, // How long the animation should take (in milliseconds).
                        easing: 'swing', // The style of animation (e.g., 'linear' or 'swing').
                        step: function() {
                            // This function runs for each "step" of the animation.
                            // We use Math.ceil to show whole numbers.
                            $this.text(Math.ceil(this.countNum));
                        },
                        complete: function() {
                            // This function runs when the animation is finished.
                            // We set the final text to "5K+" to match the design.
                            $this.text('5K+');
                        }
                    });
                });

                // Important: Stop observing the section once the animation has been triggered.
                // This prevents the animation from running again if the user scrolls up and down.
                observer.unobserve(entry.target);
            }
        });
    }

    // --- Intersection Observer Setup ---
    // This creates the observer that watches for our statistics section.
    const observer = new IntersectionObserver(animateCounters, {
        root: null,      // Observes intersections relative to the viewport.
        threshold: 0.1   // Triggers when 10% of the section is visible.
    });

    // Tell the observer to start watching our section.
    const target = document.getElementById('statistics-section');
    if (target) {
        observer.observe(target);
    }
    
});
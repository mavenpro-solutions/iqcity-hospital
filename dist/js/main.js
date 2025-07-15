$(document).ready(function() {

    // --- 1. Mobile Menu (Hamburger) Functionality ---
    // Toggles the visibility of the mobile menu with a sliding animation when the button is clicked.
    $('#mobile-menu-button').on('click', function() {
        $('#mobile-menu').slideToggle(300); 
    });


    // --- 2. Accordion Functionality for "Expert Opinions" ---
// Handles the click event for each accordion button.
$('.accordion-button').on('click', function() {
    // Find the content panel related to the clicked button.
    const content = $(this).next('.accordion-content');
    
    // Find the icons within the clicked button.
    const minusIcon = $(this).find('.icon-minus');
    const plusIcon = $(this).find('.icon-plus');

    // --- Close other open panels (and reset their icons) ---
    // Find all accordion content panels EXCEPT the one we just clicked.
    $('.accordion-content').not(content).slideUp(200);
    // Find all other buttons and reset their icons to the 'plus' state.
    $('.accordion-button').not(this).find('.icon-minus').addClass('hidden');
    $('.accordion-button').not(this).find('.icon-plus').removeClass('hidden');

    // Toggle the clicked panel and its icons.
    content.slideToggle(200);
    minusIcon.toggleClass('hidden');
    plusIcon.toggleClass('hidden');
});
    
      // --- 2. Header Shrink on Scroll ---
    // This is the core logic for the shrinking header effect.
    $(window).on('scroll', function() {
        // Check how far the user has scrolled from the top.
        const scrollPosition = $(this).scrollTop();
        const header = $('#main-header');
        
        // Define a threshold (e.g., 50px) to trigger the shrink.
        if (scrollPosition > 50) {
            // --- SHRUNK STATE ---
            // Add a class to the header for styling the shrunk state (e.g., add a shadow).
            header.addClass('header-shrunk');
            
            // On desktop, hide the top bar and show the shrunk navigation content.
            if ($(window).width() > 1024) { // 1024px is the 'lg' breakpoint
                $('#top-bar').slideUp(200);
                $('#expanded-nav').fadeOut(100, function() {
                    $('#shrunk-nav-content').fadeIn(200);
                });
            }
        } else {
            // --- EXPANDED (NORMAL) STATE ---
            // Remove the class when the user scrolls back to the top.
            header.removeClass('header-shrunk');
            
            // On desktop, show the top bar and the original navigation.
             if ($(window).width() > 1024) {
                $('#shrunk-nav-content').fadeOut(100, function() {
                    $('#expanded-nav').fadeIn(200);
                    $('#top-bar').slideDown(200);
                });
            }
        }
    });

    // --- 3. Reusable Slider/Carousel Functionality ---
    // This function sets up the click events for a slider's prev/next buttons.
    function setupSlider(sliderId, prevButtonClass, nextButtonClass) {
        const sliderWrapper = $('#' + sliderId).parent(); // The div with overflow-hidden
        const prevBtn = $('.' + prevButtonClass);
        const nextBtn = $('.' + nextButtonClass);
        
        // Find the first card to dynamically calculate scroll width.
        const card = $('#' + sliderId).children().first();
        if (!card.length) return; // Exit if no cards
        
        // Calculate the distance to scroll: the full width of a card plus its margin.
        const scrollAmount = card.outerWidth(true);

        // Click event for the 'next' button.
        nextBtn.on('click', function() {
            // Animate the scrollLeft property of the wrapper for a smooth scroll.
            sliderWrapper.animate({ scrollLeft: '+=' + scrollAmount }, 400);
        });

        // Click event for the 'previous' button.
        prevBtn.on('click', function() {
            sliderWrapper.animate({ scrollLeft: '-=' + scrollAmount }, 400);
        });
    }

    // Initialize the two sliders on the page using our reusable function.
    setupSlider('departments-slider', 'departments-prev', 'departments-next');
    setupSlider('doctors-slider', 'doctors-prev', 'doctors-next');
    
});

// $(document).ready(function() {

//     // --- 1. Mobile Menu (Hamburger) Functionality ---
//     $('#mobile-menu-button').on('click', function() {
//         $('#mobile-menu').slideToggle(300);
//     });

  

//     // --- 3. Accordion Functionality for "Expert Opinions" ---
//     // (Your existing accordion code remains here)
//     $('.accordion-button').on('click', function() {
//         const content = $(this).next('.accordion-content');
//         const minusIcon = $(this).find('.icon-minus');
//         const plusIcon = $(this).find('.icon-plus');

//         content.slideToggle(200);
//         minusIcon.toggle();
//         plusIcon.toggle();
        
//         $('.accordion-content').not(content).slideUp(200);
//         $('.accordion-button').not(this).find('.icon-minus').hide();
//         $('.accordion-button').not(this).find('.icon-plus').show();
//     });
    
//     // --- 4. Reusable Slider/Carousel Functionality ---
//     // (Your existing slider code remains here)
//     function setupSlider(sliderId, prevButtonClass, nextButtonClass) {
//         // ... (your existing slider code)
//     }
//     setupSlider('departments-slider', 'departments-prev', 'departments-next');
//     setupSlider('doctors-slider', 'doctors-prev', 'doctors-next');
// });
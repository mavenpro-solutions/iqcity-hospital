// Use only one $(document).ready() to wrap all your jQuery code.
$(document).ready(function () {
	// menu code
	$(".menu-btn").click(function () {
		$("#main-mobile-menu").toggleClass("open");
	});

	$(".overlay").click(function () {
		$("#main-mobile-menu").toggleClass("open");
	});
	$("#main-mobile-menu .menu-close").click(function () {
		$("#main-mobile-menu").toggleClass("open");
	});
	$("#main-desktop-menu > ul > .dropdown").on("mouseenter", function () {
		$(this).children(".dropdown-menu").stop(true, true).slideDown();
	});
	$("#main-desktop-menu > ul > .dropdown").on("mouseleave", function () {
		$(this).children(".dropdown-menu").stop(true, true).slideUp();
	});

	$("#main-desktop-menu > ul > .dropdown .dropdown").on(
		"mouseenter",
		function () {
			$(this).children(".dropdown-menu").stop(true, true).slideDown();
		}
	);

	$("#main-desktop-menu > ul > .dropdown .dropdown").on(
		"mouseleave",
		function () {
			$(this).children(".dropdown-menu").stop(true, true).slideUp();
		}
	);

	$("#main-mobile-menu .dropdown").on("click", function (e) {
		// Prevent the click event from bubbling up to parent dropdowns
		e.stopPropagation();

		// Toggle the dropdown menu for the clicked element
		var $currentMenu = $(this).children(".dropdown-menu");
		$currentMenu.stop(true, true).slideToggle();

		// Slide up sibling dropdown menus at the same level
		$(this)
			.siblings(".dropdown")
			.children(".dropdown-menu")
			.stop(true, true)
			.slideUp();
	});
	//   end of menu code

	// =================================================================
	// SECTION: HEADER SCROLL BEHAVIOR
	// =================================================================
	const header = $("#main-header");
	const scrollThreshold = 10; // The scroll distance (in pixels) to trigger the change

	function handleHeaderScroll() {
		// Check if the user has scrolled past the threshold
		if ($(window).scrollTop() > scrollThreshold) {
			// If so, add the 'header-scrolled' class
			header.addClass("header-scrolled");
		} else {
			// Otherwise, remove it
			header.removeClass("header-scrolled");
		}
	}

	// Run the function on page load in case the page is reloaded in a scrolled position
	handleHeaderScroll();

	// Run the function every time the user scrolls
	$(window).on("scroll", handleHeaderScroll);

	// =================================================================
	// SECTION: MOBILE MENU (No changes needed)
	// =================================================================

	$("#mobile-menu-button").on("click", function () {
		$("#mobile-menu").slideToggle(300);
	});

	$("#mobile-menu").on("click", ".mobile-submenu-toggle", function (e) {
		e.preventDefault();
		const submenu = $(this)
			.closest(".mobile-menu-item-has-children")
			.find("> .mobile-submenu")
			.first();
		$(this).find("svg").toggleClass("rotate-180");
		submenu.slideToggle(300);
	});
	// =================================================================
	// SECTION 2: SLIDERS & CAROUSELS
	// =================================================================

	// --- Generic Horizontal Scroll Slider ---
	function setupGenericSlider(sliderId, prevClass, nextClass) {
		const sliderWrapper = $("#" + sliderId).parent();
		const card = $("#" + sliderId)
			.children()
			.first();
		if (!card.length) return;
		const scrollAmount = card.outerWidth(true);
		// Use a more specific selector to avoid conflicts
		$("." + prevClass).on("click", () =>
			sliderWrapper.animate({ scrollLeft: `-=${scrollAmount}` }, 400)
		);
		$("." + nextClass).on("click", () =>
			sliderWrapper.animate({ scrollLeft: `+=${scrollAmount}` }, 400)
		);
	}

	// Initialize all your simple sliders
	setupGenericSlider(
		"departments-slider",
		"departments-prev",
		"departments-next"
	);
	setupGenericSlider("doctors-slider", "doctors-prev", "doctors-next");
	setupGenericSlider(
		"home-services-slider",
		"home-services-prev",
		"home-services-next"
	);
	setupGenericSlider(
		"testimonials-slider",
		"testimonials-prev",
		"testimonials-next"
	);
	setupGenericSlider("partners-slider", "partners-prev", "partners-next");

	// --- Expert Opinions Slider with Pagination ---
	const opinionsTrack = $("#opinions-slider-track");
	if (opinionsTrack.length) {
		// Check if the slider exists on the page
		const opinionSlides = $(".opinion-slide");
		const slideCount = opinionSlides.length;
		let currentIndex = 0;

		const paginationContainer = $(".opinion-pagination-dots");

		function goToSlide(index) {
			opinionsTrack.css("transform", `translateX(-${index * 100}%)`);
			currentIndex = index;
			updatePagination();
		}

		function updatePagination() {
			paginationContainer.empty();
			for (let i = 0; i < slideCount; i++) {
				const dot = $(
					'<span class="w-2.5 h-2.5 rounded-full cursor-pointer transition-colors"></span>'
				);
				dot.addClass(
					i === currentIndex ? "bg-brand-teal" : "bg-gray-300 hover:bg-gray-400"
				);
				dot.on("click", () => goToSlide(i));
				paginationContainer.append(dot);
			}
		}

		$(".opinion-next-btn").on("click", () =>
			goToSlide((currentIndex + 1) % slideCount)
		);
		$(".opinion-prev-btn").on("click", () =>
			goToSlide((currentIndex - 1 + slideCount) % slideCount)
		);

		if (slideCount > 0) {
			updatePagination(); // Initial render
		}
	}

	// =================================================================
	// SECTION 3: OTHER UI COMPONENTS
	// =================================================================
	$(".accordion").each(function () {
		$(this).find(".accordion-content").hide(); // Hide all contents initially
		$(this).find(".accordion-button").first().addClass("active");
		$(this).find(".accordion-content").first().show(); // Show the first content by default

		$(this)
			.find(".accordion-button")
			.on("click", function () {
				const content = $(this).next(".accordion-content");
				const isActive = $(this).hasClass("active");
				$(this)
					.closest(".accordion")
					.find(".accordion-button")
					.removeClass("active");
				$(this).closest(".accordion").find(".accordion-content").slideUp(200); // Close all contents
				if (!isActive) {
					$(this).addClass("active");
					content.slideDown(200); // Open the clicked content
				}
			});
	});
	// --- Accordion Logic (for Expert Opinions) ---
	// $(".opinion-slide").on("click", ".accordion-button", function () {
	// 	const content = $(this).next(".accordion-content");
	// 	const minusIcon = $(this).find(".icon-minus");
	// 	const plusIcon = $(this).find(".icon-plus");

	// 	$(this)
	// 		.closest(".opinion-slide")
	// 		.find(".accordion-content")
	// 		.not(content)
	// 		.slideUp(200);
	// 	$(this)
	// 		.closest(".opinion-slide")
	// 		.find(".icon-minus")
	// 		.not(minusIcon)
	// 		.addClass("hidden");
	// 	$(this)
	// 		.closest(".opinion-slide")
	// 		.find(".icon-plus")
	// 		.not(plusIcon)
	// 		.removeClass("hidden");

	// 	content.slideToggle(200);
	// 	minusIcon.toggleClass("hidden");
	// 	plusIcon.toggleClass("hidden");
	// });

	// --- Counter Animation on Scroll ---
	const statsSection = document.getElementById("statistics-section");
	if (statsSection) {
		const observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						$(".counter-value").each(function () {
							const $this = $(this);
							const countTo = $this.attr("data-count");
							$({ countNum: $this.text() }).animate(
								{ countNum: countTo },
								{
									duration: 2000,
									easing: "swing",
									step: function () {
										$this.text(Math.ceil(this.countNum));
									},
									complete: function () {
										$this.text("5K+");
									},
								}
							);
						});
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);
		observer.observe(statsSection);
	}

	const $iqTabs = $("#iq-tabs");
	const $tabButtons = $iqTabs.find(".tab-button");
	const $tabPanels = $iqTabs.find(".tab-panel");

	// Set first tab as active on page load
	$tabButtons.removeClass("active").first().addClass("active");
	$tabPanels.hide().first().show();

	$tabButtons.on("click", function () {
		const $this = $(this);
		if ($this.hasClass("active")) return;

		const tabToShow = $this.data("tab");
		$tabButtons.removeClass("active");
		$this.addClass("active");

		$tabPanels.hide();
		$iqTabs.find("#" + tabToShow + "-panel").fadeIn(200);
	});
}); // This is the single, closing tag for $(document).ready()

;(function($, window, document, undefined) {
	var $win = $(window),
		$doc = $(document),
		$container,
		$sectionFullheight,
		winWidth,
		winHeight,
		headerHeight,
		skroll,
		transitionTime = 500,
		current_page_url; // set on window load

	$doc.on('ready', function() {
		doc_ready();
	});

	History.Adapter.bind(window, 'statechange', function() {
		var state = History.getState();
		if(state.data) {
			crb_load_url(state.data.path);
		}
	});

	$win.on('load', function() {
		current_page_url = window.location.href;

		if ( $('.about-services .slides').length ) {
			$('.about-services .slides').bxSlider({
				auto: true,
				mode: 'fade',
				infiniteLoop: true,
				adaptiveHeight: true,
				hideControlOnEnd: true,
				useCSS: false,
				controls: false
			});
		}

		if ( $('.slider-intro .slides').length ) {
			var sliderWork = $('.slider-intro .slides').bxSlider({
				auto: true,
				useCSS: false,
				controls: false,
				onSliderLoad: function(currentIndex) {
					$('.bx-viewport').find('.slider-intro').children().eq(currentIndex).addClass('active-slide');
				},
				onSlideBefore: function($slideElement){
					$('.bx-viewport').find('.slide').removeClass('active-slide');
					$slideElement.addClass('active-slide');
				}
			});
		}

		if ( $('.slider-testimonial .slides').length ) {
			$('.slider-testimonial .slides').bxSlider({
				auto: true,
				mode: 'fade',
				easing: 'swing',
				useCSS: false,
				infiniteLoop: true,
				hideControlOnEnd: true,
				adaptiveHeight: true,
				controls: false,
				autoHover: true
			});
		}

		if ( $('.management-slider .slides').length ) {
			$('.management-slider .slides').bxSlider({
				mode: 'fade',
				auto: true,
				useCSS: false,
				infiniteLoop: true,
				hideControlOnEnd: true,
				adaptiveHeight: true,
				controls: false,
				autoHover: true,
	            onSliderLoad: function(currentIndex) {
			    	$('.management-slider .bx-viewport').find('.management-slider').children().eq(currentIndex).addClass('active-slide');
			    },
			    onSlideBefore: function($slideElement){
					$('.management-slider').addClass('bar-line');
					$('.management-mobile').addClass('bar-line');
					$('.management-slider .bx-viewport').find('.slide').removeClass('active-slide');
					$slideElement.addClass('active-slide');
			    },
			    onSlideAfter: function($slideElement){
					$('.management-slider').removeClass('bar-line');
					$('.management-mobile').removeClass('bar-line');
			    }
			});
		}

		if ( $('.slider-text .slides').length ) {
			$('.slider-text .slides').bxSlider({
				auto: true,
				mode: 'fade',
				infiniteLoop: true,
				controls: false,
				useCSS: false,
				autoHover: true
			});
		}

		if ( $('.slider-partners .slides').length ) {
			$('.slider-partners.desktop-version .slides').bxSlider({
				auto: true,
				slideWidth: 220,
				moveSlides: 1,
				minSlides: 1,
				maxSlides: 3,
				slideMargin: 60,
				infiniteLoop: true,
				hideControlOnEnd: true,
				useCSS: false,
				pager: false
			});

			$('.slider-partners.mobile-version .slides').bxSlider({
				auto: true,
				infiniteLoop: true,
				pager: false,
				useCSS: false
			});
		}

		if ( $('.filter-by .slides').length ) {
			$('.filter-by .slides').bxSlider({
				auto: true,
				slideWidth: true,
				moveSlides: 1,
				minSlides: 5,
				maxSlides: 10,
				infiniteLoop: false,
				useCSS: false,
				pager: false
			});
		}

		$('.slider-intro, .management-slider, .slider-testimonial, .slider-text').animate({
			'opacity': 1
		}, 300);

		if($win.width() < 1200) {
			$('.potential-image').insertAfter('.potential-dark')
		} else {
			$('.potential-image').insertAfter('.potential-grey')
		}

		$('.footer-nav:last-child').addClass('last');

		if($win.width() < 768) {
			$('.last').insertAfter('.footer-contact');
		}

		if ( $('#skrollr-body').length ) {
			if($win.width() > 1200) {
				skroll = skrollr.init({
					forceHeight: false,
					mobileDeceleration: 0.002
				});
			}
		}
	});

	$win.on('resize', function() {
		fullHeight( $sectionFullheight );

		if($win.width() < 1200) {
			$('.potential-image').insertAfter('.potential-dark')
		} else {
			$('.potential-image').insertAfter('.potential-grey')
		}
	});

	$win.on('load resize', function() {
		$('body:not(.page-template-employers-page) .about-blog .blog-post h2').equalizeHeight();
		$('.employer-about-blog .entry').equalizeHeight();
		$('.candidate-box').equalizeHeight();
		$('.blog-filter .blog-post').equalizeHeight();
		$('.blog-filter .blog-post h2').equalizeHeight();
		$('.home-post .blog-post').equalizeHeight();
		$('.potential-height').equalizeHeight();
		$('.employer-option').equalizeHeight();
		$('.employer-service').equalizeHeight();
		$('.employer-service .entry').equalizeHeight();
		$('.map-height').equalizeHeight();
		$('.section-about .col-1of2').equalizeHeight();
		$('.slider-testimonial .slide-height').equalizeHeight();
		$('.team-member').equalizeHeight();
		$('.home-post .blog-image').equalizeHeight();
		$('.employer-option .blog-image').equalizeHeight();
		crb_equalize_home_boxes();
	});

	$.fn.equalizeHeight = function() {
		var maxHeight = 0, itemHeight;

		this.css('height', '');

		for (var i = 0; i < this.length; i++) {
			itemHeight = $(this[i]).height();
			if (maxHeight < itemHeight) {
				maxHeight = itemHeight;
			}
		}

		return this.height(maxHeight);
	}

	function calendarEvent(){
		var calendar = $('.calendar-body').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			editable: true,
			eventLimit: true,
			events: {
				url: crb_site_data.events_json_url
			},
			eventRender: function(event, element, view) {
				var dataToFind = moment(event.start).format('YYYY-MM-DD');
				$("td[data-date='" + dataToFind + "']").addClass('activeDay');

				var new_description = event.description + "<strong> &raquo;</strong>";
				element.append(new_description);

				var currentMon = new Date(event.start);
				var currentMonth = currentMon.getMonth();

				var currentMonViewStart = new Date(view.start);
				var currentMonthViewStart = currentMon.getMonth();

				var currentMonViewEnd = new Date(view.end);
				var currentMonthViewEnd = currentMonViewEnd.getMonth();

				if((currentMonth == currentMonthViewStart) && (currentMonth  == currentMonthViewEnd)){
					return false;
				}
			}
		});
	}

	function sizes(){
		winWidth     = $win.width();
		winHeight    = $win.height();
		headerHeight = $header.height();
	}

	function fullHeight( $element ){
		var fullheight = winHeight - headerHeight;
		$element.css({ height: fullheight });
	}

	function initialize_maps() {
		var maps = $('.google-map').each(function () {
			var myLatlng = new google.maps.LatLng($(this).data('lat'), $(this).data('lng'));
			var iconBase = crb_site_data.template_dir + '/images/map-pin.png';

			var map_options = {
				center: myLatlng,
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles:  [{
					'featureType': 'landscape',
					'stylers': [
						{
							'hue': '#FFBB00'
						},
						{
							'saturation': 43.400000000000006
						},
						{
							'lightness': 37.599999999999994
						},
						{
							'gamma': 1
						}
					]},
					{
						'featureType': 'road.highway',
						'stylers': [
							{
								'hue': '#FFC200'
							},
							{
								'saturation': -61.8
							},
							{
								'lightness': 45.599999999999994
							},
							{
								'gamma': 1
							}
						]
					},
					{
						'featureType': 'road.arterial',
						'stylers': [
							{
								'hue': '#FF0300'
							},
							{
								'saturation': -100
							},
							{
								'lightness': 51.19999999999999
							},
							{
								'gamma': 1
							}
						]
					},
					{
						'featureType': 'road.local',
						'stylers': [
							{
								'hue': '#FF0300'
							},
							{
								'saturation': -100
							},
							{
								'lightness': 52
							},
							{
								'gamma': 1
							}
						]
					},
					{
						'featureType': 'water',
						'stylers': [
							{
								'hue': '#0078FF'
							},
							{
								'saturation': -13.200000000000003
							},
							{
								'lightness': 2.4000000000000057
							},
							{
								'gamma': 1
							}
						]
					},
					{
					'featureType': 'poi',
					'stylers': [
						{
							'hue': '#00FF6A'
						},
						{
							'saturation': -1.0989010989011234
						},
						{
							'lightness': 11.200000000000017
						},
						{
							'gamma': 1
						}
					]
				}]
			}

			var map = new google.maps.Map(this, map_options);

			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				icon: iconBase
			});
		});
	}

	function crb_load_url(url_to_load) {

		$('body').addClass('page-changing');

		setTimeout(function(){
			$.ajax({
				url: url_to_load,
				success: function( data ){
					var $element = $('.wrapper', data),
						$skrollr = $(data).filter('#skrollr-body');

					$('.wrapper').remove();
					$element.appendTo('.container');

					fullHeight( $('.section-fullheight') );

					$('.map-height').equalizeHeight();
					$('.team-member').equalizeHeight();
					$('.about-blog .blog-post h2').equalizeHeight();

					$('.join-form tr').each(function(){
						var label = $(this);
						var labelText = $(this).find('td:nth-child(1)');
						var labelInput = $(this).find('td:nth-child(2) input');
						var placeholderText = labelText.text().replace('*', '');

						labelInput.attr('placeholder', placeholderText);
					});

					if(window.location.href !== current_page_url) {
						$('.ajax-url').attr('href', current_page_url);
					}

					$('.join-form #register_now_submit').val('register');
					calendarEvent();

					initialize_maps();

					$('html, body').scrollTop(0);
					$('body').removeClass('page-changing');

					if ( $skrollr.length && typeof( skroll ) !== 'undefined' ) {
						setTimeout(function () {
							skroll.setScrollTop(0);
							skroll.refresh();
						}, 1);
					}
				},
				complete : function () {
					doc_ready();
					$(window).trigger('load');
					$(window).trigger('resize');
				}
			});
		}, transitionTime);
	}

	function doc_ready() {
		$('.fullscreener').fullscreener();
		$('.post p:has(img)').addClass('post-image');
		$('.post-image').each(function () {
			$(this).attr('data--0-bottom-top', 'transform: translateY(200px); opacity: 0;');
			$(this).attr('data--000-top-bottom', 'opacity: 1;');
			$(this).attr('data--300-bottom-top', 'transform: translateY(0px); opacity: 1;');
		});
		$('.join-form #register_now_submit').val('register');
		$('body').addClass('open');

		$container = $('.container');
		$sectionFullheight = $('.section-fullheight');

		fullHeight( $sectionFullheight );

		$('.btn-menu').on('click', function (event) {
			$('body').toggleClass('active');
			event.preventDefault();
		});

		$('.mobile-header .btn-close').on('click', function (event) {
			$('body').removeClass('active');
			event.preventDefault();
		});

		$doc.on('click', '.button-page, .candidate-box-slider .slide > h4 > a', function(e){
			var $this = $(this);
			var href  = $this.attr('href');

			History.pushState(
				{
					path : href
				},
				null,
				href
			);

			e.preventDefault();
		});

		$win.on('scroll', function() {
			var scroll = $(window).scrollTop();

			if (scroll >= 1) {
				$('body').addClass('fixed');
			} else {
				$('body').removeClass('fixed');
			}

			if (scroll >= 300) {
				$('body').addClass('open-square');
			}
		});

		google.maps.event.addDomListener(window, 'load', initialize_maps);

		$ajaxLoader = $('.global-ajax-loader');
		var loading = false;

		calendarEvent();

		$('.blog-filter .btn-load-more').on('click', function(e){
			e.preventDefault();

			var $this = $(this);
			var href = $this.attr( 'href' );

			crb_load_posts($this, href, false);
		});

		$doc.on('click', '.button-group a', function(e){
			e.preventDefault();

			var $this = $(this);
			var href = $this.attr( 'href' );

			crb_load_posts($this, href, true);
		});

		$doc.on('change', '.filters-button-group select', function(e){
			e.preventDefault();

			var $this = $(this);
			var href = $this.val();

			crb_load_posts($this, href, true);
		});

		function crb_load_posts($this, url, clear) {
			if ( loading ) {
				return false;
			}
			loading = true;

			$ajaxLoader.fadeIn();

			if($this.is('a') && clear) {
				$('.filter-by .button-group a').removeClass('is-checked');
				$this.addClass('is-checked');
			}
			var $button = $('.post-load .btn-load-more');
			$button.addClass('active');

			var $section = $this.closest('.blog-filter').find('.section-body');
			if(clear) {
				$('.blog-filter .blog-post').fadeOut();
				$button.fadeOut();
			}

			$.ajax({
				url: url,
				success: function( newHTML ) {
					var $newPosts = $('.blog-post', newHTML);
					var $newButton = $('.post-load .btn-load-more', newHTML );

					if ( $newButton.length ) {
						var newURL = $newButton.attr('href');
						$button.attr( 'href', newURL );
						$button.fadeIn();
					} else {
						$button.hide();
					}

					if(clear) {
						$section.html('');
					}
					$section.append($newPosts.fadeIn());
					$('.blog-filter .blog-post').equalizeHeight();
					$('.blog-filter .blog-post h2').equalizeHeight();
				},
				complete: function(data){
					$button.removeClass('active');
					loading = false;
					$ajaxLoader.fadeOut();
					stButtons.locateElements();
				}
			});
		}

		$('.blog-filter .blog-post').equalizeHeight();
		$('.blog-filter .blog-post h2').equalizeHeight();

		$('.join-form tr').each(function(){
			var label = $(this);
			var labelText = $(this).find('td:nth-child(1)');
			var labelInput = $(this).find('td:nth-child(2) input');
			var placeholderText = labelText.text().replace('*', '');

			labelInput.attr('placeholder', placeholderText);
		});

		$('.map-location:gt(3)').addClass('no-mobile');

		$('.section-map .btn-load').on('click', function(e){
			$('.map-location.no-mobile').fadeIn();
			$('.section-map .btn-load').fadeOut();

			google.maps.event.addDomListener(window, 'load', initialize_maps);
			initialize_maps()

			e.preventDefault();
		});

		$('.team-member:gt(4)').addClass('no-mobile');
		$('.team-member:gt(3)').addClass('no-show-mobile');

		$('.about-team .btn-load').on('click', function(e){
			$('.team-member.no-mobile').fadeIn().css('display', 'inline-block');
			$('.team-member.no-show-mobile').fadeIn().css('display', 'inline-block');
			$('.about-team .btn-load').fadeOut();

			e.preventDefault();
		});

		$('.lazy-load-images img').each(function () {
			$(this).attr('data-src', $(this).attr('src'));
			$(this).attr('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
			$(this).addClass('b-lazy');
		});

		if($('.lazy-load-images img').length) {
			$('.posts-section').addClass('blog-content-photo');
		}

		var bLazy = new Blazy({
			breakpoints: [{
				width: 420,
				src: 'data-src-small'
			}]
			,
			success: function(element){
				setTimeout(function(){
					var parent = element.parentNode;
					parent.className = parent.className.replace(/\bloading\b/,'');
				}, 200);
			}
		});

		var form_section_height = 0;
		$doc.on('gform_post_render', function (data, form_id) {
			form_section_height = $('#gform_wrapper_' + form_id).parents('section').height();
		});

		$doc.on('gform_confirmation_loaded', function (data, form_id) {
			var $section = $('#gform_confirmation_wrapper_' + form_id);
			var $parent_section = $section.parents('section');
			$parent_section.addClass('confirmation-loaded');
			if(form_section_height !== 0) {
				$parent_section.height(form_section_height);
			}

			$('.gform_confirmation_message > br').remove();
			if($('body').hasClass('single-crb_event')) {
				$parent_section.addClass('confirmation-loaded');
			}
		});

		crb_init_sharethis();

		$('.share-link').on('click', function (e) {
			e.preventDefault();
		});

		$('.section-form p:empty').remove();
	}

	function crb_init_sharethis() {
		var switchTo5x = true;
		stLight.options({
			publisher : 'd2dab8ae-9dea-4614-807f-4e3e9901bda5',
			doNotHash: false,
			doNotCopy: false,
			hashAddressBar: false
		});
		stButtons.locateElements();
	}

	function crb_equalize_home_boxes() {
		var $single_box = $('.potential-height');
		$('.potential-image .potential-inner').css({
			'min-height' : $single_box.outerHeight(),
			'padding-bottom' : $single_box.css('margin-bottom')
		});
	}

})(jQuery, window, document);
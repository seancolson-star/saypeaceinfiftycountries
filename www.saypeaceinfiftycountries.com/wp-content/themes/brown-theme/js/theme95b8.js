jQuery(document).ready(function($) {

	// One Page NAV
	$('ul#primary').onePageNav({
		currentClass: 'current-menu-item',
		offset: -1*$('#primary-nav').height()
	});

	// AJAX Form
	$('.ajax-form').ajaxForm({
		dataType: 'json',
		beforeSubmit: function(arr, $form, options){
			$('button .text', $form).hide();
			$('button .spinner', $form).show().css('display', 'inline-block');
		},
		success: function(data, statusText, xhr, $form){
			$('button .text', $form).show();
			$('button .spinner', $form).hide();

			$('.form-response', $form).hide().html(data.result).fadeIn();
			$form[0].reset();
		}
	});

	// Swipe Box
	$('.swipebox').swipebox();

	// Transition Animate
	$('.wpb_animate_when_almost_visible').one('inview', function(){
		var delay = 150+(600*$(this).prevAll('.wpb_animate_when_almost_visible').length);
		$(this).delay(delay).queue(function(){
		    $(this).addClass('animate-active').dequeue();
		});
	});

	// 3rd level menu position
	$('.menu > li').mouseover(function(){
		$('.sub-menu .sub-menu', $(this)).each(function(){
			$(this).css('left', $(this).parents('.sub-menu').width()-2);
		});
	});


	$('#primary-nav .bt-menu-trigger').click(function(e){
		e.preventDefault();
		if($(this).hasClass('bt-menu-open')) {
			$(this).removeClass('bt-menu-open');
			$('#primary-nav').removeClass('active');
			$('#primary-nav ul.menu').slideUp('fast');
		} else {
			$(this).addClass('bt-menu-open');
			$('#primary-nav').addClass('active');
			$('#primary-nav ul.menu').slideDown('fast');
		}
	});



	// Sticky
	$('#primary-nav.sticky-on').sticky({topSpacing:0});



	// Carousel
	var defaults = {
			navText: ['<i class="flaticon-arrow395"></i>','<i class="flaticon-move13"></i>'],
			responsiveRefreshRate: 50
		};
	imagesLoaded( $('.carousel'), function( instance ) {
	  	$('.carousel').each(function(){
			var options = $.extend({}, defaults, $(this).data());
			options.responsive = {
				0: {items:$(this).data('s-items')},
				640: {items:$(this).data('m-items')},
				1025: {items:$(this).data('items')}
			}

			if(options.loop && $(this).children().length == 1) {
				options.loop = false;
			}

			$(this).owlCarousel(options);
			if($(this).data('link')) {
				$(this).on('changed.owl.carousel', function(event){
					var index = event.item.index;
					if(options.loop) index = (index - 2) % event.item.count;
					$($(this).data('link')).trigger('to.owl.carousel', [index, null, true]);
				});
			}

			$(this).on('changed.owl.carousel', function(event){
				var index = event.item.index;
				if($(this).data('bg')) {
					if(options.loop) index = (index - 2) % event.item.count;
					$($(this).data('bg')).find('.item.active').removeClass('active');
					$($(this).data('bg')).find('.item').eq(index).addClass('active');
				}
			});
		});

	  	$('.carousel').on('changed.owl.carousel', function(event){
	  		var options = $.extend({}, defaults, $(this).data());
	  		var index = event.item.index;
			if(options.loop) index = (index - 2) % event.item.count;
	  		if($($(this).data('nav-thumb')).length){
	  			$('li', $(this).data('nav-thumb')).removeClass('active');
	  			$($(this).data('nav-thumb')).find('li').eq(index).addClass('active');
	  		}
	  	});

	  	$('.thumb-nav li:first-child').addClass('active');
		$('.thumb-nav li').click(function(){
			$($(this).parents('.thumb-nav').data('nav-thumb')).trigger('to.owl.carousel', [$(this).index(), null, true]);
		});


	});



	// Accordion
	$('.wpb_accordion').each(function(){
		if($(this).data('active-tab')) {
			$('.wpb_accordion_section:eq('+($(this).data('active-tab')-1)+')', $(this)).addClass('active');
		}
	});
	$('.wpb_accordion_header').click(function(){
		if($(this).parents('.wpb_accordion_section').hasClass('active')) {
			if($(this).parents('.wpb_accordion').data('collapsible') == 'no' && $(this).parents('.wpb_accordion').find('.wpb_accordion_section.active').length <= 1)
				return;

			$(this).parents('.wpb_accordion_section').removeClass('active');
			$(this).parents('.wpb_accordion_section').find('.wpb_accordion_content').slideUp(250);
		} else {
			$(this).parents('.wpb_accordion').find('.wpb_accordion_section.active').removeClass('active');

			$(this).parents('.wpb_accordion_section').addClass('active');
			$(this).parents('.wpb_accordion_section').find('.wpb_accordion_content').slideDown(250);
		}
	});
	// Tab
	// Tab
	$('.vc_tta-tabs').each(function(){
		$('.vc_tta-panel', $(this)).first().addClass('vc_active');
		$('.vc_tta-tabs-list li:first-child').addClass('vc_active');
	});
	$('.vc_tta-tabs-list li').click(function(e){
		e.preventDefault();
		if(!$(this).hasClass('vc_active')) {
			var index = $(this).index();
			$(this).addClass('vc_active');
			$(this).siblings('li.vc_active').removeClass('vc_active');
			$('.vc_tta-panel', $(this).parents('.vc_tta-tabs')).removeClass('vc_active');
			$('.vc_tta-panel:eq('+index+')', $(this).parents('.vc_tta-tabs')).addClass('vc_active');
		}
	});
	$('.tab-list a').click(function(e){
		e.preventDefault();
		$(this).parents('.tab-list').find('li').removeClass('active');
		$(this).parents('li').addClass('active');
		$(this).parents('.tab-list').siblings('.pane').removeClass('active');
		$(this).parents('.tab-list').siblings('.pane.'+$(this).data('pane')).addClass('active');
	});
	// Toggle
	$('.wpb_toggle').click(function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).next('.wpb_toggle_content').toggleClass('active');
	});

	// Modal
	$('.ajax-popup-link').magnificPopup({
	  type: 'ajax'
	});

	$(document).on('click', '.mfp-wrap .bt-close', function(){
		$.magnificPopup.close();
	});

	// Animate Line
	$('.enter-flip').css({ transformOrigin: '0 0', perspective: '0', rotateY: '90deg' }).show();
	$('.enter-short-bottom').css({ opacity: 0, y: 10 });


	// Animate Number
	$('.animate-number').html('0');
	var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
	$('.animate-number').one('inview', function() {
		var start = $(this).data('to')-100;
		if(start<0) start = 0;
		$(this).prop('number', start).animateNumber({
			number: $(this).data('to'),
    		numberStep: comma_separator_number_step,
    		easing: 'easeOutQuad'
		}, 1000);
	});

	// Map
	$('.map-wrap').each(function() {
		var pane = $(this).siblings('.marker-pane');
		var markers = $(this).children();
		var defaults = {
			el: this,
			lat: 0,
			lng: 0,
			zoomControl : true,
			panControl : false,
			streetViewControl : false,
			mapTypeControl: false,
			overviewMapControl: false,
			scrollwheel: false,
			zoom: 6,
			zoomControlOptions: {
		        style: google.maps.ZoomControlStyle.SMALL
			}
		};
		var options = $.extend({}, defaults, $(this).data());
		var map = new GMaps(options);

		for (var i = 0; i < markers.length; i++) {
		  var marker_data = $(markers[i]).data();
		  map.addMarker({
		  	lat: marker_data.lat,
		  	lng: marker_data.lng,
		  });
		}
	});


});

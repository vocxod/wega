"use strict";
var winWidth, winHeight, winScroll, counters = false;


/**/
/* msieversion */
/**/
function msieversion()
{
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	if( msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) )
		return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
	else
		return false;
}


/**/
/* google map */
/**/
function init_map()
{
	var coordLat = 59.88101734;
	var coordLng = 30.50082564;	
	var point = new google.maps.LatLng(coordLat,coordLng);
	var center = new google.maps.LatLng(coordLat,coordLng);
	
	var mapOptions = {	
		zoom: 15,
		center: center,
		scrollwheel: false,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
  var image = 'images/gmap_default.png';
  var beachMarker = new google.maps.Marker({
  	map: map,
  	position: point
  });
}


/**/
/* on scroll */
/**/
$(window).scroll(function()
{
	winScroll = $(this).scrollTop();
	if( winScroll > $('#page-header-top').outerHeight() )
	{
		$('#page-header-bottom').addClass('fixed');
	}
	else
	{
		$('#page-header-bottom').removeClass('fixed');		
	}
	
	if( counters )
		return false;
	if( $('#block-counters').length == 0 )
		return false;
	if( winScroll + winHeight > $('#block-counters').offset().top )
	{
		counters = true;
		$('#block-counters .counter').counter();
	}
});


/**/
/* on resize */
/**/
$(window).resize(function()
{
	winWidth = jQuery(window).width();
	winHeight = jQuery(window).height();
});


/**/
/* on document load */
/**/
$(function()
{
	winWidth = jQuery(window).width();
	winHeight = jQuery(window).height();
	
	
	/**/
	/* parallax */
	/**/
	$('.page-content-section-parallaxed').each(function()
	{
		var $bgobj = $(this);
		$(window).scroll(function()
		{
			if( winScroll + winHeight > $bgobj.offset().top )
			{
				var yPos = -((winScroll + winHeight - $bgobj.offset().top) / $bgobj.data('speed'));
				$bgobj.css({backgroundPosition: '50% '+ yPos + 'px'});
			}
		});
	});	
	
	
	/**/
	/* fancybox */
	/**/
	$(".fancybox").fancybox();
	
	
	/**/
	/* main search */
	/**/
	$('#main-search').on('click', 'button', function()
	{
		$('#main-search').toggleClass('active');
		if( $('#main-search').hasClass('active') && !msieversion() )
		{
			$('#main-search input').focus();
		}
	});
	
	
	/**/
	/* main nav */
	/**/
	$('#main-nav').on('click', 'a', function()
	{
		if( winWidth < 768 )
		{
			if( $(this).next('ul').length )
			{
				$(this).next('ul').slideToggle('fast');
				return false;
			}
			if( $(this).next('div').length )
			{
				$(this).next('div').slideToggle('fast');
				return false;
			}
		}
	});
	
	
	/**/
	/* scroll nav */
	/**/
	$('#scroll-nav').on('click', 'a', function()
	{
		var topPos = 0;
		if( winWidth < 768 )
		{
			var topPos = $($(this).attr('href')).offset().top;
		}
		else
		{
			var topPos = $($(this).attr('href')).offset().top - $('#page-header-bottom').height();			
		}
		$('html, body').stop().animate({scrollTop: topPos});
		
		return false;
	});
	$('#scroll-nav a').each(function()
	{
		var $aobj = $(this);
		$(window).scroll(function()
		{
			if( winScroll + 1 > $($aobj.attr('href')).offset().top - 80 )
			{
				$aobj.parent().addClass('active').siblings().removeClass('active');
			}
		});
	});
	
	
	/**/
	/* slider */
	/**/
	$('#slider-revolution').revolution(
	{
		dottedOverlay:"none",
		delay:16000,
		startwidth:1170,
		startheight:500,
		hideThumbs:200,
		
		thumbWidth:100,
		thumbHeight:50,
		thumbAmount:5,
		
		navigationType:"bullet",
		navigationArrows:"solo",
		navigationStyle:"preview1",
		
		touchenabled:"on",
		onHoverStop:"on",
		
		swipe_velocity: 0.7,
		swipe_min_touches: 1,
		swipe_max_touches: 1,
		drag_block_vertical: false,
								
		parallax:"mouse",
		parallaxBgFreeze:"on",
		parallaxLevels:[7,4,3,2,5,4,3,2,1,0],
								
		keyboardNavigation:"off",
		
		navigationHAlign:"center",
		navigationVAlign:"bottom",
		navigationHOffset:0,
		navigationVOffset:20,
		
		soloArrowLeftHalign:"left",
		soloArrowLeftValign:"center",
		soloArrowLeftHOffset:20,
		soloArrowLeftVOffset:0,
		
		soloArrowRightHalign:"right",
		soloArrowRightValign:"center",
		soloArrowRightHOffset:20,
		soloArrowRightVOffset:0,
				
		shadow:0,
		fullWidth:"on",
		fullScreen:"off",
		
		spinner:"spinner4",
		
		stopLoop:"off",
		stopAfterLoops:-1,
		stopAtSlide:-1,
		
		shuffle:"off",
		
		autoHeight:"off",						
		forceFullWidth:"off",
		
		hideThumbsOnMobile:"off",
		hideNavDelayOnMobile:1500,						
		hideBulletsOnMobile:"off",
		hideArrowsOnMobile:"off",
		hideThumbsUnderResolution:0,
		
		hideSliderAtLimit:0,
		hideCaptionAtLimit:0,
		hideAllCaptionAtLilmit:0,
		startWithSlide:0,
		videoJsPath:"rs-plugin/videojs/",
		fullScreenOffsetContainer: ""	
	});
	
	
	/**/
	/* accordion */
	/**/
	$('.accordion .active').next().show();
	$('.accordion').on('click', 'dt', function()
	{
		$(this).toggleClass('active').siblings('dt').removeClass('active');
		$(this).siblings('dd').slideUp('fast');
		$(this).next().stop().slideDown('fast');
	});
	
	
	/**/
	/* countdown */
	/**/
	var today = new Date();
	$('#countdown').countdown({
		until: new Date(today.getFullYear(), today.getMonth() + 4, today.getDate() + 10),
		format: 'ODHMS',
		layout: '<ul><li><div><span>{onn}</span>{ol}</div></li><li><div><span>{dnn}</span>{dl}</div></li><li><div><span>{hnn}</span>{hl}</div></li><li><div><span>{mnn}</span>{ml}</div></li><li><div><span>{snn}</span>{sl}</div></li></ul>'
	});
	
	
	/**/
	/* owl slideshow */
	/**/
	$(".owl-slideshow").owlCarousel({
		navigation: true,
		navigationText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
		pagination: false,
		singleItem: true,
		autoHeight: true
	});
	$(".owl-slideshow-2").owlCarousel({
		singleItem: true,
		autoHeight: true,
		transitionStyle: 'fadeUp'
	});
	
	
	/**/
	/* about 2 */
	/**/
	$('.block-about-2').each(function()
	{
		var $obj = $(this);
		$(window).scroll(function()
		{
			if( winScroll + winHeight > $obj.offset().top )
			{
				$obj.find('.bar').each(function()
				{
					$(this).css('width', $(this).data('value'));
				});
			}
		});
	});
	
	
	/**/
	/* recent works */
	/**/
	$('.block-recent-works').imagesLoaded(function()
	{
		$('.block-recent-works ol li').on('click', function()
		{
			$('.block-recent-works ul').isotope(
			{
				filter: $(this).attr('data-filter')
			});
			$(this).addClass('active').siblings().removeClass('active');
		});
		$('.block-recent-works ul').isotope({
			itemSelector: '.item',
			masonry: {
				columnWidth: '.item-small'
	    }
	  });
	});
	
	/**/
	/* recent works 2 */
	/**/
  $('.block-recent-works-2 .carousel').imagesLoaded(function()
	{
		$('.block-recent-works-2 .carousel').owlCarousel(
		{
			items: 5,
			itemsDesktop: [1199,4],
			itemsDesktopSmall: [980,3],
			itemsTablet: [767,2],
			itemsMobile: [479,1],
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
			pagination: false
		});
	});
	
	/**/
	/* recent works 3 */
	/**/
  $('.block-recent-works-3 .carousel').imagesLoaded(function()
	{
		$('.block-recent-works-3 .carousel').owlCarousel(
		{
			items: 3,
			itemsDesktop: [1199,3],
			itemsDesktopSmall: [980,2],
			itemsTablet: [767,2],
			itemsMobile: [479,1]
		});
	});
	
	/**/
	/* recent works 4 */
	/**/
  $('.block-recent-works-4 .carousel').imagesLoaded(function()
	{
		$('.block-recent-works-4 .carousel').owlCarousel(
		{
			items: 3,
			itemsDesktop: [1199,3],
			itemsDesktopSmall: [980,2],
			itemsTablet: [767,2],
			itemsMobile: [479,1],
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
			pagination: false
		});
	});
	
	/**/
	/* recent works 5 */
	/**/
  $('.block-recent-works-5 .carousel').imagesLoaded(function()
	{
		$('.block-recent-works-5 .carousel').owlCarousel(
		{
			items: 4,
			itemsDesktop: [1199,4],
			itemsDesktopSmall: [980,3],
			itemsTablet: [767,2],
			itemsMobile: [479,1],
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
			pagination: false
		});
	});
	
	/**/
	/* recent works 6 */
	/**/
  $('.block-recent-works-6 .carousel').imagesLoaded(function()
	{
		$('.block-recent-works-6 .carousel').owlCarousel(
		{
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
			pagination: false,
			singleItem: true,
			autoHeight: true
		});
	});
	
	/**/
	/* recent works 7 */
	/**/
  $('.block-recent-works-7 .carousel').imagesLoaded(function()
	{
		$('.block-recent-works-7 .carousel').owlCarousel(
		{
			items: 4,
			itemsDesktop: [1199,4],
			itemsDesktopSmall: [980,3],
			itemsTablet: [767,2],
			itemsMobile: [479,1],
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
			pagination: false
		});
	});
	
	/**/
	/* portfolio */
	/**/
	$('.block-portfolio').imagesLoaded(function()
	{
		$('.block-portfolio ol li').on('click', function()
		{
			$('.block-portfolio ul').isotope(
			{
				filter: $(this).attr('data-filter')
			});
			$(this).addClass('active').siblings().removeClass('active');
		});
		$('.block-portfolio ul').isotope({
			itemSelector: '.item',
			masonry: {
				columnWidth: '.item'
	    }
	  });
	});
	
	/**/
	/* portfolio 2 */
	/**/
	$('.block-portfolio-2').imagesLoaded(function()
	{
		$('.block-portfolio-2 ol li').on('click', function()
		{
			$('.block-portfolio-2 ul').isotope(
			{
				filter: $(this).attr('data-filter')
			});
			$(this).addClass('active').siblings().removeClass('active');
		});
		$('.block-portfolio-2 ul').isotope({
			itemSelector: '.item',
			masonry: {
				columnWidth: '.item'
	    }
	  });
	});
	
	/**/
	/* portfolio 3 */
	/**/
	$('.block-portfolio-3').imagesLoaded(function()
	{
		$('.block-portfolio-3 ol li').on('click', function()
		{
			$('.block-portfolio-3 ul').isotope(
			{
				filter: $(this).attr('data-filter')
			});
			$(this).addClass('active').siblings().removeClass('active');
		});
		$('.block-portfolio-3 ul').isotope({
			itemSelector: '.item',
			masonry: {
				columnWidth: '.item'
	    }
	  });
	});
	
	/**/
	/* portfolio 5 */
	/**/
	$('.block-portfolio-5').imagesLoaded(function()
	{
		$('.block-portfolio-5 ol li').on('click', function()
		{
			$('.block-portfolio-5 ul').isotope(
			{
				filter: $(this).attr('data-filter')
			});
			$(this).addClass('active').siblings().removeClass('active');
		});
		$('.block-portfolio-5 ul').isotope({
			itemSelector: '.item',
			masonry: {
				columnWidth: '.item'
	    }
	  });
	});
	
	/**/
	/* portfolio 6 */
	/**/
	$('.block-portfolio-6').imagesLoaded(function()
	{
		$('.block-portfolio-6 ol li').on('click', function()
		{
			$('.block-portfolio-6 ul').isotope(
			{
				filter: $(this).attr('data-filter')
			});
			$(this).addClass('active').siblings().removeClass('active');
		});
		$('.block-portfolio-6 ul').isotope({
			itemSelector: '.item',
			masonry: {
				columnWidth: '.item'
	    }
	  });
	});
	
	/**/
	/* portfolio 7 */
	/**/
	$('.block-portfolio-7').imagesLoaded(function()
	{
		$('.block-portfolio-7 ol li').on('click', function()
		{
			$('.block-portfolio-7 ul').isotope(
			{
				filter: $(this).attr('data-filter')
			});
			$(this).addClass('active').siblings().removeClass('active');
		});
		$('.block-portfolio-7 ul').isotope({
			itemSelector: '.item',
			masonry: {
				columnWidth: '.item'
	    }
	  });
	});
	
	/**/
	/* portfolio details */
	/**/
  $('.block-portfolio-details .carousel').imagesLoaded(function()
	{
		$('.block-portfolio-details .carousel').owlCarousel(
		{
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
			pagination: false,
			singleItem: true,
			autoHeight: true			
		});
	});
	
	
	/**/
	/* mission */
	/**/
	$('#block-mission .years').on('click', 'a', function()
	{
		$(this).addClass('active').siblings().removeClass('active');
		$($(this).attr('href')).addClass('active').siblings('.year').removeClass('active');
		
		return false;
	});
  
  
  /**/
	/* benefits */
	/**/
  $('.block-benefits-2').on('click', '.tabs a', function()
	{
		$(this).parent().addClass('active').siblings().removeClass('active');
		$($(this).attr('href')).addClass('active').siblings('ul').removeClass('active');
		return false;
	});
	
	
	/**/
	/* clients */
	/**/
	$('.block-clients .carousel').imagesLoaded(function()
	{
		$('.block-clients .carousel').owlCarousel(
		{
			items: 4,
			itemsDesktopSmall: [980,3],
			itemsTablet: [767,2],
			itemsMobile: [479,1],
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
			pagination: false
		});
	});
  
  
  /**/
	/* services */
	/**/
  $('.block-services-7').on('click', '.carousel a', function()
	{
		$('.block-services-7 .carousel a').removeClass('active');
		$(this).addClass('active');
		$($(this).attr('href')).addClass('active').siblings('.info').removeClass('active');
		return false;
	});
	$('.block-services-7 .carousel').owlCarousel(
	{
		navigation: true,
		navigationText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
		pagination: false,
		singleItem: true,
		autoHeight: true
	});
	
	
	/**/
	/* testimonials */
	/**/
	$('.block-testimonials .carousel').imagesLoaded(function()
	{
		$('.block-testimonials .carousel').owlCarousel(
		{
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
			singleItem: true,
			autoHeight: true
		});
	});
	
	/**/
	/* testimonials 2 */
	/**/
	$('.block-testimonials-2 .carousel').imagesLoaded(function()
	{
		$('.block-testimonials-2 .carousel').owlCarousel(
		{
			navigation: true,
			navigationText: ['<i class="fa fa-angle-double-left">', '<i class="fa fa-angle-double-right">'],
			singleItem: true,
			autoHeight: true
		});
	});
	
	/**/
	/* testimonials 3 */
	/**/
	$('.block-testimonials-3 .carousel').imagesLoaded(function()
	{
		$('.block-testimonials-3 .carousel').owlCarousel(
		{
			singleItem: true,
			autoHeight: true
		});
	});
	
	/**/
	/* testimonials 4 */
	/**/
	$('.block-testimonials-4 .carousel').imagesLoaded(function()
	{
		$('.block-testimonials-4 .carousel').owlCarousel(
		{
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
			pagination: false,
			singleItem: true,
			autoHeight: true
		});
	});
	
	
	/**/
	/* team */
	/**/
	$('.block-team .carousel').imagesLoaded(function()
	{
		$('.block-team .carousel').owlCarousel(
		{
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
			pagination: false,
			singleItem: true,
			autoHeight: true
		});
	});
	
	/**/
	/* team 2 */
	/**/
	$('.block-team-2 .carousel').imagesLoaded(function()
	{
		$('.block-team-2 .carousel').owlCarousel(
		{
			singleItem: true,
			autoHeight: true
		});
	});
	
	/**/
	/* team 3 */
	/**/
	$('.block-team-3 .carousel').imagesLoaded(function()
	{
		$('.block-team-3 .carousel').owlCarousel(
		{
			items: 4,
			itemsDesktopSmall: [980,3],
			itemsTablet: [767,2],
			itemsMobile: [479,1],
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
			pagination: false
		});
	});
	
	
	/**/
	/* skills */
	/**/
	$('.block-skills, .block-skills-2').each(function()
	{
		var $obj = $(this);
		$(window).scroll(function()
		{
			if( winScroll + winHeight > $obj.offset().top )
			{
				$obj.find('.bar div').each(function()
				{
					$(this).css('width', $(this).data('value'));
				});
			}
		});
	});
	
	
	/**/
	/* capabilities */
	/**/
	$('.block-capabilities input').knob({
		width: 150,
		height: 150,
		thickness: .07,
		fgColor: '#2d3e50',
		displayInput: false
	});
	
	/**/
	/* capabilities 2 */
	/**/
	$('.block-capabilities-2 input').knob({
		width: 134,
		height: 134,
		thickness: 1,
		fgColor: '#2d3e50',
		bgColor: '#ffffff',
		displayInput: false
	});
		
	
	/**/
	/* catalog grid */
	/**/
	$('.block-catalog-grid .carousel').imagesLoaded(function()
	{
		$('.block-catalog-grid .carousel').owlCarousel(
		{
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
			pagination: false,
			singleItem: true,
			autoHeight: true
		});
	});
	
	/**/
	/* catalog list */
	/**/
	$('.block-catalog-list .carousel').imagesLoaded(function()
	{
		$('.block-catalog-list .carousel').owlCarousel(
		{
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
			pagination: false,
			singleItem: true,
			autoHeight: true
		});
	});
	
	/**/
	/* product info */
	/**/
	$('.block-product-info .carousel').imagesLoaded(function()
	{
		$('.block-product-info .carousel').owlCarousel(
		{
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
			pagination: false,
			singleItem: true,
			autoHeight: true
		});
	});
	
	/**/
	/* product tabs */
	/**/
	$('.block-product-tabs .head').on('click', 'a', function()
	{
		$(this).addClass('active').siblings().removeClass('active');
		$($(this).attr('href')).addClass('active').siblings('.cont').removeClass('active');
		return false;
	});
	
	
	/**/
	/* price filter */
	/**/
	$('#price-filter').slider({
		range: true,
		min: 0,
		max: 999,
		values: [0, 600],
		slide: function(event, ui)
		{
			$('#price-filter-value-1').text(ui.values[0]);
			$('#price-filter-value-2').text(ui.values[1]);
		}
	});
	
	
	/**/
	/* contacts */
	/**/
	$('.block-contacts').on('click', 'ul li', function()
	{
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parent().next().find('li').eq($(this).index()).addClass('active').siblings().removeClass('active');
	});
	
	
	/**/
	/* feedback */
	/**/
	$('#block-feedback').validate({		
		submitHandler: function(form)
		{
			$(form).ajaxSubmit(
			{
				beforeSend: function()
				{
					$(form).find('button[type="submit"]').attr('disabled', true);
				},
				success: function()
				{
					$(form).addClass('submitted');
				}
			});
		}
	});
	
	
	/**/
	/* google map */
	/**/
	if( document.getElementById('google-map') )
	{
		var script = document.createElement('script');
	 	script.type = 'text/javascript';
	 	script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=init_map';
	 	document.body.appendChild(script);
 	}
});


/**/
/* on window load */
/**/
jQuery(window).load(function()
{	
	setTimeout(function()
	{
		$('body').addClass('ready');
	}, 100);
});
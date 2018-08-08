$(document).on('ready', function() {
	var timer;
	
	function initPartnerSlider() {
		// Init Partners Slider
		if( $('.partner-gallery').length ) {
			$('.partner-gallery').each(function() {
				var $sliderParent = $(this);

				$sliderParent.find('.slider-content').carouFredSel({
					width: '100%',
					circular: true,
					infinite: true,
					responsive: true,
					swipe: true,						
					auto: {
						play: true,
						timeoutDuration: 0
					},
					swipe: {
						onTouch: true
					},
					scroll: {
						duration: 20000,
						easing: 'linear'
					},
					items: {
						minimum: 1,
						visible: 6
					}
				})
			});
		}
	}

	if( $('.counter-value').length ) {
		$('.counter-value').counterUp({
			 delay: 10,
             time: 1500
		});
	}

	if ($('body.article').length) {		
		$('.article-wrapper h4').wrap('<div class="article-title-inline"></div class="article-title-inline">')
	}

	$(window).unbind('scroll mousewheel DOMMouseScroll MozMousePixelScroll');	

	$('.gsf-trigger').on('click', function() {
		$('.header-reserve').toggleClass('hide');
	});

	$(document).on('click', function(event) {
		if( !$(event.target) === '.header-reserve' || !$(event.target).closest('.header-reserve').length ) {
			$('.header-reserve').removeClass('hide');
		}
	});

	var navOffset = $('.main-navigation').offset().top;

	$(window).on('load scroll', function() {
		var winO = $(window).scrollTop();

		if( winO > navOffset ) {
			$('header.site-banner').addClass('header-fixed');

			setTimeout(function() {
				$('header.site-banner').addClass('header-show');
			}, 10);
		} else {
			$('header.site-banner').removeClass('header-fixed header-show');
		}

		if( $('.block.quicklinks.quick-d ul li').length ) {
			var linksOffset = $('.block.quicklinks.quick-d').offset().top;

			$('.block.quicklinks.quick-d ul li').each(function(index) {
				$(this).find('.btn-primary i').css({
					'-webkit-transition-delay': index * .2 + 's',
					'-moz-transition-delay': index * .2 + 's',
					'-ms-transition-delay': index * .2 + 's',
					'-o-transition-delay': index * .2 + 's',
					'transition-delay': index * .2 + 's'
				});
			});

			setTimeout(function() {
				if( winO > linksOffset - $(window).height() * .8 ) {
					$('.block.quicklinks.quick-d').find('.btn-primary').addClass('animate');				
				}
			}, 500);
		}
	});

	$(window).on('load', function() {
		if( $('.article .article-navigation .an-item-link').length ) {
			$('.article .article-navigation .an-item-link').each(function() {
				var $item = $(this);
				
				if( $item.find('img').length ) {
					$item.find('img').wrap('<div class="img-wrapper"></div>');
				} else {
					if( $item.parent().hasClass('an-item-previous') ) {
						$('<div class="img-wrapper"></div>').prependTo( $item );						
					} else {
						$('<div class="img-wrapper"></div>').appendTo( $item );
					}
				}
			});
		}

		$('header.site-banner .header-reserve').clone().addClass('cloned').appendTo( $('.main-navigation > .mn-menu-line') );

		if( $('#zone1 .la-slider').length ) {
			var $sliderMain =  $('#zone1 .la-slider').clone();
			$('#zone1 .la-slider').detach();
			$sliderMain.prependTo('.front #zone1 .list-articles');

			var pagingSize = $sliderMain.find('.slider-item').length;
			var $sliderPaging = '<ol class="slider-paging"></ol>';

			$($sliderPaging).appendTo( $('#zone1 .la-slider') );
			$('<div class="slider-paging-hidden"></div>').appendTo( $('#zone1 .la-slider') );

			for( var i = 0; i < pagingSize; i++ ) {
				var index = i + 1;

				if( index < 10 ) {
					index = '0' + index;
				}

				$('<li><a href="#">' + index + '</a></li>').appendTo( $('#zone1 .la-slider ol.slider-paging') );
			}

			setTimeout(function() {
				$('#zone1 .la-slider .slider-content').carouFredSel({
					width: '100%',
					circular: true,
					infinite: true,
					responsive: true,
					swipe: true,						
					auto: {
						play: true,
						timeoutDuration: 7000
					},
					swipe: {
						onTouch: true
					},
					pagination: {
						container: '#zone1 .la-slider .slider-paging-hidden',
						anchorBuilder: true
					},
					onCreate: function( data ) {
						var $slider = $(this);

						$slider.closest('.la-slider').addClass('loaded');

						$slider.find('.la-item-img').wrap('<div class="la-item-image"></div>');
						$slider.find('.la-item-img').each(function() {
							var url = $(this).attr('src');

							$(this).parent().css( 'background-image', 'url(' + url + ')' );
						});					

						$('#zone1 .la-slider').find('.slider-paging li').eq(0).addClass('active');

						$('#zone1 .la-slider .slider-paging a').on('click', function(event) {
							event.preventDefault();

							var index = $(this).parent().index();
							$(this).parent().addClass('active')
								.siblings().removeClass('active');

							$slider.addClass('animate-out');

							setTimeout(function() {
								$slider.trigger('slideTo', index);
							}, 1310);
						});

						timer = setTimeout(function() {
							$slider.addClass('animate-out');
						}, 5700);

						setTimeout(function() {
							$slider.addClass('animate-in');
						}, 200);
					},
					scroll: {
						fx: 'crossfade',
						duration: 750,
						pauseOnHover: false,
						onBefore: function( data ) {
							var $slider = $(this);

							clearTimeout(timer);

							$slider.removeClass('animate-out animate-in');
						},
						onAfter: function( data ) {
							var $slider = $(this);

							$slider.addClass('animate-in');	

							var idx = $('#zone1 .la-slider .slider-paging-hidden .selected').index();

							$('#zone1 .la-slider').find('.slider-paging li').eq(idx).addClass('active')
								.siblings().removeClass('active');

							setTimeout(function() {
								$slider.addClass('animate-out');
							}, 5700);
						}
					}
				});
			}, 1500);	
		}

		if( $('#zone2 .la-slider').length ) {
			var $sliderMain =  $('#zone2 .la-slider');

			var pagingSize = $sliderMain.find('.slider-item').length;
			var $sliderPaging = '<ol class="slider-paging"></ol>';

			$($sliderPaging).appendTo( $('#zone2 .la-slider') );
			$('<div class="slider-paging-hidden"></div>').appendTo( $('#zone2 .la-slider') );

			$('<div class="slider-actions"><a href="#" class="slider-prev"><i class="ico-prev"></i></a><a href="#" class="slider-next"><i class="ico-next"></i></a></div>').appendTo( $('#zone2 .la-slider') );

			for( var i = 0; i < pagingSize; i++ ) {
				var index = i + 1;

				if( index < 10 ) {
					index = '0' + index;
				}

				$('<li><a href="#">' + index + '</a></li>').appendTo( $('#zone2 .la-slider ol.slider-paging') );
			}

			$('#zone2 .la-slider .slider-content').carouFredSel({
				width: '100%',
				circular: true,
				infinite: true,
				responsive: true,
				swipe: true,						
				auto: {
					play: true,
					timeoutDuration: 7000
				},
				swipe: {
					onTouch: true
				},
				pagination: {
					container: '#zone2 .la-slider .slider-paging-hidden',
					anchorBuilder: true
				},
				onCreate: function( data ) {
					var $slider = $(this);
					var colors = ['purple', 'pink', 'green'];	

					$slider.find('.slider-item').each(function(index) {
						var classIndex = Math.floor( index % colors.length );

						$(this).addClass(colors[classIndex]);
					});

					$slider.find('.la-item-img').wrap('<div class="la-item-image"></div>');
					$slider.find('.la-item-img').each(function() {
						var url = $(this).attr('src');

						$(this).parent().css( 'background-image', 'url(' + url + ')' );
					});

					$('#zone2 .la-slider').find('.slider-paging li').eq(0).addClass('active');

					setTimeout(function() {
						$slider.find('.slider-item').eq(0).addClass('animate-in');
					}, 200);

					$('#zone2 .la-slider .slider-paging a').on('click', function(event) {
						event.preventDefault();

						var index = $(this).parent().index();
						$(this).parent().addClass('active')
							.siblings().removeClass('active');

						$slider.find('.slider-item').eq(0).addClass('animate-out');

						setTimeout(function() {
							$slider.trigger('slideTo', index);
						}, 1000);
					});

					$('#zone2 .la-slider .slider-prev').on('click', function(event) {
						event.preventDefault();

						$slider.trigger('prev');
					});

					$('#zone2 .la-slider .slider-next').on('click', function(event) {
						event.preventDefault();

						$slider.trigger('next');
					});
				},
				scroll: {
					fx: 'crossfade',
					duration: 750,
					pauseOnHover: false,
					onBefore: function( data ) {
						var $slider = $(this);

						$slider.find('.slider-item').removeClass('animate-out animate-in');						
					},
					onAfter: function( data ) {
						var $slider = $(this);

						var idx = $('#zone2 .la-slider .slider-paging-hidden .selected').index();
						$slider.find('.slider-item').eq(0).addClass('animate-in');

						$('#zone2 .la-slider').find('.slider-paging li').eq(idx).addClass('active')
							.siblings().removeClass('active');

						setTimeout(function() {
							$( data.items.visible ).addClass('animate-out');
						}, 6000);
					}
				}
			});			
		}

		initPartnerSlider();

		$('.front #zone4 .block.partner .tabs-nav ul li:first a').addClass('is-active');
		$('.front #zone4 .block.partner .tabs-nav ul a').on('click', function() {
			initPartnerSlider();
		});
	});
});

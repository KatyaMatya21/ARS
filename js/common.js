$(document).ready(function(){

    // Massive mess, harsh: global variables:
    window.documentSlider = null;
    window.headerSubNav = null;

    var gpuAcceleration = Modernizr.csstransforms3d ? 'translateZ(0) ' : '';
    var transform = Modernizr.prefixed('transform');
    var wrapper = document.getElementById('wrapper');

    var lazyResize = _.debounce( onViewportResize, 300 );
    $(window).on('resize load', lazyResize);

    $('#mobile-menu-switch').click(function(){

        if( !$('#header-sub-nav').is(':visible') ) {

            $(this).css('background-position-y', '-35px');
            $('header').css('height','100%');
            $('#header-sub-nav').show();

            // Handle header sub nav
            window.headerSubNav = new Sly( $('#header-sub-nav').height() + 95 - ( $(window).height() ), {
                scrollSource: $('#header-sub-nav').get(0),
                scrollBy: 100,
                easing: 'linear',
                dragSource: $('#header-sub-nav').get(0),
                mouseDragging: 0, // Enables dragging by mouse
                touchDragging: 1//, // Enables dragging by touch
            });
            window.headerSubNav.on('load move',function(){
                $('#header-sub-nav').get(0).style[transform] = gpuAcceleration + 'translateY(' + (this.pos.dest*(-1)) + 'px)';
                console.log(this.pos.end);
            });
            window.headerSubNav.init();

            window.documentSlider.off('load move');

            $('#catalog-back').bind('click', function(){
                $('header .hide-menu').removeAttr('style').hide();
            });

        }else{
            $(this).css('background-position-y', '0px');
            $('#header-sub-nav').hide();
            window.headerSubNav.destroy();
            window.documentSlider.on('load move', documentOnSlide );
            $('header').css('height','95px');
        }

    });

    function onViewportResize() {
        var win = $(this);

        // media breakpoint for 480px
        if( win.width() <= 480 ) {

            $('.menu > li > a.menu-catalog').unbind('hover').bind('click',function(e){
                $('.hide-menu').show();
                window.headerSubNav.reload();
                e.preventDefault();
                return false;
            });

        }else{

            $('.menu > li > a.menu-catalog').unbind('click').bind('hover',function(e){
                $('.hide-menu').show();
            }).bind('mouseleave',function(){
                $('.hide-menu').hide();
            });

            $('#header-sub-nav').show();
            $('header').removeAttr('style');
            $('#header-sub-nav').removeAttr('style');

        }
    }

    $('[data-href]').live('click', function () {
        window.location = $(this).data('href');
    });

    $('#upBtn').click(function(e){

        window.documentSlider.slideTo(0);

        e.preventDefault();
        return false;
    });

    function documentOnSlide() {
        var dest = this.pos.dest;
            if( dest > this.pos.end ) {
                dest = this.pos.end;
            }
            wrapper.style[transform] = gpuAcceleration + 'translateY(' + (this.pos.cur*(-1)) + 'px)';

        if( slyParallaxItems ) {
            for (var i = 0; i < slyParallaxItems.length; i++) {
                var itemDest = slyParallaxItems[i].dataset['parallax'];
                itemDest = Math.round(dest / itemDest);
                slyParallaxItems[i].style[transform] = gpuAcceleration + 'translateY(-' + itemDest + 'px)';
            }
        }

    }

    function parallaxMainSly() {

        var scrollMax = $( '#wrapper' ).height() - $(window).height();

        window.documentSlider = new Sly( scrollMax, {
		scrollSource: document,
		scrollBy: 100,
			
		scrollBar: $('#wrapper .scrollbar'),
            	dragSource: document,
            	//mouseDragging: 0, // Enables dragging by mouse
            	//touchDragging: 1, // Enables dragging by touch
			
		speed: 600,
		releaseSwing: 1,  // Enables release swing easing
		easing: 'easeOutExpo' 
        });

        slyParallaxItems = document.getElementById('parallax-bg') || false;
        if( slyParallaxItems ) {
            slyParallaxItems = slyParallaxItems.children;
        }
	
        window.documentSlider.on('load move', documentOnSlide );

        window.documentSlider.init();

    }

    parallaxMainSly();


});

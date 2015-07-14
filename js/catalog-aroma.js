$(document).ready(function(){

    window.mobileMidSlider = null;

    var gpuAcceleration = Modernizr.csstransforms3d ? 'translateZ(0) ' : '';
    var transform = Modernizr.prefixed('transform');

    var lazyResize = _.debounce( onViewportResize, 300 );
    $(window).on('resize load', lazyResize);

    $('.name-filter').bind('click',function(e){
        $(this).toggleClass("bigZ");
        $(this).next().toggle();
    });

    //-----------------------------------------------------------------------------------

     $('.breadcrumbs-menu').bind('click',function(e){
        $(this).toggleClass('menu-open');
    });

    $('.breadcrumbs-menu').bind('mouseleave',function(e){
        $(this).removeClass('menu-open');
    });




    //--------------------------------------------------------------------------------------

    function onViewportResize() {
        var win = $(this);

        // media breakpoint for 480px
        if( win.width() <= 480 ) {


            // Handle mobile-only mid slider
            window.mobileMidSlider = new Sly( $('#mobile-mid-slider'), {
                mouseDragging: 1,
                touchDragging: 1,
                horizontal: 1,
                itemNav: 'forceCentered',
                smart: 1,
                activateOn: 'click',
                speed: 200
            });

            window.mobileMidSlider.init();

        }else{


            if( window.mobileMidSlider != undefined && window.mobileMidSlider != null ) {
                window.mobileMidSlider.destroy();
            }

        }
    }
});
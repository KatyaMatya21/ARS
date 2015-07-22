$(document).ready(function(){

    window.mobileMidSlider = null;

    var gpuAcceleration = Modernizr.csstransforms3d ? 'translateZ(0) ' : '';
    var transform = Modernizr.prefixed('transform');

    var lazyResize = _.debounce( onViewportResize, 300 );
    $(window).on('resize load', lazyResize);

    $('.tab-question').bind('click',function(){

        var targetTab = $(this).data('target'); // tab1
        var tab = $('#'+targetTab); // #tab1

        $('.active-tab-benefit').removeClass('active-tab-benefit');
        tab.addClass('active-tab-benefit');

        $('.active-tab-question').removeClass('active-tab-question');
        $(this).addClass('active-tab-question');

        $('.oil-blocks').masonry({
            itemSelector: '.oil-block',
            columnWidth: 360,
            percentPosition: true,
            isOriginLeft: false
        });

    });

    $('.oil-blocks').masonry({
        itemSelector: '.oil-block',
        columnWidth: 360,
        percentPosition: true,
        isOriginLeft: false
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
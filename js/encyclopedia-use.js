$(document).ready(function(){

    window.mobileMidSlider = null;
    window.winWidth = 0;

    var gpuAcceleration = Modernizr.csstransforms3d ? 'translateZ(0) ' : '';
    var transform = Modernizr.prefixed('transform');

    var lazyResize = _.debounce( onViewportResize, 300 );
    $(window).on('resize load', lazyResize);

    $('.tab-uses li').bind('click',function(){

        var targetTab = $(this).data('target'); // tab1
        var tab = $('#'+targetTab); // #tab1

        if( window.winWidth > 480 ) {
            $('.active-use-list .use-blocks').masonry('destroy');
        }

        $('.active-use-list').removeClass('active-use-list');
        tab.addClass('active-use-list');

        $('.active-tab-uses').removeClass('active-tab-uses');
        $(this).addClass('active-tab-uses');

        if( window.winWidth > 480 ) {
            $('.active-use-list .use-blocks').masonry({
                itemSelector: '.use-block',
                //columnWidth: 360,
                percentPosition: true,
                isOriginLeft: true,
                gutter: 10
            });
        }

    });

    $('.active-use-list .use-blocks').masonry({
        itemSelector: '.use-block',
        //columnWidth: 360,
        percentPosition: true,
        isOriginLeft: true,
        gutter: 10
    });

    //--------------------------------------------------------------------------------------

    function onViewportResize() {
        var win = $(this);

        window.winWidth = win.width();

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
            window.mobileMidSlider.activate( $('.active-breadcrumbs-menu-after') );

            $('.active-use-list .use-blocks').masonry('destroy');

        }else{


            if( window.mobileMidSlider != undefined && window.mobileMidSlider != null ) {
                window.mobileMidSlider.destroy();
            }

            $('.active-use-list .use-blocks').masonry({
                itemSelector: '.use-block',
                //columnWidth: 360,
                percentPosition: true,
                isOriginLeft: true,
                gutter: 10
            });

        }
    }

    $('.look-use').bind('click',function(){

        $(this).parent().find('.use-method').addClass('use-method-active');

        $(this).hide();

        $(this).parent().find('.back-use').show().unbind('click').bind('click',function(){

            $(this).parent().find('.use-method').removeClass('use-method-active');
            $(this).parent().find('.look-use').show();
            $(this).hide();

        });
    });

});
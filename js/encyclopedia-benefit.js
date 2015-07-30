$(document).ready(function(){

    window.mobileMidSlider = null;

    var gpuAcceleration = Modernizr.csstransforms3d ? 'translateZ(0) ' : '';
    var transform = Modernizr.prefixed('transform');

    var lazyResize = _.debounce( onViewportResize, 300 );
    $(window).on('resize load', lazyResize);

    $('.tab-question').bind('click',function(){

        var targetTab = $(this).data('target'); // tab1
        var tab = $('#'+targetTab); // #tab1

        $('.active-tab-benefit .oil-blocks').masonry('destroy');

        $('.active-tab-benefit').removeClass('active-tab-benefit');
        tab.addClass('active-tab-benefit');

        $('.active-tab-question').removeClass('active-tab-question');
        $(this).addClass('active-tab-question');

        $('.active-tab-benefit .oil-blocks').masonry({
            itemSelector: '.oil-block',
            //columnWidth: 360,
            percentPosition: true,
            isOriginLeft: true,
            gutter: 10
        });

        window.updateDocumentHeight();

    });

    var $mans = $('.active-tab-benefit .oil-blocks').masonry({
        itemSelector: '.oil-block',
        //columnWidth: 360,
        percentPosition: true,
        isOriginLeft: true,
        gutter: 10
    });

    //--------------------------------------------------------------------------------------

    function onMobileTabClick(e) {
        // Функция вызывается при клике по табу (только в мобильной версии)

            var targetTab = $(this).data('target'); // tab1
            var tab = $('#'+targetTab); // #tab1

            tab.addClass('benefit-list-active');

            $('.for-beauty > ul').hide();
            $('.block-before-beauty').hide();
            $('.answers-title').hide();

            $('.title-oil-efir-mobile').show();
            window.documentSlider.slideTo(220);
            window.updateDocumentHeight();

            $('.list-back').show().unbind().bind('click',function(e){
                $(this).hide();
                $('.title-oil-efir-mobile').hide();
                tab.removeClass('benefit-list-active');
                $('.for-beauty > ul').show();
                $('.block-before-beauty').show();
                $('.answers-title').show();
                window.updateDocumentHeight();
            });


            window.updateDocumentHeight();

        e.preventDefault();

    }

    function bindTabCallbacks() {
        $('.for-beauty > ul > li').bind('click', onMobileTabClick);
    }

    function unbindTabCallbacks() {
        $('.for-beauty > ul > li').unbind();
    }

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
            window.mobileMidSlider.activate( $('.active-breadcrumbs-menu-after') );

            //$('.active-tab-benefit .oil-blocks').masonry('destroy');
            window.updateDocumentHeight();
            bindTabCallbacks();

        }else{


            if( window.mobileMidSlider != undefined && window.mobileMidSlider != null ) {
                window.mobileMidSlider.destroy();
            }

            $('.active-tab-benefit .oil-blocks').masonry({
                itemSelector: '.oil-block',
                //columnWidth: 360,
                percentPosition: true,
                isOriginLeft: true,
                gutter: 10
            });

            unbindTabCallbacks();

        }
    }

});
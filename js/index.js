$(document).ready(function(){

    // Massive mess, harsh: global variables:
    window.topMainSlider = null;
    window.mobileMidSlider = null;

    var gpuAcceleration = Modernizr.csstransforms3d ? 'translateZ(0) ' : '';
    var transform = Modernizr.prefixed('transform');

    var lazyResize = _.debounce( onViewportResize, 300 );
    $(window).on('resize load', lazyResize);

    function onViewportResize() {
        var win = $(this);

        // media breakpoint for 480px
        if( win.width() <= 480 ) {

            // Handle top slider
            $('.main-slaider .slide3').removeClass('bxslider-slide').hide();
            window.topMainSlider.reloadSlider();

            // Handle mobile-only mid slider
            window.mobileMidSlider = new Sly($('#mobile-mid-slider'), {
                mouseDragging: 1,
                touchDragging: 1,
                horizontal: 1,
                itemNav: 'forceCentered',
                smart: 1,
                activateOn: 'click',
                speed: 300
            });
            window.mobileMidSlider.init();

        }else{

            // Handle top slider
            if (!$('.main-slaider .slide3').hasClass('bxslider-slide')) {
                $('.main-slaider .slide3').addClass('bxslider-slide').show();
                window.topMainSlider.reloadSlider();
            }

            if( window.mobileMidSlider != undefined && window.mobileMidSlider != null ) {
                window.mobileMidSlider.destroy();
            }

        }
    }

    window.topMainSlider = $('.bxslider').bxSlider(
        {
            pager:false,
            slideSelector: 'li.bxslider-slide'
            /*auto:true,
             autoStart:true,
             pause:5000*/
        }
    );

    $('.promo-slider').bxSlider(
        {
            controls:false
        }
    );

    //-------------------------------------------------------------------------------------------------------------------

    //$('.slide-type-product').each( function(i,element){

    //    var text = $(element).text();
    //    var words = text.split(' ');
   //     var firstWord = words.shift();
    //    var resultText = firstWord + '<br/>' + words.join(' ');

   //     $(element).html( resultText );

   // });

    $('.slide-type-product').each( function(i,element){

        var text = $(element).text();
        var tL = text.length;
        var words = text.split(' ');
        var br = '<br/>';
        var index = 1;
        if(tL > 30){index = 3;}else if(tL > 20){index = 2;}
        words.splice(index, 0, br);
        $(element).html(words.join(' '));

    });

    // Sly for top navigation ------------------------------------------------------------------------------------------
    var $frame = $('#slider-type-frame');

    var $options = {
        horizontal: 1,
        itemNav: 'forceCentered',
        smart: 1,
        activateOn: 'click',
        speed: 300,
        activateMiddle: true,
        itemSelector: '.slide-type-product',
        prev: $('#slider-type-prev'),
        next: $('#slider-type-next'),
        touchDragging: true,
        easing: 'swing'
    };

    var sly1 = new Sly(
        $frame,
        $options,
        {
            load: function(){
                var totalItems = this.items.length;
                var mid = Math.floor( totalItems / 2 );
                this.activate( mid );
            },
            active: activatePage
        }
    );

    sly1.init();
    // -----------------------------------------------------------------------------------------------------------------

    // Function for change page callback
    // https://github.com/darsain/sly/blob/master/docs/Events.md
    function activatePage(eventName, itemIndex){

        var selectedItem = this.items[itemIndex];
        var targetTab = $(selectedItem.el).data('target');
        if( !targetTab ) { return; }

        var $tab = $('#'+targetTab);
        var $activeTab = $('.product-type-active');

        if( $activeTab.length ) {

            $activeTab.css('z-index',100)
                .css('position','absolute');

            $tab.css('z-index',99)
                .addClass('product-type-active')
                .css('position','absolute')
                .css('width','100%')
                .css('opacity', 0);

            initSly( $tab.find('.slider-products-content').get(0) );

            /**
             * SOME MAGIC STARTS! \o_O/
             */

            $.when(
                $activeTab.animate({opacity:0},500),
                $tab.animate({opacity:1},500)
            ).then(function(){
                    console.log('both animations done');
                    $tab.removeAttr('style');
                    $activeTab.removeAttr('style');
                    $activeTab.removeClass('product-type-active');
                    if ($activeTab.find('.slider-products-content').data('sly-ref') != undefined) {
                        $activeTab.find('.slider-products-content').data('sly-ref').destroy();
                    }
                });

            /**
             * SOME MAGIC ENDS! \-_-/
             */

        }else{
            $tab.addClass('product-type-active');
            initSly( $tab.find('.slider-products-content').get(0) );
        }

    }
    // -----------------------------------------------------------------------------------------------------------------

    // Function for in-content Sly initialization
    function initSly( target ) {

        target = $(target);

        // Sly for in-slidee navigation (test)
        var $slideeFrame = target;
        var $slideeOptions = {
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateOn: 'click',
            speed: 500,
            touchDragging: true,
            easing: 'swing',
            itemSelector: '.slide-product',
            prevPage: target.closest('.product-type').find('.slider-fader-left').get(0),
            nextPage: target.closest('.product-type').find('.slider-fader-right').get(0)
        };

        var slideeSly = new Sly(
            $slideeFrame,
            $slideeOptions
        );

        slideeSly.init();

        target.data('sly-ref', slideeSly);

    }
    //------------------------------------------------------------------------------------------------------------------

});
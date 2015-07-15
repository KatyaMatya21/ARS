$(document).ready(function(){

        $('.receipt-tab').bind('click',function(){

            var targetTab = $(this).data('target'); // tab1
            var tab = $('#'+targetTab); // #tab1

            $('.active-super-tab').removeClass('active-super-tab');
            tab.addClass('active-super-tab');

            $('.active-receipt-tab').removeClass('active-receipt-tab');
            $(this).addClass('active-receipt-tab');
        });

        $('.receipt-button').bind('click',function(){

            var targetTab = $(this).data('target'); // tab1
            var tab = $('#'+targetTab); // #tab1

            $(this).parent().parent().parent().find('.active-tab-tab').removeClass('active-tab-tab');
            tab.addClass('active-tab-tab');

            $(this).parent().find('.active-receipt-button').removeClass('active-receipt-button');
            $(this).addClass('active-receipt-button');
        });


        // catalog-item-sly
        // Sly for in-slidee navigation (test)
        var $slideeFrame = $('#catalog-item-sly');
        var $slideeOptions = {
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateOn: 'click',
            speed: 500,
            mouseDragging: 1,
            touchDragging: 1,
            easing: 'swing',
            itemSelector: '.slide-product',
            prevPage: $slideeFrame.parent().find('.slider-fader-left').get(0),
            nextPage: $slideeFrame.parent().find('.slider-fader-right').get(0)
        };

        var slideeSly = new Sly(
            $slideeFrame,
            $slideeOptions
        );

        slideeSly.init();

        //-----------------------------------------------------------------------------------------

        var lazyResize = _.debounce( onViewportResize, 300 );
        $(window).on('resize load', lazyResize);

        function onViewportResize() {
            var win = $(this);

            if( win.width() <= 1450 ) {

                var $slideeFrame = $('.active-super-tab .receipt-content-buttons-frame');
                var $slideeOptions = {
                    horizontal: 1,
                    itemNav: 'basic',
                    smart: 1,
                    activateOn: 'click',
                    speed: 500,
                    touchDragging: true,
                    easing: 'swing',
                    itemSelector: 'li.receipt-button',
                    prevPage: $('.active-super-tab .control-btn .slider-fader-left').get(0),
                    nextPage: $('.active-super-tab .control-btn .slider-fader-right').get(0)
                };

                var slideeSly = new Sly(
                    $slideeFrame,
                    $slideeOptions
                );

                slideeSly.init();

            }
        }

});

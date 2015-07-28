$(function(){

    $('.receipt-list > ul > li').click(function(){

        if( !$(this).hasClass('active') ) {

            $('.slider-receipt-item').sly(false);
            $('.receipt-list ul > li').removeClass('active');
            $('.receipt-popup').removeAttr('style');
            $('.closer').remove();

            $(this).addClass('active');
            var $closer = $('<div class="closer"></div>');
            $(this).append( $closer );
            $closer.bind('click',function(e){

                $(this).parent().removeClass('active');
                $(this).parent().find('.receipt-popup').removeAttr('style');
                $(this).parent().find('.receipt-popup').find('.slider-receipt-item').sly(false);

                $(this).remove();

                e.preventDefault();
                return false;

            });

            var itemHeight = $(this).height();

            // Check if we need some offset for columns
            var $popup = $(this).find('.receipt-popup');
            var offset = $popup.offset().left - $($('.list').get(0)).offset().left;
            if (offset > 0) {
                $popup.css('margin-left', '-' + offset + 'px');
            }

            // Check if we need move popup top of item
            var listHeight = $('.list').height();
            var popupHeight = $popup.height();
            var popupTopOffset = $popup.position().top + $(this).position().top;
            if ((popupTopOffset + popupHeight) > listHeight) {
                var newOffset = popupHeight + itemHeight + 15;
                $popup.css('margin-top', '-' + newOffset + 'px');
                $(this).find('.receipt-popup-tube').css('top', '0');
                $(this).find('.receipt-popup-tube').css('height', '5px');
                $(this).find('.receipt-popup-tube').css('margin-top', '0');
            }

            //Init slider
            $popup.find('.slider-receipt-item').sly({
                horizontal: 1,
                itemNav: 'basic',
                smart: 1,
                activateOn: 'click',
                speed: 500,
                mouseDragging: 1,
                touchDragging: 1,
                easing: 'swing',
                itemSelector: 'li.slide-receipt',
                scrollBy: 1,
                prevPage: $popup.find('.slider-fader-left').get(0),
                nextPage: $popup.find('.slider-fader-right').get(0)
            });

        }

        /*var $slideePopup = $('.slider-receipt-item').get(0);
        var $slideeOptions = {
            itemNav: 'basic',
            smart: 1,
            activateOn: 'click',
            speed: 500,
            mouseDragging: 1,
            touchDragging: 1,
            easing: 'swing',
            itemSelector: 'li.slide-receipt',
            scrollBy: 1,
            scrollSource: $slideePopup,
            prevPage: $slideePopup.parent().find('.slider-fader-left').get(0),
            nextPage: $slideePopup.parent().find('.slider-fader-right').get(0)
        };

        window.slyPopup = new Sly(
            $slideePopup,
            $slideeOptions
        );

        window.slyPopup.init();
*/
    });



});
$(function(){

    $('.receipt-list > ul > li').click(function(){
       $(this).addClass('active');

        var $slideePopup = $('.slider-receipt-item').get(0);
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

    });



});
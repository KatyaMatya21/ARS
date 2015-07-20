$(document).ready(function(){

    var $slideeFrame = $('.work-slider');
    var $slideeOptions = {
        horizontal: 1,
        itemNav: 'forceCentered',
        smart: 1,
        activateOn: 'click',
        speed: 500,
        mouseDragging: 1,
        touchDragging: 1,
        easing: 'swing',
        itemSelector: 'li.work-slide',
        prevPage: $slideeFrame.parent().find('.slider-fader-left').get(0),
        nextPage: $slideeFrame.parent().find('.slider-fader-right').get(0)
    };

    var slideeSly = new Sly(
        $slideeFrame,
        $slideeOptions
    );

    slideeSly.init();


});
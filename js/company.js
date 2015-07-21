$(document).ready(function(){

    var $slideeFrame = $('.event-slider');
    var $slideeOptions = {
        horizontal: 1,
        itemNav: 'forceCentered',
        smart: 1,
        activateOn: 'click',
        activatePageOn: 'click',
        speed: 500,
        mouseDragging: 1,
        touchDragging: 1,
        pagesBar: $slideeFrame.parent().find('.pages'),
        easing: 'swing',
        itemSelector: 'li.event-slide',
        prevPage: $slideeFrame.parent().find('.slider-fader-left').get(0),
        nextPage: $slideeFrame.parent().find('.slider-fader-right').get(0)
    };

    window.workSlider = new Sly(
        $slideeFrame,
        $slideeOptions
    );

    window.workSlider.init();


    $('a[data-section]').click(function(e){

        var section = $(this).data('section');
        var CurrentSection = $('#'+section);
        var offset = CurrentSection.offset().top;

        window.documentSlider.slideTo(offset);

        e.preventDefault();
        return false;
    });

});
$(document).ready(function(){

    var $slideeFrame = $('.work-slider');
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
        itemSelector: 'li.work-slide',
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
        var offset = CurrentSection.position().top;

        window.documentSlider.slideTo(offset);

        e.preventDefault();
        return false;
    });

    var lazyResize = _.debounce( onViewportResize, 300 );
    $(window).on('resize load', lazyResize);

    function onViewportResize() {
        var win = $(this);

        if(window.workSlider) {
            window.workSlider.reload();
        }

        if( win.width() <= 1450 ) {
            var $slideeFrame = $('.sert-slider');
            var $slideeOptions = {
                horizontal: 1,
                itemNav: 'forceCentered',
                smart: 1,
                activateOn: 'click',
                speed: 500,
                mouseDragging: 1,
                touchDragging: 1,
                easing: 'swing',
                itemSelector: '.sert-slider ul li',
                prevPage: $slideeFrame.parent().find('.slider-fader-left').get(0),
                nextPage: $slideeFrame.parent().find('.slider-fader-right').get(0)
            };

            window.sertSlider = new Sly(
                $slideeFrame,
                $slideeOptions
            );

            window.sertSlider.init();

        }
        else{

            if(window.sertSlider){
                window.sertSlider.destroy();
            }

        }

    }


});
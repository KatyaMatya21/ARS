$(document).ready(function(){

    var $slideeFrame = $('.event-slider');
    var $slideeOptions = {
        horizontal: 1,
        itemNav: 'basic',
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
        var offset = CurrentSection.offset().top - 90;

        window.documentSlider.slideTo(offset);

        e.preventDefault();
        return false;
    });

    function eventListSlider( el ) {

        var $slideeFramePopup = $('.popup-event-slider').get(0);
        var $slideeOptionsPopup = {
            itemNav: 'basic',
            smart: 1,
            activateOn: 'click',
            speed: 500,
            mouseDragging: 1,
            touchDragging: 1,
            easing: 'swing',
            itemSelector: 'li.popup-event-slide',
            scrollBy: 1,
            scrollSource: $slideeFramePopup
        };

        window.slyPopup = new Sly(
            $slideeFramePopup,
            $slideeOptionsPopup
        );

        window.slyPopup.init();

        if( el != undefined ) {
            window.slyPopup.activate( el.get(0) );
            el.trigger('click');
        }

    }

    function DestroyEventSlider()
    {
        window.slyPopup.destroy();
    }

    function inTabSly( tabElement )
    {
        if( window.inTabSly != undefined ) {
            window.inTabSly.destroy();
        }

        window.inTabSly = new Sly( tabElement.get(0), {
            speed: 300,
            easing: 'easeOutExpo',
            activatePageOn: 'click',
            scrollBy: 100,
            scrollSource: $('.popup-event-page')
        });
        window.inTabSly.init();
    }

    $('li.popup-event-slide').bind('click',function(e){

        var targetTab = $(this).data('target'); // tab1
        var tab = $('#'+targetTab); // #tab1

        $('.active-popup-event-page').removeClass('active-popup-event-page');
        tab.addClass('active-popup-event-page');

        $('.active-popup-tab').removeClass('active-popup-tab');
        $(this).addClass('active-popup-tab');

        if( $(window).width() > 480 ) {
            inTabSly(tab);
        }else{
            DestroyEventPopupWholeSly();
            eventPopupWholeSly();
        }

    });

    function eventPopupWholeSly() {
        window.eventPopupWholeSly = new Sly(
        $('.event-popup'), {
                speed: 300,
                easing: 'easeOutExpo',
                activatePageOn: 'click',
                scrollBy: 100,
                scrollSource: $('.event-popup')
        });
        window.eventPopupWholeSly.init();
    }

    function DestroyEventPopupWholeSly() {
        if( window.eventPopupWholeSly != undefined ) {
            window.eventPopupWholeSly.destroy();
        }
    }

    function EventSly() {

        window.EventSlider = new Sly( $( '.event-popup #tab1' ), {
            scrollBy: 100,
            speed: 600,
            releaseSwing: 1,  // Enables release swing easing
            easing: 'easeOutExpo'
        });

        window.EventSlider.init();

    }

    EventSly();


    $('li.event-slide').bind('click',function(){

        $('.event-popup').addClass('event-popup-show');
        $('.overflow').addClass('overflow-in');

        var $select = $('.event-popup li.popup-event-slide[data-target="' + $(this).data('target') + '"]');
        if( $(window).width() > 480 ) {
            eventListSlider($select);
        }else{
            $select.trigger('click');
            eventPopupWholeSly();
        }

    });

    $('.popup-close').bind('click',function(){

        $('.event-popup').removeClass('event-popup-show');
        $('.overflow').removeClass('overflow-in');
        if( $(window).width() > 480 ) {
            DestroyEventSlider();
        }else{
            DestroyEventPopupWholeSly();
        }

    });

    var lazyResize = _.debounce( onViewportResize, 300 );
    $(window).on('resize load', lazyResize);

    function onViewportResize() {
        var win = $(this);

        // media breakpoint for 480px
        if( win.width() <= 480 ) {

            $('.company-work-feature-slider').sly({
                horizontal: 1,
                speed: 600,
                scrollBy: 100,
                itemNav: 'forceCentered',
                itemSelector: '.company-work-feature-slide',
                nextPage: $('.company-work-feature-slider').find('.slider-fader-right'),
                prevPage: $('.company-work-feature-slider').find('.slider-fader-left'),
                smart: 1
            });

        }else{

            $('.company-work-feature-slider').sly(false);

        }

    }


});
$(function() {

    var lazyResize = _.debounce(onViewportResize, 300);
    $(window).on('resize load', lazyResize);

    $('.catalog-back').click(function(){
        $('.receipt-list').hide();
        $('.receipt-type').show();
        window.updateDocumentHeight();
    });

    function onViewportResize() {
        var win = $(this);
        if (win.width() <= 480) {
            $('#mobile-mid-slider').sly({
                mouseDragging: 1,
                touchDragging: 1,
                horizontal: 1,
                itemNav: 'forceCentered',
                smart: 1,
                activateOn: 'click',
                speed: 200
            });
            $('#mobile-mid-slider').sly('activate', $('.active-breadcrumbs-menu-after'));

            bindTabs();
            unbindItems();
            bindModileClick();

        } else {
            $('#mobile-mid-slider').sly(false);
            unbindTabs();
            unbindMobileClick();
            bindItems();
        }
    }

    function bindTabs() {
        $('.receipt-tab').bind('click', function (e) {
            var $tab = $('#' + $(this).data('target'));
            $('.receipt-list').hide();
            $tab.show();
            $('.receipt-type').hide();
            window.updateDocumentHeight();
        });
    }

    function unbindTabs() {
        $('.receipt-tab').unbind();
        $('.receipt-list').removeAttr('style');
    }

    function bindItems() {
        $('.receipt-list > ul > li').click( onClickItem );
    }

    function unbindItems() {
        $('.receipt-list > ul > li').unbind();
    }

    function onClickItem() {
        if (!$(this).hasClass('active')) {

            $('.slider-receipt-item').sly(false);
            $('.receipt-list ul > li').removeClass('active');
            $('.receipt-popup').removeAttr('style');
            $('.closer').remove();

            $(this).addClass('active');
            var $closer = $('<div class="closer"></div>');
            $(this).append($closer);
            $closer.bind('click', function (e) {

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

    }

    function onMobileClick(e) {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            window.updateDocumentHeight();
            var $closer = $('<div class="back-use" style="display: block;">Свернуть</div>');
            $closer.bind('click', function(e){
                $(this).parent().removeClass('active');
                $(this).remove();
                e.preventDefault();
                return false;
            });
            $(this).append($closer);
        }
    }

    function bindModileClick() {
        $('.receipt-list > ul > li').click( onMobileClick );
    }

    function unbindMobileClick() {
        $('.receipt-list > ul > li').unbind();
    }

});
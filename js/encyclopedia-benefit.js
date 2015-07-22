$(document).ready(function(){

    $('.tab-question').bind('click',function(){

        var targetTab = $(this).data('target'); // tab1
        var tab = $('#'+targetTab); // #tab1

        $('.active-tab-benefit').removeClass('active-tab-benefit');
        tab.addClass('active-tab-benefit');

        $('.active-tab-question').removeClass('active-tab-question');
        $(this).addClass('active-tab-question');

        $('.oil-blocks').masonry({
            itemSelector: '.oil-block',
            columnWidth: 360,
            percentPosition: true,
            isOriginLeft: false
        });

    });

    $('.oil-blocks').masonry({
        itemSelector: '.oil-block',
        columnWidth: 360,
        percentPosition: true,
        isOriginLeft: false
    });



});
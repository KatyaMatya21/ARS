$(document).ready(function(){

    $('.tab-question').bind('click',function(){

        var targetTab = $(this).data('target'); // tab1
        var tab = $('#'+targetTab); // #tab1

        $('.content-block-answers-active').removeClass('content-block-answers-active');
        tab.addClass('content-block-answers-active');

        $('.active-tab-question').removeClass('active-tab-question');
        $(this).addClass('active-tab-question');
    });

    $('.question-switch').bind('click',function(){
        $(this).toggleClass('question-switch-active');
    });

});

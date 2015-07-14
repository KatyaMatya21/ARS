$(document).ready(function(){

    $('.name-filter').bind('click',function(e){
        $(this).toggleClass("bigZ");
        $(this).next().toggle();
    });

    $('.hide-filter').bind('mouseleave',function(e){
        $(this).hide();
        $(this).prev().removeClass("bigZ");
    });

});
$(document).ready(function(){

    $('.name-filter').bind('click',function(e){
        $(this).next().toggle();
    });

    $('.hide-filter').bind('mouseleave',function(e){
        $(this).hide();
    });

});
$(document).ready(function(){

    window.slyTown = null;

    var gpuAcceleration = Modernizr.csstransforms3d ? 'translateZ(0) ' : '';
    var transform = Modernizr.prefixed('transform');


    function initialize() {
        var mapOptions = {
            zoom: 12,
            center: {lat: 59.96705822, lng: 30.3030119}
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

    }

    google.maps.event.addDomListener(window, 'load', initialize);


    $('.map-menu-point').bind('click',function(){

        var targetTab = $(this).data('target'); // tab1
        var tab = $('#'+targetTab); // #tab1

        $('.tab-active-map').removeClass('tab-active-map');
        tab.addClass('tab-active-map');

        $('.active-map-menu-point').removeClass('active-map-menu-point');
        $(this).addClass('active-map-menu-point');
    });


    var $slideeFrame = $('.town-list').get(0);
    var $slideeOptions = {
        itemNav: 'basic',
        smart: 1,
        activateOn: 'click',
        speed: 500,
        mouseDragging: 1,
        touchDragging: 1,
        easing: 'swing',
        itemSelector: 'li.town-point',
        scrollBy: 1
    };

    window.slyTown = new Sly(
        $slideeFrame,
        $slideeOptions
    );

    window.slyTown.init();


    $('.town-point').bind('click',function(){
        $(this).toggleClass('town-point-switch');
        window.slyTown.reload();
    });


});
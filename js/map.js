$(document).ready(function(){

    window.slyTown = null;
    window.cityMap = null;
    window.geocoder = null;
    window.allMarkers = [];
    window.winWidth = 0;

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

    var lazyResize = _.debounce( onViewportResize, 300 );
    $(window).on('resize load', lazyResize);

    function onViewportResize() {
        window.winWidth = $(this).width();
    }

    var gpuAcceleration = Modernizr.csstransforms3d ? 'translateZ(0) ' : '';
    var transform = Modernizr.prefixed('transform');

    function initialize() {
        var mapOptions = {
            zoom: 12,
            center: {lat: 59.96705822, lng: 30.3030119}
        };
        window.geocoder = new google.maps.Geocoder();
        window.cityMap = new google.maps.Map(document.getElementById("map"),
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

    window.slyTown = new Sly(
        $slideeFrame,
        $slideeOptions
    );

    window.slyTown.init();

    $('.town-point').bind('click',function(){

        if( !$(this).hasClass('town-point-switch') ) {

            $('.town-point-switch').removeClass('town-point-switch');
            $(this).addClass('town-point-switch');

            if (window.winWidth > 480) {
                window.slyTown.reload();
            } else {
                window.slyTown.destroy();
                $('.town-point').hide();
                $(this).show();
                $('.map-menu-head').hide();
                $('.map-container').show();
                $('.map-menu-decor').css('top','290px');
                initialize();
            }

            var cityName = $(this).find('.town-name').text();

            var markers = [];
            $(this).find('.town-addresses ul > li').each(function(i,v){
                markers.push( [ $(v).find('.town-store-name').text(), $(v).find('.town-store-address').text()] )
            });

            $(window.allMarkers).each(function(i,m){
                m.setMap(null);
            });

            window.geocoder.geocode( {address: cityName }, function(results, status)
            {
                if (status == google.maps.GeocoderStatus.OK)
                {
                    window.cityMap.setCenter( results[0].geometry.location ); //center the map over the result

                    //place a marker at the location

                    if( markers.length ) {

                        $(markers).each(function(i,m){

                            console.log('Searching for: '+ cityName + ',' + m[1]);
                            console.log(m);

                            window.geocoder.geocode( {address: cityName +' , ' + m[1] }, function(results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {

                                    var infowindow = new google.maps.InfoWindow({
                                        content: m[0]
                                    });

                                    var marker = new google.maps.Marker(
                                        {
                                            map: window.cityMap,
                                            position: results[0].geometry.location,
                                            animation: google.maps.Animation.DROP,
                                            title: m[0]
                                        });

                                    google.maps.event.addListener(marker, 'click', function() {
                                        infowindow.open(window.cityMap, marker);
                                    });

                                    window.allMarkers.push(marker);

                                }else{
                                    console.log('No address found for item.');
                                }
                            });

                        });

                    }

                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });

        }else{

            $(this).removeClass('town-point-switch');
            if (window.winWidth <= 480) {
                $('.town-point').show();
                window.slyTown = new Sly(
                    $slideeFrame,
                    $slideeOptions
                );
                window.slyTown.init();
                $('.map-menu-head').show();
                $('.map-container').hide();
                $('.map-menu-decor').css('top','0');
            }

        }

    });


});
$(document).ready(function(){

    function initialize() {
        var mapOptions = {
            zoom: 12,
            center: {lat: 59.96705822, lng: 30.3030119}
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        console.log('privet');

    }

    google.maps.event.addDomListener(window, 'load', initialize);

});
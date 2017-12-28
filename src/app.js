// Hold map for all scoped funtions
let map;
let locations = [
    {
        lat: 29.424122,
        lon: -98.493629,
        name: '78209'
    },
    {
        lat: 28.4595258,
        lon: -99.4637468,
        name: 'Loc 2'
    }
];


function initMap() {
    var mapCenter = { lat: 29.424122, lng: -98.493629 };

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: mapCenter
    });

    // Add makers for each location
    for (var i = 0; i < locations.length; i++) {
        var latLng = new google.maps.LatLng(locations[i].lat, locations[i].lon);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
    }
}

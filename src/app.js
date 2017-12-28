// Hold map for all scoped funtions
let map;
let locations = [
    {
        lat: 29.424122,
        lon: -98.493629,
        name: '78209'
    },
    {
        lat: 29.27,
        lon: -98.27,
        name: 'Loc 2'
    }
];
let selectedMarkerSymbol;

const LocationsViewModel = {
    locations: ko.observableArray(locations),
    selectedLocation: ko.observable(),
    filterString: ko.observable(""),
    getFilteredLocations: function () {
        var filterString = this.filterString().toLowerCase();
        return this.locations().filter(
            location => {
                let result = !filterString || location.name.toLowerCase().indexOf(filterString) > -1;
                if (location.marker) {
                    location.marker.setMap(result ? map : null);
                }
                return result;
            }
        )
    }
};

function initMap() {
    var mapCenter = { lat: 29.424122, lng: -98.493629 };

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: mapCenter
    });

    // Add makers for each location
    LocationsViewModel.locations().forEach(location => {
        const latLng = new google.maps.LatLng(location.lat, location.lon);
        const marker = new google.maps.Marker({
            position: latLng,
            map: map
        });

        LocationsViewModel.locations.replace(location, Object.assign({ marker: marker }, location));
    });
}

ko.applyBindings(LocationsViewModel);

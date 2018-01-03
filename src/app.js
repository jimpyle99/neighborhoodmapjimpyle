// Hold map for all scoped funtions
const clientId = 'EMSTRYWHW43FZ0LQMPMVY2ESANTB2C2M2ES44TEEIHMZPIRS';
const clientSecret = 'ZIXAAMDPZV3E2HVE3B44SMJF02CJCTA4MFUOXE4YC0PRSBWD';
const blueMarker = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';

let map;
let info;
let locations = [
    {
        lat: 29.426392815310223,
        lng: -98.49061613112313,
        name: 'The Majestic Theatre',
        foursquareId: '4ad4c000f964a520c4eb20e3'
    },
    {
        lat: 29.4426933780432,
        lng: -98.4796619369801,
        name: 'Pearl Brewery',
        foursquareId: '4b2fb351f964a52042ee24e3'
    },
    {
        lat: 29.440207056289157,
        lng: -98.50060639932047,
        name: 'The Cove',
        foursquareId: '4ae3649bf964a5206a9421e3'
    },
    {
        lat: 29.43033149480943,
        lng: -98.4887623573761,
        name: 'Tobin Center for the Performing Arts',
        foursquareId: '50e0a361e4b0b76a31915cb6'
    },
    {
        lat: 29.42431757211344,
        lng: -98.48839729579231,
        name: 'The San Antonio River Walk',
        foursquareId: '4c2785965c5ca59305e547fe'
    },
    {
        lat: 29.41134659009708,
        lng: -98.49583503557896,
        name: 'The Guenther House',
        foursquareId: '4ad4bffff964a52063eb20e3'
    },
    {
        lat: 29.41242890388021,
        lng: -98.49232920015501,
        name: 'Liberty Bar',
        foursquareId: '4c06ea8ccf8c76b008473b65'
    },
    //  an example of an error for demo only
    // {
    //     lat: 29.41242890388021,
    //     lng: -98.49232920015501,
    //     name: 'I am error',
    //     foursquareId: null
    // },
];
let selectedMarkerSymbol;


const LocationsViewModel = {
    locations: ko.observableArray(locations),
    selectedLocation: ko.observable({}),
    filterString:  ko.observable(''),
    isMenuOpen: ko.observable(false),

    openSlideMenu: function () {
        this.isMenuOpen(true);
    },

    closeSlideMenu: function () {
        this.isMenuOpen(false);
    },

    clearSelectedLocations: function () {
        this.locations().forEach(item => {
            if (item.infoWindow) {
                item.infoWindow.close();
                item.marker.setIcon(null);
            }
        })
    },

    //clears text input box
    clearFilterString: function () {
        var filterString = this.filterString('');
        this.clearSelectedLocations();
    },

    // this is bound to the view model, as expected, here
    getFilteredLocations: function () {
        var filterString = this.filterString().toLowerCase();
        return this.locations().filter(
            location => {
                //makes sure low case text matches
                let result = !filterString || location.name.toLowerCase().indexOf(filterString) > -1;
                if (location.marker) {
                    location.marker.setVisible(result ? true : false);
                }
                return result;
            }
        )
    },

    // Can't use 'this' because it is bound to the selected item instead of the view model
    selectLocation: function (location) {
        LocationsViewModel.clearSelectedLocations();

        LocationsViewModel.selectedLocation(location);
        fourSquareRequest(location.foursquareId)
            .then(fourSquareInfo => showInfoWindow(location, fourSquareInfo))
            .then(() => location.marker.setIcon(blueMarker))
            //gives feedback incase the four square api does not work for some reason
            .catch(err => {
                console.error(err);
                alert("Iunnnno....sum kinda error\n" + err)
            });
    }
};

// connects to four square api and retuns the desired values
function fourSquareRequest(id) {
    const fourSquareApiUrl = `https://api.foursquare.com/v2/venues/${id}?client_id=${clientId}&client_secret=${clientSecret}&v=20170801`;
    return fetch(fourSquareApiUrl)
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        })
        .then(json => {
            let venue = json.response.venue;
            let photo = venue.bestPhoto;
            return {
                name: venue.name || '',
                photo: photo.prefix ? `${photo.prefix}100x100${photo.suffix}` : '',
                address: (venue.location.formattedAddress || [] ).join('\n'),
                rating: venue.rating || '',
                ratingColor: venue.ratingColor || '',
                shortUrl: venue.shortUrl || ''
            };
        });
}

//creates content for info window
function showInfoWindow(location, info) {
    const infoContent = `
        <div class="info-content">
            <h2><a href="${info.shortUrl}" target="_blank">${info.name}</a><br/>
            ${info.rating} \/10
            </h2>
            <img src="${info.photo}"></img>
            <h3>${info.address}</h3>
        </div>
    `;
    location.infoWindow = new google.maps.InfoWindow({
      content: infoContent
    });
    location.infoWindow.open(map, location.marker);
}

function initMap() {
    var mapCenter = locations.find(item => item.name === 'The San Antonio River Walk')
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: mapCenter
    });

    // Create makers for each location
    locations.forEach(location => {
        const latLng = new google.maps.LatLng(location.lat, location.lng);
        location.marker = new google.maps.Marker({
            position: latLng,
            map: map,
            animation: google.maps.Animation.DROP
        });
        location.marker.addListener('click', function() {
            // TODO: Do something when I click on the marker
            // infowindow.open(map, marker);
            LocationsViewModel.selectLocation(location);
        });
    });
}

function libLoadFailure(library) {
    alert(`Failed to load ${library} API`);
}

if (!ko.applyBindings) {
    alert('Failed to load Knockout library');
}

ko.applyBindings(LocationsViewModel);

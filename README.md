# Title
Neighborhood Map

# About
This is the final project for the FEND program at Udacity.  

## Install

Webroot files can be found in /src/

To load app visit the index.html page

If you plan to use this please insert your own google and foursqure api keys.

## Four Square api example - please use your own YOURAPIKEY

function fourSquareRequest(id) {
    const fourSquareApiUrl = `https://api.foursquare.com/v2/venues/${id}?client_id=${clientId}&client_secret=${clientSecret}&v=20170801`;
    return fetch(fourSquareApiUrl)
        .then(response => response.json())
        .then(json => {
            let venue = json.response.venue;
            let photo = venue.bestPhoto;
            return {
                name: venue.name,
                photo: `${photo.prefix}100x100${photo.suffix}`,
                address: venue.location.formattedAddress.join('\n'),
                rating: venue.rating,
                ratingColor: venue.ratingColor,
                shortUrl: venue.shortUrl
            };
        });
}

## Place your own Google Maps API key in src/app.js
<script async defer src="https://maps.googleapis.com/maps/api/js?key=<YOURAPIKEY>&callback=initMap"  type="text/javascript"></script>

## An example of an error for demonstration only

// an example of an error
{
    lat: 29.41242890388021,
    lng: -98.49232920015501,
    name: 'I am error',
    foursquareId: null
},

### Thanks and Credits

Brad at http://traversymedia.com

https://medium.freecodecamp.org/the-100-correct-way-to-do-css-breakpoints-88d6a5ba1862

http://bradfrost.com/blog/post/7-habits-of-highly-effective-media-queries/

http://knockoutjs.com

David Gilbertson @davidgilbertson
https://codepen.io/davidgilbertson/pen/aBpJzO

The Nando

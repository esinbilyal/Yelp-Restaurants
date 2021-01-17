mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v11',   //stylesheet location
    center: restaurant.geometry.coordinates,  //starting position [lng, lat]
    zoom: 10   //starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(restaurant.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 15})
            .setHTML(
                `<h4>${restaurant.name}</h4>
                <p>${restaurant.location}</p>`
            )
    )
    .addTo(map)
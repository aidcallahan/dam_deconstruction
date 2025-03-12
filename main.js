// Initialize the map
var map = L.map('map').setView([37.0000, -104.5000], 12); // Adjust latitude and longitude as per dam location

// Add OpenStreetMap tiles as a base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to handle the click event on the map
map.on('click', function (e) {
    // Coordinates of the click (where user clicked)
    var clickedLat = e.latlng.lat;
    var clickedLng = e.latlng.lng;
    var damLocation = [37.0000, -104.5000];  // Actual dam location

    // If user clicks on or near the dam location, trigger the explosion
    var distance = map.distance([clickedLat, clickedLng], damLocation);
    if (distance < 50) {  // Adjust distance threshold if needed
        triggerExplosion();
    }
});

// Function to trigger the explosion effect
function triggerExplosion() {
    // Play the boom sound
    var boomSound = document.getElementById('boom-sound');
    boomSound.play();

    // Swap to "after demolition" imagery (adjust URLs)
    var afterDemolitionLayer = L.imageOverlay('after_demolition_2019.jpg', [
        [37.0005, -104.5005],  // Corner Lat/Lng
        [37.0002, -104.4998]   // Other Corner Lat/Lng
    ]).addTo(map);

    // Optionally, you can fade out the pre-demolition imagery or add any transitions here
    setTimeout(function() {
        afterDemolitionLayer.setOpacity(1);
    }, 1000);
}

// Function to add pre-demolition imagery (2017/2018)
var preDemolitionLayer = L.imageOverlay('pre_demolition_2017.jpg', [
    [37.0005, -104.5005],  // Corner Lat/Lng
    [37.0002, -104.4998]   // Other Corner Lat/Lng
]).addTo(map);

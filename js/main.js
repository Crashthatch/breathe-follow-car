var map = L.map('map').setView([51.3796, -2.3729], 14);
var layerGroup = L.layerGroup().addTo(map);
let currentObservation = 0;
let observations = [];

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);



Papa.parse("http://localhost:8080/a-vehicles-observations.csv", {
  download: true,
  header: true,
  complete: function(results) {
    observations = results.data;
      /*results.data.forEach( observation => {

          if( observation.latitude && observation.longitude ){
              L.marker([observation.latitude, observation.longitude]).addTo(map)
          }
      })*/
  }
});

next = () => {
  currentObservation++;
  update();
}

prev = () => {
  currentObservation++;
  update();
}

update = () => {
  let observation = observations[currentObservation];
  console.log(observation)
  layerGroup.clearLayers(); //clear existing markers
  L.marker([observation.latitude, observation.longitude]).addTo(layerGroup)
  $('#date').text(observation.t)
}
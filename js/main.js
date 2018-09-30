var map = L.map('map').setView([51.3796, -2.3729], 13);
var layerGroup = L.layerGroup().addTo(map);
let currentObservation = 0;
let observations = [];
let vehicleData = {};

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);



/*Papa.parse("http://localhost:9005/a-vehicles-observations.csv", {
  download: true,
  header: true,
  complete: function(results) {
    observations = results.data;
  }
});

Papa.parse("http://localhost:9005/vehicle-info.csv", {
  download: true,
  header: true,
  complete: function(results) {
    vehicleData = results.data[0];
    updateVehicleData();
  }
});*/

getVehicleData = () => {
  const vehicleId = $('#vehicleid').val();
  console.log(vehicleId)

  fetch('/vehicle/'+vehicleId)
    .then( (res) => res.text() )
    .then( (res) => {
    vehicleData = JSON.parse(res)[0];
    updateVehicleData();
  })

  fetch('/observations/'+vehicleId)
    .then( (res) => res.text() )
    .then( (res) => {
    observations = JSON.parse(res);
    currentObservation = 0;
    update();
  })
}

getVehicleData();

next = () => {
  currentObservation++;
  update();
}

prev = () => {
  currentObservation--;
  update();
}

function nth(d) {
  if(d>3 && d<21) return 'th'; // thanks kennebec
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}
function padTwo(d){
  if(d < 10){
    return "0"+d;
  }
  else{
    return ""+d;
  }
}
function dateToString(d){
  const date = new Date(d)
  return dayNames[date.getDay()]+" "+date.getDate()+nth(date.getDate())+" "+monthNames[date.getMonth()]+" "+date.getFullYear()+", "+padTwo(date.getHours())+":"+padTwo(date.getMinutes())+":"+padTwo(date.getSeconds())
}
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov', 'Dec']
update = () => {
  let observation = observations[currentObservation];
  console.log(observation)
  layerGroup.clearLayers(); //clear existing markers
  L.marker([observation.latitude, observation.longitude]).addTo(layerGroup)
  $('#readingnum').text("("+currentObservation+"/"+observations.length+")")
  $('#date').text(dateToString(observation.t))
  $('#direction').text(observation.direction)
}

updateVehicleData = () => {
  console.log(vehicleData)
  $('#type').text(vehicleData.type)
  $('#subtype').text(vehicleData.subtype)
  $('#make').text(vehicleData.make)
  $('#taxitype').text(vehicleData.taxi_type)
  $('#enginecapacity').text(vehicleData.engine_capacity ? vehicleData.engine_capacity + 'cc' : '')
  $('#fueltype').text(vehicleData.fuel_type)
  $('#grossvehicleweight').text(vehicleData.gross_vehicle_weight ? vehicleData.gross_vehicle_weight+'kg' : '')
  $('#eurostatus').text(vehicleData.euro_status)
  $('#fc_combined').text(vehicleData.fc_combined ? vehicleData.fc_combined+"L/100km" : '')
  $('#fc_extra_urban').text(vehicleData.fc_extra_urban ? vehicleData.fc_extra_urban+"L/100km" : '')
  $('#fc_urban_cold').text(vehicleData.fc_urban_cold ? vehicleData.fc_urban_cold+"L/100km" : '')
  $('#co2').text(vehicleData.co2 ? vehicleData.co2 + 'g/km' : '')

  const introdate = new Date(vehicleData.intro_date);
  $('#introdate').text(monthNames[introdate.getMonth()]+" "+introdate.getFullYear())
}
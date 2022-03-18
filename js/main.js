var calendar = {};

var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;


let rotatingBGH1 = document.getElementById("gp");



if(!Detector.webgl){
  Detector.addGetWebGLMessage();
} else {

  var container = document.getElementById('container');
  var globe = new DAT.Globe(container);

  globe.animate();
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

axios
  .get("https://raw.githubusercontent.com/sportstimes/f1/main/_db/f1/2022.json")
  .then((res) => {
    //console.log(res);
    calendar = res.data.races;
    //console.log(calendar);
    updateDate();

  });

let end = Date();

let currentGP = {};

let timers = [];


let markers = [];

function updateDate() {

  let data = [["grandprixes",[]]];


  for(let i=0; i<calendar.length; i++) {
    gp = calendar[i];

    cell = {
      lat: gp.latitude,
      lng: gp.longitude,
      size: 15,
      color: 'white',
      title: gp.slug.replaceAll("-", " "),
    }


    data[0][1].push(gp.latitude)
    data[0][1].push(gp.longitude)
    data[0][1].push(.05)

    //console.log(gp);

    markers.push(cell);
  }



  globe.addData(data[0][1], {format: 'magnitude', name: data[0][0], animated: false});
  globe.createPoints();
  // globe.htmlElementsDatamarkers;
  // globe.htmlElement(d => {
  //   const el = document.createElement('div');
  //   el.innerHTML = d.title;
  //   el.style.color = d.color;
  //   el.style.width = `${d.size}px`;
  //   return el;
  // });
  globe.animate();


  for (let i = 0; i < calendar.length; i++) {
    let gp = new Date(calendar[i].sessions.gp);
    let now = new Date();

    if (gp - now >= 0) {
      currentGP = calendar[i];

      for (let key in currentGP.sessions) {
        //console.log(key);
        timers.push({
          name: key,
          date: new Date(currentGP.sessions[key]),
        });
      }

      let gpName = document.getElementById("gpName");

      let readableGPName = currentGP.slug.replaceAll("-", " ");


      gpName.innerHTML = readableGPName;

      break;
    }
  }
}

let timer;

function showRemaining() {
  var now = new Date();
  for (let i = 0; i < timers.length; i++) {
    let docElement = document.getElementById(timers[i].name);

    var distance = timers[i].date - now;
    if (distance < 0) {
      docElement.innerHTML = "EXPIRED!";
      } else {
      var days = Math.floor(distance / _day);
      var hours = Math.floor((distance % _day) / _hour);
      var minutes = Math.floor((distance % _hour) / _minute);
      var seconds = Math.floor((distance % _minute) / _second);

      docElement.innerHTML = " " + days + ":";
      docElement.innerHTML += hours + ":";
      docElement.innerHTML += minutes + ":";
      docElement.innerHTML += seconds + "";
      }
  }
}

timer = setInterval(showRemaining, 1000);

let angle = 0;


function rotate() {
  angle++;
  if(angle == 360) angle = 0;

  let style = "background:  -webkit-linear-gradient("+angle+"deg,#fcba03 25%,#fc2c03);"
  style += "background-clip: text;"
  style += "-webkit-background-clip: text;"
  style += "-webkit-text-fill-color: transparent;"
  rotatingBGH1.style = style;

}

setInterval(rotate,500);


var celsius = false;
var json;

// API CALL
const fetchWeather = async () =>
  await (await fetch("/.netlify/functions/getweather")).json();

// CONVERT F to C
function showTemp(fTemp, c) {
  if (c) return Math.round((fTemp - 32) * (5 / 9)) + " C";
  return Math.round(fTemp) + " F";
}

fetchWeather().then(data => {
  render(data, celsius);
});

function render(json, celsius) {
  const currentTemp = showTemp(json.main.temp, celsius);
  const tempMin = showTemp(json.main.temp_min, celsius);
  const tempMax = showTemp(json.main.temp_max, celsius);
  const currentLoc = json.name + ", " + json.sys.country;
  const description = json.weather[0].description;
  const icon = json.weather[0].icon;
  const humidity = json.main.humidity;
  const wind = json.wind.speed;

  const imgUrl = "http://openweathermap.org/img/w/" + icon + ".png";
  const d = new Date();
  const getDate = d.toDateString();

  // ELEMENTS SELECTOR
  const image = document.querySelector("#iconImg");
  const temp = document.querySelector("#currentTemp");
  const minMaxTemp = document.querySelector("#minMax");
  const currentLocation = document.querySelector("#currentLoc");
  const desc = document.querySelector("#description");
  const date = document.querySelector("#time");
  const img = '<img style="width:80px;height:80px;" src="' + imgUrl + '"/>';

  // DATA INSERT TO HTML
  date.innerHTML = getDate;
  image.innerHTML = img;
  temp.innerHTML = currentTemp;
  minMaxTemp.innerHTML = "L : " + tempMin + " - " + "H : " + tempMax;
  currentLocation.innerHTML = currentLoc;
  desc.innerHTML = description;

  const toggle = document.querySelector("#toggle");
  // RENDER CALL
  toggle.addEventListener("click", () => {
    celsius = !celsius;
    render(json, celsius);
  });
  // BUTTON TOGGLE
  document.querySelector("#toggle").onclick = e => {
    if (e.target.innerHTML === "F") {
      document.querySelector(".btn").innerHTML = "C";
    } else {
      document.querySelector(".btn").innerHTML = "F";
    }
  };
}

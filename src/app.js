const searchInput = document.querySelector("#search");
const appId = "58b6f7c78582bffab3936dac99c31b25";
const findCountry = async () => {
  const listCountry = document.querySelector("ol");
  //clear ol
  listCountry.innerHTML = "";

  // fetch country coordinates
  const getData = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchInput.value}.json?access_token=pk.eyJ1IjoidHVydXV1dSIsImEiOiJjbDBhZW15ZHAwMGhjM2RtZjB6dnltZnhjIn0.HSb4dmJFSM2USxDkTsScDg`
  );
  const data = await getData.json();

  // render suggest countries
  for (let i = 0; i < data.features.length; i++) {
    const findBtn = document.createElement("button");
    findBtn.innerText = "FIND";
    findBtn.addEventListener("click", () => {
      findWeather(data.features[i].center, data.features[i].place_name);
    });
    const liTag = document.createElement("li");
    liTag.innerHTML = data.features[i].place_name;
    liTag.append(findBtn);
    listCountry.append(liTag);
  }
};
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchBtn").click();
  }
});
const findWeather = (center, place_name) => {
  secFunction(center[1], center[0], place_name);
};

const secFunction = async (lat, lng, place_name) => {
  try {
    const getData = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&cnt=1&appid=${appId}&units=metric`
    );
    const data = await getData.json();
    const today = data.list[0];

    //Date
    // timestamp to date
    document.querySelectorAll("p")[0].innerText = new Date(
      today.dt * 1000
    ).toDateString();
    document.querySelectorAll("p")[1].innerText = new Date(
      today.dt * 1000
    ).toDateString();

    // location name
    document.querySelectorAll("h1")[0].innerText = place_name;
    document.querySelectorAll("h1")[1].innerText = place_name;

    //high temp
    document.querySelector(".high").innerHTML =
      Math.floor(today.temp.max) + "°";
    document.querySelector(".low").innerHTML = Math.floor(today.temp.min) + "°";
    // icon
    document.querySelectorAll(".state")[0].innerHTML = today.weather[0].main;
    document.querySelectorAll(".state")[1].innerHTML = today.weather[0].main;

    //image

    document.querySelectorAll(
      ".weather-icon"
    )[0].src = `./static/images/day/${today.weather[0].main}.png`;
    document.querySelectorAll(
      ".weather-icon"
    )[1].src = `./static/images/night/${today.weather[0].main}.png`;
  } catch (error) {
    console.log(error);
  }
};

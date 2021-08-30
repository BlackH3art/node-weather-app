const fetch = require('node-fetch');

const cityName = process.argv[2];

const processWeatherData = (data) => {
  
  const lookedStation = data.find(stationData => stationData.stacja === cityName);

  if(!lookedStation) {
    console.log('Nie ma w API takiej stacji - R.I.P.');
    return;
  }

  const { 
    stacja: station, 
    temperatura: temperature, 
    cisnienie: pressure, 
    wilgotnosc_wzgledna: humidity 
  } = lookedStation;

  const weatherInfo = `
  On ${station} station, there is ${temperature}°C,
  ${humidity}% of humidity,
  pressure of ${pressure} hPa.
  `;

  console.log(weatherInfo);

}

fetch('https://danepubliczne.imgw.pl/api/data/synop')
  .then(response => response.json())
  .then(processWeatherData)
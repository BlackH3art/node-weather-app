const fetch = require('node-fetch');
const { appendFile } = require('fs').promises;
const { normalize, resolve } = require('path');




// funkcja zabezpieczająca przed podawaniem dostawaniem się do innych katalogów.
function safeJoin(base, target) {
  const targetPath = '.' + normalize('/' + target);
  return resolve(base, targetPath);
}

// funkcja zwracająca ścieżkę danego pliku.
const getDataFileName = city => safeJoin('./data/', `${city}.txt`);


//funkcja procesowania danych otrzymanych z api.
const processWeatherData = async (data, city) => {
  
  const lookedStation = data.find(stationData => stationData.stacja === city);

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

  const dateNow = new Date().toLocaleString();

  await appendFile(getDataFileName(city), `${dateNow} \n ${weatherInfo}\n \n`)

}


const checkWeatherInCertainCity = async city => {

  try {
    const response = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
    const data = await response.json();

    await processWeatherData(data, city);
    
  } catch (err) {
    console.log('something went wrong', err)
  }
}


checkWeatherInCertainCity(process.argv[2]);


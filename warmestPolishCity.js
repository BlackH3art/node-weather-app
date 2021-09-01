const fetch = require('node-fetch');


const processWeatherData = async (data) => {
  
  const sortedData = [...data].sort((a, b) => {
    return b.temperatura - a.temperatura
  });

  const {
    stacja: station,
    temperatura: temperature
  } = sortedData[0];


  console.log(`
  Highest temperature in Poland is ${temperature}°C, and it's in ${station} city.
  `);
}


const findWarmestPlaceInPoland = async ()=> {

  try {
    const response = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
    const data = await response.json();

    await processWeatherData(data);
    
  } catch (err) {
    console.log('something went wrong', err)
  }
}


findWarmestPlaceInPoland();
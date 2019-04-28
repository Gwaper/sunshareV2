const utils = require('./utils.js');
const config = require('./config.js');
const express = require('express');
const colors = require('colors');
const axios = require('axios');
// const prevision =require ('./prevision.js')
const app = express();

const productionPV = 300;
const prevision = [];

const apiKey = "cvbBLx1FFQQXtKEgqU4o6KATicAkNsYn";
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // keep this if your api accepts cross-origin requests
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/realtime', (req, res) => {
  res.send('realtime data lol')
});
app.get('/prevision', (req, res) => {
  axios.get(`https://api.openweathermap.org/data/2.5/forecast/hourly?lat=47.21725&lon=-1.55336&appid=271acc6cd729718d8e20640948e251a2`)
    .then(result => {
      let prevision = generateParabol(1556339580, 1556390220)
      let j = 0;
      for (i = 0; i < 48; i += 2) {
        prevision[i] *= (1 - (result.data.list[j++].clouds.all / 200) + 0.5) * productionPV;
      }

      for (i = 1; i < 48; i += 2) {
        prevision[i] = (prevision[i - 1] + prevision[i + 1]) / 2
      }
      console.log(prevision);
    })
  res.send(prevision)
});

app.listen(config.data.port, () => {
  console.log(colors.bgGreen(colors.black(`Server is up on ${config.data.port}`)));
});

// console.log(utils.generateMockData(new Date().getTime() - 5));

const generateParabol = (sunSetTmp, sunRiseTmp) => {
  let tomorrowSunRise = new Date(sunRiseTmp*1000);

  let sunRise= Math.round(tomorrowSunRise.getTime()/60/30)*60*30; 
  let sunSet= Math.round(sunSetTmp*1000/60/30)*60*30;
  let scale = (sunSet - sunRise)/3600*2;
  let startDay = tomorrowSunRise.getTime() - tomorrowSunRise.getHours() * 3600*1000 - tomorrowSunRise.getMinutes() * 60*1000;
  let startSunRise = sunRise/3600*2;
  let startSunSet = sunSet/3600*2;

  let startIndice = Math.round((startSunRise - ( startDay/3600*2 )) / 1000 ); // 13
  let stopIndice = Math.round((startSunSet - ( startDay/3600*2 )) / 1000 ); // 41

  scale = Math.round(scale/1000);

  for (i=0; i < 48; i++) {
    if(i < startIndice) {
      prevision[i] = 0;
    } else if(i > stopIndice) {
      prevision[i] = 0;
    } else {
      let parabole = 1 + (-1 * (Math.pow((((i - startIndice)-(scale/2))/(scale/2) ), 2))); 
      prevision[i] = parabole;
    }
  }

  return prevision;
}

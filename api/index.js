const utils = require('./utils/SnSrSimul.js');
const config = require('./config.js');
const express = require('express');
const colors = require('colors');
const axios = require('axios');

const app = express();

let SnSrSimul = {
  starttime : new Date().getTime(),
  soutiridx: 0,
  injectidx: 0,
  prodidx: 0,
  autoconsoidx: 0,
  prodmoyidx: 0,
  prodmaxidx: 0
}

const productionPV = 300;
const prevision = [];

let historyLinkyData = [];
const apiKey = "cvbBLx1FFQQXtKEgqU4o6KATicAkNsYn";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // keep this if your api accepts cross-origin requests
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/realtime', (req, res) => {
  console.log(historyLinkyData);
    res.send(historyLinkyData);
});

app.get('/prevision', (req, res) => {
  let prevision = generateParabol(1556390220, 1556339580);
  let j = 0;
  let seasonCoef = generateSeasonCoef(1556390220);
  axios.get(`https://api.openweathermap.org/data/2.5/forecast/hourly?lat=47.21725&lon=-1.55336&appid=271acc6cd729718d8e20640948e251a2`)
    .then(result => {
      for (i = 0; i < 48; i += 2) {
        prevision[i] *= (1 - (result.data.list[j++].clouds.all / 200) + 0.5) * productionPV * seasonCoef;
      }
      for (i = 1; i < 48; i += 2) {
        if(i+1 < 48) {
          prevision[i] = (prevision[i - 1] + prevision[i + 1]) / 2;
        } else {
          prevision[i] = 0;
        }
      }
    })
    .then(() => {
      res.send(prevision)
    })
});

app.get('/localisation', (req, res) => {
  axios.get('https://ipapi.co/json')
  .then((result) => {
    res.send({"lat": result.data.latitude, "lng": result.data.longitude});
  })
})

app.listen(config.data.port, () => {
  console.log(colors.bgGreen(colors.black(`Server is up on ${config.data.port}`)));
});

setInterval(() => {
  let newLinkyData = utils.generateMockData(SnSrSimul);
  if(historyLinkyData.length >= config.data.history) { 
    historyLinkyData.splice(0,1);
  }
  historyLinkyData.push(newLinkyData);
  SnSrSimul = Object.assign({}, newLinkyData);
  console.log(newLinkyData)
}, 300000);

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

const generateSeasonCoef = (timestamp) => {
  let SunCal = [0.294, 0.388, 0.758, 1.054, 1.3, 1.476, 1.576, 1.541, 1.352, 1.107, 0.768, 0.392, 0.294, 0.388];
  let month = new Date(timestamp).getMonth()+1;
  return SunCal[month]/1.576;
}

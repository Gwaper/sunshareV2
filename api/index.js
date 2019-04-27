const utils = require('./utils.js');
const config = require('./config.js');
const express = require('express');
const colors = require('colors');
const axios = require('axios');
// const prevision =require ('./prevision.js')
const app = express();
const productionPV = 300
const prevision = [0.056135,
  0.071005, 0.088922, 0.11025, 0.13534, 0.16447,
  0.1979, 0.23575, 0.27804, 0.32465, 0.37531, 0.42956, 0.48675, 0.54607,
  0.60653, 0.66698, 0.72615, 0.7827, 0.83527, 0.8825, 0.92312, 0.956, 0.9802,
  0.99501, 1, 0.99501, 0.9802, 0.956, 0.92312, 0.8825, 0.83527, 0.7827,
  0.72615, 0.66698, 0.60653, 0.54607, 0.48675, 0.42956, 0.37531, 0.32465,
  0.27804, 0.23575, 0.1979, 0.16447, 0.13534, 0.11025, 0.088922, 0.071005, 0.056135]

const apiKey = "cvbBLx1FFQQXtKEgqU4o6KATicAkNsYn";


   let sunRise= Math.round(1556339580/1000/60/30)*1000*60*30; 
   let sunSet= Math.round(1556390220/1000/60/30)*1000*60*30;

  console.log(sunRise,sunSet);
  let scale = (sunSet - sunRise)/3600*2
   for (i=0;i<scale;i++){
  let dayType = Math.round(scale*(timeNow - sunRise.getTime())/(sunSet.getTime() - sunRise.getTime()));
  let parabole = 1 + (-1 * (Math.pow(((dayType-(scale/2))/(scale/2) ), 2))); 


  
  app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // keep this if your api accepts cross-origin requests
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

axios.get
app.get('/realtime', (req, res) => {
  res.send('realtime data lol')
});
app.get('/prevision', (req, res) => {

  axios.get(`https://api.openweathermap.org/data/2.5/forecast/hourly?lat=47.21725&lon=-1.55336&appid=271acc6cd729718d8e20640948e251a2`)
    .then(result => {
      j = 0
      for (i = 0; i < 48; i += 2) {
        prevision[i] *= (1 - (result.data.list[j++].clouds.all / 200) + 0.5) * productionPV;
      }

      for (i = 1; i < 48; i += 2) {
        prevision[i] = (prevision[i - 1] + prevision[i + 1]) / 2
      }

      // console.log(prevision);

    })
  res.send("slip")

});

app.listen(config.data.port, () => {
  console.log(colors.bgGreen(colors.black(`Server is up on ${config.data.port}`)));
});

console.log(utils.generateMockData(new Date().getTime() - 5));

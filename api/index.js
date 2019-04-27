const utils = require('./utils.js');
const config = require('./config.js');
const express = require('express');
const colors = require('colors');
const axios = require('axios');

const app = express();
// - 365*24*60*60*1000
// var timeNow = onTime.getTime() - 365*24*60*60*1000 + (msg.payload - onTime.getTime())*60 ; // // Recul d'un an dans le temps et accélération 1s = 1min => x60x15

let SnSrSimul = {
  starttime : new Date(),
  timestamp: 1524805200000,
  time: new Date(1524805200000),
  soutiridx: 7003029.282917704,
  injectidx: 39192296.51599542,
  prodidx: 33698025.71109029,
  autoconsoidx: 1505728.1950948501,
  prodmoyidx: 31432228.449570265,
  prodmaxidx: 55864457.89914053
}

let historyLinkyData = [];

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // keep this if your api accepts cross-origin requests
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/consomation/', (req, res) => {
  
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


// console.log(utils.generateMockData(new Date().getTime() - 5));
// utils.generateMockData(new Date().getTime() - 5);

// let date = new Date().getTime();
// while(true) {
//   if(new Date().getTime() - date <= 10) {
//     console.log(utils.generateMockData(new Date().getTime() - 5, SnSrSimul));
//     date = new Date().getTime();
//   }
// }

let intervalFakeData = setInterval(() => {
  if(historyLinkyData.length < 96 -1 ) { // start at 0
    // historyLinkyData = [...historyLinkyData, utils.generateMockData(new Date().getTime() - 5)];
    let result = utils.generateMockData(SnSrSimul);
    SnSrSimul = result;
    console.log(result);
    // console.log(utils.generateMockData(new Date().getTime() - 5, SnSrSimul))
  } else {

  }
}, 5000)
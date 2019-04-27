const utils = require('./utils.js');
const config = require('./config.js');
const express = require('express');
const colors = require('colors');
const axios = require('axios');

const app = express();
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

let date = new Date().getTime();
while(true) {
  if(new Date().getTime() - date >= 5) {
    console.log(utils.generateMockData(new Date().getTime() - 5));
    date = new Date().getTime();
  }
}

// let intervalFakeData = setInterval(() => {
//   if(historyLinkyData.length < 96 -1 ) { // start at 0
//     historyLinkyData = [...historyLinkyData, utils.generateMockData(new Date().getTime() - 5)];
//   } else {

//   }
//   console.log(historyLinkyData)
// }, 5000)
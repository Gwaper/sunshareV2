const utils = require('./utils.js');
const config = require('./config.js');
const express = require('express');
const colors = require('colors');
const axios = require('axios');

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // keep this if your api accepts cross-origin requests
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('')
});

app.listen(config.data.port, () => {
  console.log(colors.bgGreen(colors.black(`Server is up on ${config.data.port}`)));
});

// console.log(utils.generateMockData(new Date().getTime() - 5));
/*
  (c) 2019 nickcrd
  https://nickcrd.dev/
*/

const noble = require('noble');
const express = require('express');

var app = express();

// only for testing purposes to see if the concept works or not
var latestValuePair = {};

app.get('/getdata', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.json(latestValuePair);
});

app.listen(80, function() {
  console.log("Listening on port 80");
});


noble.on('discover', function(peripheral) {
  // hardcoded address for testing purposes
  if (peripheral.address === "f4:0f:24:19:33:10")
  {
    latestValuePair = {x: new Date(), y: peripheral.rssi}
    console.log(`${new Date().toLocaleString()} | ID: ${peripheral.address} | rssi: ${peripheral.rssi}`);
  }
});

noble.startScanning([], true);

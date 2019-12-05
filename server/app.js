const noble = require('noble');
const express = require('express');

var app = express();

var latestValuePair = {};

app.get('/getdata', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.json(latestValuePair);
});

app.listen(80, function() {
  console.log("Listening on port 80");
});


noble.on('discover', function(peripheral) {
  if (peripheral.address === "f4:0f:24:19:33:10")
  {
    latestValuePair = {x: new Date(), y: peripheral.rssi}
    console.log(`${new Date().toLocaleString()} | ID: ${peripheral.address} | rssi: ${peripheral.rssi}`);
  }
});

noble.startScanning([], true);

const express = require('express');
const router = express.Router();
var fetch = require("node-fetch");

router.post('/get', (req, res) => {
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    console.log(latitude);
    console.log(longitude);

    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&language=ja&sensor=true';
  
    fetch(url, {
        method: 'GET',
    }).then((res) => res.json()).then((json) => {
            res.status(200);
            res.json({ message: json });
      }).catch((err) => {
        res.status(400);
        res.json(err);
      });
});

module.exports = router;
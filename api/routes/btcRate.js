const express = require('express');
const router = express.Router();

const checkAuth = require('./middleware/check_auth');
const fetch = require('node-fetch');

const url = 'https://api.kuna.io:443/v3/exchange-rates/btc';
const options = {method: 'GET', headers: {Accept: 'application/json'}};


router.get("/", checkAuth, (req,res,next) =>{

    fetch(url, options)
    .then(res => res.json())
    .then(json => {
        res.status(200).json({
         BTC: json["btc"],
         UAH: json["uah"]
        })
     }).catch(err => console.error('error:' + err));

});



module.exports = router;
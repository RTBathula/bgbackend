module.exports = function(){

    var bodyParser = require('body-parser');
    var express = require('express');    
    var app = express();
    var CB = require('./config/db.js')();   
    var Q = require('q');
    var moment = require('moment');
    var CronJob = require('cron').CronJob;  

    global.keys = require('./config/keys.js'); 


    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        if ('OPTIONS' == req.method) {
             res.sendStatus(200);
        } else {
             next();
        }
    });

    app.use(bodyParser.json());    

    //Services
    global.TwilioService  = require('./services/twilioService.js')();
    global.UserService  = require('./services/userService.js')();
    global.JobService  = require('./services/jobService.js')();
    
    console.log("All services started..");

    //Routes
    app.use('/', require('./routes/twilio.js')());

    app.get('/', function(req, res, next){
        res.send(200, 'bgBackend Service is up and running fine.');
    });
    
    return app;
};


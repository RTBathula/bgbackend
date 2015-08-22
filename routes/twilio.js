var express = require('express');
var app = express();

module.exports = function() {

    //routes
    app.post('/otp/send/add', function(req,res,next) {        

        var data = req.body || {};    
       
        if(data){
          global.TwilioService.sendOTP(data.user).then(function(userObj) {
              if (!userObj) {                  
                return res.status(500).send('Error : OTP not created');                  
              }
            return res.status(200).json(userObj);

          },function(error){            
            return res.status(500).send(error);
          });

        }

    });

    app.post('/otp/verify/add', function(req,res,next) {        

        var data = req.body || {};    
       
        if(data){
          global.TwilioService.verifyOTP(data.phoneNumber,data.otpCode).then(function(userObj) {
              if (!userObj) {                  
                return res.status(500).send('Error : OTP not verified or OTP got expired');                    
              }
            return res.status(200).json(userObj);

          },function(error){            
            return res.status(500).send(error);
          });

        }

    });

    app.post('/otp/send/modify', function(req,res,next) {        

        var data = req.body || {};     
       
        if(data){

          global.TwilioService.modifySendOTP(data.phoneNumber,data.jobId,data.work).then(function(userObj) {
              if (!userObj) {                  
                return res.status(500).send('Error : OTP not created');                 
              }
            return res.status(200).json(userObj);

          },function(error){
            return res.status(500).send(error);
          });

        }

    });

    app.post('/sms/jobs', function(req,res,next) {        

        var data = req.body || {};     
       
        if(data){

          global.TwilioService.SMSJobs(data.phone,data.jobsArray).then(function(msgBody) {
              if (!msgBody) {                  
                return res.status(500).send('Error : Something went wrong');                 
              }
            return res.status(200).json(msgBody);

          },function(error){
            return res.status(500).send(error);
          });

        }

    });

    return app;
}

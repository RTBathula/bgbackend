'use strict';

var Q = require('q');
var keys = require('../config/keys');
var _ = require('underscore');
var OTP = require('otp.js');
var randomString = require('random-string');
var CB = require('../config/db.js')();
var moment = require('moment');
var client = require('twilio')(keys.twilioKeys.sid, keys.twilioKeys.token);


module.exports = function(){

  return {

          sendOTP: function (user) {            
            var self = this;
            var deffered = Q.defer();  

            var res=generateOTP(user.phone);
            if(res.code){

              var message="Your OTP Code to post job in Bullgrunt is: "+res.code;
              var payload = {
                to: user.phone,
                from: keys.twilioKeys.fromNumber,
                body: message,
              };

              client.sendSms(payload, function (err,body) {
                if (err) {
                  deffered.reject(err);                
                }else if(body){
                  //Save the user
                  user.authOTP.randStringforOTP=res.forString;
                  user.authOTP.otpGenerated=res.code;
                  global.UserService.upsertUser(user)
                  .then(function(respUserObj){ 
                   
                    console.log("OTP Sent successfully to: "+user.phone+" from: "+body.from);
                    console.log("message: "+body.body);
                    deffered.resolve(respUserObj);   

                  },function(error){ 
                    deffered.reject(error);               
                  });
                }

              });
            }                   

            return deffered.promise;
          },
          verifyOTP: function (phoneNumber,otpCode) {

            var deffered = Q.defer(); 

            global.UserService.findUserByPhone(phoneNumber)
            .then(function(respUserObj){ 

                if(respUserObj){
                  var updatedAt=new Date(respUserObj.get("updatedAt"));
                  updatedAt=moment(updatedAt);
                  updatedAt=updatedAt.add(10, 'minutes');
                  var now = moment();

                  /*if(now>=updatedAt){
                    deffered.reject("This OTP is expired or timedout");

                    respUserObj.set("authOTP",null);
                    global.UserService.saveCBUserObj(respUserObj);
                  }else{*/
                    var forString=respUserObj.get("authOTP").randStringforOTP;
                    var result=OTPVerification(forString,otpCode);
                    if(result){
                      deffered.resolve(respUserObj);
                    }
                  //} 

                }else{
                  deffered.reject("We didn't see any phonenumber attached with this OTP");
                } 
                      
                                     
            },function(error){ 
              deffered.reject(error);               
            });

            return deffered.promise;
          },         
          modifySendOTP: function (phoneNumber,jobId,work) {            
            var self = this;
            var deffered = Q.defer(); 

            var respUserObj=null;

            global.UserService.findUserByPhone(phoneNumber)
            .then(function(userObj){ 
              respUserObj=userObj;
              var userId=respUserObj.get("id");
              return global.JobService.findJobByIdAndUserId(jobId,userId);

            }).then(function(respJobObj){

              return sendOTPToModify(respUserObj,phoneNumber,work);

            }).then(function(userObj){ 

              deffered.resolve(userObj);               
                                     
            },function(error){ 
              deffered.reject(error);               
            });                             

            return deffered.promise;
          },                  
          SMSJobs: function (phoneNumber,jobsArray) {            
            var self = this;
            var deffered = Q.defer(); 

            var message="";
            for(var i=0;i<jobsArray.length;++i){
              var eachJobDet;
              eachJobDet=(i+1)+"."+jobsArray[i].companyName;

              //Concat
              message.concat(eachJobDet);               
            }

            var payload = {
              to: phoneNumber,
              from: keys.twilioKeys.fromNumber,
              body: message,
            };

            client.sendSms(payload, function (err,body) {
              if (err) {
                deffered.reject(err);                
              }else if(body){
                deffered.resolve(body);

                console.log("SMS Sent successfully to: "+phoneNumber+" from: "+body.from);
                console.log("message: "+body.body);
              }

            });                                                  

            return deffered.promise;
          }
    };


    /* Private Functions */

    function sendOTPToModify(UserObj,phoneNumber,work){
      var deffered = Q.defer();
      
      var res=generateOTP(phoneNumber);
      if(res.code){

        var message="Your OTP Code to "+work+" the job in Bullgrunt is: "+res.code;
        var payload = {
          to: phoneNumber,
          from: keys.twilioKeys.fromNumber,
          body: message,
        };

        client.sendSms(payload, function (err,body) {
          if (err) {
            deffered.reject(err);                
          }else if(body){
            console.log("OTP Sent successfully to: "+phoneNumber+" from: "+body.from);
            console.log("message: "+body.body);       

            //Save the user
            var keys={
              randStringforOTP:res.forString,
              otpGenerated:res.code
            };

            UserObj.set("authOTP",keys);            
            global.UserService.saveCBUserObj(UserObj)
            .then(function(respUserObj){ 
              deffered.resolve(respUserObj);                                     
            },function(error){ 
              deffered.reject(error);               
            });
            //End of save user
          }

        });
      } 

      return deffered.promise;
    }

    function generateOTP(phoneNumber){
      var HOTP = OTP.hotp;

      try
      {
          var randString = randomString();
          randString=phoneNumber+""+randString;

          // generate otp for key 'randString' in string format
          var code = HOTP.gen({string:randString});

          var reply={
            forString:randString,
            code:code
          };
         
          return reply;
      }
      catch(ex)
      {
          console.error(ex); // print error occurred during OTP generation process
          return null;
      }

    }

    function OTPVerification(forString,otpCode){     
      var HOTP = OTP.hotp;
      try{        
          var result = HOTP.verify(otpCode, {string:forString});          
          return result;
      }
      catch(ex)
      {
          console.error(ex); // print error occurred during OTP verification process
      }

    }

};
      
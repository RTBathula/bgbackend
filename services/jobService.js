'use strict';

var Q = require('q');
var keys = require('../config/keys');
var _ = require('underscore');
var OTP = require('otp.js');
var CB = require('../config/db.js')();
var client = require('twilio')(keys.twilioKeys.sid, keys.twilioKeys.token);


module.exports = function(){

    return {        
      
      findJobByIdAndUserId: function (jobId,userId) { 
      	var self = this;

      	var deffered = Q.defer();

      	var query = new CB.CloudQuery("Job");
      	var userObj = new CB.CloudObject('BullUser',userId);  

		    query.equalTo('_user', userObj);

		    query.findById(jobId, {
        success: function(obj){
          deffered.resolve(obj); 
        },error: function(err) {
          deffered.reject(err);
        }
        }); 

		return deffered.promise;
      }

      
    };  

    /* Private Functions */


};

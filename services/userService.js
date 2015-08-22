'use strict';

var Q = require('q');
var keys = require('../config/keys');
var _ = require('underscore');
var OTP = require('otp.js');
var CB = require('../config/db.js')();
var client = require('twilio')(keys.twilioKeys.sid, keys.twilioKeys.token);


module.exports = function(){

  return {        
      upsertUser: function (userModel) { 
      	var self = this;

      	var deffered = Q.defer(); 

      	self.findUserByPhone(userModel.phone)
      	.then(function(respUserObj){

            if(!respUserObj){
           	  var obj = new CB.CloudObject("BullUser");
		      obj.set("name", userModel.name); 
		      obj.set("email", userModel.email); 		     
		      obj.set("password", userModel.password); 
		      obj.set("phone", userModel.phone);		      
		      obj.set("isDataEntry", userModel.isDataEntry);
		      obj.set("isCallOperator", userModel.isCallOperator);
		      obj.set("isAdmin", userModel.isAdmin);
		      obj.set("isEmployer", userModel.isEmployer);
		      obj.set("isJobSeeker", userModel.isJobSeeker);
		      obj.set("authOTP", userModel.authOTP);	     

		      obj.save({success: function(obj) {
				deffered.resolve(obj);
			  },error: function(err) {
				deffered.reject(err); 
			  }
			  });
		      
            }else{
        	  respUserObj.set("name", userModel.name); 
		      respUserObj.set("email", userModel.email); 		       
		      respUserObj.set("password", userModel.password); 
		      respUserObj.set("phone", userModel.phone); 		     
		      respUserObj.set("isDataEntry", userModel.isDataEntry);
		      respUserObj.set("isCallOperator", userModel.isCallOperator);
		      respUserObj.set("isAdmin", userModel.isAdmin);
		      respUserObj.set("isEmployer", userModel.isEmployer);
		      respUserObj.set("isJobSeeker", userModel.isJobSeeker);
		      respUserObj.set("authOTP", userModel.authOTP);

		      respUserObj.save({success: function(obj) {
				deffered.resolve(obj);
			  },error: function(err) {
				deffered.reject(err); 
			  }
			  });
            }
            
                                      
        },function(error){ 
        	deffered.reject(error);               
        });

	      
	    return deffered.promise;
      },
      findUserByPhone: function (phoneNumber) { 
      	var self = this;

      	var deffered = Q.defer();

      	var query = new CB.CloudQuery("BullUser");
		query.equalTo('phone', phoneNumber);

		query.findOne({success: function(object){			
		  deffered.resolve(object);  	
		},error: function(err) {
		  deffered.reject(err);
		}
		});

		return deffered.promise;
      },
      getUserList: function () { 
      	var self = this;

      	var deffered = Q.defer();

      	var query = new CB.CloudQuery("BullUser");		

		query.find({success: function(list){			
		  deffered.resolve(list);  	
		},error: function(err) {
		  deffered.reject(err);
		}
		});

		return deffered.promise;
      },
      saveCBUserObj: function (CBUserObj) { 
      	var self = this;

      	var deffered = Q.defer();

      	CBUserObj.save({success: function(obj) {
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

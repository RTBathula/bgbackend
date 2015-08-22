var CB = require('cloudboost');
var keys = require('./keys.js');

module.exports = function(){
	CB.CloudApp.init(keys.cloudboostKeys.appId,keys.cloudboostKeys.clientKey);
	return CB; 
}

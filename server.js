global.isDevelopment = process.env.PORT ? false : true;
var app = require('./app')();

app.set('port', process.env.PORT || 1444);

var server = app.listen(app.get('port'), function() {

});

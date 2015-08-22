# CloudBoost.io : Hybrid No-Sql Database as a Service



## NPM Installation
```
npm install cloudboost
```


### NodeJS Usage

``` js

var CB = require('cloudboost');

// AppID and AppKey are your App ID and kKy of the application created in CloudBoost Dashboard.

//Init your Application
CB.CloudApp.init('YourAppId','YourAppKey');

//Data Storage : Create a CloudObject of type 'Custom' (Note: You need to create a table 'Custom' on CloudBoost Dashboard)

var obj = new CB.CloudObject('Custom');

//Set the property 'name' (Note: Create a column 'name' of type text on CloudBoost Dashboard)
obj.set('name','CloudBoost');

//Save the object
obj.save({
    success:function(res){
        console.log("object saved successfully");
    },
    error:function(err){
        console.log("error while saving object");
    }
});

```


### JavaScript Usage

``` js

// AppID and AppKey are your App ID and kKy of the application created in CloudBoost Dashboard.

//Init your Application
CB.CloudApp.init('YourAppId','YourAppKey');

//Data Storage : Create a CloudObject of type 'Custom' (Note: You need to create a table 'Custom' on CloudBoost Dashboard)

var obj = new CB.CloudObject('Custom');

//Set the property 'name' (Note: Create a column 'name' of type text on CloudBoost Dashboard)
obj.set('name','CloudBoost');

//Save the object
obj.save({
    success:function(res){
        console.log("object saved successfully");
    },
    error:function(err){
        console.log("error while saving object");
    }
});

```
<img align="right" height="150" src="https://cloud.githubusercontent.com/assets/5427704/7724257/b7f45d6c-ff0d-11e4-8f60-06024eaa1508.png">
#### Documentation

Visit the [CloudBoost Docs](http://docs.cloudboost.io) for documentation.


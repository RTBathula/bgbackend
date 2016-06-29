# LunaLights Device backend
The device backend repo for Lunalights, where it handles the device REST request and queue webhooks.

# Getting Started
To run this repo, switch to development or staging or production  by setting "serverRunON" in server.js file

Example: in server.js

```
global.serverRunON="development";
```

##Options

*development </br> 
*staging</br>
*production

##Run the server
Run the backend by following command

``node server.js``

##Open in the browser
Go to http://localhost:8002 in the browser to confirm backend is running

#Configuration
Add or remove keys for different services in keys/development.js, keys/staging.js, keys/production.js

#LICENSE

Copyright 2016

# LunaLights Frontend
Frontend dashboard for Lunalights Admin and also for Companies(Clients)

# Getting Started
To run this repo, switch to development or staging or production  by setting "serverRunON" in app/config/app.js file

Example: under app/config/app.js
```
var serverRunON="development";
```

##Options

*development </br> 
*staging</br>
*production

##Run the server
Run the frotend by following command

``node server.js``

##Open in the browser
Go to http://localhost:1440 in the browser

#SubDomain and Admin Login
Companies or Clients can login to dashboard by navigating to their subDomains.
Example: ``http://companyName.livilum.com``

As subDomain is not possible in locahost or staging, you need to set Full URL in variable **absUR** in init() function of app/controllers/loginController.js 

Example:app/controllers/loginController.js

Development
```
var absURL="http://www.companyName.localhost:1440";// for development
```

Staging
```
var absURL="http://www.companyName.llbackend.ap-southeast-1.elasticbeanstalk.com";// for staging
```
Production
```
var absURL=$location.absUrl();// for production
```

##Login as  Admin
To login as admin, leave *absURL* as to take absolute URL  and enter admin username and password

Example:under app/controllers/loginController.js
```
var absURL=$location.absUrl();
```


#LICENSE

Copyright 2016

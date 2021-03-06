## Article Annotator

Article Annotator is a streamlined web app that allows users to collaboratively add annotations to an online source's text. Because it does not save any user data, it allows for quick access to a shared annotation space in privacy-focused environments like schools.

## Getting started

This is a Node.js project, so the first step after cloning the repo is running `npm i` in the **both** front-end and back-end. Each directory has a separate set of dependencies specified in front-end/package.json and back-end.package/json, and this command will install those dependencies. 

Additionally, it is necessary to install MongoDB and run it. In back-end/server.js, the MongoDB host, port, database, username, and password are specified. The host, username, and password are specified by environment variables MONGODB_SERVICE_HOST, MONGODB_USER, and MONGODB_PASSWORD respectively and the port and database are hard-coded as the defaults of 27017 and sampledb. It is not necessary to set these environment variables for unsecure local development, as MongoDB does not require a username and password by default.

Once the Node dependencies are installed and MongoDB is running, the front-end and back-end must be started separately. The back-end can be started by the command `npm run dev` in back-end and the front-end can be started by the command `npm start` in front-end.

These instructions were last tested on November 13, 2019 by hughdwhite on Windows 10 version 1803.
 
## Testing

All tests are present in front-end/src/\_\_tests\_\_. They can be run by navigating to front-end and running `npm test`, which will launch the Jest test environment. Running `npm test -- --coverage --watchAll` will generate a coverage report alongside running the tests.

## Deployment

The production system is currently deployed to [Carolina CloudApps](https://cloudapps.unc.edu/). Access can be requested by contacting the project's current director as listed on the about page.

The deployment consists of three pods, one for the front-end, one for the back-end API, and one for the database. Configuration is quite simple, consisting solely of an environment variable in the front-end deployment to point the front-end pages at the back-end API and three environment variables in the back-end related to accessing the database.

## Technologies used

Article Annotator makes use of the following technologies:

* MongoDB for its database management system
* Node.js for its back-end framework
* React for its front-end framework
* Carolina CloudApps for its host

The rationale and decision process for selecting each of these technologies can be found at **folder ADR**

## Contributing

If a devloper wishes to contribte to the project there are a few steps to take. First, contact Dr. Todd Cherner of the UNC School of Education who is the owner of this app. After his approval you will need access to his Carolina CloudApps account which is where the project is being hosted. From there a devloper should be able to make any changes he/she wishes. Just clone the current Git-Hub Repo in use and deploy the new changes you wish to make on Carolina CloudApps.
For more info about the project visit our project website at: http://articleanalyzer.web.unc.edu/

## Authors

As of November 13, 2019, Article Annotator is the work of three people:

* Yu Ji, back-end lead
* Jacob Thomas, project-manager and developer
* Hugh White, front-end lead and client manager

## License

Copyright (c) 2019 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Acknowledgements

* First, we would like to acknowledge Dr. Todd Cherner of the UNC School of Education for bringing forth his idea too UNC's Software      Engineering class to be made.
* Second, we want to acknowledge our professor Dr. Jeff Terrell for making this possible and being a great resource in and out of class.
* Third, a speical thanks to our mentor during this project William Mowery who took time out of his schedule every week to meet with our team to assist with any advice or help trouble shooting any issues we had with the project. 

# Video Player Site Angular

An Angular Video Player Application that adds in new videos, playback old videos, update and delete videos. This is a beginner MEAN stack application that one should develop when he is starting with his FULL STACK learning. 

This is a hands-on on how to develop a MEAN Application from scratch.

## Topics covered here
- Node  
- Express  
- MongoDB   
- MLab   
- API verification via Postman  
- Basic Angular  


## MEAN

-	It is a free and open source stack to build web apps. It uses  
	- MongoDB: NoSQL Database  
	- Express: Web Framework that runs on Node  
	- Angular: Client-Side development platform  
	- Node: Execution environment  
  
  
## Start building application 

### Initializing the code  

-	Install Node   
  `npm init`  
  
-	Then install angular CLI, angular CLI is a command line interface tool for building angular applications quicker and easier, do it with following command in cmd  
  `npm install -g @angular/cli`

-	`ng new ngApp –routing`  
  This creates a new angular project with the routing module  

-	We then move into the folder location and then we run the command  
  `ng serve -o`
  This opens the application in the browser which gives the result ‘app works!’  

-	To connect this angular application with the express server, Angular CLI provides another command that is   
  `ng build`  
  This will create a distributable folder of the entire angular application. This is now going to be fed into the express server.  
  
- Now we create the express server. Thus we run the command  
  `npm install --save express body-parser`  
  **express** is the server   
  **body-parser** is the middleware to handle form data  

### Server.js

-	Now for express server, create a file ‘server.js’ in the root of the angular application.   
-	In this server.js, we include the express and the body-parser that we have just installed   
-	We also include a built in ‘path’ module that is a better alternative than string concatenation when joining paths.  
    ```
    const express = require(‘express’);
    const bodyParser = require(‘body-parser’);
    const path = require(‘path’);  
    ```

-	Next declare the routes for the application.  
``` const api = require(‘./server/routes/api’); ```

-	Then specify the port for the server   
  `const port = 3000;`

-	Then create an instance for express  
  `const app = express();`

-	Then we specify the folder where all the angular code is placed   
    `app.use(express.static(path.join(__dirname, ‘dist’)));`  
  This joins the path of the current folder with the ‘dist’ folder. This thus gives express the access to the distributable folder.  

-	Then we specify some code for body-parser middleware.  
    `app.use(bodyParser.urlencoded({extended: true}));`  
    This basically parses the text as url encoded data.  

    `app.use(bodyParser.json());`  
    This parses the text as the JSON. It allows JSON like experience to work with.  

-	We have created the route for the application. So now we teach express when to use it.  
    `app.use(‘/api’, api);`
  for any other route other than /api the server will have to render the index.html page in the distributable folder.  
    ```
    app.get(‘*’, (res, req) =>  {
      res.sendFile(path.join(__dirname, ‘dist/index.html’));
    });
    ```  
    Thus now if you browse localhost:3000 then the express knows that it has to serve index.html.    
    Similarly for localhost:3000/api, express will use api route and execute api.js in the routes folder.   

-	Last step in server.js is to listen to request on port 3000.  
    ```
    app.listen(port, function(){  
      console.log(“Server running on localhost: ” + port);
    });
    ```
    
### api.js (server/routes)

-	we include the express   
  `const express = require(‘express’);`

-	then we create an instance of express Router   
  `const router = express.Router();`

-	Then for any incoming requests we send back a string which is ‘api works’  
    ```
    router.get(‘/’, function(req, res){
      Res.send(‘api works!’);
    });
    ```

-	Then ofcourse we need to export the router  
  `module.exports = router;`

-	We can now test out server by running the server.js in the command prompt  
  `node server`  
  Then we can run the localhost:3000 and get the desired result.  
  

### MongoDB on mLab

-	We then create a database in the mlab directly. 
-	There we create an account.
-	Then we create a sandbox database 
-	We also create a username for the database.
-	Then we create a collection by the name of ‘videos’
-	Then in videos we put in 3 documents 


### Mongoose

-	Whenever a user makes a request to the server be it GET, POST, PUT or DELETE, the server needs to interact with MongoDB to perform the required operations. For this interaction me make use of mongoose.
-	Mongoose is just another npm package that provides mongodb object mapping. Or in simpler terms mongoose translates data in the database to JavaScript Object for use in our application.
-	`npm install –save mongoose`
This is used to install the mongoose package in the project folder

-	Now we need to have a blueprint or the schema of the Object in the database
-	Thus now we create a **/models/video.js**


### video.js

-	In this first we require the mongoose that was just installed  
  `const mongoose = require(‘mongoose’);`

-	Then we get the instance of mongoose schema  
  `const Schema = mongoose.Schema;`

-	Then we create a new schema for the video data in the MongoDB 
    ```
    const videoSchema = new Schema({
      title: String,
      url: String,
      description: String
    })
    ```  
  This is basically a blueprint of the object in the mongo database  

-	Now we create a model from the schema.   
  `module.exports = mongoose.model(‘video’, videoSchema, ‘videos’)`  
  *mongoose.model* is used to create a model and the name of the model is ‘video’  
  This is going to represent a videoSchema, basically a video model is going to have a title, url and a description.  
  Third argument in the model is the name of the collection in the Mongo database.  
  Then we finally assign it to module.exports because this model is going to be used elsewhere.  

-	Now we have a mongoose model to perform the CRUD operations, now we just need to connect to the database that has been created.  
-	All the database requests are managed in the api route, so the database connection happens in the api.js file.  


### api.js (continued)

-	In api.js, we require the mongoose module  
  `const mongoose = require(‘mongoose’);`

-	Next we need the url to the mongo database, this we get from the mlab   
  `mongodb://<dbuser>:<dbpassword>@ds243418.mlab.com:43418/videoplayertrial`  
  use the *dbuser* and the *dbpassword* as mentioned in the mlab   
  `const db = “mongodb://<dbuser>:<dbpassword>@ds243418.mlab.com:43418/videoplayertrial”`

-	`mongoose.Promise = global.Promise`  
  This is just to avoid an warning that the mongoose is going throw at us  

-	Then we connect to the database using,  
    ```
    mongoose.connect(db, function(err) {
      if(err){
        console.error(“Error!  ” + err);
      }
    });
    ```
  We connect to database by mongoose.connect by passing the db string. And if there is error we log to the console what the error is 
  

### Creating APIs (api.js)

**Fetch Videos from the database**

-	First we import the video model   
  `const Video = require(‘../models/video’);`  
  we go up one folder and then into the models folder to get the video file  

-	Then we make a function for GET request for videos   
    ```
    router.get(‘/videos’, function(req, res) {
      console.log(‘Get request for all videos’);
      Video.find({})
      .exec(function(err, videos) {
        if(err) {
          console.log(“Error retrieving videos”);
        } else {
          res.json(videos);
        }
      });
    });
    ```
    Mongoose provide a find() method on the Video model and Video model is connected to the videos collection in the video player database.  
    Now once we find all the videos then we exec another method, and if there is error then we are going to log it and else if videos are actually returned then we are going to send them as response to the browser  
    Then you run the application and it will give all the data in the JSON format.  

-	Fetch only a single video with its ID 
    ```
    router.get('/video/:id', function(req, res) {
      console.log("Fetch a single video");
      Video.findById(req.params.id)
      .exec(function(err, video) {
        if(err) {
          console.log(err);
        } else {
          res.json(video);
        }
      }); 
    });
    ```
    The url now becomes /video/:id which suggest to enter the id   
    Now the Video model uses the mongoose method of findById() to find the data be the given id. This takes in the parameter req.params.id which gives it the id in the url.  


**POST Videos in the database** 

- Now we use the post method.  
    ```
    router.post('/video', function(req, res) {
      console.log("Post a video");
      var newVideo = new Video();
      newVideo.title = req.body.title;
      newVideo.url = req.body.url;
      newVideo.description = req.body.description;
      newVideo.save(function(err, video) {
        if(err){
          console.log("Error saving video");
        } else {
          res.json(video);
        }
      });
    });
    ```
    We create an instance of a Video Model in which we store the new video data that we fetch from the body of the request we get from the URL.   
    Then we use the save method to put in this data into the database. Then we have a function that gives us an access to the error and the inserted video data.   

  
**Update video in the database**

-	Now for update PUT request has to be used.  
-	It gives us a function that provides us the access to the request and response object.   
-	Mongoose provide a method on Video model that is findByIdAndUpdate(), which takes in 4 parameters.  
  -	First is the ID of the video we want to update.  
  -	 Second id is the Object set of new and updated values that we want to get updated  
  -	Third argument is again an Object, which is new: true.  
    If new is set to true, then the function gives the value of the Updated video   
    If new is set to false, then the function will return the values of the old video.  
  - Fourth argument is the function that will have either an error or the update video  

    ```
    router.put('/video/:id', function(req, res) {
      console.log("Update the video");
      Video.findByIdAndUpdate( req.params.id, 
        {
          $set: {
            title: req.body.title, 
            url: req.body.url, 
            description: req.body.description
          } 
        },
        {
          new: true
        },
        function(err, video) {
          if(err){
            console.log("Error saving video");
          } else {
            res.json(video);
          }
        }
      );
    });
    ```

**Delete Videos from the database**

-	Now we use the delete request
-	Mongoose provide a method findByIdAndRemove() that helps to delete the video. This again takes in parameters
  -	First argument is the id of the video 
  -	Second argument id going to be the function that gives a error or the value of the deleted video. 

    ```
    router.delete('/video/:id', function(req, res) {
      console.log("Delete a video");
      Video.findByIdAndRemove( req.params.id, function(err, video) {
        if(err){
          console.log("Error deleting video");
        } else {
          res.json(video);
        }
      });
    });
    ```

### POSTMAN
-	It is a Chrome extension that makes the testing of APIs very easy. 
-	In order to test, create or delete APIs Postma is necessary. 
-	It prevents the creation of any form or a front end to submit any data. 


Angular part of the application will be written somewhere in future.  
Email me whenever its required. I will forward you the complete doc file of angular. 


Hope so you learned a lot from the MEAN Stack.  
This was the most basic application with MEAN stack but covering mostly all the basic features. So now is the time to take our learning forward developing some more complex applications on MEAN Stack. 

Thank you!



   
   


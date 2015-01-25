// server.js

// BASE SETUP
// ==========================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var db = require('mongoose');
var dbUrl = require('./config/db.js');

db.connect(dbUrl.url);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var htmlRouter = express.Router();          // to return index.html
var apiRouter = express.Router();              // get an instance of the express Router

// Our user model
var User = require('./app/model/user');

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
apiRouter.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

apiRouter.route('/users')
    .post(function(req, res) {
        var user = new User();      // create a new instance of the User model
        console.log(req.body);
        user.name = req.body.name;  // set the users name (comes from the request)
        console.log(user.name);

        // save the user and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });
    });

// more routes for our API will happen here
htmlRouter.get('/', function(req, res) {
   res.sendfile('./UI/views/index.html', {root: __dirname });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', apiRouter);
app.use('/', htmlRouter);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
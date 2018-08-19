// import library
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var morgan = require('morgan');

var indexRoutes = require("./routes/index");

// config port
var port = 3001;

// parse the request body
app.use(bodyParser.urlencoded({extended: true}));

// for PUT request
app.use(methodOverride("_method"));

// use morgan to log requests to the console
app.use(morgan('dev'));

// main route
app.use("/", indexRoutes);
//seed();

app.use((req, res, next) => {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.send('404');
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

// handling error; throw new Error('oops')
app.use((err, request, response, next) => {
  // log the error, for now just console.log
  console.log(err);
  response.status(500).send('Something broke!');
});

// start the server, change the world .
app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`)
});

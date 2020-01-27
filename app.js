require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');


mongoose
  .connect('mongodb://localhost/create-read-examples', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

// app.use(require('node-sass-middleware')({
//   src:  path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   sourceMap: true
// }));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// static means we won't need to use / to locate file
app.use(express.static(path.join(__dirname, 'public')));
// fav icon is the image on the tab
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local - on index.hbs
app.locals.title = 'Express - Generated with IronGenerator';


// where all routes are created/rendering. "/" respresents the endpoint. Must list all paths you want in this section.
const index = require('./routes/index');
app.use('/', index);
app.use('/', require("./routes/create-read/form-page"))


module.exports = app;

//Use this as an example for pathway used in second project


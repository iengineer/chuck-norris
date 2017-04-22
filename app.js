const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // event logger);
const Chuck = require('chucknorris-io');
const app = express();
const client = new Chuck();

// -------- CONFIGURATION --------- //
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout.ejs');

app.use(morgan('dev')); // first so it can run before everything and log.
app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));



// -------- VIEWS --------- //

app.get('/', (req, res, next) => {
  res.render('home-view.ejs');

});

app.get('/joke-view', (req, res, next) => {
  res.render('joke-view.ejs');

});

app.get('/joke-category', (req, res, next) => {
  res.render('joke-category.ejs');

});

app.get('/random-joke-view', (req, res, next) => {
  client.getRandomJoke().then((jokeData) => {
    console.log('Here is a joke!');
    console.log(jokeData);
  res.render('random-joke-view.ejs', {
    // joke"key": "val"
    });
  });
});


app.listen(3000, function() {
  console.log('Server Started on port 3000!');
})

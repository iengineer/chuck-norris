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

app.get('/categories', (req, res, next) => {
  if (req.query.cat === undefined) {
    client.getJokeCategories().then((categoriesData) => {
      console.log('\ngetJokeCategories()');
      console.log(categoriesData);

      res.render(
        'joke-categories.ejs',
        { categories: categoriesData }
      );
    });
  }
  else {
    client.getRandomJoke(req.query.cat).then((jokeData) => {
      console.log(`\ngetRandomJoke(${req.query.cat})`);
      console.log(jokeData);

      res.render(
        'joke-category.ejs',
        {
          joke: jokeData.value,
          category: req.query.cat
        }
      );
    });
  }
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke().then((jokeData) => {
    // Smart to console log the result, to know the structure.
    console.log('\ngetRandomJoke()');
    console.log(jokeData);

  res.render('random-joke-view.ejs',
    {
      joke: jokeData.value
    });
  });
});


app.listen(3000, function() {
  console.log('Server Started on port 3000!');
})

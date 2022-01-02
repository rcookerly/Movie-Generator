const express = require('express');
const path = require('path');
const { Movie } = require('./db');
const { syncAndSeed } = require('./seed');

const port = process.env.PORT || 3000;
const DIST_PATH = path.join(__dirname, '../dist');
const HTML_PATH = path.join(__dirname, '../src/index.html');
const PUBLIC_PATH = path.join(__dirname, '../public');

const app = express();

// Body parsing middleware (only needed for POST & PUT requests)
app.use(express.json());

// Static file-serving middleware
app.use(express.static(DIST_PATH));
app.use(express.static(PUBLIC_PATH));

// Sends our index.html (the "single page" of our SPA)
app.get('/', (req, res) => {
  res.sendFile(HTML_PATH);
});

// Movies should be sorted on stars in descending order, then by title
app.get('/api/movies', async(req, res, next) => {
  try {
    const movies = await Movie.findAll({
      order: [
        ['rating', 'DESC'],
        ['title', 'ASC']
      ]
    });
    res.send(movies);
  }
  catch(ex) {
    console.log(ex);
    next(ex);
  }
});

// This middleware will catch any URLs resembling a file extension
// for example: .js, .html, .css
// This allows for proper 404s instead of the wildcard '#<{(|' catching
// URLs that bypass express.static because the given file does not exist.
app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) {
    res.status(404).end();
  }
  else {
    next();
  }
});

// Error catching endware
app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const init = async() => {
  try {
    await syncAndSeed();
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  }
  catch(ex) {
    console.log(ex);
  }
};

init();

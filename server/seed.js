const randomMovieNames = require('random-movie-names');
const { db, Movie } = require('./db');

const syncAndSeed = async() => {
  await db.sync({ force: true });

  // Seed 5 movies
  for (let i = 0; i < 5; i++) {
    const newMovie = await Movie.create({
      title: randomMovieNames()
    });
  }
};

module.exports = {
  syncAndSeed
}

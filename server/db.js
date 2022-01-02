const Sequelize = require('Sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/movie_generator');
const { INTEGER, STRING, UUID, UUIDV4 } = Sequelize;

const Movie = db.define('movie', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  title: {
    type: STRING,
  },
  rating: {
    type: INTEGER,
    defaultValue: 3,
    validate: {
      min: 1,
      max: 5
    }
  }
});

module.exports = {
  db,
  Movie
};

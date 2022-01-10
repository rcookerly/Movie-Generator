import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieList from './MovieList';
import { fetchMovies, addMovie } from '../redux/store'

class App extends Component {
  // Todo: Why doesn't this component need a constructor?
  /*
  constructor() {
    super();
  };
  */

  async componentDidMount() {
    this.props.fetchMovies();
  };

  calculateAverageRating = () => {
    const { movies } = this.props;
    const totalRatings = movies.reduce((total, movie) => {
      total += movie.rating;
      return total;
    }, 0);
    return (totalRatings / movies.length).toFixed(2);
  };

  render() {
    const { movies, addMovie } = this.props;
    return (
      <div>
        {
          movies.length
            ? <div>The average rating is {this.calculateAverageRating()}!</div>
            : null
        }
        <button onClick={addMovie}>Generate Random Movie</button>
        {
          movies.length
            ? <MovieList />
            : <div>There are no movies!</div>
        }
      </div>
    )
  };
};

const mapStateToProps = ({ movies }) => {
  // Return an object where the keys are the name of the prop your component wants
  // Values are the actual parts of the global state your component wants
  return {
    movies
  };
};

const mapDispatchToProps = { fetchMovies, addMovie };

// Connect takes two arguments
// 1. What parts of state do you want?
// 2. What actions do you want to dispatch?
export default connect(mapStateToProps, mapDispatchToProps)(App);

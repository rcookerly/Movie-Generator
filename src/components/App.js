import React, { Component } from 'react';
import axios from 'axios';
import MovieList from './MovieList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/movies');
      this.setState({
        movies: data
      });
    }
    catch(ex) {
      console.log(ex);
    }
  };

  addMovie = async() => {
    try {
      const { movies } = this.state;
      const { data } = await axios.post('/api/movies');
      this.setState({
        movies: [...movies, data]
      });
    }
    catch(ex) {
      console.log(ex);
    }
  };

  deleteMovie = async(id) => {
    try {
      const { movies } = this.state;
      await axios.delete(`/api/movies/${id}`);
      this.setState({
        movies: movies.filter(movie => {
          return movie.id !== id;
        })
      });
    }
    catch(ex) {
      console.log(ex);
    }
  };

  incrementRating = async(movie) => {
    try {
      const { movies } = this.state;
      movie = {...movie, rating: movie.rating + 1};
      await axios.put(`/api/movies/${movie.id}`, movie).data;
      this.setState({
        movies: movies.map((i) => {
          return movie.id === i.id ? movie : i;
        })
      });
    }
    catch(ex) {
      console.log(ex);
    }
  };

  decrementRating = async(movie) => {
    try {
      const { movies } = this.state;
      movie = {...movie, rating: movie.rating - 1};
      await axios.put(`/api/movies/${movie.id}`, movie).data;
      this.setState({
        movies: movies.map((i) => {
          return movie.id === i.id ? movie : i;
        })
      });
    }
    catch(ex) {
      console.log(ex);
    }
  };

  calculateAverageRating = (movieArr) => {
    const totalRatings = movieArr.reduce((total, movie) => {
      total += movie.rating;
      return total;
    }, 0);
    return movieArr.length ? (totalRatings / movieArr.length).toFixed(2) : 0
  };

  render() {
    const { movies } = this.state;
    return (
      <div>
        <div>The average rating is {this.calculateAverageRating(movies)}!</div>
        <button onClick={this.addMovie}>Generate Random Movie</button>
        {movies.length
          ? <MovieList
              movies={movies}
              deleteMovie={this.deleteMovie}
              incrementRating={this.incrementRating}
              decrementRating={this.decrementRating}
            />
          : <div>There are no movies!</div>
        }
      </div>
    )
  };
};

export default App;

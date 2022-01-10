import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteMovie, incrementRating, decrementRating } from '../redux/store';

// Todo: Why does this have to be a class component? Functional component doesn't work for some reason
class MovieList extends Component {
  // Todo: Why doesn't this component need a constructor?
  /*
  constructor() {
    super();
  };
  */
  render() {
    const { movies, deleteMovie, incrementRating, decrementRating } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <th>Remove</th>
            <th>Title</th>
            <th>Stars</th>
            <th>Increment</th>
            <th>Decrement</th>
          </tr>
          {
            // Movies should be sorted on stars in descending order, then by title
            movies.sort((a,b) => (b.rating - a.rating || a.title.localeCompare(b.title))).map(movie => {
              return (
                <tr key={movie.id}>
                  <td>
                    <button onClick={() => deleteMovie(movie.id)}>X</button>
                  </td>
                  <td>{movie.title}</td>
                  <td>{movie.rating}</td>
                  <td>
                    {movie.rating >= 1 && movie.rating < 5
                      ? <button onClick={() => incrementRating(movie)}>+</button>
                      : <button disabled={true}>+</button>
                    }
                  </td>
                  <td>
                    {movie.rating > 1
                      ? <button onClick={() => decrementRating(movie)}>-</button>
                      : <button disabled={true}>-</button>
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  };
};

const mapStateToProps = ({ movies }) => {
  return {
    movies
  };
};

const mapDispatchToProps = { deleteMovie, incrementRating, decrementRating };

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);

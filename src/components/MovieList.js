import React from 'react';

const MovieList = ({ movies, deleteMovie, incrementRating, decrementRating }) => {
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

export default MovieList;

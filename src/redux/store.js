import { applyMiddleware, combineReducers, createStore } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// Action types
const FETCH_MOVIES = 'FETCH_MOVIES';
const ADD_MOVIE = 'ADD_MOVIE';
const DELETE_MOVIE = 'DELETE_MOVIE';
const INCREMENT_RATING = 'INCREMENT_RATING';
const DECREMENT_RATING = 'DECREMENT_RATING';

// Action creators
const _fetchMovies = (movies) => {
  return {
    type: FETCH_MOVIES,
    movies
  };
};

const _addMovie = (movie) => {
  return {
    type: ADD_MOVIE,
    movie
  };
};

const _deleteMovie = (id) => {
  return {
    type: DELETE_MOVIE,
    id
  };
};

const _incrementRating = (movie) => {
  return {
    type: INCREMENT_RATING,
    movie
  };
};

const _decrementRating = (movie) => {
  return {
    type: DECREMENT_RATING,
    movie
  };
};

// Thunks

// Q: Is it best practice to handle most logic in thunk or in reducer?
// A: Anything database related, handle in thunk. Anything state related, handle in reducer.

/* Example of incrementing rating in thunk rather than in reducer
export const incrementRating = (movie) => {
  return async (dispatch) => {
    const item = {...movie, rating: movie.rating + 1};
    movie = (await axios.put(`/api/movies/${movie.id}`, item)).data;
    dispatch(_incrementRating(movie));
  }
};
*/

export const fetchMovies = () => {
  return async (dispatch) => {
    const movies = (await axios.get('/api/movies')).data;
    dispatch(_fetchMovies(movies));
  };
};

export const addMovie = () => {
  return async (dispatch) => {
    const movie = (await axios.post('/api/movies')).data;
    dispatch(_addMovie(movie));
  };
};

export const deleteMovie = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/movies/${id}`);
    dispatch(_deleteMovie(id));
  };
};

export const incrementRating = (movie) => {
  return async (dispatch) => {
    await axios.put(`/api/movies/${movie.id}`, movie).data;
    dispatch(_incrementRating(movie));
  };
};

export const decrementRating = (movie) => {
  return async (dispatch) => {
    await axios.put(`/api/movies/${movie.id}`, movie).data;
    dispatch(_decrementRating(movie));
  };
};

// Reducer
const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return action.movies;
    case ADD_MOVIE:
      return [...state, action.movie];
    case DELETE_MOVIE:
      return state.filter((movie) => movie.id !== action.id);
    case INCREMENT_RATING:
      return state.map((movie) => {
        if (movie.id === action.movie.id) {
          movie.rating++;
          return movie;
        }
        else {
          return movie;
        }
      });
    case DECREMENT_RATING:
      return state.map((movie) => {
        if (movie.id === action.movie.id) {
          movie.rating--;
          return movie;
        }
        else {
          return movie;
        }
      });
    default:
      return state;
  }
};

// Combine Reducer
const reducer = combineReducers({
  movies: moviesReducer
});

// Store
const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

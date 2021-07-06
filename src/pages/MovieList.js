import React, { Component } from 'react';
import MovieCard from '../components/MovieCard';
import { Loading } from '../components';
import './movieList.css';

import { getMovies } from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };
    this.getAllMovies = this.getAllMovies.bind(this);
  }

  componentDidMount() {
    this.getAllMovies();
  }

  getAllMovies() {
    this.setState({ loading: true }, async () => {
      const movies = await getMovies();
      this.setState({
        loading: false, movies,
      });
    });
  }

  render() {
    const { movies, loading } = this.state;

    return (
      <div data-testid="movie-list" className="movie-list">
        {loading ? <Loading /> : movies
          .map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
      </div>
    );
  }
}

export default MovieList;

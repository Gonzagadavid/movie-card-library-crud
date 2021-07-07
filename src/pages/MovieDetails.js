import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getMovie, deleteMovie } from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      movie: {},
    };
    this.getMovieById = this.getMovieById.bind(this);
    this.deleteThisMovie = this.deleteThisMovie.bind(this);
  }

  componentDidMount() {
    this.getMovieById();
  }

  getMovieById() {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({ loading: true }, async () => {
      const movie = await getMovie(id);
      this.setState({ loading: false, movie });
    });
  }

  async deleteThisMovie() {
    const { match } = this.props;
    const { id } = match.params;
    await deleteMovie(id);
  }

  render() {
    const { loading } = this.state;
    if (loading) return <Loading />;
    const { movie } = this.state;
    const { title, storyline, imagePath, genre, rating, subtitle, id } = movie;

    return (
      <div data-testid="movie-details">
        <Link to="/">VOLTAR</Link>
        <h3>{title}</h3>
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
        <Link to="/" onClick={ this.deleteThisMovie }>DELETAR</Link>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MovieDetails;

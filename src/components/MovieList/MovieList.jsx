import React from 'react'

import MovieCard from '../MovieCard/MovieCard'
import '../MovieList/MovieList.css'

export default class MovieList extends React.Component {
  render() {
    const { results, cardError } = this.props

    const films = results.map((film) => {
      const { id, ...allFilm } = film

      return <MovieCard key={id} {...allFilm} cardError={cardError} />
    })
    return <ul className="movies">{films}</ul>
  }
}

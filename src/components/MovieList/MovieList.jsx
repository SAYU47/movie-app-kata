import React from 'react'
import { Alert } from 'antd'

import MovieCard from '../MovieCard/MovieCard'
import '../MovieList/MovieList.css'

export default class MovieList extends React.Component {
  render() {
    const { results, cardError } = this.props
    if (results.length === 0) {
      return <Alert className="empty-results" message="По Вашему запросу ничего не найдено" type="info" showIcon />
    } else {
      const films = results.map((film) => {
        const { id, ...allFilm } = film

        return <MovieCard key={id} {...allFilm} cardError={cardError} />
      })
      return <ul className="movies">{films}</ul>
    }
  }
}

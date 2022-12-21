import React from 'react'
import { Alert } from 'antd'

import MovieCard from '../MovieCard/MovieCard'
import './MovieList.css'

export default class MovieList extends React.Component {
  render() {
    const { results, cardError, startedResult } = this.props
    if (startedResult) {
      return <Alert className="empty-results" message="Введите название фильма" type="info" showIcon />
    } else if (results.length === 0) {
      return <Alert className="empty-results" message="По Вашему запросу ничего не найдено" type="info" showIcon />
    } else {
      const films = results.map((film) => {
        return <MovieCard key={film.id} {...film} cardError={cardError} />
      })
      return <ul className="movies">{films}</ul>
    }
  }
}

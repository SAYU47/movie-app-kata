import React from 'react'
import '../MovieCard/MovieCard.css'
import { format } from 'date-fns'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
export default class MovieCard extends React.Component {
  _imgBase = 'https://image.tmdb.org/t/p/w500'
  state = {
    loaded: false,
    hasError: false,
  }
  cutText(text) {
    return text.split(' ').slice(0, 37).join(' ')
  }
  dotText(text) {
    let word = text.split(' ')
    return word.length > 37 ? '...' : ''
  }
  onCardLoaded() {
    this.setState({
      loaded: false,
      hasError: false,
    })
  }
  onError = () => {
    this.setState({
      hasError: true,
    })
  }
  render() {
    const { title, overview, release_date, poster_path, cardError } = this.props
    const { loaded } = this.state
    const date = format(new Date(release_date), 'MMM dd, yyyy')
    const antIcon = <LoadingOutlined style={{ fontSize: 104 }} spin />
    let availabilityPoster = `${this._imgBase}${poster_path}`
    if (this.state.hasError) {
      return cardError
    }

    return (
      <section className="Movie-card">
        {!loaded && <Spin indicator={antIcon} />}
        <img
          src={availabilityPoster}
          alt="poster"
          style={!loaded ? { display: 'none' } : null}
          onLoad={() => this.setState({ loaded: true })}
        />
        <div className="movie-description">
          <div className="movie-description-wrapper">
            <h2>{title}</h2>
            <div className="new-date">{date}</div>
            <ul className="genre-list">
              <li>экшен</li>
              <li>драма</li>
            </ul>
            <article>
              <p>
                {this.cutText(overview)}
                <span>{this.dotText(overview)}</span>
              </p>
            </article>
          </div>
        </div>
      </section>
    )
  }
}

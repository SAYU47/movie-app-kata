import React from 'react'
import './MovieCard.css'
import { format } from 'date-fns'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin, Rate } from 'antd'

import MovieApi from '../../services/movie-api'
import { Consumer } from '../../movie-context/movie-context'
export default class MovieCard extends React.Component {
  MovieApi = new MovieApi()
  _imgBase = 'https://image.tmdb.org/t/p/w500'
  state = {
    loaded: false,
    hasError: false,
    guestId: null,
    rate: null,
  }
  componentDidMount() {
    this.guestSession()
    this.saveRatedMove()
    this.putGenres()
  }
  cutText(text) {
    return text.split(' ').slice(0, 27).join(' ')
  }
  dotText(text) {
    let word = text.split(' ')
    return word.length > 27 ? ' ...' : ''
  }
  onCardLoaded() {
    this.setState({
      loaded: true,
      hasError: false,
    })
  }
  onError = () => {
    this.setState({
      hasError: true,
      loaded: false,
    })
  }
  releaseData = (release_date) => {
    if (release_date) {
      return format(new Date(release_date), 'MMM dd, yyyy')
    } else return 'Date is unknown'
  }
  guestSession = () => {
    this.MovieApi.guestSession().then((res) => {
      const guestId = localStorage.getItem('guestId')
      if (guestId) {
        this.setState({ guestId: guestId })
      } else {
        localStorage.setItem('guestId', res)
        this.setState({ guestId: res })
      }
    })
  }
  sendRating = (value) => {
    const { id } = this.props
    const { guestId } = this.state
    this.setState({ rate: value })
    this.MovieApi.postRatingMovies(value, id, guestId)

    localStorage.setItem(`${id}`, value)
  }

  saveRatedMove() {
    const { id } = this.props
    const rate = localStorage.getItem(id)
    if (rate !== null && rate !== 0) {
      this.setState({
        rate: rate,
      })
    }
  }
  putGenres = () => {
    return (
      <Consumer>
        {(genreList) => {
          const { genre_ids } = this.props
          const currGenres = genreList.filter((item) => genre_ids.indexOf(item.id) > -1)
          const genres = currGenres.map((item) => <li key={item.id}>{item.name}</li>)
          return <ul className="genre-list">{genres}</ul>
        }}
      </Consumer>
    )
  }
  render() {
    const { title, overview, poster_path, release_date, cardError } = this.props
    const { loaded, rate } = this.state

    const antIcon = <LoadingOutlined style={{ fontSize: 84 }} spin />

    let availabilityPoster = `${this._imgBase}${poster_path}`
    let noPosterUrl =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png'
    if (this.state.hasError) {
      return cardError
    }
    let poster = availabilityPoster.includes('null') ? noPosterUrl : availabilityPoster
    let colorRate = { borderColor: 'none' }
    if (rate <= 3) {
      colorRate = { borderColor: '#E90000' }
    } else if (rate <= 5) {
      colorRate = { borderColor: '#E97E00' }
    } else if (rate <= 7) {
      colorRate = { borderColor: '#E9D100' }
    } else if (rate > 7) {
      colorRate = { borderColor: '#66E900' }
    }

    return (
      <>
        <section className="Movie-card">
          {!loaded && <Spin indicator={antIcon} />}
          <div className="Movie-card-content" style={!loaded ? { display: 'none' } : null}>
            <img src={poster} alt={title} onLoad={() => this.setState({ loaded: true })} />

            <div className="movie-description-wrapper">
              <h2>{title}</h2>
              <div className="rate-circle" style={colorRate}>
                {rate}
              </div>
              <div className="new-date">{this.releaseData(release_date)}</div>
              {this.putGenres()}
            </div>
            <article>
              <p>
                {this.cutText(overview)}
                <span>{this.dotText(overview)}</span>
              </p>
            </article>
            <Rate allowHalf count={10} onChange={this.sendRating} value={Number(rate)} />
          </div>
        </section>
      </>
    )
  }
}

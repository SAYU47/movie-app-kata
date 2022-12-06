import React from 'react'
import '../MovieCard/MovieCard.css'
import { format } from 'date-fns'
export default class MovieCard extends React.Component {
  cutText(text) {
    return text.split(' ').slice(0, 37).join(' ')
  }
  dotText(text) {
    let word = text.split(' ')
    return word.length > 37 ? '...' : ''
  }

  _imgBase = 'https://image.tmdb.org/t/p/w500'

  render() {
    const { title, overview, release_date, poster_path, genre_ids, genreList } = this.props
    let genreItemId = 10
    const date = format(new Date(release_date), 'MMM dd, yyyy')

    let availabilityPoster = `${this._imgBase}${poster_path}`
    // let jenresArr = genre_ids.map((item) => {
    // 	let aim = genreList.find((el) => el.id === item);
    // 	return aim.name;
    // });
    return (
      <section className="Movie-card">
        <img src={availabilityPoster} alt="poster" />
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

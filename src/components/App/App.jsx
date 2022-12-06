import React from 'react'
import MovieList from '../MovieList/MovieList'
import MovieApi from '../MovieApi/MovieApi'
export default class App extends React.Component {
  MovieApi = new MovieApi()

  state = {
    results: [],
    isLoaded: false,
    genreList: [],
  }
  loadGenres() {
    this.MovieApi.getMovieGenge().then((resp) => {
      this.setState(() => {
        return { genreList: resp }
      })
    })
  }
  async componentDidMount() {
    this.MovieApi.getAllMovie().then((responseArr) => {
      this.setState({
        isLoaded: true,
        results: responseArr,
      })
      this.loadGenres()
    })
  }

  render() {
    const { results, genreList } = this.state

    return <MovieList results={results} genreList={genreList} />
  }
}

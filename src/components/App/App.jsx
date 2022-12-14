import React from 'react'
import { Offline, Online } from 'react-detect-offline'

import MovieList from '../MovieList/MovieList'
import SearchInput from '../SearchInput/SearchInput'
import MovieApi from '../MovieApi/MovieApi'
import AlertErrors from '../AlertErrors/AlertErrors.jsx'
import Pages from '../Pages/Pages'
export default class App extends React.Component {
  internetConnectionError = 'Нет подключения к сети!'
  codeError = 'Извините, приложение сломалось:('
  MovieApi = new MovieApi()
  state = {
    results: [],
    isLoaded: false,
    hasError: false,
    value: '',
    currentPage: 1,
    totalPages: null,
  }
  onError = (err) => {
    this.setState({
      hasError: [true, err.message],
    })
  }
  async componentDidMount(page, searchWord) {
    await this.MovieApi.getResourses(page, searchWord)
      .then((movieList) => {
        this.setState({
          isLoaded: true,
          results: movieList.results,
          totalPages: movieList.total_pages,
        })
      })
      .catch(this.onError)
  }

  searchMovie = (movie) => {
    if (movie.target.value.charAt(0) === ' ') {
      this.setState({
        value: '',
      })
      this.componentDidMount(this.state.currentPage, this.state.value)
    } else {
      this.setState({
        value: movie.target.value,
        currentPage: 1,
      })
      this.componentDidMount(this.state.currentPage, movie.target.value)
    }
  }
  togglePage = (page) => {
    this.setState({
      currentPage: page,
    })
    this.componentDidMount(page, this.state.value)
    window.scroll(0, 0)
  }
  componentDidCatch() {
    this.setState({ hasError: true })
  }
  render() {
    console.log(this.state)
    const { results, hasError } = this.state
    if (hasError) {
      return <AlertErrors error={this.codeError} />
    }
    let cardError = <AlertErrors error={this.errorByCard} />

    return (
      <>
        <Online>
          <SearchInput searchMovie={this.searchMovie} />
          <MovieList results={results} cardError={cardError} />
          <Pages togglePage={this.togglePage} currentPage={this.state.currentPage} totalPages={this.state.totalPages} />
        </Online>
        <Offline>
          <AlertErrors error={this.internetConnectionError} />
        </Offline>
      </>
    )
  }
}

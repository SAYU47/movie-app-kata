import React from 'react'
import { Offline, Online } from 'react-detect-offline'

import MovieList from '../MovieList'
import SearchInput from '../SearchInput'
import MovieApi from '../../services/movie-api'
import AlertErrors from '../AlertErrors'
import MoviePagination from '../MoviePagination'
import TabsButton from '../TabsButton'
import { Provider } from '../../movie-context/movie-context'
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
    tab: 'Search',
    genreList: [],
    startedResult: true,
  }
  onError = (err) => {
    this.setState({
      hasError: [true, err.message],
    })
  }
  componentDidMount() {
    this.getPageContent()
    this.getGenreList()
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.tab !== prevState.tab) {
      this.getPageContent()
    }
    if (this.state.value !== prevState.value) {
      this.getPageContent()
    }
    if (this.state.currentPage !== prevState.currentPage) {
      this.getPageContent()
    }
  }
  getPageContent = () => {
    const { tab, currentPage, value } = this.state
    if (value.length === 0) {
      !this.MovieApi.getResourses()
    } else if (tab === 'Search' && value.length !== 0) {
      this.MovieApi.getResourses(currentPage, value)
        .then((movieList) => {
          this.setState({
            isLoaded: true,
            results: movieList.results,
            totalPages: movieList.total_pages,
            startedResult: false,
          })
        })
        .catch(this.onError)
    } else {
      const guestId = localStorage.getItem('guestId')

      this.MovieApi.getRatedMovies(guestId)
        .then((ratedList) => {
          this.setState({
            isLoaded: true,
            results: ratedList.results,
            totalPages: ratedList.total_pages,
            startedResult: false,
          })
        })
        .catch(this.onError)
    }
  }
  onChangeTabs = (key) => {
    this.setState({ tab: key })
  }
  searchMovie = (movie) => {
    this.setState({
      value: movie.target.value,
      currentPage: 1,
    })
    this.getPageContent(this.state.currentPage, movie.target.value)
  }

  togglePage = (page) => {
    this.setState({
      currentPage: page,
    })
    this.getPageContent(page, this.state.value)
    window.scroll(0, 0)
  }
  getGenreList() {
    this.MovieApi.getGenres().then((res) => {
      this.setState({
        genreList: res.genres,
      })
    })
  }
  componentDidCatch() {
    this.setState({ hasError: true })
  }
  render() {
    const { results, hasError, tab, genreList, startedResult } = this.state
    if (hasError) {
      return <AlertErrors error={this.codeError} />
    }
    const searchInputShow = tab === 'Search' ? <SearchInput searchMovie={this.searchMovie} /> : null
    let cardError = <AlertErrors error={this.errorByCard} />

    return (
      <>
        <Online>
          <Provider value={genreList}>
            <TabsButton onChangeTabs={this.onChangeTabs} />
            {searchInputShow}
            <MovieList results={results} cardError={cardError} startedResult={startedResult} />
            <MoviePagination
              togglePage={this.togglePage}
              currentPage={this.state.currentPage}
              totalPages={this.state.totalPages}
            />
          </Provider>
        </Online>
        <Offline>
          <AlertErrors error={this.internetConnectionError} />
        </Offline>
      </>
    )
  }
}

import React from 'react'
import { Offline, Online } from 'react-detect-offline'

import MovieList from '../MovieList/MovieList'
import MovieApi from '../MovieApi/MovieApi'
import AlertErrors from '../AlertErrors/AlertErrors.jsx'
export default class App extends React.Component {
  internetConnectionError = 'Нет подключения к сети!'
  codeError = 'Извините, приложение сломалось:('
  MovieApi = new MovieApi()
  state = {
    results: [],
    isLoaded: false,
    hasError: false,
  }
  onError = (err) => {
    this.setState({
      hasError: [true, err.message],
    })
  }
  componentDidMount() {
    this.MovieApi.getAllMovie()
      .then((responseArr) => {
        this.setState({
          isLoaded: true,
          results: responseArr,
        })
      })
      .catch(this.onError)
  }
  componentDidCatch() {
    this.setState({ hasError: true })
  }
  render() {
    const { results, hasError } = this.state
    if (hasError) {
      return <AlertErrors error={this.codeError} />
    }
    return (
      <>
        <Online>
          <MovieList results={results} />
        </Online>
        <Offline>
          <AlertErrors error={this.internetConnectionError} />
        </Offline>
      </>
    )
  }
}

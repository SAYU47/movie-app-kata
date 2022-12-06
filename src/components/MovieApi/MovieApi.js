export default class MovieApi {
  _apiBase = 'https://api.themoviedb.org/3/'
  _apiKey = 'api_key=7a973da06c500a550f464b42845a9093'
  async getResourses(url) {
    const res = await fetch(
      `${this._apiBase}${url}?${this._apiKey}&language=en-US&query=return&page=3&include_adult=true`
    )
    if (!res.ok) {
      throw new Error()
    } else return await res.json()
  }

  async getAllMovie() {
    const movieList = await this.getResourses(`search/movie`)
    return movieList.results
  }
  async getMovieGenge() {
    const genreList = await this.getResourses(`/genre/movie/list`)
    return genreList.genres
  }
}
export default class MovieApi {
  _apiBase = 'https://api.themoviedb.org/3/'
  _apiKey = 'api_key=7a973da06c500a550f464b42845a9093'

  async getApi(url) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('Не удалось загрузить данные')
    } else return await res.json()
  }

  async getResourses(page = 1, searchWord) {
    const res = await this.getApi(
      `${this._apiBase}search/movie?${this._apiKey}&language=en-US&query=${
        searchWord || 'return'
      }&page=${page}&include_adult=false`
    )
    return res
  }
  async guestSession() {
    const res = await this.getApi(`${this._apiBase}/authentication/guest_session/new?${this._apiKey}`)
    return res.guest_session_id
  }
  async postRatingMovies(value, MovieId, guestId) {
    await fetch(`${this._apiBase}movie/${MovieId}/rating?${this._apiKey}&guest_session_id=${guestId}`, {
      method: 'POST',
      body: JSON.stringify({
        value: value,
      }),
      headers: { 'content-type': 'application/json;charset=utf-8' },
    })
  }
  // async removeRatedMovies(value, MovieId, guestId) {
  //   await fetch(`${this._apiBase}//movie/${MovieId}/rating?${this._apiKey}&guest_session_id=${guestId}`, {
  //     method: 'DELETE',
  //     body: JSON.stringify({
  //       value: value,
  //     }),
  //     headers: { 'content-type': 'application/json;charset=utf-8' },
  //   })
  // }
  async getRatedMovies(guestId) {
    const res = await this.getApi(
      `${this._apiBase}/guest_session/${guestId}/rated/movies?${this._apiKey}&language=en-US&sort_by=created_at.asc`
    )
    return res
  }
  async getGenres() {
    const res = await this.getApi(`${this._apiBase}/genre/movie/list?${this._apiKey}&language=en-US`)
    return res
  }
}

export default class MovieApi {
  _apiBase = 'https://api.themoviedb.org/3/'
  _apiKey = 'api_key=7a973da06c500a550f464b42845a9093'

  async getResourses(page = 1, searchWord) {
    const res = await fetch(
      `${this._apiBase}search/movie?${this._apiKey}&language=ru-US&query=${
        searchWord || 'return'
      }&page=${page}&include_adult=true`
    )

    if (!res.ok) {
      throw new Error('Не удалось загрузить данные')
    } else return await res.json()
  }
}

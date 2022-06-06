import { api_key } from '../environment/key.js'

async function searchMovieByName(title) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${title}&page=1`
  let response = await fetch(url)
  const { results } = await response.json()
  return results
}

async function getPopularMovies() {
  let url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
  let response = await fetch(url)
  const { results } = await response.json()
  return results
}

export { searchMovieByName, getPopularMovies }  
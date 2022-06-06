const localStorageKey = 'favoriteMovies'

function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem(localStorageKey))
}

function checkMovieIsFavorited(id) {
  const movies = getFavoriteMovies() || []
  return movies.find(movie => movie.id == id)
}

function saveMovieToLocalStorage(movie) {
  const movies = getFavoriteMovies() || []
  movies.push(movie)
  const moviesJSON = JSON.stringify(movies)
  localStorage.setItem(localStorageKey, moviesJSON)
}

function removeMovieFromLocalStorage(id) {
  const movies = getFavoriteMovies() || []
  const findMovie = movies.find(movie => movie.id == id)
  const newMovies = movies.filter(movie => movie.id != findMovie.id)
  localStorage.setItem(favoriteMovies, JSON.stringify(newMovies))
}

export { saveMovieToLocalStorage, removeMovieFromLocalStorage, getFavoriteMovies, checkMovieIsFavorited }
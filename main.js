import { api_key } from './environment/key.js'

const moviesContainer = document.querySelector(".movies")
const input = document.querySelector('input')
const searchButton = document.querySelector('.searchIcon')

searchButton.addEventListener('click', searchMovie)

input.addEventListener('keyup', function (event) {
  if (event.keyCode == 13) {
    searchMovie()
    return
  }
})

async function searchMovie() {
  const inputValue = input.value
  if (!!inputValue) {
    cleanAllMovies()
    const movies = await searchMovieByName(inputValue)
    movies.forEach(movie => renderMovie(movie))
  } else {
    cleanAllMovies()
    const movies = await getPopularMovies()
    movies.forEach(movie => renderMovie(movie))
  }
}

function cleanAllMovies() {
  moviesContainer.innerHTML = ''
}

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

window.onload = async function () {
  const movies = await getPopularMovies()
  movies.forEach(movie => renderMovie(movie))
}

function renderMovie(movie) {
  const { title, poster_path, vote_average: rating, release_date, overview: description } = movie;
  const isFavorited = false

  const year = new Date(release_date).getFullYear()
  const image = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://criticalhits.com.br/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png'

  const movieElement = document.createElement('li')
  movieElement.classList.add('movie')
  moviesContainer.appendChild(movieElement)

  const movieInformations = document.createElement('div')
  movieInformations.classList.add('movie-informations')

  const movieImageContainer = document.createElement('div')
  movieImageContainer.classList.add('movie-image')
  const movieImage = document.createElement('img')
  movieImage.src = image
  movieImage.alt = `${title} Poster`
  movieImageContainer.appendChild(movieImage)
  movieInformations.appendChild(movieImageContainer)

  const movieTextContainer = document.createElement('div')
  movieTextContainer.classList.add('movie-text')
  const movieTitle = document.createElement('h4')
  movieTitle.textContent = `${movie.title} (${year})`
  movieTextContainer.appendChild(movieTitle)
  movieInformations.appendChild(movieTextContainer)

  const informations = document.createElement('div')
  informations.classList.add('movie-informations')
  movieTextContainer.appendChild(informations)

  const ratingContainer = document.createElement('div')
  ratingContainer.classList.add('rating')
  const starImage = document.createElement('img')
  starImage.src = 'assets/star.svg'
  starImage.alt = 'Ícone de uma estrela'
  const movieRate = document.createElement('span')
  movieRate.classList.add('movie-rate')
  movieRate.textContent = rating
  ratingContainer.appendChild(starImage)
  ratingContainer.appendChild(movieRate)
  informations.appendChild(ratingContainer)

  const favorite = document.createElement('div')
  favorite.classList.add('favorite')
  const favoriteImage = document.createElement('img')
  favoriteImage.src = isFavorited ? 'assets/heart-fill.svg' : 'assets/heart.svg'
  favoriteImage.alt = 'Ícone de um coração'
  favoriteImage.classList.add('favorite-image')
  const favoriteText = document.createElement('span')
  favoriteText.classList.add('movie-favorite')
  favoriteText.textContent = 'Favoritar'
  favorite.appendChild(favoriteImage)
  favorite.appendChild(favoriteText)
  informations.appendChild(favorite)

  const movieDescriptionContainer = document.createElement('div')
  movieDescriptionContainer.classList.add('movie-description')
  const movieDescription = document.createElement('span')
  movieDescription.textContent = description
  movieDescriptionContainer.appendChild(movieDescription)

  movieElement.appendChild(movieInformations)
  movieElement.appendChild(movieDescriptionContainer)
}
import { searchMovieByName, getPopularMovies } from './services/api.js'
import { saveMovieToLocalStorage, removeMovieFromLocalStorage, getFavoriteMovies, checkMovieIsFavorited } from './services/localStorage.js'

const moviesContainer = document.querySelector('.movies')
const form = document.querySelector('form')
const searchButton = document.querySelector('.searchIcon')
const checkboxInput = document.querySelector('input[type="checkbox"]')

checkboxInput.addEventListener('change', checkCheckboxStatus)
searchButton.addEventListener('click', searchMovie)
form.addEventListener('submit', function (event) {
  event.preventDefault()
  searchMovie()
})

function checkCheckboxStatus() {
  const isChecked = checkboxInput.checked
  cleanAllMovies()
  if (isChecked) {
    const movies = getFavoriteMovies() || []
    movies.forEach(movie => renderMovie(movie))
  } else {
    getAllPopularMovies()
  }
}

async function searchMovie() {
  const inputValue = input.value
  if (inputValue != '') {
    cleanAllMovies()
    const movies = await searchMovieByName(inputValue)
    movies.forEach(movie => renderMovie(movie))
  }
}

function cleanAllMovies() {
  moviesContainer.innerHTML = ''
}

function favoriteButtonPressed(event, movie) {
  const image = event.target
  const spanElement = image.nextElementSibling

  const favoriteStatus = {
    favorited: 'assets/heart-fill.svg',
    notFavorited: 'assets/heart.svg'
  }

  if (image.src.includes(favoriteStatus.notFavorited)) {
    image.src = favoriteStatus.favorited
    spanElement.innerText = 'Desfavoritar'
    saveMovieToLocalStorage(movie)
  } else {
    image.src = favoriteStatus.notFavorited
    spanElement.innerText = 'Favoritar'
    removeMovieFromLocalStorage(movie.id)
  }
}

async function getAllPopularMovies() {
  const movies = await getPopularMovies()
  movies.forEach(movie => renderMovie(movie))
}

window.onload = function () {
  getAllPopularMovies()
}

function renderMovie(movie) {
  const { id, title, poster_path, vote_average, release_date, overview } = movie;

  const isFavorited = checkMovieIsFavorited(id)
  const year = new Date(release_date).getUTCFullYear()
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
  movieRate.textContent = vote_average
  ratingContainer.appendChild(starImage)
  ratingContainer.appendChild(movieRate)
  informations.appendChild(ratingContainer)

  const favorite = document.createElement('div')
  favorite.classList.add('favorite')
  const favoriteImage = document.createElement('img')
  favoriteImage.classList.add('favorite-image')
  favoriteImage.src = isFavorited ? 'assets/heart-fill.svg' : 'assets/heart.svg'
  favoriteImage.alt = 'Ícone de um coração'
  favoriteImage.addEventListener('click', (event) => favoriteButtonPressed(event, movie))
  const favoriteText = document.createElement('span')
  favoriteText.classList.add('movie-favorite')
  favoriteText.textContent = isFavorited ? 'Desfavoritar' : 'Favoritar'
  favorite.appendChild(favoriteImage)
  favorite.appendChild(favoriteText)
  informations.appendChild(favorite)

  const movieDescriptionContainer = document.createElement('div')
  movieDescriptionContainer.classList.add('movie-description')
  const movieDescription = document.createElement('span')
  movieDescription.textContent = overview
  movieDescriptionContainer.appendChild(movieDescription)

  movieElement.appendChild(movieInformations)
  movieElement.appendChild(movieDescriptionContainer)
}
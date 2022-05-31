import { api_key, base_url } from './env.js'

const movieContainer = document.querySelector(".movies")

window.onload = function () {
  getPopularMovies()
}

async function getPopularMovies() {
  let url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
  let response = await fetch(url);
  const movies = await response.json();

  movies.results.forEach((movie) => {
    renderMovie(movie)
  })
}

async function renderMovie(movie) {
  const { title, poster_path: image, backdrop_path: backupImage, vote_average: rating, release_date: year, overview: description } = movie;

  const movieElement = document.createElement('li')
  movieElement.classList.add('movie')
  movieContainer.appendChild(movieElement)

  const movieInformations = document.createElement('div')
  movieInformations.classList.add('movie-informations')

  const movieImageContainer = document.createElement('div')
  movieImageContainer.classList.add('movie-image')
  const movieImage = document.createElement('img')
  movieImage.src = `${base_url}${image ? image : backupImage}`
  movieImage.alt = `${title} Poster`
  movieImageContainer.appendChild(movieImage)
  movieInformations.appendChild(movieImageContainer)

  const movieTextContainer = document.createElement('div')
  movieTextContainer.classList.add('movie-text')
  const movieTitle = document.createElement('h4')
  movieTitle.textContent = `${movie.title} (${year.slice(0, 4)})`
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
  favoriteImage.src = false ? 'assets/heart-fill.svg' : 'assets/heart.svg'
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
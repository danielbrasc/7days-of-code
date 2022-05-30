const movies = [
  {
    image:
      'https://uauposters.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/2/0/201906131069-uau-posters-filmes-avengers-endgame-vingadores-ultimato.jpg',
    title: 'Avengers Endgame',
    rating: 9.2,
    year: 2019,
    description: 'Descrição do filme…',
    isFavorited: true
  },
  {
    image:
      'https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg',
    title: 'Batman',
    rating: 9.2,
    year: 2022,
    description: 'Descrição do filme…',
    isFavorited: false
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg',
    title: 'Doctor Strange',
    rating: 9.2,
    year: 2022,
    description: 'Descrição do filme…',
    isFavorited: false
  }
]

function renderMovie(movie) {
  const moviesList = document.createElement('ul')
  const movieElement = document.createElement('li')
  const movieInformations = document.createElement('div')
  const movieImage = document.createElement('div')
  const image = document.createElement('img')
  const movieText = document.createElement('div')
  const movieTitle = document.createElement('h4')
  const ratingFavorites = document.createElement('div')
  const rating = document.createElement('div')
  const starImage = document.createElement('img')
  const ratingText = document.createElement('span')
  const favorite = document.createElement('div')
  const heartImage = document.createElement('img')
  const favoriteText = document.createElement('span')
  const movieDescription = document.createElement('div')
  const descriptionText = document.createElement('span')

  movieElement.classList.add('movie')
  movieInformations.classList.add('movie-informations')
  movieImage.classList.add('movie-image')
  movieText.classList.add('movie-text')
  ratingFavorites.classList.add('rating-favorites')
  rating.classList.add('rating')
  favorite.classList.add('favorite')
  movieDescription.classList.add('movie-description')

  image.setAttribute('src', movie.image)
  image.setAttribute('alt', `${movie.title} (${movie.year})`)
  movieTitle.textContent = `${movie.title} (${movie.year})`
  starImage.src = 'assets/star.svg'
  starImage.alt = 'Ícone de uma estrela'
  heartImage.src = movie.isFavorited
    ? 'assets/heart-fill.svg'
    : 'assets/heart.svg'
  heartImage.alt = 'Ícone de um coração'
  ratingText.textContent = movie.rating
  favoriteText.textContent = movie.isFavorited
    ? 'Desfavoritar'
    : 'Favoritar'
  movieDescription.textContent = movie.description

  rating.appendChild(starImage)
  rating.appendChild(ratingText)
  favorite.appendChild(heartImage)
  favorite.appendChild(favoriteText)
  ratingFavorites.appendChild(rating)
  ratingFavorites.appendChild(favorite)
  movieText.appendChild(movieTitle)
  movieText.appendChild(ratingFavorites)
  movieImage.appendChild(image)
  movieInformations.appendChild(movieImage)
  movieInformations.appendChild(movieText)
  movieElement.appendChild(movieInformations)
  movieElement.appendChild(movieDescription)
  moviesList.appendChild(movieElement)

  const main = document.getElementById('main')
  main.appendChild(moviesList)
}

movies.forEach(movie => renderMovie(movie));
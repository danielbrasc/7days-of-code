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
  movies.forEach(movie => {
    renderMovie(movie)
  })
}

window.onload = function () {
<<<<<<< HEAD
  getAllPopularMovies()
=======
  // renderizar um array com os 20 filmes
  renderArrayMovies()  
  // getAllPopularMovies()
>>>>>>> 4ccdabaff2e53c0cdac982b12e36485f847d5f13
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
<<<<<<< HEAD
}
=======
}

function renderArrayMovies() {
  const movies = [
    {
      id: 338953,
      title: "Fantastic Beasts: The Secrets of Dumbledore",
      poster_path: "/jrgifaYeUtTnaH7NF5Drkgjg2MB.jpg",
      vote_average: 6.8,
      release_date: "2022-04-06",
      overview: "Professor Albus Dumbledore knows the powerful, dark wizard Gellert Grindelwald is moving to seize control of the wizarding world. Unable to stop him alone, he entrusts magizoologist Newt Scamander to lead an intrepid team of wizards and witches. They soon encounter an array of old and new beasts as they clash with Grindelwald's growing legion of followers."
    },
    {
      id: 675353,
      title: "Sonic the Hedgehog 2",
      poster_path: "/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
      vote_average: 7.8,
      release_date: "2022-03-30",
      overview: "After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles, in search for an emerald that has the power to destroy civilizations. Sonic teams up with his own sidekick, Tails, and together they embark on a globe-trotting journey to find the emerald before it falls into the wrong hands."
    },
    {
      id: 818397,
      title: "Memory",
      poster_path: "/QaNLpq3Wuu2yp5ESsXYcQCOpUk.jpg",
      vote_average: 7.2,
      release_date: "2022-04-28",
      overview: "Alex, an assassin-for-hire, finds that he's become a target after he refuses to complete a job for a dangerous criminal organization. With the crime syndicate and FBI in hot pursuit, Alex has the skills to stay ahead, except for one thing: he is struggling with severe memory loss, affecting his every move. Alex must question his every action and whom he can ultimately trust."
    },
    {
      id: 526896,
      title: "Morbius",
      poster_path: "/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg",
      vote_average: 6.4,
      release_date: "2022-03-30",
      overview: "Dangerously ill with a rare blood disorder, and determined to save others suffering his same fate, Dr. Michael Morbius attempts a desperate gamble. What at first appears to be a radical success soon reveals itself to be a remedy potentially worse than the disease.",
    },
    {
      id: 752623,
      title: "The Lost City",
      poster_path: "/neMZH82Stu91d3iqvLdNQfqPPyl.jpg",
      vote_average: 6.8,
      release_date: "2022-03-24",
      overview: "A reclusive romance novelist was sure nothing could be worse than getting stuck on a book tour with her cover model until a kidnapping attempt sweeps them both into a cutthroat jungle adventure, proving life can be so much stranger, and more romantic, than any of her paperback fictions."
    },
    {
      id: 507086,
      title: "Jurassic World Dominion",
      poster_path: "/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
      vote_average: 6.8,
      release_date: "2022-06-01",
      overview: "Four years after Isla Nublar was destroyed, dinosaurs now live—and hunt—alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history’s most fearsome creatures."
    },
    {
      id: 639933,
      title: "The Northman",
      poster_path: "/zhLKlUaF1SEpO58ppHIAyENkwgw.jpg",
      vote_average: 7.4,
      release_date: "2022-04-07",
      overview: "Prince Amleth is on the verge of becoming a man when his father is brutally murdered by his uncle, who kidnaps the boy's mother. Two decades later, Amleth is now a Viking who's on a mission to save his mother, kill his uncle and avenge his father."
    },
    {
      id: 453395,
      title: "Doctor Strange in the Multiverse of Madness",
      poster_path: "/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
      vote_average: 7.4,
      release_date: "2022-05-04",
      overview: "Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary."
    },
    {
      id: 335787,
      title: "Uncharted",
      poster_path: "/tlZpSxYuBRoVJBOpUrPdQe9FmFq.jpg",
      vote_average: 7.2,
      release_date: "2022-02-10",
      overview: "A young street-smart, Nathan Drake and his wisecracking partner Victor “Sully” Sullivan embark on a dangerous pursuit of “the greatest treasure never found” while also tracking clues that may lead to Nathan’s long-lost brother."
    },
    {
      id: 634649,
      title: "Spider-Man: No Way Home",
      poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      vote_average: 8.1,
      release_date: "2021-12-15",
      overview: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man."
    },
    {
      id: 414906,
      title: "The Batman",
      poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      vote_average: 7.8,
      release_date: "2022-03-01",
      overview: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler."
    },
    {
      id: 508947,
      title: "Turning Red",
      poster_path: "/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg",
      vote_average: 7.5,
      release_date: "2022-03-10",
      overview: "Thirteen-year-old Mei is experiencing the awkwardness of being a teenager with a twist – when she gets too excited, she transforms into a giant red panda."
    },
    {
      id: 864116,
      title: "A Day to Die",
      poster_path: "/8Kce1utfytAG5m1PbtVoDzmDZJH.jpg",
      vote_average: 6,
      release_date: "2022-03-04",
      overview: "A disgraced parole officer is indebted to a local gang leader and forced to pull off a series of dangerous drug heists within twelve hours in order to pay the $2 million dollars he owes, rescue his kidnapped pregnant wife, and settle a score with the city's corrupt police chief, who is working with the gang leader and double-crossed him years ago."
    },
    {
      id: 628900,
      title: "The Contractor",
      poster_path: "/rJPGPZ5soaG27MK90oKpioSiJE2.jpg",
      vote_average: 6.6,
      release_date: "2022-03-10",
      overview: "After being involuntarily discharged from the U.S. Special Forces, James Harper decides to support his family by joining a private contracting organization alongside his best friend and under the command of a fellow veteran. Overseas on a covert mission, Harper must evade those trying to kill him while making his way back home."
    },
    {
      id: 629542,
      title: "The Bad Guys",
      poster_path: "/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg",
      vote_average: 7.8,
      release_date: "2022-03-17",
      overview: "When the infamous Bad Guys are finally caught after years of countless heists and being the world’s most-wanted villains, Mr. Wolf brokers a deal to save them all from prison."
    },
    {
      id: 420821,
      title: "Chip 'n Dale: Rescue Rangers",
      poster_path: "/7UGmn8TyWPPzkjhLUW58cOUHjPS.jpg",
      vote_average: 7.1,
      release_date: "2022-05-18",
      overview: "Decades after their successful television series was canceled, Chip and Dale must repair their broken friendship and take on their Rescue Rangers detective personas once again when a former cast mate mysteriously disappears."
    },
    {
      id: 836225,
      title: "The Exorcism of God",
      poster_path: "/hangTmbxpSV4gpHG7MgSlCWSSFa.jpg",
      vote_average: 6.8,
      release_date: "2022-02-10",
      overview: "An American priest working in Mexico is considered a saint by many local parishioners. However, due to a botched exorcism, he carries a secret that’s eating him alive until he gets an opportunity to face his demon one final time."
    },
    {
      id: 785985,
      title: "The Takedown",
      poster_path: "/h5hVeCfYSb8gIO0F41gqidtb0AI.jpg",
      vote_average: 6,
      release_date: "2022-05-06",
      overview: "Ousmane Diakité and François Monge are two cops with very different styles, backgrounds and careers. The unlikely pair are reunited once again for a new investigation that takes them across France. What seemed to be a simple drug deal turns out to be a much bigger criminal case wrapped in danger and unexpected comedy."
    },
    {
      id: 406759,
      title: "Moonfall",
      poster_path: "/odVv1sqVs0KxBXiA8bhIBlPgalx.jpg",
      vote_average: 6.5,
      release_date: "2022-02-03",
      overview: "A mysterious force knocks the moon from its orbit around Earth and sends it hurtling on a collision course with life as we know it."
    },
    {
      id: 763285,
      title: "Ambulance",
      poster_path: "/zT5ynZ0UR6HFfWQSRf2uKtqCyWD.jpg",
      vote_average: 7,
      release_date: "2022-03-16",
      overview: "Decorated veteran Will Sharp, desperate for money to cover his wife's medical bills, asks for help from his adoptive brother Danny. A charismatic career criminal, Danny instead offers him a score: the biggest bank heist in Los Angeles history: $32 million."
    }
  ]

  movies.forEach(movie => renderMovie(movie))
}
>>>>>>> 4ccdabaff2e53c0cdac982b12e36485f847d5f13

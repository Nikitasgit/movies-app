import TmdbApi from "./classes/TmdbApi.js";

const elements = {
  filmsContainer: document.getElementById("films-container"),
  form: document.getElementById("form"),
  searchInput: document.getElementById("search-input"),
  pagesBtnList: document.getElementById("pages"),
  languagesSelector: document.getElementById("languages"),
  errorMessage: document.getElementById("error"),
};

const tmdbAPI = new TmdbApi("3e809ac014c56a044dfeb052290f9275");

//Events
elements.form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!elements.searchInput.value) {
    return displayError("Merci d'entrer une valeur dans la barre de recherche");
  }
  try {
    const data = await tmdbAPI.searchMovies(
      elements.searchInput.value,
      1,
      elements.languagesSelector.value
    );
    createPagesButtons(data.total_pages);
    displayMovies(data.results);
  } catch (error) {
    displayError(error.message);
  }
});
elements.pagesBtnList.addEventListener("click", async (e) => {
  try {
    const data = await tmdbAPI.searchMovies(
      elements.searchInput.value,
      e.target.value
    );
    displayMovies(data.results);
  } catch (error) {
    displayError(error.message);
  }
});
//Functions to display data with HTML
const createCard = (movie) => {
  const baseUrl = "https://image.tmdb.org/t/p/w300/";
  const movieCard = document.createElement("div");
  movieCard.classList.add("card");
  const imgContainer = document.createElement("div");
  movieCard.classList.add("img-container");
  const movieImg = document.createElement("img");
  if (!movie.poster_path) {
    movieImg.src =
      "/assets/images/movie-theatre-popcorn-800x1200-735x1103-1.jpg";
  } else {
    movieImg.src = `${baseUrl}${movie.poster_path}`;
  }
  imgContainer.appendChild(movieImg);
  const movieTitle = document.createElement("h3");
  movieTitle.append(movie.title);
  const movieDesc = document.createElement("p");
  movieDesc.append(movie.overview);
  movieCard.appendChild(imgContainer);
  movieCard.appendChild(movieTitle);
  movieCard.appendChild(movieDesc);
  return elements.filmsContainer.appendChild(movieCard);
};
const createPagesButtons = (nbrOfpages) => {
  elements.pagesBtnList.innerHTML = "";
  for (let i = 1; i <= nbrOfpages && i <= 20; i++) {
    const button = document.createElement("li");
    button.value = i;
    button.append(i);
    elements.pagesBtnList.appendChild(button);
  }
};
const displayMovies = (movies) => {
  elements.filmsContainer.innerHTML = "";
  movies.map((movie) => createCard(movie));
};

//Functions
// Default result of the page
const displayDiscoverMovies = async () => {
  try {
    const data = await tmdbAPI.discoverMovies();
    displayMovies(data.results);
  } catch (error) {
    displayError(error.message);
  }
};
//Error Message
const displayError = (errorMessage) => {
  elements.errorMessage.removeAttribute("hidden");
  elements.errorMessage.textContent = `🚨 ${errorMessage}`;
  setTimeout(() => {
    elements.errorMessage.setAttribute("hidden", true);
  }, 3000);
};

displayDiscoverMovies();

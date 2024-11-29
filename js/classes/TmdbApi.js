const baseUrl = "https://api.themoviedb.org/3/";
class TmdbApi {
  #token;
  constructor(token) {
    this.token = token;
  }
  get token() {
    return this.#token;
  }
  set token(token) {
    return (this.#token = token);
  }
  async discoverMovies() {
    try {
      const response = await fetch(
        `${baseUrl}discover/movie?api_key=${this.token}`
      );
      const data = await response.json();

      if (data.results.length === 0) {
        throw new Error("Aucun résultat, veuillez réessayer plus tard.");
      }
      return data;
    } catch (error) {
      throw new Error("Vérifiez le lien et votre clé API");
    }
  }
  async searchMovies(input, pageIndex, language) {
    try {
      const response = await fetch(
        `${baseUrl}search/movie?query=${input}&include_adult=false&language=${language}&page=${
          pageIndex ? pageIndex : 1
        }&api_key=${this.token}`
      );
      const data = await response.json();
      if (data.results.length === 0) {
        throw new Error("Aucun résultat ne correspond à votre recherche.");
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default TmdbApi;

export interface Movie {
  backdrop_path: string;
  id: number;
  poster_path: string;
  overview: string;
  budget: number;
  revenue: number;
  runtine: number;
  title: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
}

export default class API {
  static base = "https://api.themoviedb.org/3";
  static apiKey = process.env.REACT_APP_TMDB_API_KEY;

  static getBackdrop = (movie?: Movie): string => {
    if (!movie?.backdrop_path) {
      return "/movie.png";
    }
    return `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
  };

  static getPoster = (movie?: Movie): string => {
    if (!movie?.poster_path) {
      return "/movie.png";
    }
    return `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  };

  static getPath = (path: string) =>
    `${API.base}/${path}?api_key=${API.apiKey}`;

  static discoverMovies = async (): Promise<Movie[]> => {
    const { results } = await fetch(
      `${API.getPath("discover/movie")}`
    ).then((response: any) => response.json());
    return results;
  };

  static getDetails = async (movieId: number): Promise<Movie> => {
    const result = await fetch(
      `${API.getPath(`movie/${movieId}`)}`
    ).then((response: any) => response.json());
    return result;
  };
}

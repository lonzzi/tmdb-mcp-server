import axios from "axios";

export interface TmdbMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  video: boolean;
}

export interface TmdbTvShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
  original_language: string;
  genre_ids: number[];
  origin_country: string[];
}

export interface TmdbPerson {
  id: number;
  name: string;
  original_name: string; // Added based on typical person response, though not always in search results, good to have if extending
  known_for_department: string;
  profile_path: string | null;
  popularity: number;
  gender: number;
  adult: boolean;
  known_for: (TmdbMovie | TmdbTvShow)[];
}

export interface TmdbMovieDetail extends TmdbMovie {
  belongs_to_collection: object | null;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  imdb_id: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  revenue: number;
  runtime: number | null;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string | null;
}

export interface TmdbTvShowDetail extends TmdbTvShow {
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  genres: { id: number; name: string }[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: object;
  next_episode_to_air: object | null;
  networks: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  status: string;
  tagline: string;
  type: string;
}

export const searchMovies = async (
  apiKey: string,
  query: string,
  language: string = "en-US",
  region?: string
): Promise<TmdbMovie[]> => {
  if (!query) {
    throw new Error("Query argument is required");
  }

  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: apiKey,
          query: query,
          language: language,
          ...(region && { region }),
          page: 1,
        },
      }
    );

    return response.data.results.slice(0, 5); // Limit to top 5 results
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`TMDB API Error: ${error.message}`);
    }
    throw error;
  }
};

export const searchTvShows = async (
  apiKey: string,
  query: string,
  language: string = "en-US"
): Promise<TmdbTvShow[]> => {
  if (!query) {
    throw new Error("Query argument is required");
  }

  try {
    const response = await axios.get("https://api.themoviedb.org/3/search/tv", {
      params: {
        api_key: apiKey,
        query: query,
        language: language,
        page: 1,
      },
    });

    return response.data.results.slice(0, 5);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`TMDB API Error: ${error.message}`);
    }
    throw error;
  }
};

export const getMovieDetails = async (
  apiKey: string,
  movieId: number,
  language: string = "en-US"
): Promise<TmdbMovieDetail> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: {
          api_key: apiKey,
          language: language,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`TMDB API Error: ${error.message}`);
    }
    throw error;
  }
};

export const getTvShowDetails = async (
  apiKey: string,
  tvShowId: number,
  language: string = "en-US"
): Promise<TmdbTvShowDetail> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvShowId}`,
      {
        params: {
          api_key: apiKey,
          language: language,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`TMDB API Error: ${error.message}`);
    }
    throw error;
  }
};

export const getTrendingMovies = async (
  apiKey: string,
  timeWindow: "day" | "week" = "week",
  language: string = "en-US"
): Promise<TmdbMovie[]> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/${timeWindow}`,
      {
        params: {
          api_key: apiKey,
          language: language,
        },
      }
    );
    return response.data.results.slice(0, 10);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`TMDB API Error: ${error.message}`);
    }
    throw error;
  }
};

export const getTrendingTvShows = async (
  apiKey: string,
  timeWindow: "day" | "week" = "week",
  language: string = "en-US"
): Promise<TmdbTvShow[]> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/${timeWindow}`,
      {
        params: {
          api_key: apiKey,
          language: language,
        },
      }
    );
    return response.data.results.slice(0, 10);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`TMDB API Error: ${error.message}`);
    }
    throw error;
  }
};

export const searchPeople = async (
  apiKey: string,
  query: string,
  language: string = "en-US"
): Promise<TmdbPerson[]> => {
  if (!query) {
    throw new Error("Query argument is required");
  }

  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/person",
      {
        params: {
          api_key: apiKey,
          query: query,
          language: language,
          page: 1,
        },
      }
    );
    return response.data.results.slice(0, 5);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`TMDB API Error: ${error.message}`);
    }
    throw error;
  }
};

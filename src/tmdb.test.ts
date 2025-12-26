import axios from "axios";
import { searchMovies, searchTvShows } from "./tmdb";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("searchMovies", () => {
  const apiKey = "test-api-key";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return movie results and call API with correct parameters", async () => {
    const mockMovies = [
      {
        id: 1,
        title: "Test Movie",
        overview: "Test Overview",
        release_date: "2023-01-01",
        vote_average: 8.0,
      },
    ];
    const mockResponse = {
      data: {
        results: mockMovies,
      },
    };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const query = "Test Query";
    const result = await searchMovies(apiKey, query);

    expect(result).toEqual(mockMovies);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: apiKey,
          query: query,
          language: "en-US",
          page: 1,
        },
      }
    );
  });

  it("should return an empty array when result list is empty", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        results: [],
      },
    });

    const result = await searchMovies(apiKey, "Nonexistent Movie");

    expect(result).toEqual([]);
  });

  it("should throw an error if the query is empty", async () => {
    await expect(searchMovies(apiKey, "")).rejects.toThrow(
      "Query argument is required"
    );
  });

  it("should handle API errors", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue({
      isAxiosError: true,
      message: errorMessage,
    });
    // We need to mock isAxiosError since we are using it in the catch block
    (axios.isAxiosError as unknown) = jest.fn().mockReturnValue(true);

    await expect(searchMovies(apiKey, "Error Movie")).rejects.toThrow(
      `TMDB API Error: ${errorMessage}`
    );
  });
});

describe("searchTvShows", () => {
  const apiKey = "test-api-key";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return TV show results and call API with correct parameters", async () => {
    const mockShows = [
      {
        id: 101,
        name: "Test Show",
        overview: "Test Overview",
        first_air_date: "2023-01-01",
        vote_average: 7.5,
      },
    ];
    const mockResponse = {
      data: {
        results: mockShows,
      },
    };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const query = "Test Show Query";
    const result = await searchTvShows(apiKey, query);

    expect(result).toEqual(mockShows);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.themoviedb.org/3/search/tv",
      {
        params: {
          api_key: apiKey,
          query: query,
          language: "en-US",
          page: 1,
        },
      }
    );
  });

  it("should return an empty array when result list is empty", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        results: [],
      },
    });

    const result = await searchTvShows(apiKey, "Nonexistent Show");

    expect(result).toEqual([]);
  });
});
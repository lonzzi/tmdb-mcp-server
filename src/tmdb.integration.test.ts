import {
  searchMovies,
  searchTvShows,
  getMovieDetails,
  getTvShowDetails,
  getTrendingMovies,
  getTrendingTvShows,
  searchPeople,
} from "./tmdb";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const apiKey = process.env.TMDB_API_KEY;

// Conditional describe: Only run if API key is present
const describeIfApiKey = apiKey ? describe : describe.skip;

describeIfApiKey("TMDB Integration Tests", () => {
  // Increase timeout for real network requests
  jest.setTimeout(30000);

  it("should find 'Inception'", async () => {
    console.log("Querying TMDB for 'Inception'...");
    const results = await searchMovies(apiKey!, "Inception");

    expect(results.length).toBeGreaterThan(0);
    const inception = results.find((m) => m.title === "Inception");
    expect(inception).toBeDefined();
    expect(inception?.id).toBe(27205); // TMDB ID for Inception
  });

  it("should find 'Breaking Bad'", async () => {
    console.log("Querying TMDB for 'Breaking Bad'...");
    const results = await searchTvShows(apiKey!, "Breaking Bad");

    expect(results.length).toBeGreaterThan(0);
    const breakingBad = results.find((show) => show.name === "Breaking Bad");
    expect(breakingBad).toBeDefined();
    expect(breakingBad?.id).toBe(1396); // TMDB ID for Breaking Bad
  });

  it("should find 'The Matrix'", async () => {
    console.log("Querying TMDB for 'The Matrix'...");
    const results = await searchMovies(apiKey!, "The Matrix");

    expect(results.length).toBeGreaterThan(0);
    const matrix = results.find((m) => m.title === "The Matrix");
    expect(matrix).toBeDefined();
    expect(matrix?.id).toBe(603); // TMDB ID for The Matrix
  });

  it("should find 'One Punch Man'", async () => {
    console.log("Querying TMDB for 'One Punch Man'...");
    const results = await searchTvShows(apiKey!, "One Punch Man");

    expect(results.length).toBeGreaterThan(0);
    const opm = results.find((show) => show.name === "One-Punch Man");
    expect(opm).toBeDefined();
    expect(opm?.id).toBe(63926); // TMDB ID for One Punch Man
  });

  it("should return empty array for gibberish query", async () => {
    const results = await searchMovies(apiKey!, "asdfjkl;qweruiop1234");
    expect(results).toEqual([]);
  });

  it("should get details for 'Inception'", async () => {
    console.log("Getting details for 'Inception'...");
    const details = await getMovieDetails(apiKey!, 27205);

    expect(details).toBeDefined();
    expect(details.title).toBe("Inception");
    expect(details.runtime).toBeGreaterThan(0);
  });

  it("should get details for 'Breaking Bad'", async () => {
    console.log("Getting details for 'Breaking Bad'...");
    const details = await getTvShowDetails(apiKey!, 1396);

    expect(details).toBeDefined();
    expect(details.name).toBe("Breaking Bad");
    expect(details.number_of_seasons).toBeGreaterThan(0);
  });

  it("should get trending movies", async () => {
    console.log("Getting trending movies...");
    const movies = await getTrendingMovies(apiKey!);

    expect(movies.length).toBeGreaterThan(0);
    expect(movies[0].title).toBeDefined();
  });

  it("should get trending TV shows", async () => {
    console.log("Getting trending TV shows...");
    const shows = await getTrendingTvShows(apiKey!);

    expect(shows.length).toBeGreaterThan(0);
    expect(shows[0].name).toBeDefined();
  });

  it("should search for 'Christopher Nolan'", async () => {
    console.log("Searching for 'Christopher Nolan'...");
    const people = await searchPeople(apiKey!, "Christopher Nolan");

    expect(people.length).toBeGreaterThan(0);
    const nolan = people.find((p) => p.name === "Christopher Nolan");
    expect(nolan).toBeDefined();
    expect(nolan?.known_for_department).toBe("Directing");
  });

  // --- Language & Region Tests ---

  it("should search movies in Chinese (language='zh-CN')", async () => {
    console.log("Searching for 'Inception' in Chinese...");
    const results = await searchMovies(apiKey!, "Inception", "zh-CN");
    console.log(results);

    expect(results.length).toBeGreaterThan(0);
    // Inception in Chinese is usually "盗梦空间"
    const inception = results.find((m) => m.id === 27205);
    expect(inception).toBeDefined();
    // Verify title is Chinese characters or matches known translation
    // We check if it's NOT just "Inception" (though sometimes it might be if translation missing, but for Inception it should be there)
    console.log(`Chinese title for Inception: ${inception?.title}`);
    expect(inception?.title).not.toBe("Inception");
  });

  it("should get trending movies in Chinese", async () => {
    console.log("Getting trending movies in Chinese...");
    const movies = await getTrendingMovies(apiKey!, "week", "zh-CN");
    expect(movies.length).toBeGreaterThan(0);
    console.log(`First trending movie in Chinese: ${movies[0].title}`);
    // Ideally check if title contains non-ascii or specific expected chars, but simple existence check is good for now
  });
});

if (!apiKey) {
  test("Skipping integration tests", () => {
    console.warn("TMDB_API_KEY not found in .env. Skipping integration tests.");
  });
}

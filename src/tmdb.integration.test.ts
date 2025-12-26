import { searchMovies, searchTvShows } from "./tmdb";
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
    const inception = results.find(m => m.title === "Inception");
    expect(inception).toBeDefined();
    expect(inception?.id).toBe(27205); // TMDB ID for Inception
  });

  it("should find 'Breaking Bad'", async () => {
    console.log("Querying TMDB for 'Breaking Bad'...");
    const results = await searchTvShows(apiKey!, "Breaking Bad");
    
    expect(results.length).toBeGreaterThan(0);
    const breakingBad = results.find(show => show.name === "Breaking Bad");
    expect(breakingBad).toBeDefined();
    expect(breakingBad?.id).toBe(1396); // TMDB ID for Breaking Bad
  });

  it("should find 'The Matrix'", async () => {
    console.log("Querying TMDB for 'The Matrix'...");
    const results = await searchMovies(apiKey!, "The Matrix");

    expect(results.length).toBeGreaterThan(0);
    const matrix = results.find(m => m.title === "The Matrix");
    expect(matrix).toBeDefined();
    expect(matrix?.id).toBe(603); // TMDB ID for The Matrix
  });

  it("should find 'One Punch Man'", async () => {
    console.log("Querying TMDB for 'One Punch Man'...");
    const results = await searchTvShows(apiKey!, "One Punch Man");

    expect(results.length).toBeGreaterThan(0);
    const opm = results.find(show => show.name === "One-Punch Man");
    expect(opm).toBeDefined();
    expect(opm?.id).toBe(63926); // TMDB ID for One Punch Man
  });

  it("should return empty array for gibberish query", async () => {
    const results = await searchMovies(apiKey!, "asdfjkl;qweruiop1234");
    expect(results).toEqual([]);
  });
});

if (!apiKey) {
  test("Skipping integration tests", () => {
    console.warn("TMDB_API_KEY not found in .env. Skipping integration tests.");
  });
}

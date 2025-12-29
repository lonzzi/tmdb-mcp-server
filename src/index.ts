#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from "dotenv";
import {
  searchMovies,
  searchTvShows,
  getMovieDetails,
  getTvShowDetails,
  getTrendingMovies,
  getTrendingTvShows,
  searchPeople,
} from "./tmdb";

dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;

if (!API_KEY) {
  console.error("TMDB_API_KEY environment variable is not set");
  process.exit(1);
}

const server = new McpServer({
  name: "tmdb-search",
  version: "1.0.0",
});

server.registerTool(
  "search_movies",
  {
    description:
      "Search for movies on TMDB by title to get metadata like overview, release date, and rating",
    inputSchema: z.object({
      query: z.string().describe("The movie title to search for"),
      language: z
        .string()
        .optional()
        .describe("Language code (e.g. 'en-US', 'zh-CN')"),
      region: z.string().optional().describe("Region code (e.g. 'US', 'FR')"),
    }),
  },
  async ({ query, language, region }) => {
    try {
      const result = await searchMovies(API_KEY, query, language, region);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: error.message || "Unknown error occurred",
          },
        ],
        isError: true,
      };
    }
  }
);

server.registerTool(
  "search_tv_shows",
  {
    description:
      "Search for TV shows on TMDB by title to get metadata like overview, first air date, and rating",
    inputSchema: z.object({
      query: z.string().describe("The TV show title to search for"),
      language: z
        .string()
        .optional()
        .describe("Language code (e.g. 'en-US', 'zh-CN')"),
    }),
  },
  async ({ query, language }) => {
    try {
      const result = await searchTvShows(API_KEY, query, language);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: error.message || "Unknown error occurred",
          },
        ],
        isError: true,
      };
    }
  }
);

server.registerTool(
  "get_movie_details",
  {
    description: "Get detailed information about a specific movie by its ID",
    inputSchema: z.object({
      movieId: z.number().describe("The ID of the movie"),
      language: z
        .string()
        .optional()
        .describe("Language code (e.g. 'en-US', 'zh-CN')"),
    }),
  },
  async ({ movieId, language }) => {
    try {
      const result = await getMovieDetails(API_KEY, movieId, language);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: error.message || "Unknown error occurred",
          },
        ],
        isError: true,
      };
    }
  }
);

server.registerTool(
  "get_tv_show_details",
  {
    description: "Get detailed information about a specific TV show by its ID",
    inputSchema: z.object({
      tvShowId: z.number().describe("The ID of the TV show"),
      language: z
        .string()
        .optional()
        .describe("Language code (e.g. 'en-US', 'zh-CN')"),
    }),
  },
  async ({ tvShowId, language }) => {
    try {
      const result = await getTvShowDetails(API_KEY, tvShowId, language);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: error.message || "Unknown error occurred",
          },
        ],
        isError: true,
      };
    }
  }
);

server.registerTool(
  "get_trending_movies",
  {
    description: "Get a list of trending movies",
    inputSchema: z.object({
      timeWindow: z
        .enum(["day", "week"])
        .optional()
        .describe("Time window for trending content (default: week)"),
      language: z
        .string()
        .optional()
        .describe("Language code (e.g. 'en-US', 'zh-CN')"),
    }),
  },
  async ({ timeWindow = "week", language }) => {
    try {
      const result = await getTrendingMovies(API_KEY, timeWindow, language);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: error.message || "Unknown error occurred",
          },
        ],
        isError: true,
      };
    }
  }
);

server.registerTool(
  "get_trending_tv",
  {
    description: "Get a list of trending TV shows",
    inputSchema: z.object({
      timeWindow: z
        .enum(["day", "week"])
        .optional()
        .describe("Time window for trending content (default: week)"),
      language: z
        .string()
        .optional()
        .describe("Language code (e.g. 'en-US', 'zh-CN')"),
    }),
  },
  async ({ timeWindow = "week", language }) => {
    try {
      const result = await getTrendingTvShows(API_KEY, timeWindow, language);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: error.message || "Unknown error occurred",
          },
        ],
        isError: true,
      };
    }
  }
);

server.registerTool(
  "search_person",
  {
    description: "Search for people (actors, directors, etc.) on TMDB",
    inputSchema: z.object({
      query: z.string().describe("The name of the person to search for"),
      language: z
        .string()
        .optional()
        .describe("Language code (e.g. 'en-US', 'zh-CN')"),
    }),
  },
  async ({ query, language }) => {
    try {
      const result = await searchPeople(API_KEY, query, language);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: error.message || "Unknown error occurred",
          },
        ],
        isError: true,
      };
    }
  }
);

const main = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});

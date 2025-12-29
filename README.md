# TMDB MCP Server

A Model Context Protocol (MCP) server that allows LLMs to search for movies and TV shows using the The Movie Database (TMDB) API.

## Features

- **Search Movies**: Find movies by title with support for region and language.
- **Search TV Shows**: Find TV shows by title with language support.
- **Get Details**: Retrieve detailed metadata for movies and TV shows (runtime, budget, seasons, etc.).
- **Trending**: Discover today's or this week's trending movies and TV shows.
- **Search People**: Search for actors, directors, and other crew members.
- **Direct Links**: Provides TMDb URLs for easy access to more details.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A TMDB API Key. You can get one by creating an account on [themoviedb.org](https://www.themoviedb.org/) and applying for an API key in your account settings.

## Configuration

### MCP Client Configuration (e.g., Claude Desktop)

To use this server with Claude Desktop, add it to your `claude_desktop_config.json`:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "tmdb": {
      "command": "npx",
      "args": ["-y", "@lonzzi/tmdb-mcp-server"],
      "env": {
        "TMDB_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Available Tools

All tools support an optional `language` argument (e.g., `en-US`, `zh-CN`, `fr-FR`) to get localized results. Default is `en-US`.

### `search_movies`

Search for movies on TMDB by title.

- **Arguments**:
  - `query` (string, required): The movie title to search for.
  - `language` (string, optional): Language code (default: `en-US`).
  - `region` (string, optional): ISO 3166-1 code to filter release dates (e.g., `US`, `KR`).

### `search_tv_shows`

Search for TV shows on TMDB by title.

- **Arguments**:
  - `query` (string, required): The TV show title to search for.
  - `language` (string, optional): Language code (default: `en-US`).

### `get_movie_details`

Get detailed information about a specific movie.

- **Arguments**:
  - `movieId` (number, required): The TMDB ID of the movie.
  - `language` (string, optional): Language code (default: `en-US`).

### `get_tv_show_details`

Get detailed information about a specific TV show.

- **Arguments**:
  - `tvShowId` (number, required): The TMDB ID of the TV show.
  - `language` (string, optional): Language code (default: `en-US`).

### `get_trending_movies`

Get the daily or weekly trending movies.

- **Arguments**:
  - `timeWindow` (string, optional): `day` or `week` (default: `week`).
  - `language` (string, optional): Language code (default: `en-US`).

### `get_trending_tv`

Get the daily or weekly trending TV shows.

- **Arguments**:
  - `timeWindow` (string, optional): `day` or `week` (default: `week`).
  - `language` (string, optional): Language code (default: `en-US`).

### `search_person`

Search for people (actors, directors, etc.).

- **Arguments**:
  - `query` (string, required): The name to search for.
  - `language` (string, optional): Language code (default: `en-US`).

## Development

1. Clone the repository:

   ```bash
   git clone https://github.com/lonzzi/tmdb-mcp-server.git
   cd tmdb-mcp-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with your `TMDB_API_KEY`.

4. Build the project:
   ```bash
   npm run build
   ```

### Running Tests

```bash
npm test
```

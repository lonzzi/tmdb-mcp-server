# TMDB MCP Server

A Model Context Protocol (MCP) server that allows LLMs to search for movies and TV shows using the The Movie Database (TMDB) API.

## Features

- **Search Movies**: Find movies by title and get metadata including ID, URL, release date, rating, and overview.
- **Search TV Shows**: Find TV shows by title and get metadata including ID, URL, first air date, rating, and overview.
- **Direct Links**: Provides TMDb URLs for easy access to more details.
- **Top Results**: Returns the top 5 most relevant results for each query.

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
      "args": ["@lonzzi/tmdb-mcp-server"],
      "env": {
        "TMDB_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Available Tools

### `search_movies`

Search for movies on TMDB by title.

- **Arguments**:
  - `query` (string, required): The movie title to search for.

### `search_tv_shows`

Search for TV shows on TMDB by title.

- **Arguments**:
  - `query` (string, required): The TV show title to search for.

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

---
name: tmdb-mcp-server
description: Search TMDB for movies, TV shows, and people, fetch detailed metadata, and pull daily or weekly trending lists via the TMDB MCP server. Use when users ask to find titles, disambiguate by year, get cast/crew or runtime/budget/season details, browse trending content, or want direct TMDB links with language/region localization.
---

# TMDB MCP Server

## Overview

Use TMDB MCP tools to search movies, TV shows, and people, then fetch detailed metadata and trending lists with optional language and region localization.

## Quick Start

1. Clarify the target: movie, TV show, or person. If unclear, search both movies and TV shows.
2. Run the relevant search tool with `query` and optional `language`/`region`.
3. Present top matches with `id`, title/name, year, and a short overview.
4. Ask the user to confirm the exact match, then fetch details by ID.
5. Provide a concise summary plus the TMDB link returned by the tool.

## Task Guide

### Search Movies

Use `search_movies` with `query` and optional `language`/`region`. When results are ambiguous, show 3 to 5 candidates with year and ID and ask which one to open.

### Search TV Shows

Use `search_tv_shows` with `query` and optional `language`. If the user provides a year or country hint, use it to rank or filter results in your response.

### Get Movie or TV Details

Use `get_movie_details` or `get_tv_show_details` after the user confirms the exact title. Summarize key fields:
- Movies: release date, runtime, genres, budget, revenue, overview.
- TV: first air date, seasons count, episodes count, genres, overview.

### Trending

Use `get_trending_movies` or `get_trending_tv` with `timeWindow` set to `day` or `week`. Share the top results with titles, year, and short overviews, then offer to open details for any item.

### Search People

Use `search_person` for actors, directors, or crew. If the user wants filmography or specific credits, offer to look up the titles they name and fetch details by ID.

## Output Conventions

- Always include the TMDB ID when presenting multiple matches.
- Prefer localized titles/overviews when `language` is provided.
- Do not guess details; rely on tool output.

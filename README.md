# meta-checker

A tool to **fetch, inspect, and preview website metadata** (Open Graph, Twitter Cards, favicon, and standard HTML metadata). Useful for SEO checks and social media preview testing.

## Features

- Fetch and normalize metadata from any URL.
- Preview tabs - data, facebook, outlook, teams, whatsapp
- Inline Base64 previews for OG and Twitter images.
- Detect missing metadata and provide fallbacks.
- Supports Basic Auth for protected pages

## Architecture

```
app/ # React app with preview tabs
worker/ # Cloudflare Worker
```

- **Frontend:** React, handles user input, fetches metadata, renders preview tabs.
- **Cloudflare Worker:** \`/api/meta\` POST endpoint; parses HTML using \`HTMLRewriter\`, Base64 image conversion, optional Basic Auth.
- **GitHub Pages frontend:** Points to Cloudflare Worker for API requests.

## Installation

### App

```bash
cd app
npm install
npm run dev
```

- By default, the frontend points to the Cloudflare Worker (\`/api/meta\`) for API requests. You'll need to update the fetch request to your own server, as it will be blocked by the Worker's CORS policy.

### Cloudflare Worker

1. Configure \`wrangler.toml\`.
2. Deploy:

```bash
npx wrangler publish
```

- Worker exposes \`/api/meta\` for POST requests.
- Update CORS headers.

## Usage

1. Open the frontend (local dev or GitHub Pages).
2. Enter a URL and optional Basic Auth credentials.
3. Click **Fetch Meta Tags**.
4. View results in tabs:
   - **Data:** Technical metadata table with normalized values.
   - **Facebook / Outlook / Teams / WhatsApp:** Previews using fetched metadata.

## Folder Structure

```
app/
  └─ src/
      └─ App.jsx          # React app
worker/
  ├─ worker.js            # Cloudflare Worker API
  └─ wrangler.toml        # Cloudflare configuration
```

## Example POST Request

```bash
curl -X POST https://your-worker-url/api/meta \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

- Returns JSON metadata with normalized values and Base64 images.

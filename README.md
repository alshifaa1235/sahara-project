# ✦ Sahara — Premium E-Commerce Product Catalog

> A full-stack e-commerce product catalog built with React + Vite and Express.js.  
> Premium modern design, fully responsive, production-ready.

![Sahara](https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80)

---

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | React 18, Vite 5, React Router v6       |
| Backend  | Node.js, Express.js                     |
| Storage  | JSON flat-file database                 |
| Fonts    | Cormorant Garamond, Inter, Space Mono   |
| Styling  | Vanilla CSS with design token system    |

---

## Features

- **Product catalog** — 12 products across 4 categories with full metadata
- **Search** — full-text search across name, brand, description, and tags
- **Filters** — category, sale, new arrivals, featured
- **Sort** — featured, newest, price (asc/desc), top rated
- **Pagination** — server-side with configurable page size
- **Product detail** — image gallery with zoom, size selector, specs table, related products
- **Lazy loading** — all images lazy-loaded with skeleton placeholders
- **Responsive** — mobile, tablet, and desktop layouts
- **Route-based code splitting** — all pages lazy-loaded via React Suspense
- **Error & empty states** — graceful handling throughout

---

## Project Structure

```
sahara/
├── client/                   # React + Vite frontend
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx + Navbar.css
│   │   │   │   └── Footer.jsx + Footer.css
│   │   │   └── ui/
│   │   │       ├── ProductCard.jsx + ProductCard.css
│   │   │       └── PageLoader.jsx + PageLoader.css
│   │   ├── hooks/
│   │   │   ├── useFetch.js
│   │   │   └── useProducts.js
│   │   ├── pages/
│   │   │   ├── Home.jsx + Home.css
│   │   │   ├── Products.jsx + Products.css
│   │   │   ├── ProductDetail.jsx + ProductDetail.css
│   │   │   ├── About.jsx + About.css
│   │   │   ├── Contact.jsx + Contact.css
│   │   │   └── NotFound.jsx + NotFound.css
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                   # Express.js API
│   ├── data/
│   │   └── products.json     # JSON data store
│   ├── routes/
│   │   └── products.js       # Product routes
│   ├── index.js              # Server entry point
│   └── package.json
│
├── package.json              # Root monorepo scripts
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/sahara.git
cd sahara

# Install all dependencies (root + client + server)
npm run install:all
```

### Development

```bash
# Run both client and server concurrently
npm run dev
```

| Service | URL                       |
|---------|---------------------------|
| Client  | http://localhost:5173      |
| API     | http://localhost:5000/api  |

### Environment Variables

```bash
# Server — copy and edit
cp server/.env.example server/.env

# Client — copy and edit (optional for dev, proxy handles it)
cp client/.env.example client/.env
```

---

## API Reference

### Products

| Method | Endpoint              | Description                        |
|--------|-----------------------|------------------------------------|
| GET    | `/api/products`       | List products (with query filters) |
| GET    | `/api/products/meta`  | Get categories and brands          |
| GET    | `/api/products/:id`   | Get single product + related       |
| GET    | `/api/health`         | Health check                       |

### Query Parameters — `GET /api/products`

| Param       | Type    | Description                                |
|-------------|---------|--------------------------------------------|
| `category`  | string  | Filter by category name                    |
| `search`    | string  | Full-text search                           |
| `sort`      | string  | `price_asc` `price_desc` `rating` `newest` |
| `featured`  | boolean | Filter featured products                   |
| `sale`      | boolean | Filter sale products                       |
| `newArrival`| boolean | Filter new arrivals                        |
| `page`      | number  | Page number (default: 1)                   |
| `limit`     | number  | Items per page (default: 12)               |

---

## Production Build

```bash
# Build the React client
npm run build

# Start the Express server (serves the built client)
NODE_ENV=production npm start
```

The Express server will serve the Vite build at `/` and the API at `/api/*`.

---

## Deployment

### Render / Railway / Fly.io

1. Set `NODE_ENV=production` in environment variables
2. Set build command: `npm run install:all && npm run build`
3. Set start command: `npm start`

### Vercel (frontend only)

1. Set root directory to `client`
2. Build command: `npm run build`
3. Output directory: `dist`
4. Deploy server separately and set `VITE_API_URL` to your API URL

---

## Design System

The design uses a custom CSS token system defined in `globals.css`:

- **Palette** — Sand tones (`--color-sand-*`), Dune gold (`--color-dune`), Ink (`--color-ink`)
- **Typography** — Cormorant Garamond (display), Inter (body), Space Mono (labels/mono)
- **Spacing** — 4px base scale (`--space-1` through `--space-32`)
- **Shadows** — Five levels (`--shadow-xs` through `--shadow-xl`)
- **Transitions** — Named easing curves and durations

---

## Pages

| Route            | Page           | Description                              |
|------------------|----------------|------------------------------------------|
| `/`              | Home           | Hero, featured products, categories, CTA |
| `/products`      | Products       | Full catalog with sidebar filters        |
| `/products/:id`  | Product Detail | Gallery, info, specs, related products   |
| `/about`         | About          | Story, principles, timeline, team        |
| `/contact`       | Contact        | Contact form, info, FAQ accordion        |
| `*`              | 404            | Custom not-found page                    |

---

## License

MIT © Sahara. Built with intention.

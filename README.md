# Vinyllo — Vinyl Record E-Commerce

A full-featured e-commerce web application for browsing, discovering, and purchasing vinyl records. Built as a school web development project.

## Features

- **Product catalog** — browse and search vinyl records with genre/artist filtering
- **Flip cards** — click any album to flip it and reveal the tracklist; hover for a 3D tilt effect
- **Infinite auto-scrolling carousel** — featured products on the home page loop seamlessly with RAF-based animation
- **Cart** — add/remove records, quantity limits tied to stock, persistent across the session
- **Checkout** — shipping details, VAT number validation, country selector
- **Authentication** — register and log in via Firebase Auth
- **Favorites** — heart any album to save it; synced to Firestore per user
- **Profile page** — account info, favorites displayed as flip cards (grid when few, carousel when many)
- **Order confirmation** — summary page after successful checkout

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite |
| Routing | React Router v7 |
| Backend / Auth | Firebase (Auth + Firestore) |
| Styling | Plain CSS (custom properties, no framework) |
| Icons | react-icons |

## Project Structure

```
src/
├── Pages/          # Route-level page components
├── components/     # Shared UI components (Header, Footer, AlbumCard, carousels…)
├── context/        # React context providers (Cart, Favorites, Orders, Shipping)
├── services/       # Business logic (product fetching, VAT validation, filtering)
├── routes/         # App routing configuration
├── styles/         # CSS files (layout, components, cards, theme)
└── firebase.js     # Firebase app initialisation
```

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with **Authentication** (Email/Password) and **Firestore** enabled

### Installation

```bash
git clone <repo-url>
cd Vinyl-e-com
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Run

```bash
npm run dev      # development server
npm run build    # production build
npm run preview  # preview production build locally
```

## Firestore Data Model

Products are stored in a `vinyl_webp` collection. Each document contains:

```
{
  title: string,
  artist: string,
  year: number,
  price: number,
  stock: number,
  imageUrl: string,
  description: string,
  label: string,
  length: string,
  tracks: [{ title: string, time: string }]
}
```

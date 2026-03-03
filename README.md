# Netflix Clone 🎬

A modern Netflix-like Single Page Application built with **Vanilla JavaScript**, **HTML5**, **CSS3 + Tailwind CSS v4**, **Node.js + Express**, and **SQLite3**.

## Stack

- **Frontend**: Vanilla JS (no frameworks), HTML5, CSS3, Tailwind CSS v4
- **Backend**: Node.js, Express.js
- **Database**: SQLite3 (better-sqlite3)
- **Auth**: JWT + bcryptjs
- **APIs**: TMDB API for movie data

## Features (To Be Implemented)

- 🎥 Movie browsing with TMDB API integration
- 🔍 Advanced search and filtering
- 📝 User authentication (login/register)
- ❤️ Favorites/Watchlist functionality
- 👤 User profile management
- 🎬 Video player page
- 🌓 Dark/Light theme toggle
- 📱 Responsive design
- ⚡ Client-side routing (History API)

## Project Structure

```
netflix-clone/
├── client/              # Frontend SPA
│   ├── index.html      # SPA shell with app mount point
│   ├── css/            # Stylesheet output
│   ├── js/             # Application logic
│   │   ├── app.js      # Entry point
│   │   ├── router.js   # Client-side router
│   │   ├── store.js    # Global state management
│   │   ├── api/        # API clients (TMDB, Backend)
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable components
│   │   └── utils/      # Utility functions
│   └── assets/         # Icons, images
├── server/             # Backend API
│   ├── index.js        # Express app
│   ├── config/         # Configuration
│   ├── routes/         # API routes
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Express middleware
│   ├── models/         # Database models
│   └── data/           # SQLite database
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
├── .env               # Environment variables
└── .gitignore         # Git ignore rules
```

## Setup

### Prerequisites

- Node.js 16+ and npm
- TMDB API key (get it at https://www.themoviedb.org/settings/api)

### Installation

```bash
# 1. Clone repository and navigate to project
cd netflix-clone

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Add your TMDB API key and JWT secret to .env
# Edit .env and set:
# - TMDB_API_KEY=your_key_here
# - JWT_SECRET=your_secret_here

# 5. Build Tailwind CSS
npm run build:css

# 6. Start development server
npm run dev
```

### Development

```bash
# Start with nodemon (auto-restart on changes)
npm run dev

# Watch Tailwind CSS changes
npm run watch:css

# Start production server
npm start
```

Visit http://localhost:3000 in your browser.

## API Endpoints (To Be Implemented)

### Auth
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify JWT token

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `PUT /api/user/password` - Change password

### Watchlist
- `GET /api/watchlist` - Get user's watchlist
- `POST /api/watchlist/:movieId` - Add to watchlist
- `DELETE /api/watchlist/:movieId` - Remove from watchlist

### History (Watch History)
- `GET /api/history` - Get watch history
- `POST /api/history/:movieId` - Add to history

## Technologies

| Category | Technology |
|----------|-----------|
| Frontend | Vanilla JS, HTML5, CSS3, Tailwind v4 |
| Backend | Node.js, Express.js |
| Database | SQLite3 (better-sqlite3) |
| Security | bcryptjs, JWT |
| Dev Tools | Nodemon, Tailwind CLI |

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
TMDB_API_KEY=your_api_key
JWT_SECRET=your_jwt_secret
DB_PATH=./server/data/netflix.db
```

## License

MIT

## Author

Your Name

---

**Note**: This is a educational project for learning Vanilla JS SPA development with a modern backend. Use responsibly and respect TMDB's API terms.

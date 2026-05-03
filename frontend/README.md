# VOILÁ — Mood-Based Music Player

A full-stack music player that organises songs by mood and streams audio through a deployed backend API.

### Live App:
https://artiegoesviral.github.io/voila-audio-player/

## Overview
VOILÁ is a responsive music player built with Angular and powered by a Node.js backend. It demonstrates full-stack integration, serving playlists dynamically from a database and streaming media files in real time.

The project focuses on clean UI design, component-based architecture, and real-world deployment of a frontend–backend system.

## Key Features
- Mood-based playlist organisation
- Audio playback with dynamic controls
- Data fetched from a live API
- Artwork and audio served from backend
- Responsive and user-friendly interface

## Tech Stack

### Frontend
- Angular
- TypeScript

### Backend
- Node.js
- Express

### Database
- MySQL (Aiven)

### Deployment
- Frontend: GitHub Pages
- Backend: Render

## Architecture
``` 
Angular (GitHub Pages)
        ↓
Express API (Render)
        ↓
MySQL (Aiven)
```

- Frontend requests playlist data from API
- Backend queries database and returns structured playlists
- Media files are served via HTTP endpoints

## Local Setup
```bash
git clone https://github.com/artiegoesviral/voila-audio-player
cd voila-audio-player
```

### Frontend
``` bash
cd frontend
npm install
ng serve
```

### Backend
```bash
cd backend
npm install
npm start
```

Create a .env file in /backend:

```env
BASE_URL=http://localhost:3000
DB_HOST=...
DB_PORT=...
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
```

## What This Project Demonstrates
- Full-stack application architecture
- API integration with Angular
- Media streaming from a backend service
- Deployment across multiple platforms
- Debugging real-world issues (CSP, HTTPS, environment config)

## Future Improvements
- Search and filtering
- Playback progress + volume control
- User authentication
- Cloud media storage (S3 / Cloudinary)

## Author
Qurat-ul-Anne Sikander Akhter
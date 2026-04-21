# BestApp - Forum Platform

A full-featured forum site inspired by mobilism.me

## Tech Stack
- **Frontend**: Next.js 14 (React, SSR, TypeScript)
- **Backend**: NestJS (TypeScript, modular architecture)
- **Database**: PostgreSQL 16
- **ORM**: Prisma / TypeORM
- **Auth**: JWT-based authentication

## Project Structure
```
bestapp/
├── apps/
│   ├── frontend/          # Next.js app
│   └── backend/           # NestJS API
├── packages/
│   └── shared/            # Shared types & utilities
├── docker-compose.yml
└── package.json
```

## Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker & Docker Compose

### Development Setup

1. **Install dependencies**
```bash
npm install
```

2. **Start Docker services (PostgreSQL)**
```bash
npm run docker:up
```

3. **Run development servers**
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Database: localhost:5432

### Database Setup
```bash
# Run migrations
npm run db:migrate

# Seed initial data
npm run db:seed
```

## Features (Planned)

### Phase 1-3: Core
- ✅ User registration & authentication
- ✅ User profiles with avatars
- ✅ Forum categories & subforums
- ✅ Thread & post CRUD
- ✅ BBCode editor

### Phase 4-7: Interaction
- Private messaging
- Friends & Foes system
- WRZ$ virtual currency
- Thank You system
- Reupload requests

### Phase 8-14: Advanced
- Advanced search
- Contests engine
- VIP/Premium system
- Real-time notifications
- Mobile API

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://bestapp:bestapp_secret_2024@localhost:5432/bestapp
JWT_SECRET=your-super-secret-jwt-key
PORT=3001
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## API Documentation
Once backend is running, visit: http://localhost:3001/api

## License
MIT

# OffBrand - Full Stack Application

A modern full-stack web application built with Next.js and NestJS.

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand

### Backend
- **Framework**: NestJS
- **ORM**: Prisma 7
- **Database**: PostgreSQL
- **Authentication**: JWT

## Project Structure

```
offBrand/
├── frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/       # App Router pages
│   │   ├── components/# UI components
│   │   ├── lib/       # Utilities and API client
│   │   └── stores/    # Zustand stores
│   └── ...
├── backend/           # NestJS backend API
│   ├── src/
│   │   ├── auth/      # Authentication module
│   │   ├── prisma/    # Database service
│   │   ├── waitlist/  # Waitlist module
│   │   └── ...
│   └── prisma/        # Prisma schema and migrations
└── ...
```

## Getting Started

### Prerequisites
- Node.js >= 20.9.0
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/OffBrand-org/full-stack-offbrand.git
cd full-stack-offbrand
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run database migrations:
```bash
npx prisma generate
npx prisma db push
```

5. Start the backend:
```bash
npm run start:dev
```

6. Install frontend dependencies (in a new terminal):
```bash
cd frontend
npm install
```

7. Start the frontend:
```bash
npm run dev
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://user:password@localhost:5432/offbrand"
JWT_SECRET="your-jwt-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
PORT=3001
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL="http://localhost:3001/api/v1"
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/logout` - Logout

### Waitlist
- `POST /api/v1/waitlist` - Join waitlist
- `GET /api/v1/waitlist/count` - Get waitlist count

## Deployment

### Frontend (Vercel)
The frontend is configured for Vercel deployment. Set the root directory to `frontend` in Vercel settings.

### Backend
The backend can be deployed to Railway, Render, or any Node.js hosting platform.

## License

MIT

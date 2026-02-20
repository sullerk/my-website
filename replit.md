# Overview

This is a full-stack React + Express application for a marketplace/e-commerce platform. It uses Vite for development and bundling, with TypeScript throughout.

## Project Architecture

### Frontend (client/)
- **Framework**: React 19 with TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS 4 with Radix UI components
- **State Management**: TanStack React Query
- **Build Tool**: Vite 7

### Backend (server/)
- **Framework**: Express.js
- **Runtime**: Node.js with tsx for TypeScript execution
- **Database ORM**: Drizzle (configured for PostgreSQL)

### Shared (shared/)
- Contains shared TypeScript schemas and types using Drizzle and Zod

## Key Files

- `server/index.ts` - Express server entry point (runs on port 5000)
- `server/routes.ts` - API route definitions
- `server/vite.ts` - Vite dev server integration
- `client/src/App.tsx` - React app entry with routing
- `vite.config.ts` - Vite configuration
- `drizzle.config.ts` - Database migration configuration

## Development

Run the application:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Production Deployment

The application builds to `dist/` with:
- `dist/public/` - Static frontend assets
- `dist/index.cjs` - Compiled server bundle

## Database

Uses Drizzle ORM with PostgreSQL. Push schema changes:
```bash
npm run db:push
```

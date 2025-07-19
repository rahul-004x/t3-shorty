# T3 Shorty: URL Shortener

A modern, type-safe URL shortener built with the T3 Stack.

![T3 Shorty Banner](https://via.placeholder.com/800x200?text=T3+Shorty)

## 🚀 Features

- **URL Shortening**: Create short, memorable links for any URL
- **Custom Slugs**: Define your own custom short URLs (optional)
- **Click Tracking**: Monitor how many times your short links are clicked
- **User Authentication**: Secure user accounts with Clerk
- **Personal Dashboard**: View and manage all your shortened links

## 🛠️ Tech Stack

This project leverages the powerful [T3 Stack](https://create.t3.gg/):

- [Next.js](https://nextjs.org) - React framework with App Router
- [Clerk](https://clerk.com) - Authentication and user management
- [Drizzle ORM](https://orm.drizzle.team) - Type-safe database ORM
- [Postgres](https://www.postgresql.org) - SQL database
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [tRPC](https://trpc.io) - End-to-end type-safe APIs
- [TypeScript](https://www.typescriptlang.org) - Type safety throughout

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [pnpm](https://pnpm.io/) (v8 or newer)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rahul-004x/t3-shorty.git
   cd t3-shorty
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Copy the `.env.example` file to `.env.local` and fill in your credentials:
   ```bash
   cp .env.example .env.local
   ```

4. Start the PostgreSQL database:
   ```bash
   ./start-database.sh
   ```

5. Run database migrations:
   ```bash
   pnpm db:push
   ```

6. Start the development server:
   ```bash
   pnpm dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Database Management

- Generate migrations: `pnpm db:generate`
- Apply migrations: `pnpm db:migrate`
- Push schema changes: `pnpm db:push`
- Open Drizzle Studio: `pnpm db:studio`

## 🧰 Development Commands

- `pnpm dev` - Start development server

## 📦 Project Structure

```
src/
├── app/                # Next.js App Router
│   ├── _components/    # Client-side components
│   ├── api/            # API routes
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── server/
│   ├── api/            # tRPC API
│   │   ├── routers/    # tRPC routers
│   │   ├── root.ts     # Root router
│   │   └── trpc.ts     # tRPC helpers
│   └── db/             # Database
│       ├── index.ts    # Database client
│       └── schema.ts   # Drizzle schema
├── styles/             # Global styles
└── trpc/               # tRPC client utilities
```

## 🚢 Deployment

This application can be deployed on various platforms:

- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- [Railway](https://railway.app) (for both app and database)


## 👨‍💻 Author

[Rahul](https://github.com/rahul-004x)

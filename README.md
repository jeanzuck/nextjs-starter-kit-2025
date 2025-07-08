# Nextjs Starter Kit 2025

A personal starter kit for building real-world web apps with Next.js.
Made for myself — but hey, you're more than welcome to use or fork it 😎

Built with love for **solo full-stack devs** or **small teams**.
Simple to get started, packed with modern tools, and ready for production.
No overkill, just the stuff that works.

---

## 🛠️ Made With Tools We Love ❤️

- Bun
- Docker
- React
- Next.js
- TypeScript
- ESLint
- Prettier
- Tailwind CSS
- shadcn/ui
- imgproxy
- PostgreSQL
- Drizzle ORM
- next-intl
- better-auth
- react-hook-form
- Zod

---

## ⚠️ You Need to Know

- This project uses **imgproxy + New ImageOptimize Component** instead of the default Next.js Image component for optimized image delivery.
- The database uses **Drizzle ORM** with **PostgreSQL** for performance and type safety.
- The schema is designed using a **codebase-first approach** with Drizzle, making it easier to maintain and refactor.
- Authentication is handled by **better-auth** for simplicity and security.
- **Nginx** is used as a reverse proxy for both the Next.js production server and imgproxy to improve performance and reliability.
- 🧪 For the best **HMR** and **Fast Refresh** experience during development, always run the **Next.js dev server locally**, rather than inside Docker.
- You can optionally add **Hono** or **Elysia** frameworks to build server APIs within this starter kit.

---

## 🚀 Quick Commands

Just some handy commands I use while working on this:

```bash
# ----- 🛠️ Development -----

# Install project dependencies
bun install

# Start the Next.js local development server (recommended for best HMR + Fast Refresh)
bun run dev

# Run the development environment inside Docker
bun run docker:dev

# Reset and seed the database (development)
bun run db:dev:reset

# ----- 🚀 Production -----

# Build the production app and copy files to the Docker container
bun run build

# Start the production environment
bun run docker:prod

# Reset and seed the production database
bun run db:prod:reset

# Run production database migration
bun run db:prod:push

# ----- 🧠 Notes & Tips -----

# Enable slow query logging in postgresql.conf
logging_collector = on
log_directory = 'log'
log_min_duration_statement = 1000

# Simulate a slow query
SELECT pg_sleep(1);

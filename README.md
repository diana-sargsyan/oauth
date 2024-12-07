# Next.js Project with PostgreSQL and Drizzle ORM

This project combines the power of [Next.js](https://nextjs.org) with a PostgreSQL database and the Drizzle ORM.

## Prerequisites

Ensure you have the following installed:

- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/)
- [Drizzle ORM CLI](https://github.com/drizzle-team/drizzle-kit)

## Getting Started

### Step 1: Set Up PostgreSQL

1. Open your terminal and log in to PostgreSQL:
   ```bash
   psql -U postgres
   ```
2. Create a new database:
   ```sql
   CREATE DATABASE <YOUR_DATABASE_NAME>;
   ```

If PostgreSQL is not installed, [follow the official installation guide](https://www.postgresql.org/download/).

### Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory of your project and populate it with the following:

```env
PGHOST=localhost
PGPORT=5432
PGUSER=<YOUR_DATABASE_USER>
PGPASSWORD=<YOUR_DATABASE_PASSWORD>
PGDATABASE=<YOUR_DATABASE_NAME>
JWT_SECRET='OphZm25rVxMK3pM4KNh8rYn19Gq52v5F0pA3KhPrL6Q='
```

### Step 3: Install Dependencies

Run the following command to install project dependencies:

```bash
npm install
```

### Step 4: Migrate Database Schema

Use the Drizzle CLI to generate, migrate, and push your database schema:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
npx drizzle-kit push
```

### Step 5: Run the Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Project Structure

- Edit `pages/index.tsx` to modify the main page.
- API routes are defined in `pages/api`, such as the example route at `/api/hello`.

---

## Deployment

The easiest way to deploy this project is with [Vercel](https://vercel.com). Follow the [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://github.com/drizzle-team/drizzle-orm)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

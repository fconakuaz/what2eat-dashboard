<h1 align="center"><strong>What2Eat</strong></h1>
<h3 align="center"><strong>Dashboard administrativo</strong></h3>

<br />
<div align="center">
<a href="https://what2eat-dashboard.vercel.app/">Demo</a>
<span> · </span>
<a href="https://github.com/fconakuaz/what2eat-dashboard">Repositorio</a>
<span>
</div>

<br>

<img src="public/dashboard.webp" alt="What2Eat Screenshot">
 
<br>

## Overview.

This is a starter template using the following stack:

- Framework - [Next.js (App Router)](https://nextjs.org)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [Auth.js](https://authjs.dev)
- Database - [Postgres](https://vercel.com/postgres)
- Deployment - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn UI](https://ui.shadcn.com/)
- Analytics - [Vercel Analytics](https://vercel.com/analytics)
- Formatting - [Prettier](https://prettier.io)

This template uses the new Next.js App Router. This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.

## Getting Started

### Config BD with Prisma

```bash
# Crea tablas en BD
pnpm prisma migrate dev --name init

# Actualiza tablas en BD
pnpm prisma migrate dev --name update

# Generate tables cada que se hacen cambios al esquema
pnpm prisma generate

# Reset prismayarn prisma generate
pnpm prisma db push --force-reset

# Run seed
pnpm run seed
```

During the deployment, Vercel will prompt you to create a new Postgres database. This will add the necessary environment variables to your project.

Inside the Vercel Postgres dashboard, create a table based on the schema defined in this repository.

```
CREATE TYPE status AS ENUM ('active', 'inactive', 'archived');

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  name TEXT NOT NULL,
  status status NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  stock INTEGER NOT NULL,
  available_at TIMESTAMP NOT NULL
);
```

Then, uncomment `app/api/seed.ts` and hit `http://localhost:3000/api/seed` to seed the database with products.

Next, copy the `.env.example` file to `.env` and update the values. Follow the instructions in the `.env.example` file to set up your GitHub OAuth application.

```bash
npm i -g vercel
vercel link
vercel env pull
```

Finally, run the following commands to start the development server:

```
pnpm install
pnpm run dev
```

You should now be able to access the application at http://localhost:3000.

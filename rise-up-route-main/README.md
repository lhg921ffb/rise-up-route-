# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploy to Netlify

This project is Netlify-ready via `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 22

Steps:

1. Push this repository to GitHub (Lovable → GitHub → Connect project, or `git push` locally).
2. In Netlify: **Add new site → Import an existing project → GitHub**, pick the repo.
3. Leave the detected settings as-is (they come from `netlify.toml`) and deploy.

No environment variables are required. The build target is selected with the
`NITRO_PRESET` env var (`netlify` in `netlify.toml`); Netlify also auto-detects it.

## Backend

There is no backend. The funnel is fully client-side:

- No database, no API routes, no server functions, no auth.
- Quiz/contact answers are kept in `sessionStorage` via Zustand and are not sent anywhere.
- The server side only does server-side rendering of the pages.

If you later want to actually receive the submissions (email or database), that
requires adding a backend.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS


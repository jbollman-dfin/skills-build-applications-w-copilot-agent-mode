# Octofit Tracker frontend

## API configuration

In Codespaces, define `VITE_CODESPACE_NAME` in `.env.local` with the value of
your Codespace name. The frontend then calls
`https://<codespace-name>-8000.app.github.dev/api/<component>/`.

Copy `.env.example` to `.env.local` and replace the placeholder value. When
`VITE_CODESPACE_NAME` is unset, requests safely fall back to
`http://localhost:8000`.

## Development

```bash
npm run dev
```

The app uses React Router for navigation and accepts array responses as well
as common paginated shapes: `data`, `items`, `results`, and `docs`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

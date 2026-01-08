# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Admin access for ProjectsSection

This project contains a simple client-side admin gating for the Projects section. To enable the admin login (used to show Add / Edit / Delete controls), set an environment variable at build time named `VITE_ADMIN_PASSWORD`.

- Example (development):

	- On Windows PowerShell: `$env:VITE_ADMIN_PASSWORD = "admin123"; npm run dev`

Notes:
- This is a simple client-side protection: the password value is embedded in the built assets and session is stored in sessionStorage. It is NOT secure for production.
- For proper security in a public site, use a backend or an auth provider (Firebase Auth, Netlify Identity, Auth0) and store projects on a server or database.

If you'd like, I can help integrate a safer workflow (serverless functions, Firebase, or Git-based CMS) so only you can add projects securely.

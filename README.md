# Trackerr Frontend – Parcel Tracking Web Application!

<img src="src/assets/Logo.png" alt="Trackerr Logo" width="150">

**Trackerr** is the frontend web application for the Trackerr parcel tracking and logistics platform.

This React-based frontend connects to the Trackerr backend API and provides interfaces for:

- Business owners / admins: managing parcels, riders, analytics, etc.
- End customers: real-time parcel tracking and order history

Built with modern tools for performance, maintainability, and responsive user experience.

## Key Features

### For Business Owners/Admins

- Real-time dashboard with parcel statuses, rider metrics, and revenue overview
- Parcel creation, tracking ID generation, rider assignment & status updates
- Rider management (add/edit, performance tracking)
- Reports & operational analytics
- Profile & business settings management

### For Customers

- Real-time tracking via unique tracking ID
- Order history and detailed shipment view
- Interactive map visualization (route + ETA)
- Status change notifications

### Shared

- Secure JWT-based authentication (multi-step signup/login)
- Fully responsive design (mobile-first)
- Light / Dark mode toggle
- Accessibility improvements (WCAG basics, keyboard nav)
- Robust error handling & user-friendly messages

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Material-UI components
- **Routing**: React Router DOM
- **State Management**: React Context API
- **HTTP**: Axios
- **Forms**: React Hook Form + Yup
- **Animations**: Framer Motion
- **Maps**: React Google Maps API / Leaflet
- **Charts**: Recharts
- **Testing**: Jest
- **Linting & Hooks**: ESLint + Husky

## Prerequisites

- Node.js ≥ 18 (LTS recommended)
- npm or yarn
- Git
- Access to the Trackerr backend API (ask team lead / backend team for URL & credentials)

## Getting Started

1. **Clone the repository**  
   (Use the internal Git URL provided by your team / organization)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

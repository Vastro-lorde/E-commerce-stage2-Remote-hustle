# ShopEase E-Commerce

A modern React e-commerce application built with Vite, Firebase Authentication, and Tailwind CSS.

## Optimisations, Fixes & Features by [Vastro-lorde](https://github.com/Vastro-lorde)

### Features

- **Product Detail View** — Click any product to view its full details on a dedicated page
- **Guest Cart Persistence** — Guest carts are saved to localStorage so they survive page refreshes
- **Guest Checkout** — Place orders without creating an account by providing email, phone number, and address
- **Order Persistence (IndexedDB)** — Orders are saved locally in the browser using IndexedDB
- **Order History Page** — View past orders from the account dropdown; guests can look up orders by email
- **404 Not Found Page** — Friendly fallback page for unknown routes

### Optimisations

- **Bounded Pagination** — Next/Previous buttons are properly disabled at the first and last pages instead of fetching infinitely
- **Global Toast Notifications** — Extracted toast out of map loops into a single, non-duplicated toast in App.jsx
- **Lazy Loading** — All page components are lazy-loaded with React.lazy and Suspense for faster initial loads

### Fixes

- **Vercel SPA Routing** — Fixed 404 on direct route navigation by correcting `vercel.json` filename casing (Linux is case-sensitive)
- **Order Storage Migration** — Migrated order storage from Firestore to IndexedDB to resolve Firestore permission errors on deployment
- **OrderHistory Error Handling** — Added try/catch with user-facing error state to prevent unhandled crashes

# ShopEase E-Commerce

A modern React e-commerce application built with Vite, Firebase Authentication, and Tailwind CSS.

## Features

- **Product Browsing** — Browse paginated products fetched from the DummyJSON API
- **Product Detail View** — Click any product to view its full details on a dedicated page
- **Search** — Search for products by name
- **Shopping Cart** — Add/remove items, adjust quantities, with a live cart badge in the header
- **Guest Cart Persistence** — Guest carts are saved to localStorage so they survive page refreshes
- **Authenticated Cart Sync** — Logged-in users' carts are synced to Firestore in real time
- **User Authentication** — Sign up and log in with email/password via Firebase Auth
- **Guest Checkout** — Place orders without creating an account by providing email, phone number, and address
- **Order Persistence (IndexedDB)** — Orders are saved locally in the browser using IndexedDB
- **Order History** — View past orders from the account dropdown; guests can look up orders by email
- **Bounded Pagination** — Next/Previous buttons are properly disabled at the first and last pages
- **Global Toast Notifications** — A single, non-duplicated toast notification for cart actions
- **404 Not Found Page** — Friendly fallback page for unknown routes
- **Responsive Design** — Fully responsive layout with mobile navigation and Tailwind CSS
- **Image Carousel** — Hero swiper/carousel on the home page
- **Lazy Loading** — All page components are lazy-loaded with React.lazy and Suspense for faster initial loads

## Tech Stack

- **React 19** with React Router DOM 7
- **Vite 8** for fast dev & builds
- **Tailwind CSS 4** for utility-first styling
- **Firebase** (Authentication + Firestore)
- **IndexedDB** for local order storage
- **DummyJSON API** for product data

---

*Built with React + Vite*

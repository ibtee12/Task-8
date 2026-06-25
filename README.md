# 📚 Inkwell — Online Book Borrowing Platform

A seamless and modern web application that digitizes the traditional library
experience. Users can explore a curated collection of books, filter by
category, search by title, and borrow titles digitally. Built with a focus on
security and performance using **BetterAuth**, **Next.js**, and **MongoDB**.

> **Assignment category:** A8 — Mango

---

## 🔗 Live URL

**https://your-deployment-url.vercel.app** _(replace after deploying)_

---

## 🎯 Purpose

Inkwell reimagines the library as a fast, friendly, fully-digital experience.
Readers browse a handpicked catalog, filter by what they love (Story, Tech,
Science), and borrow a book in a single click — no late fees, instant returns.
Authentication keeps borrowing and profiles private and secure.

---

## ✨ Key Features

- **Modern, unique design** — a custom "Inkwell" library theme (parchment,
  forest-emerald, antique-gold) with Playfair Display headings, built on
  DaisyUI + Tailwind CSS v4.
- **Fully responsive** — verified across mobile, tablet, and desktop.
- **Home page**
  - Hero banner with the **"Find Your Next Read"** headline and a Browse Now CTA.
  - Scrolling **marquee** of new arrivals and announcements.
  - **Featured Books** — top 4 titles fetched from the server.
  - Three extra custom sections: **Browse by Category**, **How Borrowing Works**,
    and a **Swiper.js testimonials carousel**.
- **All Books page**
  - Large **search bar** (filter by title).
  - Functional **category sidebar** filter — All / Story / Tech / Science
    (Challenge #2). Shareable via URL (`/books?category=Tech`).
- **Authentication (BetterAuth)**
  - Email + password **login** and **registration** with toast feedback.
  - **Google** social login.
  - Conditional navbar (Login ⟷ user name + Logout).
- **Single Book Details** — **private route**: large cover, title, author,
  description, availability, and a **"Borrow This Book"** button with a
  confirmation toast (redirects logged-out users to login).
- **My Profile** — **private route** showing all user information.
- **Update Information** (Challenge #1) — a dedicated private route with a
  Name + Image form, powered by BetterAuth's `updateUser`.
- **Secure config** — all keys via environment variables.

---

## 🛠️ Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS v4** + **DaisyUI 5**
- **BetterAuth** (authentication)
- **MongoDB** (Atlas) via the native driver

---

## 📦 npm Packages Used

| Package | Purpose |
| --- | --- |
| `next`, `react`, `react-dom` | Core framework |
| `better-auth` | Authentication (email/password + Google), session & user management |
| `mongodb` | Database driver + BetterAuth MongoDB adapter |
| `tailwindcss`, `daisyui` | Styling + component/theme system |
| `swiper` | Testimonials carousel (npm-package challenge) |
| `react-hot-toast` | Toast notifications |
| `react-icons` | Icon set |

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string (local or Atlas). |
| `MONGODB_DB_NAME` | Database name (default: `inkwell`). |
| `BETTER_AUTH_SECRET` | Long random string. Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"` |
| `BETTER_AUTH_URL` | App base URL (e.g. `http://localhost:3000`). |
| `NEXT_PUBLIC_BASE_URL` | Public base URL for client/server fetches. |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials (optional — enables Google login). |

> **Enabling Google login:** create an OAuth 2.0 Client ID in the
> [Google Cloud Console](https://console.cloud.google.com/apis/credentials),
> add `http://localhost:3000/api/auth/callback/google` as an authorized
> redirect URI, and paste the ID/secret into `.env.local`.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Production build

```bash
npm run build && npm start
```

---

## 📁 Project Structure

```
src/
├─ app/
│  ├─ api/
│  │  ├─ auth/[...all]/   # BetterAuth endpoints
│  │  └─ books/           # Book list + single-book API routes
│  ├─ books/              # All Books + dynamic [id] details (private)
│  ├─ login/  register/   # Auth pages
│  ├─ profile/            # Profile (private) + update (private)
│  └─ page.js             # Home
├─ components/            # Navbar, Footer, BookCard, home/, auth/, books/, profile/
├─ data/books.json        # The 12-book catalog
└─ lib/                   # auth, mongodb, session, api, books helpers
```

---

## 🔐 Notes

- Book data lives in `src/data/books.json` and is served through Next.js API
  routes (`/api/books`, `/api/books/[id]`).
- Per the assignment, there is **no email verification or forgot-password**
  flow, and registration sends the user to the login page (no auto-login).
- `.env.local` is git-ignored; never commit secrets.

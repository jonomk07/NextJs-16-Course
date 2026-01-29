# Next.js 16 Course - Section 2: Layouts

This project is part of a **Next.js 16 course**, covering **Section 2: Layouts**.

## What You'll Learn

This section covers:

- **Layouts** - Shared UI structure across multiple pages
- **Nested Layouts** - Section-specific layouts that inherit from parent layouts
- **Multiple Root Layouts** - Independent layouts for different sections (using route groups)
- **Metadata** - SEO optimization with static and dynamic metadata
- **Dynamic Routes** - Using `[param]` folders for dynamic pages
- **generateMetadata** - Dynamic metadata generation based on route parameters

## Project Structure

```
app/
├── globals.css
│
├── (main)/                    ← Route group for public pages
│   ├── layout.tsx             ← Main root layout (blue header)
│   ├── page.tsx               ← / (home)
│   ├── about/
│   │   └── page.tsx           ← /about
│   └── blog/
│       ├── layout.tsx         ← Nested layout (Blog Section)
│       ├── page.tsx           ← /blog
│       └── [postId]/
│           └── page.tsx       ← /blog/:postId (dynamic)
│
└── (auth)/                    ← Route group for auth pages
    ├── layout.tsx             ← Auth root layout (yellow header)
    ├── login/
    │   └── page.tsx           ← /login
    └── register/
        └── page.tsx           ← /register
```

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Concepts

### 1. Root Layout
Every Next.js app requires a root layout with `<html>` and `<body>` tags.

### 2. Nested Layouts
Layouts can be nested - child layouts inherit from parent layouts.

### 3. Route Groups
Folders wrapped in parentheses `(folder)` organize files without affecting URLs.

### 4. Multiple Root Layouts
Using route groups, you can have completely independent layouts for different sections.

### 5. Metadata
Define SEO metadata at layout or page level. More specific metadata takes precedence.

### 6. Dynamic Metadata
Use `generateMetadata` function for dynamic titles and descriptions based on route params.

## Tech Stack

- **Next.js 16.1.6**
- **React 19.2.3**
- **TypeScript**
- **Tailwind CSS 4**

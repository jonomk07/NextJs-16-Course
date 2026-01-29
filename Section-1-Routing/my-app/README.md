# Next.js 15+ Routing Tutorial

A comprehensive teaching project demonstrating Next.js App Router concepts including routing, layouts, dynamic routes, and error handling.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Core Concepts](#core-concepts)
  - [File-Based Routing](#1-file-based-routing)
  - [Root Layout](#2-root-layout)
  - [Pages](#3-pages)
  - [Link Component](#4-link-component)
  - [Dynamic Routes](#5-dynamic-routes)
  - [Nested Dynamic Routes](#6-nested-dynamic-routes)
  - [Catch-All Routes](#7-catch-all-routes)
  - [Optional Catch-All Routes](#8-optional-catch-all-routes)
  - [Not Found Pages](#9-not-found-pages)
  - [Private Folders](#10-private-folders)
  - [File Co-location](#11-file-co-location)
  - [Route Groups](#12-route-groups)
- [Important: Next.js 15+ Changes](#important-nextjs-15-changes)
- [Routes Reference](#routes-reference)
- [Testing the Routes](#testing-the-routes)

---

## Project Structure

```
app/
├── layout.tsx                 # Root layout (wraps all pages)
├── page.tsx                   # Home page (/)
├── globals.css                # Global styles + Tailwind CSS
├── not-found.tsx              # Global 404 page
│
├── about/
│   ├── page.tsx               # About page (/about)
│   └── team/
│       └── page.tsx           # Team page (/about/team)
│
├── contact/
│   └── page.tsx               # Contact page (/contact)
│
├── products/
│   ├── [[...slug]]/
│   │   └── page.tsx           # Optional catch-all (/products, /products/*)
│   └── [productId]/
│       ├── page.tsx           # Product detail (/products/[id])
│       └── reviews/
│           └── [reviewsId]/
│               └── page.tsx   # Review detail (/products/[id]/reviews/[id])
│
├── blog/
│   └── [blogId]/
│       ├── page.tsx           # Blog post (/blog/[id])
│       ├── BlogContent.tsx    # Co-located component (NOT a route)
│       └── not-found.tsx      # Blog-specific 404 page
│
├── (admin)/                   # Route group (hidden from URL)
│   ├── users/
│   │   └── page.tsx           # Users page (/users, NOT /admin/users)
│   └── analytics/
│       └── page.tsx           # Analytics page (/analytics)
│
└── _utils/                    # Private folder (NOT a route)
    └── formatDate.ts          # Utility function
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## Core Concepts

### 1. File-Based Routing

Next.js uses the file system to define routes. Each folder in the `app` directory becomes a URL segment.

| File Location | URL |
|--------------|-----|
| `app/page.tsx` | `/` |
| `app/about/page.tsx` | `/about` |
| `app/about/team/page.tsx` | `/about/team` |
| `app/contact/page.tsx` | `/contact` |

**Key Rules:**
- Only `page.tsx` files create routes
- Folders without `page.tsx` are just for organization
- Other files (components, utilities) don't become routes

---

### 2. Root Layout

**File:** `app/layout.tsx`

The root layout wraps ALL pages in your application. It's required and must contain `<html>` and `<body>` tags.

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**Key Points:**
- Layouts preserve state between page navigations
- Layouts don't re-render when navigating between child pages
- You can nest layouts at any level (e.g., `app/about/layout.tsx`)
- The `children` prop represents the page content or nested layouts

---

### 3. Pages

**Example:** `app/page.tsx`

Pages are **Server Components** by default. They render on the server for better SEO.

```tsx
export default function HomePage() {
  return <h1>Welcome to the Home Page</h1>;
}
```

**Server vs Client Components:**

| Feature | Server Component (default) | Client Component (`"use client"`) |
|---------|---------------------------|-----------------------------------|
| Rendering | Server | Client (browser) |
| Hooks | Cannot use | Can use (useState, useEffect, etc.) |
| SEO | Better | Depends on implementation |
| Interactivity | Limited | Full |

---

### 4. Link Component

**Import:** `import Link from "next/link"`

The Link component provides client-side navigation without full page reloads.

```tsx
import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <Link href="/about">About Us</Link>
      <Link href="/products/42">Product 42</Link>
    </nav>
  );
}
```

**Benefits:**
- **Prefetching:** Automatically prefetches linked pages
- **Client-side navigation:** No full page reload
- **Code splitting:** Only loads JavaScript needed for each page

---

### 5. Dynamic Routes

**File:** `app/products/[productId]/page.tsx`

Square brackets `[param]` create dynamic route segments that capture values from the URL.

```tsx
// URL: /products/42 -> productId = "42"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  return <h1>Product {productId}</h1>;
}
```

**URL Examples:**

| URL | `productId` Value |
|-----|-------------------|
| `/products/1` | `"1"` |
| `/products/42` | `"42"` |
| `/products/shoe` | `"shoe"` |

---

### 6. Nested Dynamic Routes

**File:** `app/products/[productId]/reviews/[reviewsId]/page.tsx`

Multiple dynamic segments can be nested to capture multiple URL parameters.

```tsx
// URL: /products/42/reviews/1
// -> productId = "42", reviewsId = "1"

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ productId: string; reviewsId: string }>;
}) {
  const { productId, reviewsId } = await params;
  return (
    <div>
      <h1>Product: {productId}</h1>
      <h2>Review: {reviewsId}</h2>
    </div>
  );
}
```

**Real-World Use Cases:**
- E-commerce: `/products/[productId]/reviews/[reviewId]`
- Social media: `/users/[userId]/posts/[postId]`
- Forums: `/categories/[categoryId]/threads/[threadId]`
- Courses: `/courses/[courseId]/lessons/[lessonId]`

---

### 7. Catch-All Routes

**Syntax:** `[...param]`

Catches multiple URL segments as an array. **Requires at least one segment.**

```
File: app/shop/[...slug]/page.tsx

/shop/men         -> slug = ["men"]
/shop/men/shoes   -> slug = ["men", "shoes"]
/shop/a/b/c/d     -> slug = ["a", "b", "c", "d"]
/shop             -> NO MATCH (needs separate page.tsx)
```

---

### 8. Optional Catch-All Routes

**File:** `app/products/[[...slug]]/page.tsx`

**Syntax:** `[[...param]]` (double brackets)

Catches multiple URL segments **including the base route** (zero or more segments).

```tsx
// URL: /products        -> slug = undefined
// URL: /products/a      -> slug = ["a"]
// URL: /products/a/b/c  -> slug = ["a", "b", "c"]

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>; // Note the ? - optional!
}) {
  const { slug } = await params;

  if (slug && slug.length > 0) {
    return <p>Segments: {slug.join(", ")}</p>;
  }
  return <p>Base products page (no segments)</p>;
}
```

**Comparison Table:**

| Route Type | `/products` | `/products/a` | `/products/a/b` |
|------------|-------------|---------------|-----------------|
| `[...slug]` | No match | `["a"]` | `["a", "b"]` |
| `[[...slug]]` | `undefined` | `["a"]` | `["a", "b"]` |

**When to use optional catch-all:**
- E-commerce categories: `/shop`, `/shop/men`, `/shop/men/shoes`
- Documentation: `/docs`, `/docs/intro`, `/docs/api/reference`
- File browsers: `/files`, `/files/folder1`, `/files/folder1/subfolder`

---

### 9. Not Found Pages

#### Global 404 Page

**File:** `app/not-found.tsx`

Displayed when users visit a URL that doesn't match any route.

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page {pathname} doesn't exist.</p>
      <Link href="/">Go Back Home</Link>
    </div>
  );
}
```

#### Route-Specific 404 Page

**File:** `app/blog/[blogId]/not-found.tsx`

Create `not-found.tsx` in any route folder for custom 404 pages specific to that section.

```
app/not-found.tsx              -> Global 404 (entire app)
app/blog/[blogId]/not-found.tsx -> Blog-specific 404
app/products/not-found.tsx      -> Products-specific 404
```

#### Programmatic 404

Use `notFound()` to trigger the 404 page programmatically:

```tsx
import { notFound } from "next/navigation";

export default async function BlogPost({ params }) {
  const { blogId } = await params;

  // Simulate checking if blog exists
  if (parseInt(blogId) > 100) {
    notFound(); // Shows nearest not-found.tsx
  }

  return <h1>Blog {blogId}</h1>;
}
```

---

### 10. Private Folders

**Folder:** `app/_utils/`

Folders starting with underscore `_` are **private** and NOT exposed as routes.

```
app/_utils/formatDate.ts    -> NOT a route (private)
app/_components/Button.tsx  -> NOT a route (private)
app/_lib/api.ts             -> NOT a route (private)
```

**Use Cases:**
- Utility functions
- Helper functions
- Shared components that shouldn't be routes
- Configuration files
- API wrappers

**Testing:** Visiting `/_utils/formatDate` returns 404!

**Importing in your code:**
```tsx
import { formatDate } from "@/app/_utils/formatDate";

// Usage
const formattedDate = formatDate("2025-01-01");
// Returns: "January 1, 2025"
```

---

### 11. File Co-location

**Example:** `app/blog/[blogId]/BlogContent.tsx`

You can place related files in the same folder as your page. They won't become routes.

```
app/blog/[blogId]/
├── page.tsx           # Route: /blog/[blogId] ✓
├── BlogContent.tsx    # Component (NOT a route) ✗
├── not-found.tsx      # 404 page (special file) ✓
└── styles.module.css  # Styles (NOT a route) ✗
```

**Only these special files affect routing:**

| File | Purpose |
|------|---------|
| `page.tsx` | Page content (creates route) |
| `layout.tsx` | Shared layout |
| `loading.tsx` | Loading UI |
| `error.tsx` | Error UI |
| `not-found.tsx` | 404 UI |
| `route.tsx` | API endpoint |

**Benefits of Co-location:**
- All related files in one place
- No need to navigate deep folder structures
- Project remains organized as it grows

---

### 12. Route Groups

**Folder:** `app/(admin)/`

**Syntax:** `(folderName)` (parentheses)

Route groups allow you to organize files **without affecting the URL structure**. The folder name wrapped in parentheses does NOT appear in the URL.

```
app/(admin)/users/page.tsx     -> /users (NOT /admin/users!)
app/(admin)/analytics/page.tsx -> /analytics (NOT /admin/analytics!)
```

**Without Route Groups:**
```
app/admin/users/page.tsx       -> /admin/users
app/admin/analytics/page.tsx   -> /admin/analytics
```

**With Route Groups:**
```
app/(admin)/users/page.tsx     -> /users
app/(admin)/analytics/page.tsx -> /analytics
```

**Example Structure:**
```
app/
├── (admin)/              <- Route group (hidden from URL)
│   ├── users/
│   │   └── page.tsx      -> /users
│   └── analytics/
│       └── page.tsx      -> /analytics
├── (marketing)/          <- Another route group
│   ├── about/
│   │   └── page.tsx      -> /about
│   └── pricing/
│       └── page.tsx      -> /pricing
└── page.tsx              -> /
```

**When to Use Route Groups:**

| Use Case | Example |
|----------|---------|
| Admin dashboards | `(admin)/users`, `(admin)/settings` |
| Marketing pages | `(marketing)/about`, `(marketing)/pricing` |
| Authentication | `(auth)/login`, `(auth)/register` |
| Shop sections | `(shop)/products`, `(shop)/cart` |
| Role-based access | `(user)/profile`, `(admin)/dashboard` |

**Benefits:**
- Organize related pages without affecting URLs
- Keep URLs clean and user-friendly
- Group pages that share layouts
- Structure large applications logically
- Separate concerns (admin vs public pages)

**Route Groups with Layouts:**

Each route group can have its own `layout.tsx`:

```
app/
├── (admin)/
│   ├── layout.tsx        <- Admin layout (sidebar, header)
│   ├── users/page.tsx
│   └── analytics/page.tsx
├── (marketing)/
│   ├── layout.tsx        <- Marketing layout (different design)
│   ├── about/page.tsx
│   └── pricing/page.tsx
```

---

## Important: Next.js 15+ Changes

### Async Params

In Next.js 15+, the `params` prop is a **Promise** and must be awaited:

```tsx
// ❌ OLD (Next.js 14 and earlier) - CAUSES ERROR
export default function Page({ params }: { params: { id: string } }) {
  return <h1>{params.id}</h1>;
}

// ✅ NEW (Next.js 15+) - CORRECT
export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return <h1>{id}</h1>;
}
```

### Key Changes Summary

1. Make the component `async`
2. Type `params` as `Promise<{ ... }>` instead of just `{ ... }`
3. Await `params` before accessing properties: `const { id } = await params`

This applies to ALL dynamic route segments:
- `[id]`
- `[slug]`
- `[...catchAll]`
- `[[...optionalCatchAll]]`

---

## Routes Reference

| URL | File | Description |
|-----|------|-------------|
| `/` | `app/page.tsx` | Home page |
| `/about` | `app/about/page.tsx` | About page |
| `/about/team` | `app/about/team/page.tsx` | Team page |
| `/contact` | `app/contact/page.tsx` | Contact page |
| `/products` | `app/products/[[...slug]]/page.tsx` | Products base |
| `/products/a/b/c` | `app/products/[[...slug]]/page.tsx` | Products with segments |
| `/products/42` | `app/products/[productId]/page.tsx` | Product detail |
| `/products/42/reviews/1` | `app/products/[productId]/reviews/[reviewsId]/page.tsx` | Review detail |
| `/blog/10` | `app/blog/[blogId]/page.tsx` | Blog post |
| `/blog/101` | `app/blog/[blogId]/not-found.tsx` | Blog 404 (id > 100) |
| `/users` | `app/(admin)/users/page.tsx` | Users page (route group) |
| `/analytics` | `app/(admin)/analytics/page.tsx` | Analytics page (route group) |
| `/random-page` | `app/not-found.tsx` | Global 404 |
| `/_utils/*` | N/A | Private folder (always 404) |

---

## Testing the Routes

Try these URLs in your browser:

1. **Home:** http://localhost:3000
2. **About:** http://localhost:3000/about
3. **Team (nested):** http://localhost:3000/about/team
4. **Contact:** http://localhost:3000/contact
5. **Products (base):** http://localhost:3000/products
6. **Products (with segments):** http://localhost:3000/products/electronics/phones
7. **Product detail:** http://localhost:3000/products/42
8. **Review (nested dynamic):** http://localhost:3000/products/42/reviews/review1
9. **Blog post:** http://localhost:3000/blog/10
10. **Blog 404:** http://localhost:3000/blog/150
11. **Users (route group):** http://localhost:3000/users (NOT /admin/users!)
12. **Analytics (route group):** http://localhost:3000/analytics
13. **Global 404:** http://localhost:3000/random-page
14. **Private folder:** http://localhost:3000/_utils (always 404)

---

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Turbopack** - Fast development bundler

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Learn Next.js](https://nextjs.org/learn)

---

## License

This project is for educational purposes.

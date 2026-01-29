# Next.js 16 Course

A comprehensive hands-on course for learning Next.js 16 with the App Router, covering routing, layouts, metadata, and modern React patterns.

## Tech Stack

- **Next.js** 16.x
- **React** 19.x
- **TypeScript** 5
- **Tailwind CSS** 4
- **ESLint** 9

## Course Structure

### Section 1: Routing

Learn the fundamentals of file-based routing in Next.js 16.

**Location:** `Section-1-Routing/my-app`

#### Topics Covered

| Concept | Description | Example Route |
|---------|-------------|---------------|
| Basic Routing | File-based routing with `page.tsx` | `/about`, `/contact` |
| Nested Routes | Hierarchical URL structure | `/about/team` |
| Dynamic Routes `[param]` | Capture URL parameters | `/products/[productId]` |
| Nested Dynamic Routes | Multiple dynamic segments | `/products/[productId]/reviews/[reviewsId]` |
| Catch-All Routes `[...slug]` | Match multiple segments | `/docs/[...slug]` |
| Optional Catch-All `[[...slug]]` | Match with or without segments | `/products/[[...slug]]` |
| Route Groups `(folder)` | Organize without affecting URLs | `(admin)/analytics` → `/analytics` |
| Custom 404 Pages | Global and route-specific error pages | `not-found.tsx` |
| Programmatic Navigation | `notFound()` function usage | Conditional 404 triggers |

#### Route Structure

```
app/
├── page.tsx                              → /
├── about/
│   ├── page.tsx                          → /about
│   └── team/page.tsx                     → /about/team
├── contact/page.tsx                      → /contact
├── blog/
│   └── [blogId]/
│       ├── page.tsx                      → /blog/:blogId
│       └── not-found.tsx                 → Route-specific 404
├── products/
│   ├── [productId]/
│   │   ├── page.tsx                      → /products/:productId
│   │   └── reviews/[reviewsId]/page.tsx  → /products/:productId/reviews/:reviewsId
│   └── [[...slug]]/page.tsx              → /products/* (optional catch-all)
└── (admin)/
    ├── analytics/page.tsx                → /analytics
    └── users/page.tsx                    → /users
```

---

### Section 2: Layouts

Master layouts, nested layouts, and metadata management in Next.js 16.

**Location:** `Section-2-Layouts/layouts-app`

#### Topics Covered

| Concept | Description |
|---------|-------------|
| Root Layouts | Required `<html>` and `<body>` wrapper |
| Multiple Root Layouts | Independent layouts using route groups |
| Nested Layouts | Additional structure without replacing parent |
| Metadata Export | Static metadata configuration |
| Dynamic Metadata | `generateMetadata()` for dynamic pages |
| Metadata Precedence | Page → Nested Layout → Root Layout |
| SEO Configuration | robots, viewport, keywords |
| Font Optimization | Google Fonts with CSS variables |

#### Layout Hierarchy

```
app/
├── globals.css
│
├── (main)/                    → Public pages layout
│   ├── layout.tsx             → Blue header + footer
│   ├── page.tsx               → /
│   ├── about/page.tsx         → /about
│   └── blog/
│       ├── layout.tsx         → Nested blog layout
│       ├── page.tsx           → /blog
│       └── [postId]/page.tsx  → /blog/:postId
│
└── (auth)/                    → Auth pages layout
    ├── layout.tsx             → Yellow header, no footer
    ├── login/page.tsx         → /login
    └── register/page.tsx      → /register
```

#### Key Concepts

**Root vs Nested Layouts:**
- Root layouts contain `<html>` and `<body>` tags
- Nested layouts inherit from parent and add structure
- Route groups enable multiple independent root layouts

**Metadata Precedence (most specific wins):**
1. Page `generateMetadata()` function
2. Page `metadata` export
3. Nested layout metadata
4. Root layout metadata

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Running the Apps

**Section 1 - Routing:**
```bash
cd Section-1-Routing/my-app
npm install
npm run dev
```

**Section 2 - Layouts:**
```bash
cd Section-2-Layouts/layouts-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Learning Path

1. **Start with Section 1** - Understand how URLs map to files
2. **Experiment with routes** - Create new pages, test dynamic segments
3. **Move to Section 2** - Learn how layouts wrap and organize pages
4. **Combine concepts** - Build a multi-section app with proper metadata

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [React 19 Documentation](https://react.dev)

---

## License

This course material is for educational purposes.

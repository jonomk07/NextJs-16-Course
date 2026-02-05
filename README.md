# Next.js 16 Course

A comprehensive hands-on course for learning Next.js 16 with the App Router, covering routing, layouts, navigation, and modern React patterns.

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

### Section 3: Navigation

Master client-side navigation with the Link component and active link patterns.

**Location:** `Section-3-navigation/navigation-app`

#### Topics Covered

| Concept | Description |
|---------|-------------|
| Anchor Tags vs Link | Why `<Link>` is better than `<a>` for navigation |
| Client-Side Navigation | No full page reload, only necessary parts update |
| Navigation Bar | Building a reusable nav in layouts |
| The `replace` Prop | Control browser history (don't push to stack) |
| Dynamic Links | Generate URLs from data (blog posts, products) |
| Active Links | Highlight current page using `usePathname` |
| Client Components | Using `"use client"` for hooks in layouts |
| Params as Promises | In Next.js 15+, params must be awaited |
| Search Params | Filter content with URL query strings (?query=value) |
| The `use()` Hook | Unwrap Promises in Client Components |
| Programmatic Navigation | `useRouter` for button clicks and conditional navigation |
| `router.push()` vs `replace()` | Control browser history behavior |
| `notFound()` | Show 404 page for invalid routes |
| `redirect()` | Send users to a different page |

#### Key Concepts

**Link Component Benefits:**
- Enables client-side navigation (no full page reload)
- Only fetches and updates necessary components
- Preserves application state during navigation
- Improves performance and user experience

**The `replace` Prop:**
```tsx
<Link href="/" replace>Go to Home</Link>
```
- Replaces current history entry instead of pushing
- Useful after form submissions or authentication
- Back button won't return to replaced page

**Dynamic Links:**
```tsx
const posts = [{ id: 1, title: "Post 1" }, { id: 2, title: "Post 2" }];

{posts.map((post) => (
  <Link key={post.id} href={`/blog/${post.id}`}>
    {post.title}
  </Link>
))}
```

**Active Links with `usePathname`:**
```tsx
"use client";
import { usePathname } from "next/navigation";

const pathname = usePathname();
const isActive = pathname === href;

<Link className={isActive ? "font-bold text-yellow-400" : ""}>
```

**Params vs Search Params:**
```
Params (Dynamic Route Segments):
  URL: /blog/123
  Folder: blog/[postId]/page.tsx
  Access: params.postId = "123"

Search Params (Query Strings):
  URL: /blog?query=next&sort=date
  Access: searchParams.query = "next"
          searchParams.sort = "date"
```

**Handling Params in Next.js 15+ (Server Component):**
```tsx
// params is a Promise - must be awaited!
type Props = { params: Promise<{ postId: string }> };

export default async function Page({ params }: Props) {
  const { postId } = await params;  // Await the Promise
  return <div>Post {postId}</div>;
}
```

**Handling Search Params in Client Components:**
```tsx
"use client";
import { use } from "react";

// Client Components cannot be async!
// Use the use() hook to unwrap Promises
export default function Page({ searchParams }: Props) {
  const { query } = use(searchParams);  // use() unwraps the Promise
  return <div>Search: {query}</div>;
}
```

**Programmatic Navigation with useRouter:**
```tsx
"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/blog/1');    // Navigate, ADD to history
    // router.replace('/blog/1'); // Navigate, REPLACE history
    // router.back();             // Go back
    // router.forward();          // Go forward
  };

  return <button onClick={handleClick}>Go to Post</button>;
}
```

**Handling Invalid Routes:**
```tsx
import { notFound, redirect } from "next/navigation";

// Option 1: Show 404 page
if (!postExists) {
  notFound();  // Renders the not-found.tsx page
}

// Option 2: Redirect to another page
if (!postExists) {
  redirect('/');  // Sends user to home page
}
```

#### Route Structure

```
src/app/
├── layout.tsx              → Navigation bar with active links ("use client")
├── globals.css             → Global styles
├── page.tsx                → / (Home - Link component demo)
├── about/
│   └── page.tsx            → /about
├── login/
│   └── page.tsx            → /login (replace prop demo)
└── blog/
    ├── page.tsx            → /blog?query=... (searchParams + use() hook)
    └── [postId]/
        └── page.tsx        → /blog/:postId (async params demo)
```

#### What You'll Learn

1. **Link vs Anchor Tags** - Why `<Link>` provides better UX than `<a>`
2. **Client-Side Navigation** - How Next.js updates only necessary parts
3. **The `replace` Prop** - Control browser history behavior
4. **Dynamic Links with map()** - Generate links from data arrays
5. **Active Link Styling** - Use `usePathname()` to highlight current page
6. **Client Components** - When and why to use `"use client"`
7. **Params as Promises** - How to await params in Server Components
8. **Search Params Filtering** - Dynamic content filtering via URL
9. **The use() Hook** - Unwrap Promises in Client Components
10. **Programmatic Navigation** - `useRouter` for button clicks
11. **push() vs replace()** - Control browser history stack
12. **notFound() & redirect()** - Handle invalid routes gracefully

---

### Section 4: E-Commerce Project - Store Brand

Build a modern, responsive e-commerce website from scratch, applying all concepts from previous sections.

**Location:** `Section-4-Project/ecommerce-app`

#### Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 16 | Framework (App Router + Turbopack) |
| React 19 | UI library |
| TypeScript 5 | Type safety |
| Tailwind CSS 4 | Styling |
| Boxicons | Icon library |
| Prompt (Google Font) | Custom typography |

#### Project Setup

- Clean Next.js 16 app with `src/` directory structure
- Removed default starter files for a clean slate
- Boxicons registered globally via layout
- Prompt font replaces default Geist font
- Custom metadata for SEO
- Product data with 24 items across 8 categories

#### Navigation Bar

Fixed-position responsive navigation with:
- **Logo**: Yellow circle with "SB" initials + "Store" (white) + "Brand" (yellow)
- **Search Bar**: Rounded input with focus ring animation (hidden on mobile)
- **Products Button**: Store icon with chevron dropdown indicator
- **Cart & Login Icons**: Icon-only buttons with hover effects
- **Color Scheme**: Dark blue `#003D5B` background, yellow `#EDAE49` accents

#### Footer

Full-width responsive footer with three sections:

**Newsletter Section** (dark blue background):
- Email subscription form with styled input and subscribe button
- Responsive layout (stacks on mobile, side-by-side on desktop)

**Main Content** (12-column grid):
| Column | Content |
|--------|---------|
| Logo & Social (4 cols) | Brand logo, description, social media icons (Facebook, Twitter, Instagram, YouTube) |
| Categories (2 cols) | Dynamic from product data using `categories.slice(0, 5)` + "View All" link |
| Shop (2 cols) | All Products, New Arrivals, Best Sellers, Gift Cards, Deals |
| Support (2 cols) | Contact Us, FAQs, Shipping, Returns, Track Order |
| Company (2 cols) | About Us, Blog, Careers, Press, Privacy Policy |

**Bottom Bar**:
- Dynamic copyright year using `new Date().getFullYear()`
- Payment method icons (Visa, Mastercard, PayPal, Apple)
- Legal links (Terms, Privacy, Cookies)

#### Design System Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Dark Blue | `#003D5B` | Navigation bg, headings, footer text |
| Yellow/Gold | `#EDAE49` | Accents, buttons, logo, hover states |
| Teal | `#00798C` | Links, hover effects, hero gradient |

#### Hero Section

Full-viewport hero with gradient background and featured product display:

- **Background**: Horizontal gradient from dark blue to teal (`bg-linear-to-r`)
- **Height**: 80% viewport height with `overflow-hidden`
- **Left Side**: Bold headline ("Discover Premium Products"), subtitle paragraph, "Shop Now" CTA button with hover scale effect
- **Right Side**: Featured product image in a frosted glass card (`backdrop-blur-md`) with:
  - Animated pulsing glow circle behind the card (`animate-pulse`)
  - 3-degree rotation that straightens on hover (`rotate-3 → rotate-0`)
  - "New Arrival" badge positioned at the bottom-right corner
- **Responsive**: Stacks vertically on mobile, side-by-side on desktop

#### Products Page (Category Grid)

Dynamic category cards displayed in a responsive grid layout:

- **Responsive Grid**: 1 column (mobile) → 2 (md) → 3 (lg) → 4 (xl)
- **Category Cards**: Each card dynamically rendered from `categories` data with:
  - Product image fetched via `getCategoryImage()` helper (finds first product matching category slug)
  - Fallback to `placeholder.png` if no product found
  - `next/image` with `fill` and responsive `sizes` attribute
  - Soft white gradient overlay connecting image to text area
  - Category name, description, and "View Products" link
  - Dynamic `borderColor` and text colors from `category.color`
  - Hover effects: lift (`-translate-y-[5px]`), shadow increase, image scale
- **Bottom Navigation**: "Back to Home" link with arrow icon

#### Dynamic Category Pages

Each category card links to `/products/[category]` using dynamic routing:

- **Dynamic Route**: `[category]` folder with `page.tsx` — captures category slug from URL
- **Async Server Component**: `params` is a Promise in Next.js 15+ — awaited before use
- **Category Lookup**: Uses `categories.find()` to match slug and retrieve name/color/description
- **Fallback**: If no category match, displays the raw URL slug as the name
- **Banner Section**: Gradient banner with dynamic category name and description
- **Products Grid**: Filters `productsList` by category slug, renders 1→2→3 column responsive grid
- **ProductCard Component** (`components/product-card.tsx`):
  - TypeScript `ProductCardProps` interface for type safety (`product`, `categorySlug`, `categoryColor`)
  - Product image with hover scale effect
  - Title (`line-clamp-1`) and description (`line-clamp-2`) for text truncation
  - Price formatted with `toLocaleString()` for number formatting
  - "View Details" button and "Add to Cart" icon button
  - Dynamic `backgroundColor` and text colors from `categoryColor` prop
- **Back Navigation**: "Back to all Categories" link
- **Store Layout**: `pt-24` spacer div added between Navigation and main content for all store pages

#### Product Details Page

Individual product page at `/products/[category]/[productId]` using nested dynamic routing:

- **Nested Dynamic Routes**: Two `[param]` folders create URL like `/products/smartphones/product001`
- **View Details Link**: ProductCard now links dynamically via `` `/products/${categorySlug}/${product.id}` ``
- **Responsive Layout**: `flex-col` on mobile, `flex-row` on desktop (image left, info right)
- **Product Image**: `next/image` with `fill`, `priority` (preloads), and responsive `sizes`
- **Product Info**: Title (`text-3xl`), price in standout color, description with `leading-relaxed`
- **Quantity Counter**: `[-]` button + readOnly input + `[+]` button with `rounded-l-lg`/`rounded-r-lg`
- **Action Buttons**: "Add to Cart" (primary, category color) + "Go to Cart" Link (secondary, gray)
- **Client Component**: `"use client"` directive — required for `useState`/`useEffect` hooks
- **Data Fetching with useEffect**:
  - `useState<Product | null>(null)` for product state
  - Async `fetchParams` function inside `useEffect` (callback can't be async directly)
  - Awaits params Promise, finds product by ID with `Array.find()`
  - Validates both product existence AND category match before updating state
  - Dependency array `[params]` re-runs on route changes
- **Page structure**: White card with `rounded-2xl`, `shadow-lg`, two-column layout (JSX uses static data for now, dynamic replacement coming next)

#### Product Categories

| Category | Products |
|----------|----------|
| Smartphones | 3 products |
| Televisions | 3 products |
| Headphones | 3 products |
| Laptops | 3 products |
| Smartwatches | 3 products |
| Cameras | 3 products |
| Tablets | 3 products |
| Speakers | 3 products |

#### Project Structure

```
src/app/
├── layout.tsx           → Root layout (Prompt font, boxicons, metadata)
├── globals.css          → Tailwind CSS 4 import
├── page.tsx             → Home page (hero section with featured product)
├── data/
│   └── products.ts      → 24 products + 8 categories with types
├── components/
│   ├── navigation.tsx   → Reusable navigation component
│   ├── footer.tsx       → Reusable footer component
│   └── product-card.tsx → Reusable product card component
└── (store)/             → Route group for store pages
    ├── layout.tsx       → Wraps pages with Navigation + Footer + pt-24 spacer
    └── products/
        ├── page.tsx     → /products (dynamic category grid)
        └── [category]/
            ├── page.tsx → /products/:category (dynamic category page)
            └── [productId]/
                └── page.tsx → /products/:category/:productId (product details)

public/
└── images/              → 24 product images + placeholder
```

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

**Section 3 - Navigation:**
```bash
cd Section-3-navigation/navigation-app
npm install
npm run dev
```

**Section 4 - E-Commerce Project:**
```bash
cd Section-4-Project/ecommerce-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Learning Path

1. **Start with Section 1** - Understand how URLs map to files
2. **Experiment with routes** - Create new pages, test dynamic segments
3. **Move to Section 2** - Learn how layouts wrap and organize pages
4. **Continue to Section 3** - Master navigation with Link component and active links
5. **Build with Section 4** - Apply everything in a real e-commerce project

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [React 19 Documentation](https://react.dev)

---

## License

This course material is for educational purposes.

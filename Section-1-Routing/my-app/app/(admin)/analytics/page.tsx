// =============================================================================
// ANALYTICS PAGE - INSIDE A ROUTE GROUP
// =============================================================================
// This file is located at: app/(admin)/analytics/page.tsx
// It renders at the URL: /analytics (NOT /admin/analytics!)
//
// ROUTE GROUPS in Next.js:
//   - Created by wrapping folder names in parentheses: (folderName)
//   - The folder name does NOT appear in the URL
//   - Allows organizing files without affecting URL structure
//
// Folder structure with route groups:
//   app/
//   ├── (admin)/              <- Route group (hidden from URL)
//   │   ├── users/
//   │   │   └── page.tsx      -> /users
//   │   └── analytics/
//   │       └── page.tsx      -> /analytics (this file)
//   ├── (marketing)/          <- Another route group
//   │   ├── about/
//   │   │   └── page.tsx      -> /about
//   │   └── pricing/
//   │       └── page.tsx      -> /pricing
//   └── page.tsx              -> /
//
// Key Points:
//   - Parentheses () make the folder invisible in URLs
//   - You can have multiple route groups at the same level
//   - Route groups can have their own layouts (layout.tsx)
//   - Great for organizing large applications
// =============================================================================

/**
 * AnalyticsPage Component
 *
 * An admin page for viewing website analytics.
 * Located inside the (admin) route group, so the URL is /analytics, not /admin/analytics.
 */
export default function AnalyticsPage() {
  return (
    <div>
      {/* Page heading */}
      <h1 className="text-5xl font-bold mb-4">Analytics Page</h1>

      {/* Page description */}
      <p className="text-lg">View website traffic and performance data.</p>

      {/* Example analytics UI placeholder */}
      <div className="mt-6 p-4 border border-gray-300 rounded">
        <p className="text-gray-600">
          This page is part of the (admin) route group.
          <br />
          File location: <code>app/(admin)/analytics/page.tsx</code>
          <br />
          URL: <code>/analytics</code> (not /admin/analytics)
        </p>
      </div>

      {/* Sample analytics data placeholder */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 rounded">
          <h3 className="font-bold">Page Views</h3>
          <p className="text-2xl">12,345</p>
        </div>
        <div className="p-4 bg-green-100 rounded">
          <h3 className="font-bold">Users</h3>
          <p className="text-2xl">1,234</p>
        </div>
        <div className="p-4 bg-purple-100 rounded">
          <h3 className="font-bold">Sessions</h3>
          <p className="text-2xl">5,678</p>
        </div>
      </div>
    </div>
  );
}

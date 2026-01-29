// =============================================================================
// USERS PAGE - INSIDE A ROUTE GROUP
// =============================================================================
// This file is located at: app/(admin)/users/page.tsx
// It renders at the URL: /users (NOT /admin/users!)
//
// ROUTE GROUPS in Next.js:
//   - Created by wrapping folder names in parentheses: (folderName)
//   - The folder name does NOT appear in the URL
//   - Allows organizing files without affecting URL structure
//
// How it works:
//   app/(admin)/users/page.tsx     -> /users
//   app/(admin)/analytics/page.tsx -> /analytics
//   app/admin/users/page.tsx       -> /admin/users (without parentheses)
//
// Benefits of Route Groups:
//   1. Organize related pages together (e.g., all admin pages)
//   2. Keep URLs clean and short
//   3. Structure role-based access (admin vs user views)
//   4. Group pages that share layouts without affecting URLs
//
// Real-world use cases:
//   - Admin dashboards: (admin)/users, (admin)/settings, (admin)/analytics
//   - Marketing pages: (marketing)/about, (marketing)/pricing
//   - Authentication: (auth)/login, (auth)/register, (auth)/forgot-password
//   - Shop sections: (shop)/products, (shop)/cart, (shop)/checkout
//
// Without route groups, the URL would be /admin/users
// With route groups (admin), the URL is just /users
// =============================================================================

/**
 * UsersPage Component
 *
 * An admin page for managing users.
 * Located inside the (admin) route group, so the URL is /users, not /admin/users.
 */
export default function UsersPage() {
  return (
    <div>
      {/* Page heading */}
      <h1 className="text-5xl font-bold mb-4">Users Page</h1>

      {/* Page description */}
      <p className="text-lg">Manage all registered users here.</p>

      {/* Example user management UI placeholder */}
      <div className="mt-6 p-4 border border-gray-300 rounded">
        <p className="text-gray-600">
          This page is part of the (admin) route group.
          <br />
          File location: <code>app/(admin)/users/page.tsx</code>
          <br />
          URL: <code>/users</code> (not /admin/users)
        </p>
      </div>
    </div>
  );
}

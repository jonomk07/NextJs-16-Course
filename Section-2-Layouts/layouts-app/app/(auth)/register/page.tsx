// ============================================
// REGISTER PAGE - app/(auth)/register/page.tsx
// ============================================
// This page is located at: /register (NOT /auth/register!)
//
// ROUTE GROUP BENEFIT:
// By using (auth) route group, we keep authentication pages
// organized together in the file system, but the URL stays clean:
// - File: app/(auth)/register/page.tsx
// - URL: /register
//
// This page shares the same AUTH LAYOUT as the login page,
// ensuring consistent UI across all authentication pages

export default function Register() {
  return (
    <div className="text-5xl font-bold">
      This is Register Page
    </div>
  );
}

// ============================================
// WHY USE ROUTE GROUPS FOR AUTH?
// ============================================
//
// 1. CLEAN URLs:
//    - /login instead of /auth/login
//    - /register instead of /auth/register
//
// 2. SHARED LAYOUT:
//    - All auth pages use the same minimal layout
//    - No navbar/footer clutter for auth pages
//
// 3. ORGANIZATION:
//    - Auth pages are grouped together in the codebase
//    - Easy to find and maintain
//
// 4. SEPARATE STYLING:
//    - Auth pages can have completely different look
//    - Yellow header vs blue header on main pages

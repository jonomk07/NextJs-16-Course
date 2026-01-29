// ============================================
// LOGIN PAGE - app/(auth)/login/page.tsx
// ============================================
// This page is located at: /login (NOT /auth/login!)
//
// ROUTE GROUPS EXPLAINED:
// The (auth) folder is a ROUTE GROUP - the parentheses mean:
// - It organizes files logically in our project
// - It does NOT appear in the URL
// - /login maps to app/(auth)/login/page.tsx
//
// This page uses the AUTH LAYOUT (app/(auth)/layout.tsx)
// which is completely separate from the main layout

export default function Login() {
  return (
    <div className="text-5xl font-bold">
      This is Login Page
    </div>
  );
}

// ============================================
// MULTIPLE ROOT LAYOUTS
// ============================================
//
// This page is wrapped by app/(auth)/layout.tsx which has:
// - Yellow header (different from main blue header)
// - Different navigation (Login/Register links)
// - NO footer (unlike main layout)
//
// The auth layout is INDEPENDENT from the main layout
// They don't share any UI elements automatically

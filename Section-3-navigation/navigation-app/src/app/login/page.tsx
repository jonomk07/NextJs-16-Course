/**
 * Login Page - Demonstrating the "replace" Prop
 *
 * By default, when you navigate using Link, Next.js pushes the new
 * route to the browser's history stack. This means pressing the
 * back button will return you to the previous page.
 *
 * However, sometimes you DON'T want this behavior. For example:
 * - After a successful login, you don't want users to go "back" to login
 * - After submitting a form, you don't want users to resubmit
 * - After completing a checkout, you don't want users to return to payment
 *
 * The "replace" prop solves this by REPLACING the current history entry
 * instead of pushing a new one. This means:
 * - The login page won't be in the browser history
 * - Pressing back will skip over the login page entirely
 *
 * Try it:
 * 1. Navigate to Home → About → Login
 * 2. Click "Go to Home" (which has replace prop)
 * 3. Press the back button - you'll go to About, not Login!
 */

import Link from "next/link";

export default function Login() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Welcome to Login Page</h1>

      {/*
        The "replace" prop replaces the current history entry
        instead of adding a new one to the stack.

        Without replace: Home → About → Login → Home (back goes to Login)
        With replace:    Home → About → Login → Home (back goes to About)
      */}
      <Link href="/" replace className="text-blue-500 underline">
        Go to Home
      </Link>

      <p className="mt-4 text-gray-600">
        Click the link above, then press the browser back button.
        You&apos;ll notice you skip the login page entirely!
      </p>
    </div>
  );
}

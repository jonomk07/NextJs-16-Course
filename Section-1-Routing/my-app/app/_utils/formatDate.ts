// =============================================================================
// PRIVATE UTILITY FUNCTION: formatDate
// =============================================================================
// This file is located inside the _utils folder, which is a PRIVATE FOLDER.
// In Next.js, any folder starting with an underscore (_) is treated as private.
// This means:
//   - The folder and its contents are NOT exposed as routes
//   - Visiting /_utils/formatDate in the browser will result in a 404 error
//   - The files can still be imported and used anywhere in the app
//
// Private folders are useful for:
//   - Utility functions (like this one)
//   - Helper functions
//   - Shared components that shouldn't be routes
//   - Configuration files
// =============================================================================

/**
 * Formats a date string into a human-readable format.
 *
 * @param date - A date string (e.g., "2025-01-01")
 * @returns A formatted date string (e.g., "January 1, 2025")
 *
 * @example
 * formatDate("2025-01-01") // Returns "January 1, 2025"
 * formatDate("2024-12-25") // Returns "December 25, 2024"
 */
export function formatDate(date: string): string {
  // Define formatting options using the Intl.DateTimeFormatOptions type
  // This is a built-in TypeScript type for date formatting
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric", // Display year as a number (e.g., 2025)
    month: "long", // Display full month name (e.g., January)
    day: "numeric", // Display day as a number (e.g., 1, 2, 3)
  };

  // Convert the string to a Date object, then format it
  // toLocaleDateString() converts the date to a locale-specific string
  // "en-US" ensures the output is in US English format
  return new Date(date).toLocaleDateString("en-US", options);
}

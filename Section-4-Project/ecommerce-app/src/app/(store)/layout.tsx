/**
 * Store Layout - Route Group Layout for (store)
 *
 * This layout wraps all pages inside the (store) route group.
 * The parentheses in (store) mean this folder is a "route group" -
 * it organizes files without affecting the URL structure.
 *
 * Pages inside (store)/ get:
 * - Navigation bar at the top
 * - A pt-24 spacer to push content below the fixed navigation
 * - Footer at the bottom
 *
 * The pt-24 spacer div is needed because the Navigation component
 * uses position: fixed, which removes it from the normal document flow.
 * Without this spacer, page content would hide behind the navigation bar.
 */

import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      {/* Spacer - Pushes content below the fixed navigation bar */}
      <div className="pt-24"></div>
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}

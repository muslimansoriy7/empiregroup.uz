import type { Metadata } from "next";

/**
 * A review copy of the homepage. It carries the same copy as `/`, so it stays
 * out of the index — two indexed pages saying the same thing would make Google
 * pick a winner on its own. Delete this file if the route ever ships.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function NextHomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}

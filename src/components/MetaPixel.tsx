/**
 * MetaPixel Component for Next.js App Router
 *
 * Drop this into your root layout.tsx to load the Meta Pixel.
 * It handles:
 *  - Loading the pixel script
 *  - Firing PageView on initial load
 *  - Firing PageView on client-side route changes
 *  - Passing Advanced Matching data when available
 *
 * Usage in app/layout.tsx:
 *
 *   import { MetaPixel } from "@/components/MetaPixel";
 *
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html>
 *         <body>
 *           <MetaPixel />
 *           {children}
 *         </body>
 *       </html>
 *     );
 *   }
 */

"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { META_PIXEL_ID, META_CATALOG_PIXEL_ID, initPixel, trackPageView } from "@/lib/meta-pixel";

export function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize pixel on first load
  useEffect(() => {
    initPixel();
  }, []);

  // Track page views on route changes (SPA navigation)
  useEffect(() => {
    trackPageView();
  }, [pathname, searchParams]);

  return (
    <>
      {/* Noscript fallback for users without JavaScript */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_CATALOG_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

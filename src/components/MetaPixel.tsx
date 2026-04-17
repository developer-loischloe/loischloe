/**
 * MetaPixel Component for Next.js App Router
 *
 * Handles:
 *  - Loading the single pixel (1148015303657843)
 *  - Advanced Matching with logged-in user data
 *  - PageView on initial load + client-side route changes
 *  - Noscript fallback
 */

"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { META_PIXEL_ID, initPixel, trackPageView } from "@/lib/meta-pixel";
import { useAuth } from "@/context/authContext";

export function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const initialized = useRef(false);

  // Initialize pixel once — with Advanced Matching if user is logged in
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (user) {
      const nameParts = (user.name || "").split(" ");
      initPixel({
        em: user.email || undefined,
        ph: user.phone || undefined,
        fn: nameParts[0] || undefined,
        ln: nameParts.slice(1).join(" ") || undefined,
        country: "bd",
        external_id: user.$id || undefined,
      });
    } else {
      initPixel();
    }
  }, [user]);

  // Track PageView on every route change (including initial load)
  // This fires BOTH client pixel + CAPI with matching event_id
  useEffect(() => {
    trackPageView();
  }, [pathname, searchParams]);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}

"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Ensures soft App Router route transitions start cleanly at the top of the
 * viewport (y = 0, above the announcement bar and sticky header) instead of
 * Next.js scrolling to the child `<main>` offset underneath the sticky header.
 * Preserves browser Back/Forward scroll restoration and `#hash` anchor jumps.
 */
export function RouteScrollManager() {
  const pathname = usePathname();
  const hasMountedRef = useRef(false);
  const isPopNavigationRef = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      isPopNavigationRef.current = true;
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useLayoutEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    if (isPopNavigationRef.current || window.location.hash) {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    if (isPopNavigationRef.current) {
      isPopNavigationRef.current = false;
      return;
    }

    if (window.location.hash) {
      const targetId = window.location.hash.slice(1);
      const rafId = window.requestAnimationFrame(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      });
      return () => window.cancelAnimationFrame(rafId);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const rafId = window.requestAnimationFrame(() => {
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [pathname]);

  return null;
}

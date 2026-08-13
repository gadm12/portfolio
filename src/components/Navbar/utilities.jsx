import { useEffect, useState } from "react";

/**
 * The list of links rendered by Navbar, both in the desktop row and the
 * mobile dropdown panel. This is the component's own render content (not
 * app-wide routing config), so it lives alongside the component's other
 * helpers rather than in a shared/global location.
 */
export const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Education", href: "/#education" },
  { label: "Contact", href: "/#contact" },
];

/**
 * Converts a full name into its initials, e.g. "Francisco Avila" -> "FA".
 * Used for the brand mark in the top-left of the nav bar.
 */
export function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/**
 * Closes the mobile menu when the user presses Escape, while it's open.
 *
 * Only attaches the `keydown` listener while `isOpen` is true (and cleans it
 * up on close/unmount), so no listener sits on `document` for the whole
 * page's lifetime when the menu isn't in use.
 *
 * @param {boolean} isOpen - whether the mobile menu is currently open.
 * @param {() => void} onClose - called to close the menu (e.g. setIsOpen(false)).
 */
export function useCloseOnEscape(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () =>
      document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);
}

/**
 * Tracks which nav link's target section currently sits in the vertical
 * center of the viewport, so Navbar can highlight the matching link as the
 * page is scrolled ("scroll-spy").
 *
 * Uses a single IntersectionObserver per link, each configured with a
 * `rootMargin` that shrinks the observer's effective viewport down to a
 * thin horizontal band around 50% of the screen height (45%-55%). A
 * section is only reported as "intersecting" while it overlaps that band —
 * i.e. while it's centered on screen — which is a direct implementation of
 * "whichever section is centered becomes active."
 *
 * If nothing is currently centered (e.g. mid-transition between two
 * sections, or past the last section into the footer), the previously
 * active link is kept rather than cleared, so the highlight doesn't flicker
 * off between sections.
 *
 * Whenever the active link changes, this also silently syncs the visible
 * URL via `history.replaceState` — NOT react-router's `navigate`/`Link` —
 * specifically because `replaceState` does not fire any event react-router
 * listens for (only `popstate`, e.g. browser back/forward, does). That
 * means this can update the address bar to reflect the current section
 * without touching react-router's `useLocation()`, so it never re-triggers
 * App.jsx's click-to-scroll effect (which watches that same location's
 * hash and calls `scrollIntoView`). Clicking an actual nav `<Link>`
 * continues to go through react-router as before, untouched by this hook.
 *
 * @param {Array<{href: string}>} navLinks - NAV_LINKS; each href is expected
 *   to be an in-page hash link like "/#projects".
 * @returns {string|null} the currently active link's href, or null if none
 *   of the target sections exist in the DOM (e.g. on a page without them).
 */
export function useScrollSpy(navLinks) {
  const [activeHref, setActiveHref] = useState(() => {
    const currentHash = window.location.hash;
    const match = navLinks.find(
      (link) => link.href === `/${currentHash}`,
    );
    return match?.href ?? null;
  });

  useEffect(() => {
    const targets = navLinks
      .map((link) => ({
        link,
        element: document.querySelector(
          link.href.replace("/", ""),
        ),
      }))
      .filter(({ element }) => element);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.find(
          (entry) => entry.isIntersecting,
        );
        if (!intersecting) return;

        const target = targets.find(
          ({ element }) => element === intersecting.target,
        );
        if (!target) return;

        setActiveHref(target.link.href);

        const newHash = target.link.href.replace("/", ""); // "/#about" -> "#about"
        if (window.location.hash !== newHash) {
          window.history.replaceState(
            null,
            "",
            window.location.pathname + newHash,
          );
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    targets.forEach(({ element }) =>
      observer.observe(element),
    );
    return () => observer.disconnect();
  }, [navLinks]);

  return activeHref;
}

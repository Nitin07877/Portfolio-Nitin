import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Resets scroll position to the top whenever you navigate to a new page.
// Skips this if the URL has a "#section" hash, so anchor links (like /#projects)
// still scroll to that specific section instead of being forced to the top.
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
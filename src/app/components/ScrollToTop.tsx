import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the very top of the page every time route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // "smooth" for smooth scroll
    });
  }, [pathname]);

  return null;
}

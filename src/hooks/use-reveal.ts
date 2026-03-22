import { useEffect, useRef, useCallback } from "react";

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  const observe = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe the container and all reveal children
    const revealEls = el.querySelectorAll(".reveal, .reveal-left");
    revealEls.forEach((child) => observer.observe(child));
    if (el.classList.contains("reveal") || el.classList.contains("reveal-left")) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cleanup = observe();
    return cleanup;
  }, [observe]);

  return ref;
}

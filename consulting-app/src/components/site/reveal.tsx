"use client";

import { useEffect, useRef } from "react";

export function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Content is visible by default; only elements below the fold get hidden
    // and animated in. Static renderers (link-preview bots, print) never scroll,
    // so gating visibility on the observer would ship them a blank section.
    if (el.getBoundingClientRect().top >= window.innerHeight) {
      el.classList.add("wait");
    }
    const show = () => {
      el.classList.remove("wait");
      el.classList.add("in");
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    const failsafe = setTimeout(show, 5000);
    return () => {
      clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);
  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} className={`reveal ${className}`}>
      {children}
    </Component>
  );
}

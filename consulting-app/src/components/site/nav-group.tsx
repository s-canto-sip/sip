"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// One top bar group (Personas, Empresas). Hover opens it through CSS; click and
// keyboard toggle aria-expanded, same behavior as js/main.js on the static pages.
export function NavGroup({ id, label, current, children }: { id: string; label: string; current?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="topbar__group" ref={ref}>
      <button
        ref={button}
        type="button"
        className={`topbar__trigger${current ? " is-current" : ""}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
      </button>
      <div className="topbar__menu" id={id}>
        {children}
      </div>
    </div>
  );
}

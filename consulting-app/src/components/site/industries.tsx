"use client";

import { useEffect, useState } from "react";

// Dicho como lo diría el dueño: "tu restaurante", no la categoría del giro.
// Se escriben y se borran uno tras otro debajo del título.
const INDUSTRIES = [
  "tu restaurante.",
  "tu clínica.",
  "tu startup.",
  "tu constructora.",
  "tu tienda en línea.",
  "tu fábrica.",
  "tu agencia.",
  "tu cafetería.",
  "tu despacho.",
  "tu escuela.",
  "tu marca de ropa.",
  "tu hotel.",
  "tu franquicia.",
  "tu gimnasio.",
  "tu inmobiliaria.",
  "tu empresa.",
];

const TYPE_MS = 55;
const ERASE_MS = 30;
const HOLD_MS = 1800;

// El lector de pantalla oye "Para tu empresa." y nada se mueve: la animación es solo visual.
// Sin movimiento si la persona lo tiene desactivado, y con botón para pausarla.
export function Industries() {
  const [text, setText] = useState(INDUSTRIES[0]);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(reduce.matches);
    const onChange = () => setStill(reduce.matches);
    reduce.addEventListener("change", onChange);
    return () => reduce.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || still) return;
    let i = 0;
    let shown = INDUSTRIES[0].length;
    let erasing = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = INDUSTRIES[i];
      if (!erasing && shown === word.length) {
        erasing = true;
        timer = setTimeout(tick, HOLD_MS);
        return;
      }
      if (erasing && shown === 0) {
        erasing = false;
        i = (i + 1) % INDUSTRIES.length;
      }
      shown += erasing ? -1 : 1;
      setText(INDUSTRIES[i].slice(0, shown));
      timer = setTimeout(tick, erasing ? ERASE_MS : TYPE_MS);
    };
    timer = setTimeout(tick, HOLD_MS);
    return () => clearTimeout(timer);
  }, [paused, still]);

  return (
    <div className="h-industries">
      <p>
        <span>Para </span>
        <span className="h-industries__word" aria-hidden="true">
          {text}
          {!paused && !still && <i className="h-industries__caret" />}
        </span>
        <span className="sr-only">tu empresa.</span>
      </p>
      {!still && (
        <button type="button" className="h-industries__pause" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
          {paused ? "Reanudar" : "Pausar"}
        </button>
      )}
    </div>
  );
}

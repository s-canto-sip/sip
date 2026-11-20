"use client";

import { useEffect, useRef, useState } from "react";
import { WHATSAPP, contactLink } from "@/lib/contact";

// "Tu caso en un minuto": la misma mecánica que "Ubica tu nivel" en la página de SIP.
// Una pregunta a la vez; al final dice por dónde empezaríamos y abre WhatsApp con el caso
// escrito. No se guarda nada en el sitio: las respuestas solo viajan en ese mensaje.

type Option = { label: string; line: string; start?: string };
type Question = { key: string; q: string; hint?: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    key: "dolor",
    q: "¿Qué te preocupa más hoy?",
    options: [
      { label: "No sé si me va a alcanzar el dinero", line: "no saber si va a alcanzar el dinero", start: "caja" },
      { label: "Vendo bien, pero no veo las utilidades", line: "vender bien pero no ver utilidades", start: "margen" },
      { label: "No entiendo mis estados financieros", line: "no entender los estados financieros", start: "estados" },
      { label: "Quiero crecer o abrir otra sucursal", line: "crecer o abrir otra sucursal", start: "plan" },
      { label: "Voy a buscar inversión o crédito", line: "buscar inversión o crédito", start: "capital" },
    ],
  },
  {
    key: "hoy",
    q: "¿Cómo sabes hoy cómo va tu empresa?",
    options: [
      { label: "Veo el saldo del banco", line: "el saldo del banco" },
      { label: "Mi contador me manda reportes", line: "los reportes del contador" },
      { label: "Tengo un Excel propio", line: "un Excel propio" },
      { label: "Tengo tableros y reportes", line: "tableros y reportes" },
    ],
  },
  {
    key: "ventas",
    q: "¿Cuánto vende tu empresa al año?",
    options: [
      { label: "Menos de $10M", line: "menos de $10M MXN" },
      { label: "$10M a $50M", line: "$10M a $50M MXN" },
      { label: "$50M a $100M", line: "$50M a $100M MXN" },
      { label: "Más de $100M", line: "más de $100M MXN" },
    ],
  },
  {
    key: "equipo",
    q: "¿Cuántas personas trabajan ahí?",
    options: [
      { label: "1 a 10", line: "1 a 10" },
      { label: "11 a 50", line: "11 a 50" },
      { label: "51 a 200", line: "51 a 200" },
      { label: "Más de 200", line: "más de 200" },
    ],
  },
  {
    key: "contador",
    q: "¿Quién lleva tu contabilidad?",
    options: [
      { label: "Un contador interno", line: "contador interno" },
      { label: "Un despacho externo", line: "despacho externo" },
      { label: "Nadie todavía", line: "nadie todavía" },
    ],
  },
];

const STARTS: Record<string, { title: string; why: string }> = {
  caja: {
    title: "Efectivo y pronóstico de caja",
    why: "Armamos el pronóstico de las próximas semanas para que veas venir los meses apretados y decidas a tiempo.",
  },
  margen: {
    title: "Márgenes y precios",
    why: "Vemos qué productos, clientes o sucursales dejan dinero y cuáles se lo comen, para que las ventas se vuelvan utilidad.",
  },
  estados: {
    title: "Estados financieros y cierre",
    why: "Ordenamos tus estados financieros y te los explicamos cada mes en palabras simples, para que sepas qué está pasando.",
  },
  plan: {
    title: "Proyecciones y presupuesto",
    why: "Antes de crecer, proyectamos cuánto cuesta, cuánto deja y cuándo se paga, para que la decisión salga de los números.",
  },
  capital: {
    title: "Listo para levantar capital",
    why: "Dejamos el modelo, las métricas y la información en orden antes de sentarte con un inversionista o un banco.",
  },
};

const TOTAL = QUESTIONS.length + 1;

export function Diagnostic() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Option>>({});
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [done, setDone] = useState(false);
  const byPointer = useRef(false);
  const card = useRef<HTMLFormElement>(null);

  // al cambiar de pregunta, el foco va a su primera opción (o a la elegida)
  useEffect(() => {
    if (step === 0 && !done) return;
    const el = card.current?.querySelector<HTMLElement>(done ? ".d-result" : "input:checked, input");
    el?.focus({ preventScroll: true });
  }, [step, done]);

  const pick = (key: string, o: Option, i: number) => {
    setAnswers((a) => ({ ...a, [key]: o }));
    if (!byPointer.current) return;
    setTimeout(() => setStep((s) => (s === i ? i + 1 : s)), 220);
  };

  const start = STARTS[answers.dolor?.start ?? "estados"];
  const lines = [
    `Hola${name ? `, soy ${name}` : ""}${company ? ` de ${company}` : ""}. Hice el cuestionario de sipartners.com.mx (SIP Consulting).`,
    `Empezaríamos por: ${start.title.toLowerCase()}.`,
    "",
    `Lo que más me preocupa: ${answers.dolor?.line ?? "sin respuesta"}`,
    `Hoy veo cómo va la empresa con: ${answers.hoy?.line ?? "sin respuesta"}`,
    `Ventas al año: ${answers.ventas?.line ?? "sin respuesta"}`,
    `Personas en la empresa: ${answers.equipo?.line ?? "sin respuesta"}`,
    `Contabilidad: ${answers.contador?.line ?? "sin respuesta"}`,
  ];

  const reset = () => {
    setAnswers({});
    setName("");
    setCompany("");
    setDone(false);
    setStep(0);
  };

  const current = QUESTIONS[step];
  const answered = current ? !!answers[current.key] : true;

  return (
    <form
      ref={card}
      className="d-quiz"
      aria-label="Tu caso en un minuto"
      noValidate
      onPointerDown={() => (byPointer.current = true)}
      onKeyDown={(e) => {
        byPointer.current = false;
        if (e.key === "Enter" && (e.target as HTMLInputElement).type === "radio" && answered) {
          e.preventDefault();
          setStep((s) => s + 1);
        }
      }}
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <div className="d-quiz__bar" aria-hidden="true">
        <i style={{ width: `${((done ? TOTAL : step + 1) / TOTAL) * 100}%` }} />
      </div>
      <p className="d-quiz__count" aria-live="polite">
        {done ? "Listo" : `Pregunta ${step + 1} de ${TOTAL}`}
      </p>

      {!done && current && (
        <fieldset className="d-q" key={current.key}>
          <legend>{current.q}</legend>
          <div className="d-q__opts">
            {current.options.map((o) => (
              <label key={o.label}>
                <input
                  type="radio"
                  name={current.key}
                  checked={answers[current.key]?.label === o.label}
                  onChange={() => pick(current.key, o, step)}
                />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {!done && !current && (
        <fieldset className="d-q">
          <legend>¿Con quién hablamos?</legend>
          <p className="d-q__hint">Para saber a quién saludamos. Nada más.</p>
          <input className="d-q__text" aria-label="Tu nombre" autoComplete="given-name" maxLength={60} placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="d-q__text" aria-label="Tu empresa" autoComplete="organization" maxLength={80} placeholder="Tu empresa" value={company} onChange={(e) => setCompany(e.target.value)} />
          <button type="submit" className="h-btn h-btn--solid d-q__go">
            Ver por dónde empezamos
          </button>
        </fieldset>
      )}

      {done && (
        <div className="d-result" tabIndex={-1}>
          <p className="d-result__k">Empezaríamos por</p>
          <h3>{start.title}</h3>
          <p>{start.why}</p>
          <a className="h-btn h-btn--solid" {...contactLink(lines.join("\n"))}>
            {WHATSAPP ? "Mandar mi caso por WhatsApp" : "Mandar mi caso por correo"}
          </a>
          <p className="d-result__fine">Es una primera idea. En la llamada lo vemos con calma.</p>
        </div>
      )}

      <div className="d-quiz__nav">
        {!done && step > 0 && (
          <button type="button" className="d-quiz__back" onClick={() => setStep((s) => s - 1)}>
            Atrás
          </button>
        )}
        {done && (
          <button type="button" className="d-quiz__back" onClick={reset}>
            Volver a empezar
          </button>
        )}
        {!done && current && (
          <button type="button" className="d-quiz__next" disabled={!answered} onClick={() => setStep((s) => s + 1)}>
            Siguiente
          </button>
        )}
      </div>
    </form>
  );
}

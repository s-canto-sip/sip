// WhatsApp de Consulting en formato internacional, solo dígitos (ej. "525512345678").
// Mismo número que WHATSAPP.consulting en js/contacto.js del sitio principal: cambiar los dos juntos.
// Si queda vacío, los botones abren un correo con el mismo mensaje ya escrito.
export const WHATSAPP = "529982140221";
export const CONTACT_EMAIL = "consulting@sipartners.com.mx";

export const DIAGNOSTIC_MESSAGE =
  "Hola, vengo de sipartners.com.mx (SIP Consulting). Me gustaría agendar una llamada.";

export function contactHref(message: string) {
  if (WHATSAPP) return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  const subject = encodeURIComponent("Contacto desde sipartners.com.mx");
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodeURIComponent(message)}`;
}

// Spread onto an <a>: WhatsApp opens in a new tab, mail stays in place.
export function contactLink(message: string) {
  return WHATSAPP
    ? { href: contactHref(message), target: "_blank", rel: "noopener" }
    : { href: contactHref(message) };
}

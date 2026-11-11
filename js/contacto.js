// SIP · contacto por WhatsApp y calificador del inicio.
// WhatsApp de cada unidad en formato internacional, solo dígitos (ej. "525512345678").
// Inversiones (inicio, SIP, SIP Wealth) y Consulting contestan en números distintos.
// El de Consulting es el mismo que WHATSAPP en src/lib/contact.ts: cambiar los dos juntos.
// Si un número queda vacío, sus botones abren un correo con el mismo mensaje ya escrito.
(function(){
  var WHATSAPP = { invest: '525515743461', consulting: '529982140221' };
  var EMAIL = { invest: 'contacto@sipartners.com.mx', consulting: 'consulting@sipartners.com.mx' };

  var point = function(a, message, unit){
    var number = WHATSAPP[unit];
    if (number){
      a.href = 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
      a.target = '_blank'; a.rel = 'noopener';
    } else {
      a.href = 'mailto:' + EMAIL[unit] + '?subject=' + encodeURIComponent('Contacto desde sipartners.com.mx') +
        '&body=' + encodeURIComponent(message);
      a.removeAttribute('target');
    }
    return !!number;
  };

  document.querySelectorAll('a[data-wa]').forEach(function(a){ point(a, a.dataset.wa, a.dataset.unit || 'invest'); });
  // Para enlaces cuyo mensaje cambia después de cargar (niveles de SIP)
  window.sipContact = function(a){ point(a, a.dataset.wa, a.dataset.unit || 'invest'); };

  // Calificador: dos o tres preguntas y el mensaje sale escrito, con la unidad al frente
  // para que quien conteste el chat sepa a quién turnarlo.
  var form = document.getElementById('qualifier');
  if (!form) return;
  var go = document.getElementById('qualGo');
  var route = document.getElementById('qualRoute');
  var UNITS = {
    sip: ['SIP', 'sip.html'],
    wealth: ['SIP Wealth', 'sip-wealth.html'],
    consulting: ['SIP Consulting', 'consulting/']
  };
  var value = function(name){ var el = form.querySelector('input[name="' + name + '"]:checked'); return el ? el : null; };

  var sync = function(){
    var para = value('para');
    var who = para ? para.value : '';
    form.querySelectorAll('fieldset[data-show]').forEach(function(f){
      f.classList.toggle('on', !!who && f.dataset.show.split(' ').indexOf(who) > -1);
    });
    var etapa = who && who !== 'empresa' ? value('etapa') : null;
    var necesidad = who && who !== 'persona' ? value('necesidad') : null;
    var facturacion = who && who !== 'persona' ? value('facturacion') : null;

    var units = [];
    if (etapa) units.push(etapa.value);
    if (who === 'empresa' || who === 'ambos') units.push('consulting');
    var names = units.map(function(u){ return UNITS[u][0]; });

    var lines = ['Hola, vengo de sipartners.com.mx' + (names.length ? ' (' + names.join(' y ') + ')' : '') + '.'];
    if (para) lines.push(para.dataset.line);
    if (etapa) lines.push('Etapa: ' + etapa.dataset.line + '.');
    if (necesidad) lines.push('Lo que más urge en la empresa: ' + necesidad.dataset.line + '.');
    if (facturacion) lines.push('Facturación anual: ' + facturacion.dataset.line + '.');
    if (lines.length === 1) lines.push('Me gustaría platicar con ustedes.');

    // Solo empresa va a Consulting; persona y ambos los abre inversiones.
    var viaWhatsApp = point(go, lines.join(' '), who === 'empresa' ? 'consulting' : 'invest');
    go.textContent = viaWhatsApp ? 'Continuar en WhatsApp' : 'Enviar por correo';

    if (!units.length){ route.textContent = 'Elige una opción y te decimos qué equipo te atiende.'; return; }
    route.innerHTML = 'Te atiende ' + units.map(function(u){
      return '<a href="' + UNITS[u][1] + '">' + UNITS[u][0] + '</a>';
    }).join(' y ') + '.';
  };
  form.addEventListener('change', sync);
  form.addEventListener('submit', function(e){ e.preventDefault(); });
  sync();
})();

// SIP · "¿En qué nivel estás hoy?": elegir un escalón cambia la tarjeta de detalle
// y el mensaje del botón, para que la conversación abra con el nivel ya dicho.
// Los niveles V a VII son de SIP Wealth: la tarjeta lo dice y enlaza ahí.
(function(){
  var stairs = document.querySelector('.s-stairs');
  var card = document.getElementById('levelCard');
  if (!stairs || !card) return;

  var LEVELS = [
    ['I', 'Fondo de emergencia', 'Tu colchón para imprevistos',
      'Tener de 3 a 6 meses de gastos guardados y disponibles.',
      'Si hoy un gasto inesperado te obliga a usar la tarjeta o pedir prestado.'],
    ['II', 'Retiro y hábito', 'Ahorro constante para tu retiro',
      'Que ahorrar cada mes sea automático y empezar a construir tu retiro.',
      'Si ya tienes tu fondo de emergencia y quieres que el ahorro sea un hábito.'],
    ['III', 'Activos reales', 'Tu dinero construyendo algo sólido',
      'Invertir en activos tangibles, como bienes raíces a través de crowdfunding inmobiliario.',
      'Si ya ahorras cada mes y buscas que tu dinero crezca en algo que puedes ver.'],
    ['IV', 'Patrimonio en dólares', 'Plan de inversión en dólares',
      'Diversificar moneda y no depender de un solo mercado.',
      'Capital que no vas a necesitar en 5 años o más.'],
    ['V', 'Planeación patrimonial', 'Proteger lo que ya construiste',
      'Proteger tu patrimonio personal y familiar, ordenar la sucesión y mejorar la eficiencia fiscal.',
      'Si ya tienes un patrimonio que quieres cuidar a largo plazo.'],
    ['VI', 'Deuda privada', 'Flujos estables para tu capital',
      'Acceder a vehículos con flujos estables y riesgo moderado para generar ingresos recurrentes.',
      'Si buscas conservar capital y recibir ingresos periódicos.'],
    ['VII', 'Diversificación global', 'Portafolios con visión internacional',
      'Portafolios multiactivo con exposición internacional, alineados a tus objetivos de largo plazo.',
      'Capital de largo plazo que quieres repartir en varios mercados.']
  ];

  var tag = card.querySelector('.s-level__tag');
  var title = card.querySelector('h3');
  var dds = card.querySelectorAll('dd');
  var link = card.querySelector('.s-level__link');
  var steps = stairs.querySelectorAll('.s-step');

  var show = function(i){
    var l = LEVELS[i], wealth = i >= 4;
    steps.forEach(function(s, j){ s.setAttribute('aria-pressed', String(j === i)); });
    tag.textContent = 'Nivel ' + l[0] + ' · ' + l[1];
    title.textContent = l[2];
    dds[0].textContent = l[3];
    dds[1].textContent = l[4];
    card.classList.toggle('is-wealth', wealth);
    if (wealth){
      link.textContent = 'Lo vemos en SIP Wealth';
      link.href = 'sip-wealth.html';
      link.removeAttribute('target');
      return;
    }
    link.textContent = i === 0 ? 'Empezar por aquí' : 'Hablemos de este nivel';
    // contacto.js convierte el data-wa en el enlace de WhatsApp (o correo)
    link.dataset.wa = 'Hola, vengo de sipartners.com.mx (SIP). Estoy en el nivel ' + l[0] + ' (' + l[1] + ') y me gustaría agendar una llamada.';
    if (window.sipContact) window.sipContact(link);
  };

  steps.forEach(function(s){
    s.addEventListener('click', function(){ show(Number(s.dataset.level)); });
  });
})();

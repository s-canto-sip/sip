// SIP · "Ubica tu nivel": siete preguntas, una a la vez. Al final sugiere un nivel,
// lo marca en la escalera y arma el mensaje de WhatsApp con las respuestas.
// No se guarda nada en el sitio: las respuestas solo viajan en ese mensaje.
(function(){
  var form = document.getElementById('nivelQuiz');
  if (!form) return;
  var steps = Array.prototype.slice.call(form.querySelectorAll('.s-q'));
  var bar = document.getElementById('quizBar');
  var count = document.getElementById('quizCount');
  var back = document.getElementById('quizBack');
  var reset = document.getElementById('quizReset');
  var next = document.getElementById('quizNext');
  var result = document.getElementById('quizResult');
  var go = document.getElementById('quizGo');
  var current = 0;

  var LEVELS = ['', 'fondo de emergencia', 'fondo para el retiro', 'activos reales', 'patrimonio en dólares'];
  var ROMAN = ['', 'I', 'II', 'III', 'IV'];

  var picked = function(name){ return form.querySelector('input[name="' + name + '"]:checked'); };
  var label = function(input){ return input ? input.parentNode.textContent.trim() : ''; };

  var show = function(i, focus){
    current = i;
    steps.forEach(function(s, j){ s.hidden = j !== i; });
    result.hidden = true;
    bar.style.width = ((i + 1) / steps.length * 100) + '%';
    count.textContent = 'Pregunta ' + (i + 1) + ' de ' + steps.length;
    back.hidden = i === 0;
    reset.hidden = true;
    // la última pregunta (nombre) se manda con su propio botón
    next.hidden = i === steps.length - 1;
    next.disabled = !steps[i].querySelector('input:checked');
    if (focus){
      var first = steps[i].querySelector('input:checked, input');
      if (first) first.focus({ preventScroll: true });
    }
  };

  // con fondo de emergencia, el nivel sale de la meta; sin él, siempre se empieza por el I
  var levelFor = function(){
    var meta = Number(picked('meta') ? picked('meta').value : 0);
    if (!picked('fondo') || picked('fondo').value !== 'si') return 1;
    return meta >= 2 ? meta : 2;
  };

  var why = function(level){
    var meta = picked('meta');
    var largo = picked('plazo') && picked('plazo').value === 'largo';
    if (level === 1){
      if (meta && Number(meta.value) >= 2)
        return 'Quieres ' + meta.dataset.you + '. Antes de eso armamos tu fondo de emergencia: así lo que inviertas después se puede quedar invertido.';
      return 'Empezamos por juntar de 6 a 12 meses de tus gastos, a tu ritmo, para que un imprevisto no te obligue a pedir prestado.';
    }
    if (level === 2) return 'Con tu fondo listo, el siguiente paso es tu retiro: un plan que además tiene beneficio fiscal.';
    if (level === 3) return 'Con tu fondo listo, puedes entrar a bienes raíces con montos que se ajustan a ti.';
    return largo
      ? 'Con tu fondo listo y un plazo largo, puedes tener una parte de tu dinero en dólares.'
      : 'Con tu fondo listo, puedes tener una parte de tu dinero en dólares. Este nivel es para dinero que no vas a necesitar en 5 años o más; en la plática vemos si es tu caso.';
  };

  var finish = function(){
    var level = levelFor();
    var name = form.nombre.value.trim();
    steps.forEach(function(s){ s.hidden = true; });
    bar.style.width = '100%';
    count.textContent = 'Listo';
    back.hidden = true;
    next.hidden = true;
    reset.hidden = false;

    document.getElementById('quizLevel').textContent = 'Empezarías en el nivel ' + ROMAN[level] + ': ' + LEVELS[level] + '.';
    document.getElementById('quizWhy').textContent = why(level);
    document.getElementById('quizWealth').hidden = !(picked('fondo') && picked('fondo').value === 'si' && picked('ingresos') && picked('ingresos').value === 'Más de $100,000');

    var lines = [
      'Hola' + (name ? ', soy ' + name : '') + '. Hice el cuestionario de sipartners.com.mx (SIP).',
      'Resultado: nivel ' + ROMAN[level] + ' (' + LEVELS[level] + ').',
      '',
      'Fondo de emergencia: ' + (label(picked('fondo')) || 'sin respuesta'),
      'Ingresos al mes: ' + (label(picked('ingresos')) || 'sin respuesta'),
      'Gastos al mes: ' + (label(picked('gastos')) || 'sin respuesta'),
      'Meta: ' + (picked('meta') ? picked('meta').dataset.text : 'sin respuesta'),
      'Plazo: ' + (picked('plazo') ? picked('plazo').dataset.text : 'sin respuesta'),
      'He invertido antes: ' + (picked('antes') ? picked('antes').value : 'sin respuesta')
    ];
    go.dataset.wa = lines.join('\n');
    if (window.sipContact) window.sipContact(go);

    document.getElementById('quizSee').onclick = function(){ if (window.sipShowLevel) window.sipShowLevel(level); };
    if (window.sipShowLevel) window.sipShowLevel(level);
    result.hidden = false;
    result.focus({ preventScroll: true });
  };

  // con el dedo o el mouse, elegir una opción avanza sola; con teclado las flechas solo
  // cambian la opción y se avanza con "Siguiente" o Enter, para no saltarse preguntas
  var byPointer = false;
  form.addEventListener('pointerdown', function(){ byPointer = true; });
  form.addEventListener('keydown', function(e){
    byPointer = false;
    if (e.key === 'Enter' && e.target.type === 'radio'){ e.preventDefault(); next.click(); }
  });
  form.addEventListener('change', function(e){
    if (e.target.type !== 'radio') return;
    var i = steps.indexOf(e.target.closest('.s-q'));
    next.disabled = false;
    if (!byPointer) return;
    setTimeout(function(){ if (current === i && i < steps.length - 1) show(i + 1, true); }, 220);
  });
  form.addEventListener('submit', function(e){ e.preventDefault(); finish(); });
  back.addEventListener('click', function(){ if (current > 0) show(current - 1, true); });
  next.addEventListener('click', function(){ if (current < steps.length - 1) show(current + 1, true); });
  reset.addEventListener('click', function(){ form.reset(); show(0, true); });

  show(0);
})();

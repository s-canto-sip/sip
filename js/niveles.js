// SIP · "¿En qué nivel estás hoy?": cada escalón muestra su tarjeta.
// Las seis tarjetas ya están en el HTML (se leen sin JavaScript); aquí solo se muestra una a la vez.
// Los niveles V y VI son de SIP Wealth: su tarjeta enlaza ahí.
(function(){
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.s-step[role="tab"]'));
  if (!tabs.length) return;

  var show = function(tab, focus){
    tabs.forEach(function(t){
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  };

  tabs.forEach(function(t, i){
    t.addEventListener('click', function(){ show(t); });
    // flechas para moverse entre niveles, como en cualquier grupo de pestañas
    t.addEventListener('keydown', function(e){
      var next = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? i + 1
        : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? i - 1
        : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
      if (next === null) return;
      e.preventDefault();
      show(tabs[(next + tabs.length) % tabs.length], true);
    });
  });

  show(tabs[0]);
  // el cuestionario "Ubica tu nivel" marca aquí su resultado (n de 1 a 6)
  window.sipShowLevel = function(n){ if (tabs[n - 1]) show(tabs[n - 1]); };
})();

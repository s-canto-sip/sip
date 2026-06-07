// SIP · interacciones compartidas (Diseño A)
(function(){
  // header solid on scroll
  var header=document.getElementById('siteHeader');
  if(header){
    var onScroll=function(){ header.dataset.scrolled = window.scrollY>30 ? 'true':'false'; };
    addEventListener('scroll',onScroll,{passive:true}); onScroll();
  }
  // mobile drawer
  var toggle=document.getElementById('navToggle'), drawer=document.getElementById('drawer'),
      scrim=document.getElementById('scrim'), closeB=document.getElementById('drawerClose');
  if(toggle&&drawer&&scrim){
    var open=function(){drawer.dataset.open=scrim.dataset.open='true';toggle.setAttribute('aria-expanded','true');var f=drawer.querySelector('a');if(f)f.focus();};
    var close=function(){drawer.dataset.open=scrim.dataset.open='false';toggle.setAttribute('aria-expanded','false');toggle.focus();};
    toggle.addEventListener('click',open);
    if(closeB)closeB.addEventListener('click',close);
    scrim.addEventListener('click',close);
    addEventListener('keydown',function(e){if(e.key==='Escape'&&drawer.dataset.open==='true')close();});
    drawer.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close);});
  }
  // reveal on scroll
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);} });
  },{threshold:0.14});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  // process timeline
  var process=document.querySelector('.process');
  if(process){
    var fill=process.querySelector('.process__fill');
    var steps=[].slice.call(process.querySelectorAll('.process__step'));
    var sync=function(){
      var r=process.getBoundingClientRect();
      var progress=Math.min(Math.max((innerHeight*0.6 - r.top)/r.height,0),1);
      if(fill)fill.style.height=(progress*100)+'%';
      steps.forEach(function(s){
        var d=s.querySelector('.process__dot').getBoundingClientRect();
        s.classList.toggle('in', d.top < innerHeight*0.66);
      });
    };
    addEventListener('scroll',sync,{passive:true}); addEventListener('resize',sync); sync();
  }
})();

/* ===== Landing-only behaviors (guarded; no-op on sub-pages) ===== */
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // NOTE: header scroll + drawer + reveal already handled by the existing IIFE above. Do not duplicate.

  // Sticky mobile CTA: show after hero scrolls past
  var mcta = document.getElementById('mobileCta');
  var hero = document.querySelector('.hero');
  if (mcta && hero && 'IntersectionObserver' in window){
    new IntersectionObserver(function(es){
      mcta.classList.toggle('show', !es[0].isIntersecting);
    },{threshold:0}).observe(hero);
  }

  // Animated number counters
  var nums = document.querySelectorAll('.hero__stats .n[data-count]');
  if (nums.length && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        var el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix||'', prefix = el.dataset.prefix||'';
        io.unobserve(el);
        if(reduce){ el.textContent = prefix+target+suffix; return; }
        var start=0, t0=performance.now(), dur=1100;
        requestAnimationFrame(function tick(now){
          var p=Math.min((now-t0)/dur,1), v=Math.round(start+(target-start)*p);
          el.textContent=prefix+v+suffix;
          if(p<1) requestAnimationFrame(tick);
        });
      });
    },{threshold:.5});
    nums.forEach(function(n){ io.observe(n); });
  }

  // Contact form: inline validation + web3forms AJAX submit
  var form = document.getElementById('contactForm');
  if (form){
    var status = document.getElementById('formStatus');
    var setErr = function(input, msg){
      var field = input.closest('.field');
      field.classList.toggle('invalid', !!msg);
      var slot = field.querySelector('.err'); if(slot) slot.textContent = msg||'';
    };
    var validate = function(input){
      if(input.validity.valueMissing){ setErr(input,'Este campo es obligatorio.'); return false; }
      if(input.type==='email' && input.validity.typeMismatch){ setErr(input,'Escribe un correo válido.'); return false; }
      setErr(input,''); return true;
    };
    form.querySelectorAll('input[required],textarea[required]').forEach(function(input){
      input.addEventListener('blur', function(){ validate(input); });
    });
    form.addEventListener('submit', async function(ev){
      ev.preventDefault();
      var inputs = form.querySelectorAll('input[required],textarea[required]'), ok=true, first=null;
      inputs.forEach(function(i){ if(!validate(i)){ ok=false; first=first||i; } });
      if(!ok){ if(first) first.focus(); return; }
      var btn=form.querySelector('button[type=submit]'); btn.disabled=true;
      status.className='form-status'; status.textContent='Enviando…';
      try{
        var res = await fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}});
        if(res.ok){ form.reset(); status.className='form-status ok'; status.textContent='¡Gracias! Te contactaremos pronto.'; }
        else throw new Error('bad');
      }catch(e){ status.className='form-status bad'; status.textContent='Algo salió mal. Escríbenos a hola@sipartners.com.mx'; }
      finally{ btn.disabled=false; }
    });
  }
})();

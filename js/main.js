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

})();

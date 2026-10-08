(function(){
  var root=document.documentElement;
  function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  var hue=document.getElementById('hue');
  var h=get('hue'); if(h!==null){root.style.setProperty('--h',h);hue.value=h}
  hue.addEventListener('input',function(){root.style.setProperty('--h',hue.value);set('hue',hue.value)});

  var t=get('theme'); if(t) root.setAttribute('data-theme',t);
  document.getElementById('theme').addEventListener('click',function(){
    var dark=root.getAttribute('data-theme')==='dark'||(!root.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme:dark)').matches);
    var n=dark?'light':'dark'; root.setAttribute('data-theme',n); set('theme',n);
  });

  // Hero name: weight follows the pointer across the screen
  var name=document.getElementById('name');
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
    var cur=300,tgt=300,run=false;
    var tick=function(){cur+=(tgt-cur)*.08;name.style.setProperty('--w',cur.toFixed(1));if(Math.abs(tgt-cur)>.5){requestAnimationFrame(tick)}else{run=false}};
    addEventListener('pointermove',function(e){tgt=200+(e.clientX/innerWidth)*600;if(!run){run=true;requestAnimationFrame(tick)}},{passive:true});
  }

  var mail=document.getElementById('mail'),copy=document.getElementById('copy');
  copy.addEventListener('click',function(){
    var txt=mail.textContent;
    var done=function(){copy.textContent='Copied';setTimeout(function(){copy.textContent='Copy email'},1800)};
    if(navigator.clipboard){navigator.clipboard.writeText(txt).then(done,function(){})}
  });
  document.getElementById('yr').textContent=new Date().getFullYear();
  var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12}):null;
  document.querySelectorAll('main section').forEach(function(sec){sec.classList.add('reveal');if(io){io.observe(sec)}else{sec.classList.add('in')}});
})();
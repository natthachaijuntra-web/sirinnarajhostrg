/* Hero slider: fade between slides, dots, arrows, autoplay (paused on hover/focus) */
(function(){
const stage=document.querySelector('.stage');if(!stage)return;
const slides=[...stage.querySelectorAll('.slide')],dots=stage.querySelector('.dots');let i=0,timer;
slides.forEach((s,n)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','สไลด์ที่ '+(n+1));b.addEventListener('click',()=>{go(n);play()});dots.append(b)});
function go(n){i=(n+slides.length)%slides.length;slides.forEach((s,k)=>{s.classList.toggle('is-active',k===i);s.setAttribute('aria-hidden',k!==i)});[...dots.children].forEach((d,k)=>d.setAttribute('aria-current',k===i))}
function play(){clearInterval(timer);if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;timer=setInterval(()=>go(i+1),6000)}
stage.querySelector('.prev').addEventListener('click',()=>{go(i-1);play()});stage.querySelector('.next').addEventListener('click',()=>{go(i+1);play()});
['mouseenter','focusin'].forEach(ev=>stage.addEventListener(ev,()=>clearInterval(timer)));['mouseleave','focusout'].forEach(ev=>stage.addEventListener(ev,play));
/* Touch swipe */
let sx=null;
stage.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});
stage.addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(dx)>45){go(i+(dx<0?1:-1));play()}});
go(0);play();
})();

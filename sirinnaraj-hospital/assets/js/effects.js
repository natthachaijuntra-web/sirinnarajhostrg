/* Decorative effects: scroll progress, header auto-hide, parallax, card tilt, button ripple, side reveals */
(function(){
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* Scroll progress bar */
const bar=document.createElement('div');bar.className='scroll-progress';bar.setAttribute('aria-hidden','true');document.body.append(bar);
const header=document.querySelector('.site-header'),stage=document.querySelector('.stage'),nav=document.querySelector('.nav');let last=scrollY,tick=false;
function onScroll(){
const max=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(max>0?scrollY/max:0)+')';
if(!calm){
 if(stage&&scrollY<innerHeight)stage.style.setProperty('--py',(scrollY*0.22)+'px');
 const d=scrollY-last;
 if(scrollY>320&&d>6&&!nav.classList.contains('is-open'))header.classList.add('is-hidden');else if(d<-6||scrollY<320)header.classList.remove('is-hidden');
}
last=scrollY;tick=false}
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();
header.addEventListener('focusin',()=>header.classList.remove('is-hidden'));
if(calm)return;
/* Slide-in reveal for the two halves of banners */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.band>div,.band>img').forEach((el,i)=>{if(el.getBoundingClientRect().top<innerHeight)return;el.classList.add('reveal',i%2?'reveal-right':'reveal-left');io.observe(el)});
/* 3D tilt following the pointer (mouse devices only) */
if(matchMedia('(hover:hover)').matches){
document.querySelectorAll('.card,.tile,.center-item').forEach(el=>{
 el.addEventListener('pointerenter',()=>{el.style.transition='transform .12s ease-out'});
 el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  el.style.transform='perspective(700px) rotateX('+(-y*7)+'deg) rotateY('+(x*7)+'deg) translateY(-6px)'});
 el.addEventListener('pointerleave',()=>{el.style.transition='transform .5s ease';el.style.transform=''});
})}
/* Ripple on buttons */
document.addEventListener('pointerdown',e=>{const b=e.target.closest('.btn');if(!b)return;
const r=b.getBoundingClientRect(),s=document.createElement('span');s.className='ripple';s.style.left=(e.clientX-r.left)+'px';s.style.top=(e.clientY-r.top)+'px';
b.append(s);setTimeout(()=>s.remove(),650)});
})();

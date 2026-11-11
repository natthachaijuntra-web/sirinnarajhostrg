/* Global: sticky header, back-to-top, scroll reveal, icons */
(function(){
const header=document.querySelector('.site-header'),top=document.querySelector('.back-to-top');
addEventListener('scroll',()=>{header.classList.toggle('is-stuck',scrollY>10);top.classList.toggle('is-visible',scrollY>400)},{passive:true});
top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}));
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
if(window.lucide)lucide.createIcons();
})();
/* Scroll reveal for elements BELOW the fold only, so nothing flashes on load.
   Page changes use native View Transitions (see components.css), not JS. */
(function(){
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.tile,.card,.accordion-item,.band,.cta,.gallery-btn,.sec-head,.step').forEach((el,i)=>{
if(el.getBoundingClientRect().top<innerHeight)return;
el.classList.add('reveal');el.style.setProperty('--d',(i%4)*0.08+'s');io.observe(el)})
})();

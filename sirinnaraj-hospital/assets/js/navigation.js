/* Mobile nav, dropdown, search dialog */
(function(){
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
toggle.addEventListener('click',()=>{const o=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',o)});
document.querySelectorAll('.has-dropdown>button').forEach(b=>b.addEventListener('click',()=>{const p=b.parentElement,o=p.classList.toggle('is-open');b.setAttribute('aria-expanded',o)}));
document.addEventListener('click',e=>{document.querySelectorAll('.has-dropdown.is-open').forEach(p=>{if(!p.contains(e.target))p.classList.remove('is-open')})});
const dlg=document.getElementById('search-dialog'),inp=dlg.querySelector('input'),out=dlg.querySelector('.search-results'),root=document.body.dataset.root||'',pre=root?'':'pages/';
document.querySelector('.search-open').addEventListener('click',()=>{dlg.showModal();inp.focus()});
dlg.querySelector('.close').addEventListener('click',()=>dlg.close());
inp.addEventListener('input',()=>{const q=inp.value.trim();out.innerHTML='';if(!q)return;
const hits=SITE_PAGES.filter(p=>(p.t+p.k).includes(q));
if(!hits.length){out.innerHTML='<li>ไม่พบหน้าที่ตรงกับคำค้นหา ลองใช้คำอื่น</li>';return}
hits.forEach(p=>{const li=document.createElement('li'),a=document.createElement('a');a.href=pre+p.u;a.textContent=p.t;li.append(a);out.append(li)})});
/* Close the mobile menu on outside tap, link tap, or Escape */
function closeNav(){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')}
document.addEventListener('click',e=>{if(nav.classList.contains('is-open')&&!nav.contains(e.target)&&!toggle.contains(e.target))closeNav()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeNav();document.querySelectorAll('.has-dropdown.is-open').forEach(p=>p.classList.remove('is-open'))}});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
})();

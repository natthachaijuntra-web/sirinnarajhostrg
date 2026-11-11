/* Tabs, accordion, modal, lightbox, filters, form validation */
(function(){
const root=document.body.dataset.root||'',esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* Tabs */
document.querySelectorAll('[data-tabs]').forEach(w=>{const tabs=[...w.querySelectorAll('.tab')],ps=[...w.querySelectorAll('.tabpanel')];
tabs.forEach((t,i)=>t.addEventListener('click',()=>{tabs.forEach((x,j)=>{x.setAttribute('aria-selected',i===j);ps[j].hidden=i!==j})}))});
/* Accordion */
document.querySelectorAll('.accordion-btn').forEach(b=>b.addEventListener('click',()=>{const p=b.nextElementSibling,o=p.hidden;p.hidden=!o;b.setAttribute('aria-expanded',o)}));
/* Modal (card detail) */
const modal=document.getElementById('detail-modal');
const img0=it=>root+'assets/images/'+(it.img||'placeholder.svg');
function openDetail(it){modal.querySelector('.modal-body').innerHTML='<img src="'+img0(it)+'" alt="ภาพประกอบ '+esc(it.name)+'"><h2>'+esc(it.name)+'</h2><p>'+esc(it.text)+'</p>'+(it.sample?'<span class="badge">ข้อมูลตัวอย่าง รอแทนที่ด้วยข้อมูลจริง</span>':'');modal.showModal()}
if(modal)modal.querySelector('.close').addEventListener('click',()=>modal.close());
/* Filterable card lists from data.js: chips = group/category, optional clinic <select>, ?q= search */
document.querySelectorAll('[data-list]').forEach(box=>{
const items=DATA[box.dataset.list],key=items.some(i=>i.grp)?'grp':'cat',bar=box.querySelector('.filters'),grid=box.querySelector('.grid'),sel=box.querySelector('select'),q=(new URLSearchParams(location.search).get('q')||'').trim();
let c='all',s='all';
const img=it=>root+'assets/images/'+(it.img||'placeholder.svg');
const act=it=>box.dataset.list==='doctors'?'<a class="btn btn--primary" href="'+(root?'':'pages/')+'doctor-detail.html?id='+DATA.doctors.indexOf(it)+'">ดูรายละเอียด</a>':'<button class="btn btn--primary" type="button">ดูรายละเอียด</button>';
function fillSel(){if(!sel)return;sel.innerHTML='<option value="all">ทุกแผนก/คลินิก</option>';items.filter(i=>c==='all'||i[key]===c).forEach(i=>{const o=document.createElement('option');o.value=i.cat;o.textContent=i.cat;sel.append(o)});s='all'}
function draw(){const list=items.filter(i=>(c==='all'||i[key]===c)&&(s==='all'||i.cat===s)&&(!q||(i.name+i.cat+i.text).includes(q)));
grid.innerHTML=list.length?'':'<p>ไม่พบรายการที่ตรงกับคำค้นหา</p>';
list.forEach(it=>{const a=document.createElement('article');a.className='card';
a.innerHTML='<img loading="lazy" width="400" height="300" src="'+img(it)+'" alt="ภาพประกอบ '+esc(it.name)+' '+esc(it.cat)+'"><div class="card-body"><span class="badge">'+esc(it.cat)+'</span><h3>'+esc(it.name)+'</h3><p>'+esc(it.text)+'</p>'+act(it)+'</div>';
const bt=a.querySelector('button.btn');if(bt)bt.addEventListener('click',()=>openDetail(it));grid.append(a)})}
['all',...new Set(items.map(i=>i[key]))].forEach(v=>{const b=document.createElement('button');b.type='button';b.className='chip';b.textContent=v==='all'?'ทั้งหมด':v;b.setAttribute('aria-pressed',v==='all');
b.addEventListener('click',()=>{bar.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===b));c=v;fillSel();draw()});bar.append(b)});
if(sel)sel.addEventListener('change',()=>{s=sel.value;draw()});
fillSel();draw()});
/* Lightbox */
const lb=document.getElementById('lightbox');
document.querySelectorAll('.gallery-btn').forEach(b=>b.addEventListener('click',()=>{const im=b.querySelector('img');lb.querySelector('img').src=im.src;lb.querySelector('img').alt=im.alt;lb.querySelector('figcaption').textContent=im.alt;lb.showModal()}));
if(lb)lb.querySelector('.close').addEventListener('click',()=>lb.close());
/* Form validation */
document.querySelectorAll('form[data-validate]').forEach(f=>{f.noValidate=true;f.addEventListener('submit',e=>{e.preventDefault();let ok=true;
f.querySelectorAll('[required]').forEach(i=>{const f2=i.closest('.field'),m=f2.querySelector('.error-msg');let msg='';
if(!i.value.trim())msg='กรุณากรอก'+f2.querySelector('label').textContent;else if(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(i.value))msg='รูปแบบอีเมลไม่ถูกต้อง';
f2.classList.toggle('has-error',!!msg);m.textContent=msg;if(msg)ok=false});
const s=f.querySelector('.form-success');if(s)s.hidden=!ok;
/* TODO: connect to a real backend/email service before launch; nothing is sent yet. */})});
})();

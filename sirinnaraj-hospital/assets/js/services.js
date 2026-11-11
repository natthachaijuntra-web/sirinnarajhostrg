/* Renders clinics/centers from SERVICE_GROUPS: grouped + searchable (services page) or flat (home) */
(function(){
const root=document.body.dataset.root||'',pre=root?'':'pages/',modal=document.getElementById('detail-modal');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const icons=()=>window.lucide&&lucide.createIcons();
function open(s,g){modal.querySelector('.modal-body').innerHTML='<span class="badge">'+esc(g.n)+'</span><h2>'+esc(s.n)+'</h2><p>[ใส่รายละเอียดบริการของ'+esc(s.n)+']</p><a class="btn btn--primary" href="'+pre+'doctors.html?q='+encodeURIComponent(s.n)+'">ค้นหาแพทย์สาขานี้</a>';modal.showModal()}
function btn(s,g){const b=document.createElement('button');b.type='button';b.className='center-item';b.innerHTML='<span class="ico"><i data-lucide="'+s.i+'" aria-hidden="true"></i></span>'+esc(s.n);b.addEventListener('click',()=>open(s,g));return b}
const flat=document.querySelector('[data-services=flat]');
if(flat){SERVICE_GROUPS.forEach(g=>g.items.forEach(s=>flat.append(btn(s,g))));icons()}
const box=document.querySelector('[data-services=groups]');if(!box)return;
const bar=document.querySelector('[data-svc-filters]'),inp=document.querySelector('[data-svc-search]');let cur='all';
function draw(){box.innerHTML='';const q=inp.value.trim();let n=0;
SERVICE_GROUPS.forEach(g=>{if(cur!=='all'&&cur!==g.n)return;const its=g.items.filter(s=>!q||s.n.includes(q));if(!its.length)return;n+=its.length;
const sec=document.createElement('section'),h=document.createElement('h3'),grid=document.createElement('div');sec.className='svc-group';grid.className='grid centers';
h.innerHTML='<span class="gi"><i data-lucide="'+g.i+'" aria-hidden="true"></i></span>'+esc(g.n);its.forEach(s=>grid.append(btn(s,g)));sec.append(h,grid);box.append(sec)});
if(!n)box.innerHTML='<p>ไม่พบแผนกหรือคลินิกที่ตรงกับคำค้นหา</p>';icons()}
['all',...SERVICE_GROUPS.map(g=>g.n)].forEach(c=>{const b=document.createElement('button');b.type='button';b.className='chip';b.textContent=c==='all'?'ทั้งหมด':c;b.setAttribute('aria-pressed',c==='all');
b.addEventListener('click',()=>{cur=c;bar.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()});bar.append(b)});
inp.addEventListener('input',draw);draw();
})();

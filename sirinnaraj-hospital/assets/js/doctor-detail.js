/* Doctor profile page: renders DATA.doctors[?id=N] (hero card, info strip, education table) */
(function(){
const box=document.querySelector('[data-doctor]');if(!box)return;
const root=document.body.dataset.root||'',esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const d=DATA.doctors[Number(new URLSearchParams(location.search).get('id'))];
if(!d){box.innerHTML='<p>ไม่พบข้อมูลแพทย์ที่ต้องการ</p><a class="btn btn--primary" href="doctors.html">กลับไปค้นหาแพทย์</a>';return}
document.title=d.name+' '+d.cat+' | โรงพยาบาลสิรินนราษฎร์ ตรัง';
const cell=(ic,t,v)=>'<div class="dr-cell"><i data-lucide="'+ic+'" aria-hidden="true"></i><h3>'+t+'</h3><p>'+esc(v)+'</p></div>';
box.innerHTML='<section class="dr-hero"><div class="dr-main"><h1>'+esc(d.name)+'</h1><p class="dr-spec">'+esc(d.cat)+'</p><span class="badge">'+esc(d.sub)+'</span>'+(d.sample?'<p class="dr-sample">ข้อมูลตัวอย่าง รอแทนที่ด้วยข้อมูลจริง</p>':'')+
'<div class="dr-actions"><a class="btn btn--yellow" href="contact.html#form"><i data-lucide="zap" aria-hidden="true"></i>ทำนัดหมาย</a><button class="dr-link" type="button" data-print>พิมพ์ข้อมูล</button></div></div>'+
'<div class="dr-photo"><img src="'+root+'assets/images/'+esc(d.img)+'" alt="ภาพ '+esc(d.name)+' '+esc(d.cat)+'" width="240" height="240"></div></section>'+
'<section class="dr-strip" aria-label="ข้อมูลแพทย์">'+cell('building-2','ศูนย์และคลินิก',d.clinics.join(' , '))+cell('book-open','ความชำนาญเฉพาะทางสาขา',d.cat)+cell('layers','อนุสาขา',d.sub)+cell('languages','ภาษา',d.lang)+'</section>'+
'<section class="dr-edu"><h2 class="dr-edu-tab">การศึกษา</h2><div class="dr-edu-body">'+d.edu.map(e=>'<div class="dr-row"><b>'+esc(e.y)+'</b><strong>'+esc(e.d)+'</strong><span>'+esc(e.p)+'</span></div>').join('')+'</div></section>';
box.querySelector('[data-print]').addEventListener('click',()=>print());
if(window.lucide)lucide.createIcons();
})();

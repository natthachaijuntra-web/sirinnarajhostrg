/* Cookie consent (PDPA-style): banner + preferences dialog, choice stored in localStorage for 12 months.
   Public API for gating scripts:  CookieConsent.has('analytics')  ·  CookieConsent.onChange(fn)  ·  event 'cookieconsent:change' */
(function(){
const KEY='sirinnaraj-cookie-consent',VER=1,MAX=365*864e5,CATS=['preferences','analytics','marketing'];
const box=document.getElementById('cookie-notice'),dlg=document.getElementById('cookie-dialog');if(!box||!dlg)return;
let mem=null;const listeners=[];
function read(){try{const r=JSON.parse(localStorage.getItem(KEY)||'null');if(r)return r}catch(e){}return mem}
function current(){const r=read();return r&&r.v===VER&&r.c&&Date.now()-new Date(r.t)<MAX?r.c:null}
function save(c){
 const rec={v:VER,t:new Date().toISOString(),c:Object.assign({necessary:true,preferences:false,analytics:false,marketing:false},c)};
 mem=rec;try{localStorage.setItem(KEY,JSON.stringify(rec))}catch(e){}
 box.hidden=true;if(dlg.open)dlg.close();
 listeners.forEach(f=>f(rec.c));document.dispatchEvent(new CustomEvent('cookieconsent:change',{detail:rec.c}))}
const all=v=>Object.fromEntries(CATS.map(k=>[k,v]));
function openSettings(){const c=current()||{};CATS.forEach(k=>{dlg.querySelector('[data-cat='+k+']').checked=!!c[k]});dlg.showModal()}
document.addEventListener('click',e=>{
 const t=e.target.closest('[data-cookie],[data-cookie-save],[data-cookie-open],[data-cookie-close]');if(!t)return;
 if(t.matches('[data-cookie-open]'))return openSettings();
 if(t.matches('[data-cookie-close]'))return dlg.close();
 if(t.matches('[data-cookie-save]'))return save(Object.fromEntries(CATS.map(k=>[k,dlg.querySelector('[data-cat='+k+']').checked])));
 const a=t.dataset.cookie;if(a==='accept')save(all(true));else if(a==='reject')save(all(false));else if(a==='settings')openSettings()});
window.CookieConsent={get:current,has:k=>!!(current()&&current()[k]),open:openSettings,onChange:f=>listeners.push(f)};
if(!current())box.hidden=false;
})();

# Sirinnaraj Hospital Trang (HTML/CSS/Vanilla JS)

เปิดด้วย Local Web Server (เช่น VS Code Live Server) ที่ `index.html`

## โครงสร้าง
- `index.html`, `pages/*.html` (รวม `doctor-detail.html?id=N` หน้าข้อมูลแพทย์) : ทุกหน้ามี Header/Footer เหมือนกัน (ใช้ relative path)
- `assets/css` : `style.css` (CSS Variables, layout), `components.css`, `responsive.css`
- `assets/js` : `data.js` (ข้อมูล), `navigation.js`, `interactions.js`, `services.js`, `doctor-detail.js`, `slider.js`, `cookie.js`, `main.js`, `effects.js`
- `assets/images/` : แยกโฟลเดอร์ตามประเภท; ตอนนี้ทุกภาพใช้ `placeholder.svg` เปลี่ยน `src` ได้ทันที

## ต้องทำก่อนเปิดใช้งานจริง
1. แทนข้อความ `[ใส่ข้อความจริง...]` ใน HTML และรายการที่มี `sample:true` ใน `data.js` ด้วยข้อมูลจริง (ป้าย "ข้อมูลตัวอย่าง" จะหายเมื่อลบ `sample:true`)
2. ใส่ที่อยู่/เบอร์โทรใน Footer
3. เชื่อมแบบฟอร์มติดต่อกับระบบส่งจริง (ดู TODO ใน `interactions.js`)
4. Lucide Icons โหลดผ่าน CDN ต้องใช้อินเทอร์เน็ต
5. ลิงก์โซเชียลมีเดียยังไม่ได้ใส่ (ไม่มีบัญชีจริง) เพิ่มใน Footer ได้เมื่อพร้อม
6. แพทย์ในหน้า doctors สร้างจากรายชื่อคลินิกใน `SERVICE_GROUPS` (1 ตัวอย่างต่อคลินิก) แทนที่ด้วยแพทย์จริงใน `DATA.doctors`
7. คุกกี้: `assets/js/cookie.js` เก็บความยินยอมใน localStorage (หมดอายุ 12 เดือน) หน้า `cookie-policy.html` เป็นร่างต้นแบบ ให้ฝ่ายกฎหมาย/DPO ตรวจสอบ ก่อนเพิ่มสคริปต์สถิติหรือการตลาด ให้โหลดต่อเมื่อ `CookieConsent.has('analytics')` หรือ `CookieConsent.has('marketing')` เป็นจริง และฟังเหตุการณ์ `cookieconsent:change`
8. ฟอนต์เนื้อหาคือ Google Sans (โหลดจาก Google Fonts) มี IBM Plex Sans Thai Looped เป็นฟอนต์สำรอง ส่วนหัวข้อใช้ IBM Plex Sans Thai เปลี่ยนที่ `--font-body` / `--font-heading` ใน `style.css`

## เพิ่มหน้าใหม่
คัดลอกหน้าที่มีอยู่ ปรับ title/description/เนื้อหา แล้วเพิ่มลิงก์ใน nav และ `SITE_PAGES` ใน `data.js`

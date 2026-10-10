# Daylist React Demo

A task manager built with React and Vite. Includes adding and deleting tasks,
completion toggles, search, status filters, progress, and localStorage persistence.
The interface is in Thai and adapts to mobile screens.

## Run

This project uses Vite 6, which supports Node.js 18, 20, and 22 or newer.
For a new installation, use a currently supported Node.js LTS release.
Run these commands from the project directory:

```sh
npm install
npm run dev
```

Open the URL printed in the terminal, usually http://127.0.0.1:5173/.
If that port is in use, Vite selects another port. Press Control + C to stop.

## Production Build

```sh
npm run build
npm run preview
```

The build output is in `dist`. Preview serves that build locally; open the URL
printed in the terminal (usually http://127.0.0.1:4173/).

## Files

- `src/main.jsx`: components, task state, event handlers, and localStorage.
- `src/styles.css`: desktop and mobile styles.
- `index.html`: application entry point.

Data is stored in the current browser under `daylist-tasks-v1`. No backend is required.
Tasks are not shared between browsers or devices. Local development and the
deployed site have separate storage because they use different origins.

# สร้าง React App และ Deploy บน Render

คู่มือนี้ใช้กับ Daylist ใน repository นี้ หากมีโปรเจกต์อยู่ในเครื่องแล้ว
ให้ข้ามขั้นตอน 1–3 และเริ่มที่ขั้นตอน 4 หาก clone repository ที่มีโค้ดอยู่แล้ว
ไม่ต้องสร้าง Vite ใหม่ หากใช้บัญชีของตัวเอง ให้เปลี่ยนชื่อบัญชีและ URL repository
ในตัวอย่างให้ตรงกับของคุณ

## 1. สมัคร GitHub

1. เข้า https://github.com/signup
2. เลือก Continue with Google
3. เลือกบัญชี Google แล้วสมัครให้เรียบร้อย

บัญชีที่ใช้ในตัวอย่าง: `elizapedproject-maker`

## 2. สร้าง Repository

ใน GitHub เลือก New repository แล้วตั้งค่า:

- Repository name: `elizaped-web-demo`
- Visibility: Public
- ไม่ต้องเพิ่ม README, .gitignore หรือ License ในขั้นตอนนี้

กด Create repository

## 3. Clone ลงเครื่อง

เปิด Terminal แล้วรัน:

```bash
git clone https://github.com/elizapedproject-maker/elizaped-web-demo.git
cd elizaped-web-demo
```

ถ้าสร้าง repository ว่างใหม่แล้ว clone อาจแสดง `You appear to have cloned an empty repository`
แต่ถ้า clone repository ที่มี Daylist อยู่แล้ว ควรเห็น `package.json` และโฟลเดอร์ `src`

### กรณีติดข้อตกลง Xcode บน Mac

```bash
sudo xcodebuild -license
```

กด Enter เพื่ออ่านข้อตกลง และ Space เพื่อเลื่อนหน้า หากยอมรับ ให้พิมพ์ `agree` ตามคำแนะนำที่แสดง แล้วลอง clone อีกครั้ง

## 4. ติดตั้ง Dependencies

ต้องติดตั้ง Node.js รุ่น LTS ก่อน ตรวจสอบด้วย:

```bash
node -v
npm -v
```

สำหรับโปรเจกต์ Daylist ที่มี `package.json` แล้ว ให้รันในโฟลเดอร์โปรเจกต์:

```bash
npm install
```

### เฉพาะกรณีสร้าง React ใหม่จาก Repository ว่าง

ขั้นตอนนี้สำหรับโปรเจกต์ใหม่เท่านั้น อย่ารันในโฟลเดอร์ Daylist ที่มีโค้ดแล้ว
Vite รุ่นล่าสุดมีข้อกำหนด Node.js ต่างจาก Vite 6 ที่โปรเจกต์นี้ใช้
ตรวจสอบข้อกำหนดใน [คู่มือ Vite](https://vite.dev/guide/) ก่อนสร้างโปรเจกต์ใหม่

```bash
npm create vite@latest . -- --template react
npm install
```

จุด `.` หมายถึงสร้างโปรเจกต์ในโฟลเดอร์ปัจจุบัน ตัว template ที่ได้ยังไม่ใช่ Daylist

## 5. แก้ไข React Demo

ไฟล์ของ Daylist ใน repository นี้คือ:

- `src/main.jsx`: component `App`, รายการงาน, การค้นหา, ตัวกรอง และการบันทึกข้อมูล
- `src/styles.css`: รูปแบบหน้าเว็บและ responsive layout
- `index.html`: ชื่อหน้าเว็บและจุดเริ่มต้นโหลด React

แก้ไขไฟล์เหล่านี้ตามต้องการ โปรเจกต์นี้ไม่มี `src/App.jsx` หรือ `src/index.css`

## 6. ทดสอบในเครื่อง

```bash
npm run dev
```

เปิด URL ที่ Terminal แสดง เช่น http://127.0.0.1:5173/ ถ้าพอร์ตนี้ถูกใช้อยู่ Vite จะเลือกพอร์ตอื่น
ทดสอบเพิ่มงาน ทำเครื่องหมายเสร็จ ค้นหา กรองสถานะ และลบงาน
ลอง refresh หน้าเว็บเพื่อตรวจว่ารายการงานยังอยู่

กด Control + C เพื่อหยุด จากนั้นตรวจสอบการ build:

```bash
npm run build
```

เมื่อสำเร็จจะได้โฟลเดอร์ `dist`

## 7. Commit และ Push

ตรวจสอบว่า `.gitignore` มี `node_modules` และ `dist` และไม่เพิ่มไฟล์ `.env` ที่มีข้อมูลลับ

รันทีละคำสั่ง:

```bash
git status
git add .
git commit -m "Create React demo"
git branch -M main
git push -u origin main
```

### กรณี Authentication Failed

GitHub ไม่รองรับการใช้รหัสผ่านบัญชีสำหรับ Git ผ่าน HTTPS ให้ใช้ GitHub CLI ล็อกอินผ่านบราวเซอร์:

คำสั่ง `brew install gh` สำหรับ macOS ที่ติดตั้ง Homebrew แล้ว หากใช้ระบบอื่น
ให้ติดตั้งตาม [คู่มือ GitHub CLI](https://cli.github.com/)

```bash
brew install gh
gh auth login --hostname github.com --git-protocol https --web
```

ทำตามขั้นตอนที่แสดง และตรวจว่าบัญชีในบราวเซอร์เป็น `elizapedproject-maker`

จากนั้นรัน:

```bash
gh auth setup-git
gh auth status
git push -u origin main
```

ไม่ต้อง commit ใหม่ หาก commit ก่อนหน้านี้สำเร็จแล้ว

## 8. ตรวจสอบโค้ดบน GitHub

เปิด:

https://github.com/elizapedproject-maker/elizaped-web-demo

ต้องเห็นไฟล์และโฟลเดอร์ เช่น:

- src
- package.json
- package-lock.json
- index.html
- .gitignore

โปรเจกต์นี้ใช้ค่าเริ่มต้นของ Vite จึงไม่มี `vite.config.js` และไม่จำเป็นต้องสร้างไฟล์นี้เพื่อ deploy

## 9. สร้าง Static Site บน Render

1. เข้า https://dashboard.render.com/
2. เลือก New → Static Site
3. เลือก Git Provider → GitHub
4. เชื่อมบัญชี GitHub และอนุญาตให้เข้าถึง repository
5. เลือก `elizaped-web-demo`

ตั้งค่าดังนี้:

| ช่อง                  | ค่า                                  |
| --------------------- | ------------------------------------ |
| Name                  | elizaped-web-demo หรือชื่อที่ยังว่าง |
| Branch                | main                                 |
| Root Directory        | เว้นว่าง                             |
| Build Command         | npm ci && npm run build              |
| Publish Directory     | dist                                 |
| Environment Variables | เว้นว่างสำหรับตัวอย่างนี้            |

Static Site ไม่ต้องเลือก Region และไม่ต้องกรอก Start Command

`npm ci` ใช้เวอร์ชันจาก `package-lock.json` จึงต้อง commit ไฟล์นี้ด้วย
หากต้องกำหนดเวอร์ชัน Node.js ให้ตรงกับเครื่องที่พัฒนา ให้ตั้ง `NODE_VERSION`
ตาม [คู่มือ Render](https://render.com/docs/node-version)

กด Create Static Site / Deploy Static Site

## 10. เปิดเว็บที่ Deploy แล้ว

รอจนสถานะเป็น Live แล้วเปิด URL ที่ Render แสดง

ทดสอบว่าหน้า Daylist เปิดได้ เพิ่มงานและทำเครื่องหมายเสร็จได้
รายการงานจาก localhost จะไม่ตามมาที่เว็บ deploy เพราะ localStorage แยกตาม origin

## 11. อัปเดตเว็บครั้งต่อไป

หลังแก้โค้ดและทดสอบแล้ว:

```bash
git add .
git commit -m "Update homepage"
git push
```

เมื่อเปิด Auto-Deploy บน Render ไว้ การ push ไปยัง branch `main` จะทำให้ Render build และ deploy เวอร์ชันใหม่

## หมายเหตุ

- คู่มือนี้ใช้ React + Vite จึงกำหนด Publish Directory เป็น `dist`
- ใช้ `&&` เพื่อให้ build ทำงานต่อเมื่อ install สำเร็จ
- ตรวจสอบราคาและโควตาปัจจุบันที่ [Render Pricing](https://render.com/pricing)
- ตัวอย่างนี้ยังไม่มี Backend หรือ MariaDB
- ห้ามใส่รหัสผ่านฐานข้อมูลหรือข้อมูลลับในโค้ด React เพราะผู้ใช้เว็บสามารถเข้าถึงโค้ดฝั่งหน้าเว็บได้

## เอกสารอ้างอิง

- [Render Static Sites](https://render.com/docs/static-sites)
- [Render: Deploy a Vite static site](https://render.com/tutorials/web-service-vs-static-site/static-sites)
- [GitHub CLI: gh auth login](https://cli.github.com/manual/gh_auth_login)

# Huong dan chay demo voi MongoDB

## 1. Chuan bi MongoDB

Bat MongoDB local tren may:

```powershell
mongod
```

Mac dinh backend dung database:

```text
mongodb://127.0.0.1:27017/portfolio_career_demo
```

Neu muon doi connection string, copy `.env.example` thanh `.env` va sua `MONGODB_URI`.

## 2. Nap du lieu mau

```powershell
npm run seed
```

Seed se tao cac collection:

- `majors`: 3 nganh lon Dev, MKT, Design
- `challenges`: bai tap mau theo tung nganh/chuyen nganh
- `submissionrules`: quy tac nop bai rieng cho Dev, MKT, Design
- `userprofiles`: tai khoan demo `student@portfolio.vn / 123456`
- `submissions`: ban nhap va bai da nop mau
- `mentorfeedbacks`: gop y mentor mau

## 3. Chay web kem API

```powershell
npm run dev:full
```

Frontend:

```text
http://127.0.0.1:5173/
```

Backend API:

```text
http://127.0.0.1:4000/api/health
http://127.0.0.1:4000/api/bootstrap
```

## 4. Che do fallback

Neu MongoDB hoac API chua bat, web van hien du lieu local cu de khong bi trang man hinh khi demo.
Khi API ket noi thanh cong, trang Ho so se hien nguon du lieu la `MongoDB`.

## 5. Tai khoan demo

Student:

```text
student@portfolio.vn / 123456
```

Admin:

```text
admin@portfolio.vn / admin123
```

Mentor:

```text
mentor@portfolio.vn / mentor123
```

## 6. Nghiep vu co the demo

- Student chon nganh, xem career map, them/xoa/sap xep vi tri trong lo trinh.
- Bam `Luu` tai career map de ghi lo trinh vao MongoDB.
- Vao Challenge Hub, tham gia challenge, luu ban nhap hoac nop bai.
- Trang Ho so hien portfolio, lo trinh dang theo va lich su nop bai.
- Trang Admin xem thong ke, them/sua/xoa challenge, xem user va lich su nop bai.
- Trang Mentor xem pending submissions, active students, accept/reject va tao feedback.
- Backend dung session authentication, bcrypt password hashing, register/login/logout/change password/forgot password demo.
- API challenge ho tro search/filter/sort/pagination.

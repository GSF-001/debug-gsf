📄 README.md

# 🚀 GSF Platform (Admin Identity + Room System)

Platform ini adalah sistem backend + frontend berbasis Next.js untuk:
- Login user
- Verifikasi admin berbasis PII (PII matching system)
- Role system (SUPER_ADMIN, GURU, MEMBER)
- Room system (guru bisa bikin room private via invite code)
- Audit log system (tracking aktivitas user)

---

# 🧱 Tech Stack

- Next.js (App Router)
- Node.js API Routes
- Express-style logic (adapted)
- Redis (rate limit + anti brute force)
- PostgreSQL (via Sequelize)
- Socket.IO (real-time audit stream)

---

# 🔐 Features

## 1. Login System
- User login via API
- Role auto detect (SUPER_ADMIN / USER)
- PII verification system

## 2. Admin Verification (PII Match)
- Matching data user (NIK, name, birth, etc)
- Uses secure hashing with pepper system
- Timing-safe comparison

## 3. Security Layer
- Anti brute-force (Redis counter)
- Auto ban system
- Fail attempt tracking

## 4. Room System (Guru Feature)
- Guru can create private rooms
- Invite code system
- Member join via code
- Hidden room (not public listed)

## 5. Audit System
- Logs all login attempts
- Logs role changes
- Real-time dashboard via Socket.IO

---

# 📁 Project Structure

/app /api /login route.js

/backend /utils adminIdentityVerify.js secretManager.js autoBan.js auditLogger.js

/models AdminIdentity.js AdminAudit.js

/realtime auditStream.js

---

# ⚙️ Environment Variables

Copy `.env.example` → `.env.local`

```env
DATABASE_URL=postgresql://user:pass@host:port/db
REDIS_URL=your_redis_url

PEPPER_PRIMARY=your_primary_pepper
PEPPER_FALLBACK=your_fallback_pepper

NODE_ENV=production


---

🚀 Run Project

Install dependencies

npm install

Run development

npm run dev

Build production

npm run build
npm start


---

☁️ Deploy to Vercel

1. Push ke GitHub


2. Connect repo ke Vercel


3. Set Environment Variables di Vercel Dashboard


4. Deploy




---

🔐 Security Notes

Jangan expose PEPPER key

Gunakan Redis external (Upstash recommended)

Jangan simpan PII mentah tanpa hash

Audit log wajib aktif di production



---

📊 Future Upgrade

Multi-server sync (Kafka/Redis stream)

Encrypted identity vault (AES-256)

Role hierarchy system (OWNER / GURU / MEMBER)

Advanced room moderation system



const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
const DEFAULT_PASSWORD = 'scalpit2024';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
if (ADMIN_PASSWORD === DEFAULT_PASSWORD) {
  console.warn('⚠️  ADMIN_PASSWORD 환경변수가 설정되지 않아 기본 비밀번호를 사용 중입니다. 반드시 변경하세요.');
}

let pool = null;
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
}

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'submissions.json');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function readJson() {
  if (!fs.existsSync(DATA_FILE)) return [];
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch { return []; }
}
function writeJson(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

async function initDB() {
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS submissions (
      id BIGINT PRIMARY KEY,
      submitted_at TIMESTAMPTZ DEFAULT NOW(),
      data JSONB NOT NULL
    );
  `);
}

async function getSubmissions() {
  if (pool) {
    const res = await pool.query(
      'SELECT id, submitted_at as "submittedAt", data FROM submissions ORDER BY id ASC'
    );
    // 저장된 data에 id가 섞여 있어도 DB의 id가 우선하도록 순서 고정
    return res.rows.map(r => ({ ...r.data, id: Number(r.id), submittedAt: r.submittedAt }));
  }
  return readJson();
}

async function saveSubmission(entry) {
  if (pool) {
    const { id, submittedAt, ...data } = entry;
    await pool.query(
      'INSERT INTO submissions (id, submitted_at, data) VALUES ($1, $2, $3)',
      [id, submittedAt, JSON.stringify(data)]
    );
  } else {
    const list = readJson();
    list.push(entry);
    writeJson(list);
  }
}

async function deleteSubmission(id) {
  if (pool) {
    await pool.query('DELETE FROM submissions WHERE id=$1', [id]);
  } else {
    writeJson(readJson().filter(s => s.id !== id));
  }
}

// 동시 제출 시에도 PK가 겹치지 않도록 ms 타임스탬프 × 1000 + 시퀀스 (Number.MAX_SAFE_INTEGER 이내)
let lastId = 0;
function nextId() {
  const base = Date.now() * 1000;
  lastId = Math.max(base, lastId + 1);
  return lastId;
}

// ── 입력값 정리: 허용된 필드만, 길이 제한 ──
const STRING_FIELDS = {
  lang: 5, reservationType: 100, consultationType: 100,
  nameBirth: 80, name: 40, phone: 30, address: 100,
  visitSource: 60, permFrequency: 200, shampooFrequency: 100,
  hairLossGenetic: 20, videoConsent: 20,
};
const ARRAY_FIELDS = { treatmentHistory: 10, scalpConcerns: 15, desiredServices: 10 };

function sanitize(body) {
  const out = {};
  for (const [key, max] of Object.entries(STRING_FIELDS)) {
    if (typeof body[key] === 'string') out[key] = body[key].trim().slice(0, max);
  }
  for (const [key, max] of Object.entries(ARRAY_FIELDS)) {
    if (Array.isArray(body[key])) {
      out[key] = body[key].filter(v => typeof v === 'string').slice(0, max).map(v => v.trim().slice(0, 100));
    }
  }
  out.marketingConsent = body.marketingConsent === true;
  out.privacyConsent = body.privacyConsent === true;
  return out;
}

// ── 간단한 IP 기반 요청 제한 (외부 의존성 없이) ──
function rateLimit({ windowMs, max }) {
  const hits = new Map();
  setInterval(() => {
    const now = Date.now();
    for (const [ip, h] of hits) if (now - h.start > windowMs) hits.delete(ip);
  }, windowMs).unref();
  return (req, res, next) => {
    const now = Date.now();
    const h = hits.get(req.ip);
    if (!h || now - h.start > windowMs) { hits.set(req.ip, { start: now, count: 1 }); return next(); }
    if (++h.count > max) return res.status(429).json({ success: false, message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' });
    next();
  };
}

function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

const adminLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 60 });
function requireAdmin(req, res, next) {
  if (!safeEqual(req.headers['x-admin-password'] || '', ADMIN_PASSWORD))
    return res.status(401).json({ success: false, message: '비밀번호가 올바르지 않습니다.' });
  next();
}

app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  if (req.path.startsWith('/admin') || req.path.startsWith('/api/submissions'))
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  next();
});
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

app.post('/api/submit', rateLimit({ windowMs: 10 * 60 * 1000, max: 10 }), async (req, res) => {
  try {
    const data = sanitize(req.body || {});
    if (!data.name || !data.phone)
      return res.status(400).json({ success: false, message: '필수 항목을 입력해주세요.' });
    if (!data.privacyConsent)
      return res.status(400).json({ success: false, message: '개인정보 수집·이용 동의가 필요합니다.' });
    await saveSubmission({ id: nextId(), submittedAt: new Date().toISOString(), ...data });
    res.json({ success: true });
  } catch (err) {
    console.error('제출 저장 실패:', err);
    res.status(500).json({ success: false, message: '저장 중 오류가 발생했습니다.' });
  }
});

app.get('/api/submissions', adminLimiter, requireAdmin, async (req, res) => {
  try {
    const data = await getSubmissions();
    res.setHeader('Cache-Control', 'no-store');
    res.json({ success: true, data, total: data.length });
  } catch (err) {
    console.error('조회 실패:', err);
    res.status(500).json({ success: false, message: '데이터를 불러오지 못했습니다.' });
  }
});

app.delete('/api/submissions/:id', adminLimiter, requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id)) return res.status(400).json({ success: false });
    await deleteSubmission(id);
    res.json({ success: true });
  } catch (err) {
    console.error('삭제 실패:', err);
    res.status(500).json({ success: false });
  }
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Scálpit 서버 실행 중: http://localhost:${PORT}`);
    console.log(`📦 데이터 저장: ${pool ? 'PostgreSQL' : 'JSON 파일'}`);
  });
}).catch(err => {
  console.error('DB 초기화 실패, JSON 파일로 대체:', err.message);
  pool = null;
  app.listen(PORT, () => console.log(`✅ Scálpit 서버 실행 중 (JSON 모드): http://localhost:${PORT}`));
});

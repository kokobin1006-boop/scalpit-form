const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'scalpit2024';

let pool = null;
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
}

const fs = require('fs');
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
  await pool.query(`
    CREATE TABLE IF NOT EXISTS applications (
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
    return res.rows.map(r => ({ id: r.id, submittedAt: r.submittedAt, ...r.data }));
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

/* ── 채용 지원서 (recruit.html) ── */
const APP_FILE = path.join(DATA_DIR, 'applications.json');
const APP_STATUSES = ['신규', '연락완료', '면접예정', '합격', '불합격', '보류'];

function readApps() {
  if (!fs.existsSync(APP_FILE)) return [];
  try { return JSON.parse(fs.readFileSync(APP_FILE, 'utf8')); } catch { return []; }
}
function writeApps(data) {
  fs.writeFileSync(APP_FILE, JSON.stringify(data, null, 2), 'utf8');
}

async function getApplications() {
  if (pool) {
    const res = await pool.query(
      'SELECT id, submitted_at as "submittedAt", data FROM applications ORDER BY id ASC'
    );
    return res.rows.map(r => ({ ...r.data, id: Number(r.id), submittedAt: r.submittedAt }));
  }
  return readApps();
}

async function saveApplication(entry) {
  if (pool) {
    const { id, submittedAt, ...data } = entry;
    await pool.query(
      'INSERT INTO applications (id, submitted_at, data) VALUES ($1, $2, $3)',
      [id, submittedAt, JSON.stringify(data)]
    );
  } else {
    const list = readApps();
    list.push(entry);
    writeApps(list);
  }
}

async function updateApplication(id, patch) {
  if (pool) {
    const res = await pool.query(
      'UPDATE applications SET data = data || $2::jsonb WHERE id = $1',
      [id, JSON.stringify(patch)]
    );
    return res.rowCount > 0;
  }
  const list = readApps();
  const target = list.find(a => a.id === id);
  if (!target) return false;
  Object.assign(target, patch);
  writeApps(list);
  return true;
}

async function deleteApplication(id) {
  if (pool) {
    await pool.query('DELETE FROM applications WHERE id=$1', [id]);
  } else {
    writeApps(readApps().filter(a => a.id !== id));
  }
}

async function hasRecentApplication(phone) {
  if (pool) {
    const res = await pool.query(
      `SELECT 1 FROM applications WHERE data->>'phone' = $1 AND submitted_at > NOW() - INTERVAL '10 minutes' LIMIT 1`,
      [phone]
    );
    return res.rowCount > 0;
  }
  const since = Date.now() - 10 * 60 * 1000;
  return readApps().some(a => a.phone === phone && new Date(a.submittedAt).getTime() > since);
}

const clean = (v, max) => String(v ?? '').trim().slice(0, max);
const cleanList = (v, maxItems = 10, maxLen = 40) =>
  (Array.isArray(v) ? v : []).slice(0, maxItems).map(x => clean(x, maxLen)).filter(Boolean);
const isAdmin = req => req.headers['x-admin-password'] === ADMIN_PASSWORD;

app.use(express.json());
app.get('/recruit', (req, res) => res.sendFile(path.join(__dirname, 'public', 'recruit.html')));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/submit', async (req, res) => {
  const body = req.body;
  if (!body.name || !body.phone)
    return res.status(400).json({ success: false, message: '필수 항목을 입력해주세요.' });
  const entry = { id: Date.now(), submittedAt: new Date().toISOString(), ...body };
  await saveSubmission(entry);
  res.json({ success: true });
});

app.get('/api/submissions', async (req, res) => {
  if (req.headers['x-admin-password'] !== ADMIN_PASSWORD)
    return res.status(401).json({ success: false, message: '비밀번호가 올바르지 않습니다.' });
  const data = await getSubmissions();
  res.json({ success: true, data, total: data.length });
});

app.delete('/api/submissions/:id', async (req, res) => {
  if (req.headers['x-admin-password'] !== ADMIN_PASSWORD)
    return res.status(401).json({ success: false });
  await deleteSubmission(Number(req.params.id));
  res.json({ success: true });
});

app.post('/api/apply', async (req, res) => {
  const b = req.body || {};
  if (b.website) return res.json({ success: true }); // 허니팟: 봇은 성공한 것처럼 돌려보내고 저장하지 않음

  let phone = clean(b.phone, 20).replace(/\D/g, '');
  if (phone.startsWith('82') && phone.length >= 11) phone = '0' + phone.slice(2);
  const entry = {
    id: Date.now(),
    submittedAt: new Date().toISOString(),
    name: clean(b.name, 40),
    phone,
    workTypes: cleanList(b.workTypes),
    branches: cleanList(b.branches),
    role: clean(b.role, 40),
    experience: clean(b.experience, 40),
    fields: cleanList(b.fields),
    license: clean(b.license, 120),
    startDate: clean(b.startDate, 40),
    motivation: clean(b.motivation, 600),
    source: clean(b.source, 40),
    utm: {
      source: clean(b.utm && b.utm.source, 60),
      medium: clean(b.utm && b.utm.medium, 60),
      campaign: clean(b.utm && b.utm.campaign, 60),
      referrer: clean(b.utm && b.utm.referrer, 100),
    },
    privacyConsent: b.privacyConsent === true,
    talentPool: b.talentPool === true,
    status: '신규',
    memo: '',
  };

  if (!entry.name || !/^01[016789]\d{7,8}$/.test(entry.phone) || !entry.workTypes.length ||
      !entry.branches.length || !entry.role || !entry.experience || !entry.startDate || !entry.privacyConsent)
    return res.status(400).json({ success: false, message: '필수 항목을 확인해주세요.' });

  try {
    if (await hasRecentApplication(entry.phone)) return res.json({ success: true }); // 더블 클릭·재전송 방지
    await saveApplication(entry);
    res.json({ success: true });
  } catch (err) {
    console.error('지원서 저장 실패:', err.message);
    res.status(500).json({ success: false, message: '접수 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.' });
  }
});

app.get('/api/applications', async (req, res) => {
  if (!isAdmin(req)) return res.status(401).json({ success: false, message: '비밀번호가 올바르지 않습니다.' });
  const data = await getApplications();
  res.json({ success: true, data, total: data.length });
});

app.patch('/api/applications/:id', async (req, res) => {
  if (!isAdmin(req)) return res.status(401).json({ success: false });
  const patch = {};
  if (req.body.status !== undefined) {
    if (!APP_STATUSES.includes(req.body.status)) return res.status(400).json({ success: false, message: '잘못된 상태값입니다.' });
    patch.status = req.body.status;
  }
  if (req.body.memo !== undefined) patch.memo = clean(req.body.memo, 1000);
  if (!Object.keys(patch).length) return res.status(400).json({ success: false });
  const ok = await updateApplication(Number(req.params.id), patch);
  res.status(ok ? 200 : 404).json({ success: ok });
});

app.delete('/api/applications/:id', async (req, res) => {
  if (!isAdmin(req)) return res.status(401).json({ success: false });
  await deleteApplication(Number(req.params.id));
  res.json({ success: true });
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

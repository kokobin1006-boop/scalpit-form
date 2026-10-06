// ─────────────────────────────────────────────────────────────────────────────
// 가맹 조건·창업 비용 — 이 파일 하나가 원본입니다.
//
// 지금 값은 설득 구조와 화면 검토용 "시안"입니다. 실제 확정 조건(정보공개서 기준)으로
// 숫자와 문구를 바꾼 뒤 TERMS_VERIFIED 를 true 로 바꾸면, 화면의 "시안" 표시가 모두 사라집니다.
// 금액 단위: 만원, 부가세 별도, 점포 보증금·권리금 제외.
// ─────────────────────────────────────────────────────────────────────────────
export const TERMS_VERIFIED = false;

export type CostLine = { label: string; note: string; amount: number };
export type StartupModel = {
  key: string; name: string; tier: string; size: string; reference: string; lines: CostLine[];
};

const line = (label: string, amount: number, note: string): CostLine => ({ label, amount, note });

export const startupModels: StartupModel[] = [
  { key: "1억", name: "1억 모델", tier: "컴팩트", size: "20평 내외", reference: "동탄형 운영 구조 참고", lines: [
    line("가맹비", 1000, "브랜드·운영 노하우 사용권"), line("교육비", 500, "오픈 전 4주 교육 과정"),
    line("인테리어·공사", 4500, "설계·시공·간판 포함"), line("장비·집기", 2000, "베드·촬영 장비·비품"),
    line("초기 운영자금", 2000, "오픈 후 첫 몇 달의 고정비") ] },
  { key: "2억", name: "2억 모델", tier: "스탠더드", size: "30평 내외", reference: "천안형 운영 구조 참고", lines: [
    line("가맹비", 1500, "브랜드·운영 노하우 사용권"), line("교육비", 500, "오픈 전 4주 교육 과정"),
    line("인테리어·공사", 9500, "설계·시공·간판 포함"), line("장비·집기", 4000, "베드·촬영 장비·비품"),
    line("초기 운영자금", 4500, "오픈 후 첫 몇 달의 고정비") ] },
  { key: "3억", name: "3억 모델", tier: "플래그십", size: "50평 내외", reference: "광교형 운영 구조 참고", lines: [
    line("가맹비", 2000, "브랜드·운영 노하우 사용권"), line("교육비", 500, "오픈 전 4주 교육 과정"),
    line("인테리어·공사", 14500, "설계·시공·간판 포함"), line("장비·집기", 6000, "베드·촬영 장비·비품"),
    line("초기 운영자금", 7000, "오픈 후 첫 몇 달의 고정비") ] },
  { key: "5억", name: "5억 모델", tier: "시그니처", size: "65평 이상", reference: "압구정형 운영 구조 참고", lines: [
    line("가맹비", 3000, "브랜드·운영 노하우 사용권"), line("교육비", 500, "오픈 전 4주 교육 과정"),
    line("인테리어·공사", 25000, "설계·시공·간판 포함"), line("장비·집기", 9500, "베드·촬영 장비·비품"),
    line("초기 운영자금", 12000, "오픈 후 첫 몇 달의 고정비") ] },
];

export const modelTotal = (model: StartupModel) => model.lines.reduce((sum, item) => sum + item.amount, 0);

// 매달 나가는 돈과 계약 조건. 계산 가정(lib/franchise-economics.ts)의 로열티·마케팅 비율과 맞춰 둡니다.
export const contractTerms = [
  { label: "로열티", value: "월 매출의 10%", note: "브랜드 사용·운영 지원 대가. 손익 계산에도 같은 비율을 적용했습니다." },
  { label: "마케팅 분담금", value: "월 매출의 10%", note: "콘텐츠·검색·광고 실무는 본사가 실행합니다. 광고 매체비 포함 범위는 계약서에 명시합니다." },
  { label: "계약 기간", value: "5년 · 갱신 가능", note: "갱신 조건과 거절 사유는 계약서에 미리 적습니다." },
  { label: "영업지역 보호", value: "반경 1km 내 신규 출점 제한", note: "같은 상권에서 본사가 가맹점끼리 경쟁시키지 않습니다." },
  { label: "양도·양수", value: "본사 승인 후 가능", note: "사정이 생기면 매장을 넘길 수 있습니다. 절차와 비용은 계약서로 확인합니다." },
  { label: "오픈까지", value: "계약 후 약 10~12주", note: "점포 확보 이후 설계·공사·채용·4주 교육을 병행한 일정 기준입니다." },
] as const;

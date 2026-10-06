import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { inquiryDb } from "@/lib/inquiries";
const input = z.object({
  requestId: z.string().uuid(), name: z.string().trim().min(1).max(40),
  phone: z.string().trim().regex(/^[0-9+()\s-]{9,20}$/).transform(v => v.replace(/[^0-9]/g, "")).refine(v => v.length >= 9 && v.length <= 15),
  region: z.string().trim().min(1).max(80), model: z.enum(["1억 모델", "2억 모델", "3억 모델", "5억 모델", "모델 상담 희망"]),
  experience: z.enum(["", "처음 창업합니다", "뷰티 업종 경력이 있습니다", "기존 매장을 운영 중입니다", "기타"]).default(""),
  message: z.string().trim().max(1000).default(""), website: z.string().max(200).optional(), consent: z.literal(true),
});
export async function POST(request: NextRequest) {
  const headers = { "Cache-Control": "no-store" };
  const origin = request.headers.get("origin"); const fetchSite = request.headers.get("sec-fetch-site");
  if ((origin && origin !== new URL(request.url).origin) || (fetchSite && !["same-origin", "none"].includes(fetchSite))) return NextResponse.json({ error: "현재 페이지에서 다시 신청해 주세요." }, { status: 403, headers });
  if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "지원하지 않는 요청입니다." }, { status: 415, headers });
  const raw = await request.text();
  if (raw.length > 8000) return NextResponse.json({ error: "입력 내용이 너무 깁니다." }, { status: 413, headers });
  let payload; try { payload = JSON.parse(raw); } catch { return NextResponse.json({ error: "입력 내용을 확인해 주세요." }, { status: 400, headers }); }
  const parsed = input.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: "이름, 연락처, 희망 지역, 창업모델과 동의 여부를 확인해 주세요." }, { status: 400, headers });
  const data = parsed.data;
  if (data.website) return NextResponse.json({ error: "신청을 접수할 수 없습니다." }, { status: 400, headers });
  try {
    const db = inquiryDb(); const now = new Date().toISOString(); const ref = "SC-" + data.requestId.replaceAll("-", "").slice(0,10).toUpperCase();
    await db.prepare("INSERT INTO inquiries (id, reference, name, phone, region, model, experience, message, status, consent_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?) ON CONFLICT(id) DO NOTHING").bind(data.requestId, ref, data.name, data.phone, data.region, data.model, data.experience, data.message, now, now).run();
    return NextResponse.json({ ok: true, reference: ref }, { status: 201, headers });
  } catch (error) {
    console.error("Inquiry insert failed", error instanceof Error ? error.message : "unknown database error");
    return NextResponse.json({ error: "일시적으로 접수가 어렵습니다. 입력 내용은 유지되니 잠시 후 다시 시도해 주세요." }, { status: 503, headers });
  }
}

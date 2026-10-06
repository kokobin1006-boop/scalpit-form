import { env } from "cloudflare:workers";
export function inquiryDb(): D1Database {
  if (!env.DB) throw new Error("Inquiry database is unavailable");
  return env.DB;
}

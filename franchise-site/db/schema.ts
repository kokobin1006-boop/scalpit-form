import { sqliteTable, text } from "drizzle-orm/sqlite-core";
export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(), reference: text("reference").notNull(),
  name: text("name").notNull(), phone: text("phone").notNull(), region: text("region").notNull(),
  model: text("model").notNull(), experience: text("experience").notNull().default(""),
  message: text("message").notNull().default(""), status: text("status").notNull().default("new"),
  consentAt: text("consent_at").notNull(), createdAt: text("created_at").notNull(),
});

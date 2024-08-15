const { text, varchar, serial } = require("drizzle-orm/pg-core");
const { pgTable } = require("drizzle-orm/pg-core");

export const jsonForms = pgTable("jsonForms", {
  id: serial("id").primaryKey(),
  jsonform: text("jsonform").notNull(),
  theme: varchar("theme", 255),
  background: varchar("background", 255),
  style: varchar("style", 255),
  createdBy: varchar("createdBy", 255).notNull(),
  createdAt: varchar("createdAt", 255).notNull(),
});

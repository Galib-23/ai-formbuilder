const { text, varchar, serial } = require("drizzle-orm/pg-core");
const { pgTable } = require("drizzle-orm/pg-core");

export const jsonForms = pgTable("jsonForms", {
  id: serial("id").primaryKey(),
  jsonform: text("jsonform").notNull(),
  createdBy: varchar("createdBy", 255).notNull(),
  createdAt: varchar("createdAt", 255).notNull(),
});

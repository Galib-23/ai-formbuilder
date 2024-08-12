const { integer, text, varchar, timestamp } = require("drizzle-orm/pg-core");
const { pgTable } = require("drizzle-orm/pg-core");

export const jsonForms = pgTable('jsonForms', {
    id: integer('id').primaryKey(),
    jsonform: text('jsonform').notNull(), 
    createdBy: varchar('createdBy', 255).notNull(),
    createdAt: timestamp('createdAt').notNull(),
});

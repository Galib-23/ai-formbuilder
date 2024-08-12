import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://formbuilderDB_owner:EX0TRNMLfH1P@ep-spring-wind-a54gkjmt.us-east-2.aws.neon.tech/formbuilderDB?sslmode=require",
  },
});

import { createEnv } from "convex-env";
import { v } from "convex/values";

export const env = createEnv({
  CONVEX_SITE_URL: v.string(),
  ENVIRONMENT: v.string(),
  SITE_URL: v.string(),
  BETTER_AUTH_SECRET: v.string(),
  GOOGLE_CLIENT_ID: v.string(),
  GOOGLE_CLIENT_SECRET: v.string(),
});

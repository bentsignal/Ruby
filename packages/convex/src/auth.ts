import type { GenericCtx } from "@convex-dev/better-auth";
import { expo } from "@better-auth/expo";
import { createClient } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";
import { oAuthProxy } from "better-auth/plugins";

import type { DataModel } from "./_generated/dataModel";
import { components } from "./_generated/api";
import authConfig from "./auth.config";
import { env } from "./convex.env";

export const authComponent = createClient<DataModel>(components.betterAuth);

const devOrigins = ["expo://*/*", "http://localhost:3000"];

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    trustedOrigins: [
      "https://*.ruby.travel",
      "ruby://",
      ...(process.env.NODE_ENV === "development" ? devOrigins : []),
    ],
    baseURL: env.SITE_URL,
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: false,
    },
    socialProviders: {
      google: {
        prompt: "select_account",
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        redirectURI: "https://www.ruby.travel/api/auth/callback/google",
      },
    },
    plugins: [
      expo(),
      convex({ authConfig }),
      oAuthProxy({ productionURL: "https://www.ruby.travel" }),
    ],
  });
};

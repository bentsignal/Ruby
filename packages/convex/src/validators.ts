import { v } from "convex/values";

const vProfile = v.object({
  userId: v.string(),
  name: v.string(),
  username: v.string(),
  image: v.optional(v.string()),
});

export { vProfile };

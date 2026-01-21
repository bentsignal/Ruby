import { v } from "convex/values";

import type { Doc } from "./_generated/dataModel";
import type { PublicProfile } from "./types";
import { internalMutation, query } from "./_generated/server";
import { getFileURL } from "./uploadthing";
import { authedQuery } from "./utils";

export const getPFP = (profile: Doc<"profiles">): string | undefined =>
  profile.imageKey ? getFileURL(profile.imageKey) : undefined;

export const DeletedProfile = {
  username: "deleted_user",
  name: "Deleted User",
  image: undefined,
} satisfies PublicProfile;

export const getPublicProfile = (profile: Doc<"profiles">): PublicProfile => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userId, _creationTime, ...publicProfile } = profile;
  const image = getPFP(profile);
  return {
    username: publicProfile.username,
    name: publicProfile.name,
    image,
  };
};

export const get = query({
  args: {
    profileId: v.id("profiles"),
  },
  handler: async (ctx, args): Promise<PublicProfile | null> => {
    const profile = await ctx.db.get(args.profileId);
    if (!profile) {
      return null;
    }
    return getPublicProfile(profile);
  },
});

export const getMine = authedQuery({
  handler: async (ctx): Promise<PublicProfile | null> => {
    const myProfile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", ctx.user.subject))
      .first();
    if (!myProfile) {
      return null;
    }
    return {
      username: myProfile.username,
      name: myProfile.name,
      image: getPFP(myProfile),
    };
  },
});

export const updatePFP = internalMutation({
  args: {
    profileId: v.id("profiles"),
    imageKey: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.profileId, {
      imageKey: args.imageKey,
    });
  },
});

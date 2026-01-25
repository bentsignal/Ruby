import { v } from "convex/values";

import type { Doc } from "./_generated/dataModel";
import type { Relationship, UIProfile } from "./types";
import { internalMutation } from "./_generated/server";
import { getRelationshipHelper } from "./friends";
import { authedQuery } from "./utils";

export const DeletedProfile = {
  username: "deleted_user",
  name: "Deleted User",
  image: undefined,
} satisfies UIProfile;

export const getPublicProfile = (profile: Doc<"profiles">): UIProfile => {
  const { userId: _userId, _creationTime, _id, ...publicProfile } = profile;
  return publicProfile;
};

export const getByUsername = authedQuery({
  args: {
    username: v.string(),
  },
  handler: async (
    ctx,
    args,
  ): Promise<{
    info: UIProfile;
    relationship: Relationship;
  } | null> => {
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();
    if (!profile) return null;
    const { relationship } = await getRelationshipHelper({
      ctx,
      profileRequestingInfo: ctx.myProfile._id,
      otherProfile: profile._id,
    });
    return {
      info: getPublicProfile(profile),
      relationship,
    };
  },
});

export const getMine = authedQuery({
  handler: (ctx) => {
    return getPublicProfile(ctx.myProfile);
  },
});

export const updatePFP = internalMutation({
  args: {
    profileId: v.id("profiles"),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.profileId, {
      image: args.image,
    });
  },
});

import type { Infer } from "convex/values";

import type { Id } from "./_generated/dataModel";
import type { vPost, vProfile } from "./validators";

type Profile = Infer<typeof vProfile>;
interface PublicProfile {
  username: string;
  name: string;
  image: string | undefined;
}

type Post = Infer<typeof vPost>;
type PostWithProfile = Post & {
  _id: Id<"posts">;
  _creationTime: number;
  creator: PublicProfile;
};

export type { Post, PostWithProfile, Profile, PublicProfile };

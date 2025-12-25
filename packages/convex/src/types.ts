import type { Infer } from "convex/values";

import type { vProfile } from "./validators";

type Profile = Infer<typeof vProfile>;
type PublicProfile = Omit<Profile, "_creationTime" | "userId">;

export type { Profile, PublicProfile };

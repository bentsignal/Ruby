import { createStore } from "rostra";

import type { PublicProfile } from "@acme/convex/types";

interface StoreProps {
  profile: PublicProfile;
}

function useInternalStore({ profile }: StoreProps) {
  const { name, image, username } = profile;
  return { name, image, username };
}

export const { Store, useStore } = createStore(useInternalStore);

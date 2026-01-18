import { createStore } from "rostra";

import type { PublicProfile } from "@acme/convex/types";

interface StoreProps {
  profile: PublicProfile;
}

interface StoreValue {
  id: string;
  name: string;
  image: string | undefined;
  username: string;
}

function useInternalStore({ profile }: StoreProps) {
  const { _id: id, name, image, username } = profile;
  return { id, name, image, username };
}

export const { Store, useStore } = createStore<StoreProps, StoreValue>(
  useInternalStore,
);

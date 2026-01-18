"use client";

import { useConvexAuth, useQuery } from "convex/react";
import { createStore } from "rostra";

import { api } from "@acme/convex/api";

import { useLoading } from "~/hooks/use-loading";
import { authClient } from "./auth-client";

function useInternalStore() {
  const { isLoading, start } = useLoading();

  const { isAuthenticated: imSignedIn } = useConvexAuth();
  const imSignedOut = !imSignedIn;

  const myProfile = useQuery(api.profile.getMine, imSignedIn ? {} : "skip");

  const signInWithGoogle = () => {
    if (imSignedIn) return;
    start(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    });
  };

  const signOut = () => {
    if (imSignedOut) return;
    start(async () => {
      await authClient.signOut();
    });
  };

  return {
    myProfile,
    isLoading,
    imSignedIn,
    signInWithGoogle,
    signOut,
  };
}

export const { Store, useStore } = createStore(useInternalStore);

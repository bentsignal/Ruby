import { useEffect } from "react";
import { useRouter } from "expo-router";

import { useRequiredContext } from "@acme/context";

import * as Auth from "~/features/auth/atom";

export const useRedirectIfSignedIn = () => {
  useRequiredContext(Auth.Context);
  const imSignedIn = Auth.useContext((c) => c.imSignedIn);

  const router = useRouter();

  useEffect(() => {
    if (imSignedIn && router.canGoBack()) {
      router.back();
      return;
    }
    if (imSignedIn) {
      return;
    }
  }, [imSignedIn, router]);
};

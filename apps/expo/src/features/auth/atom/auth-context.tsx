import type { ReactNode } from "react";
import { useState } from "react";

import { createContext } from "@acme/context";

import { authClient } from "~/features/auth/lib/auth-client";

const { Context, useContext } = createContext<{
  name: string | undefined;
  email: string | undefined;
  isLoading: boolean;
  imSignedIn: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}>({
  displayName: "AuthContext",
});

const Provider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const session = authClient.useSession();
  const name = session.data?.user.name;
  const email = session.data?.user.email;
  const imSignedIn = session.data !== null;
  const imSignedOut = !imSignedIn;

  const signInWithGoogle = async () => {
    if (imSignedIn) return;
    try {
      setIsLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    if (imSignedOut) return;
    try {
      setIsLoading(true);
      await authClient.signOut();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Context.Provider
      value={{ name, email, isLoading, imSignedIn, signInWithGoogle, signOut }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, useContext, Provider };

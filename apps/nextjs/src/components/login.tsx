"use client";

import { Button } from "@acme/ui/button";

import { authClient } from "~/lib/auth-client";

export const Login = () => {
  return (
    <div className="bg-card flex h-full w-md flex-col items-center justify-center gap-2 p-4">
      <Button onClick={() => authClient.signIn.social({ provider: "google" })}>
        Login with Google
      </Button>
    </div>
  );
};

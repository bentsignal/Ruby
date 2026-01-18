"use client";

import { Button } from "@acme/ui/button";

import { Login } from "~/components/login";
import { useStore as useAuthStore } from "~/lib/auth-store";

export default function HomePage() {
  const imSignedIn = useAuthStore((s) => s.imSignedIn);
  const signOut = useAuthStore((s) => s.signOut);
  if (imSignedIn) {
    return <Button onClick={signOut}>Sign out</Button>;
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Login />
    </div>
  );
}

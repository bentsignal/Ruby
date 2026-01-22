import { redirectIfNotLoggedIn } from "~/lib/auth-server";

export default async function SearchPage() {
  await redirectIfNotLoggedIn({ redirectURL: "/search" });
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-foreground text-2xl font-bold">Search</h1>
    </div>
  );
}

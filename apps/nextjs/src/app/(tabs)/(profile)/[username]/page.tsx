import { redirectIfNotLoggedIn } from "~/lib/auth-server";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  await redirectIfNotLoggedIn({ redirectURL: `/${username}` });
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-foreground text-2xl font-bold">
        Profile: {username}
      </h1>
    </div>
  );
}

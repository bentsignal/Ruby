import Image from "next/image";

import * as Auth from "~/features/auth/atom";

function SmallProfilePreview() {
  const myProfile = Auth.useStore((s) => s.myProfile);
  const imNotSignedIn = Auth.useStore((s) => s.imSignedIn === false);
  if (imNotSignedIn) {
    return <Auth.TakeMeToLoginLink />;
  }
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-2">
        {myProfile?.image ? (
          <Image
            src={myProfile.image}
            alt={myProfile.name}
            width={48}
            height={48}
            className="size-12 rounded-full"
          />
        ) : (
          <div className="bg-muted size-12 rounded-full" />
        )}
        <div className="flex flex-col">
          <p className="text-sm font-medium">{myProfile?.name}</p>
          <p className="text-muted-foreground text-sm">
            @{myProfile?.username}
          </p>
        </div>
      </div>
      <Auth.SignOutLink />
    </div>
  );
}

export { SmallProfilePreview };

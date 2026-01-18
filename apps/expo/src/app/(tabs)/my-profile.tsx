import * as Auth from "~/features/auth/atom";
import { AccountNotFound } from "~/features/profile/screens/account-not-found";
import { DefaultProfile } from "~/features/profile/screens/default-profile";
import { MyProfileNotSignedIn } from "~/features/profile/screens/my-profile-not-signed-in";
import { ProfileLoading } from "~/features/profile/screens/profile-loading";

export default function MyProfile() {
  const imNotSignedIn = Auth.useStore((s) => s.imSignedIn === false);
  const myProfile = Auth.useStore((s) => s.myProfile);

  if (imNotSignedIn) {
    return <MyProfileNotSignedIn />;
  }

  if (myProfile === null) {
    return <ProfileLoading />;
  }

  if (myProfile === undefined) {
    return <AccountNotFound />;
  }

  return <DefaultProfile profile={myProfile} />;
}

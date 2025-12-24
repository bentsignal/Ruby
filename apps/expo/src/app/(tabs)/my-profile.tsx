import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useRequiredContext } from "@acme/context";

import * as Auth from "~/features/auth/atom";

const NotSignedIn = () => {
  return (
    <View className="h-full w-full flex-col items-center justify-center gap-2">
      <Auth.TakeMeToLogin />
    </View>
  );
};

export default function MyProfile() {
  useRequiredContext(Auth.Context);

  const insets = useSafeAreaInsets();

  const name = Auth.useContext((c) => c.name);
  const email = Auth.useContext((c) => c.email);
  const imSignedOut = Auth.useContext((c) => !c.imSignedIn);

  if (imSignedOut) {
    return <NotSignedIn />;
  }

  return (
    <View className="w-full px-4" style={{ paddingTop: insets.top }}>
      <Auth.SignOutButton />
      <Text className="text-foreground text-2xl font-bold">My Profile</Text>
      <View className="flex-row items-center">
        <Text className="text-foreground font-bold">Email: </Text>
        <Text className="text-muted-foreground">{email}</Text>
      </View>
      <View className="flex-row items-center">
        <Text className="text-foreground font-bold">Name: </Text>
        <Text className="text-muted-foreground">{name}</Text>
      </View>
    </View>
  );
}

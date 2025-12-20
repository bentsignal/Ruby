import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as Auth from "~/features/auth/atom";
import { authClient } from "~/lib/auth-client";

const NotSignedIn = () => {
  return (
    <View className="flex h-full w-full flex-col items-center justify-center gap-2">
      <Auth.TakeMeToLogin />
    </View>
  );
};

export default function MyProfile() {
  const insets = useSafeAreaInsets();
  const session = authClient.useSession();
  const signedOut = session.data === null;

  if (signedOut) {
    return <NotSignedIn />;
  }

  return (
    <View className="w-full" style={{ paddingTop: insets.top }}>
      <View>
        <TouchableOpacity
          className="bg-primary my-2 rounded-md p-2"
          onPress={() => authClient.signOut()}
        >
          <Text>Sign Out</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold">My Profile</Text>
        <View className="flex flex-row items-center gap-1">
          <Text className="text-lg font-bold">Email: </Text>
          <Text>{session.data?.user.email}</Text>
        </View>
        <View className="flex flex-row items-center gap-1">
          <Text className="text-lg font-bold">Name: </Text>
          <Text>{session.data?.user.name}</Text>
        </View>
      </View>
    </View>
  );
}

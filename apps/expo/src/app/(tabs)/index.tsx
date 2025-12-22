import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Posts from "~/components/posts";

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex flex-col gap-2">
      <View className="bg-primary w-full" style={{ paddingTop: insets.top }} />
      <Posts />
    </View>
  );
}

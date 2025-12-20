import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "convex/react";

import { api } from "@acme/convex/api";

export default function Home() {
  const insets = useSafeAreaInsets();
  const posts = useQuery(api.posts.getAll);

  return (
    <View className="flex flex-col gap-2">
      <View className="bg-primary w-full" style={{ paddingTop: insets.top }} />
      {posts?.map((post) => (
        <View key={post._id} className="flex flex-col gap-2">
          <Text className="px-4 text-purple-800">{post.title}</Text>
          <Text className="text-white">{post.content}</Text>
        </View>
      ))}
    </View>
  );
}

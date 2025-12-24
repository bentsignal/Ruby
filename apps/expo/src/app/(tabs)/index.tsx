import type { LegendListRenderItemProps } from "@legendapp/list";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LegendList } from "@legendapp/list";
import { useQuery } from "@tanstack/react-query";
import { useConvex } from "convex/react";

import { api } from "@acme/convex/api";

interface Post {
  title?: string;
  content?: string;
}

export default function Home() {
  const convex = useConvex();
  const inset = useSafeAreaInsets();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await convex.query(api.posts.getAll),
  });

  if (isLoading || !posts) return <Skeletons />;

  return (
    <LegendList
      data={posts}
      renderItem={(props) => <Post {...props} />}
      style={{ paddingTop: inset.top }}
      keyExtractor={(item) => item._id}
      contentContainerClassName="px-4"
      recycleItems={true}
    />
  );
}

const Skeletons = () => {
  const inset = useSafeAreaInsets();
  const emptyPosts = Array.from({ length: 10 }).map((_, index) => ({
    _id: index.toString(),
    title: "",
    content: "",
  }));
  return (
    <LegendList
      data={emptyPosts}
      renderItem={(props) => <Post {...props} />}
      className="px-4"
      style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}
    />
  );
};

const Post = ({ item }: LegendListRenderItemProps<Post>) => {
  return (
    <View className="border-border bg-card mb-2 flex-col gap-2 rounded-xl border p-4 shadow">
      <Text className="text-card-foreground font-bold">{item.title}</Text>
      <Text className="text-card-foreground">{item.content}</Text>
    </View>
  );
};

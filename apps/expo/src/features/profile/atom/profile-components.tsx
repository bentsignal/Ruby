import { Image, Text, View } from "react-native";

import { cn } from "~/utils/style-utils";
import { useStore as useProfileStore } from "./profile-store";

const ProfileImage = ({
  className,
  variant = "post",
}: {
  className?: string;
  variant?: "post" | "profile";
}) => {
  const image = useProfileStore((s) => s.image);
  if (!image) return <BlankProfileImage />;
  return (
    <Image
      source={{ uri: image }}
      className={cn(
        "rounded-full",
        variant === "profile" ? "size-16" : "size-10",
        className,
      )}
    />
  );
};

const BlankProfileImage = ({
  className,
  variant = "post",
}: {
  className?: string;
  variant?: "post" | "profile";
}) => {
  return (
    <View
      className={cn(
        "bg-muted rounded-full",
        variant === "profile" ? "size-16" : "size-10",
        className,
      )}
    />
  );
};

const ProfileInfo = () => {
  const name = useProfileStore((s) => s.name);
  const username = useProfileStore((s) => s.username);
  return (
    <View className="">
      <Text className="text-foreground text-base font-bold">{name}</Text>
      <Text className="text-foreground text-xs">@{username}</Text>
    </View>
  );
};

export { ProfileImage, BlankProfileImage, ProfileInfo };

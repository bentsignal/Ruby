import Image from "next/image";

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
  const size = variant === "profile" ? 64 : 40;
  return (
    <Image
      src={image}
      alt="Profile"
      width={size}
      height={size}
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
    <div
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
    <div className="flex flex-col">
      <span className="text-foreground text-base font-bold">{name}</span>
      <span className="text-foreground text-xs">@{username}</span>
    </div>
  );
};

export { ProfileImage, BlankProfileImage, ProfileInfo };

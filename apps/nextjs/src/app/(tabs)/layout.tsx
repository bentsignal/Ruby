"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Home, Search, UserRound } from "lucide-react";

import { cn } from "@acme/ui";
import * as HoverCard from "@acme/ui/hover-card";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
      <TabBar />
    </div>
  );
}

function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="bg-sidebar border-sidebar-border flex items-center gap-1 rounded-full border px-2 py-2 shadow-lg">
        <TabBarLink href="/" label="Home">
          <Home
            size={24}
            strokeWidth={pathname === "/" ? 2.5 : 1.75}
            className="transition-all"
          />
        </TabBarLink>
        <TabBarLink href="/search" label="Search">
          <Search
            size={24}
            strokeWidth={pathname === "/search" ? 2.5 : 1.75}
            className="transition-all"
          />
        </TabBarLink>
        <TabBarLink href="/notifications" label="Notifications">
          <Bell
            size={24}
            strokeWidth={pathname === "/notifications" ? 2.5 : 1.75}
            className="transition-all"
          />
        </TabBarLink>
        <HoverCard.Container>
          <HoverCard.Trigger asChild>
            <TabBarLink href="/profile" label="Profile">
              <UserRound
                size={24}
                strokeWidth={pathname === "/profile" ? 2.5 : 1.75}
                className="transition-all"
              />
            </TabBarLink>
          </HoverCard.Trigger>
          <HoverCard.Content>
            <p>Profile</p>
          </HoverCard.Content>
        </HoverCard.Container>
      </div>
    </nav>
  );
}

function TabBarLink({
  href,
  label,
  children,
  ref,
  ...props
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLAnchorElement>;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        "text-sidebar-foreground hover:bg-sidebar-accent flex size-10 items-center justify-center rounded-full transition-colors",
        isActive && "text-sidebar-accent-foreground",
      )}
      aria-label={label}
      prefetch={true}
      {...props}
    >
      {children}
    </Link>
  );
}

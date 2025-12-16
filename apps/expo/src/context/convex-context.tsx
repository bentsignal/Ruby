"use client";

import type { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const getConvexUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "https://outgoing-moose-159.convex.cloud";
  }
  if (process.env.NODE_ENV === "production") {
    return "https://giddy-dogfish-113.convex.cloud";
  }
  throw new Error("Invalid environment, could not determine convex url");
};

const convex = new ConvexReactClient(getConvexUrl());

export function Provider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

"use client";

import * as React from "react";

import type { Context, ContextValue } from "./types";

function useHasParentContext<Value>(context: Context<Value>): boolean {
  const contextValue = React.useContext(
    context as unknown as Context<ContextValue<Value>>,
  );

  if (contextValue.version) {
    return contextValue.version.current !== -1;
  }

  return false;
}

const useRequiredContext = <Value>(context: Context<Value>) => {
  const hasContext = useHasParentContext(context);
  if (!hasContext) {
    const contextName = context.displayName ?? "Unknown Context";
    throw new Error(`${contextName} is required but not found.`);
  }
};

export { useHasParentContext, useRequiredContext };

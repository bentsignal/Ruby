"use client";

import * as React from "react";

import type { Context, ContextSelector, ContextValue } from "./types";
import { useContextSelector } from "./use-context-selector";
import { useIsomorphicLayoutEffect } from "./use-react-helpers";

const createProvider = <Value>(
  Original: React.Provider<ContextValue<Value>>,
) => {
  const Provider: React.FC<React.ProviderProps<Value>> = (props) => {
    // Holds an actual "props.value"
    const valueRef = React.useRef(props.value);
    // Used to sync context updates and avoid stale values, can be considered as render/effect counter of Provider.
    const versionRef = React.useRef(0);

    // A stable object, is used to avoid context updates via mutation of its values.
    const contextValue = React.useRef<ContextValue<Value>>(null);

    if (!contextValue.current) {
      contextValue.current = {
        value: valueRef,
        version: versionRef,
        listeners: [],
      };
    }

    useIsomorphicLayoutEffect(() => {
      valueRef.current = props.value;
      versionRef.current += 1;

      const currentContextValue =
        contextValue.current as unknown as ContextValue<Value>;
      currentContextValue.listeners.forEach((listener) => {
        listener([versionRef.current, props.value]);
      });
    }, [props.value]);

    return React.createElement(
      Original,
      { value: contextValue.current },
      props.children,
    );
  };

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    Provider.displayName = "ContextSelector.Provider";
  }

  return Provider as unknown as React.Provider<ContextValue<Value>>;
};

/**
 * @internal
 * Implementation below has better dx
 */
const createBadContext = <Value>(defaultValue: Value): Context<Value> => {
  // eslint-disable-next-line @fluentui/no-context-default-value
  const context = React.createContext<ContextValue<Value>>({
    value: { current: defaultValue },
    version: { current: -1 },
    listeners: [],
  });

  context.Provider = createProvider<Value>(context.Provider);

  return context as unknown as Context<Value>;
};

const createContext = <T extends object>({
  displayName,
}: {
  displayName: string;
}) => {
  const Context = createBadContext<T>({} as T);
  Context.displayName = displayName;
  const useContext = <U>(selector: ContextSelector<T, U>) =>
    useContextSelector(Context, selector);
  return {
    Context,
    useContext,
  };
};

export { createContext };

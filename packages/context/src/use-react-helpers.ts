import * as React from "react";

import { canUseDOM } from "./utils";

/**
 * React currently throws a warning when using useLayoutEffect on the server. To get around it, we can conditionally
 * useEffect on the server (no-op) and useLayoutEffect in the browser. We occasionally need useLayoutEffect to
 * ensure we don't get a render flash for certain operations, but we may also need affected components to render on
 * the server.
 *
 * https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 * https://github.com/reduxjs/react-redux/blob/master/src/utils/useIsomorphicLayoutEffect.js
 */
const useIsomorphicLayoutEffect: typeof React.useEffect = canUseDOM()
  ? React.useLayoutEffect
  : React.useEffect;

/**
 * @internal
 * https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
 *
 * Modified `useCallback` that can be used when dependencies change too frequently. Can occur when
 * e.g. user props are dependencies which could change on every render
 * e.g. volatile values (i.e. useState/useDispatch) are dependencies which could change frequently
 *
 * This should not be used often, but can be a useful re-render optimization since the callback is a ref and
 * will not be invalidated between re-renders
 *
 * @param fn - The callback function that will be used
 */
const useEventCallback = <Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
): ((...args: Args) => Return) => {
  const callbackRef = React.useRef<typeof fn>(() => {
    throw new Error("Cannot call an event handler while rendering");
  });

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = fn;
  }, [fn]);

  return React.useCallback(
    (...args: Args) => {
      const callback = callbackRef.current;
      return callback(...args);
    },
    [callbackRef],
  );
};

export { useEventCallback, useIsomorphicLayoutEffect };

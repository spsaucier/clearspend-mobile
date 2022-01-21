import { useEffect, useRef } from 'react';

export const useIsMounted = (): { current: boolean } => {
  // component is certainly mounted from the beginning
  const componentIsMounted = useRef(true);
  useEffect(() =>
    // when non-SSR + (ComponentDidMount or ComponentDidUpdate):
    // do nothing.
    // when non-SSR + ComponentWillUnmount:
    () => {
      componentIsMounted.current = false;
    },
  []);
  return componentIsMounted;
};

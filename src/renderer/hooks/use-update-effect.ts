import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export const useUpdateEffect = (
  effect: EffectCallback,
  dependencies: DependencyList = []
) => {
  const isInitialMount = useRef(true);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
};

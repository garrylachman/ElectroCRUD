// @ts-nocheck
import { AnimatePresence, motion } from 'framer-motion';
import { FC, PropsWithChildren, useMemo } from 'react';

type AnimateComponentEffect = 'slide' | 'scale' | 'scaleY' | 'scaleX';

type AnimateComponentProperties = {
  duration?: number;
  effect?: AnimateComponentEffect;
};

const getByEffect = (effect: AnimateComponentEffect) => {
  const defaultStart: Record<string, number | string> = { opacity: 0 };
  const defaultEnd: Record<string, number | string> = { opacity: 1 };
  switch (effect) {
    case 'slide': {
      return [
        { ...defaultStart, right: '-1000px', position: 'relative' },
        { ...defaultEnd, right: '0px' },
      ];
    }
    case 'scale': {
      return [
        { ...defaultStart, scale: 0.2 },
        { ...defaultEnd, scale: 1 },
      ];
    }
    case 'scaleY': {
      return [
        { ...defaultStart, scaleY: 0.2 },
        { ...defaultEnd, scaleY: 1 },
      ];
    }
    case 'scaleX': {
      return [
        { ...defaultStart, scaleX: 0.2 },
        { ...defaultEnd, scaleX: 1 },
      ];
    }
  }
};

export const AnimateComponent: FC<
  PropsWithChildren<AnimateComponentProperties>
> = ({ children, duration = 0.2, effect = 'slide' }) => {
  const startEnd = useMemo(() => getByEffect(effect), [effect]);

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={startEnd[0]}
        animate={startEnd[1]}
        exit={startEnd[0]}
        transition={{ duration }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

import { useState, useEffect } from 'react';

import tailwindConfig from '../../tailwind.config';

const { screens } = tailwindConfig.theme.extend;

type BreakpointKey = keyof typeof screens;

export const useBreakpoint = (breakpointKey: BreakpointKey) => {
  const width = screens[breakpointKey];

  const [isBreakpoint, setIsBreakpoint] = useState(false);

  useEffect(() => {
    try {
      const mql = window.matchMedia(`(min-width: ${width})`);

      const setFromQuery = ({ matches }: { matches: boolean }) => {
        setIsBreakpoint(matches);
      };

      mql.addEventListener('change', setFromQuery);
      setFromQuery(mql);

      return () => {
        mql.removeEventListener('change', setFromQuery);
      };
    } catch (error) {
      console.error('error', error);
      return;
    }
  }, [width]);

  return isBreakpoint;
};

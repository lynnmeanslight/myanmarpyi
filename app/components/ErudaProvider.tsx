'use client';

import { useEffect } from 'react';

export function ErudaProvider() {
  useEffect(() => {
    // Only load Eruda in development mode
    if (process.env.NODE_ENV === 'development') {
      import('eruda').then((eruda) => eruda.default.init());
    }
  }, []);

  return null;
}

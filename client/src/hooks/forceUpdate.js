import { useState } from 'react';

export function useForceUpdate() {
  const [update, setupdate] = useState(false);

  function forceUpdate() {
    setupdate((v) => !v);
  }

  return [forceUpdate, update];
}

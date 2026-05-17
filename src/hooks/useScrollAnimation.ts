import { useEffect, useState } from 'react';

/* 滚动位置 Hook */
export function useScrollPosition() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const cb = () => setY(window.scrollY);
    window.addEventListener('scroll', cb, { passive: true });
    return () => window.removeEventListener('scroll', cb);
  }, []);
  return y;
}

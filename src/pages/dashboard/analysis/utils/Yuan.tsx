import { useEffect, useRef } from 'react';
import { yuan } from '../components/Charts';

/** 减少使用 dangerouslySetInnerHTML */
const Yuan: React.FC<{ children: string | number }> = ({ children }) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current) {
      spanRef.current.innerHTML = yuan(children);
    }
  }, [children]);

  return <span ref={spanRef} />;
};

export default Yuan;

import { useState } from 'react';

export function useModalForm<T = any>(initialValue?: T) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<T | undefined>(initialValue);

  const show = (item?: T) => {
    setCurrent(item);
    setOpen(true);
  };

  const hide = () => {
    setOpen(false);
    setCurrent(undefined);
  };

  return {
    open,
    current,
    show,
    hide,
    setCurrent,
  };
}

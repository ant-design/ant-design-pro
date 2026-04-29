import { useState } from 'react';

export default function useSettingDrawer() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}

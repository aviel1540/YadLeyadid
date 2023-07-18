import { useState } from 'react';

export const useOpen = () => {
  const [open, setOpen] = useState({
    action: false,
    popUp: false,
    modalDialog: false,
    title: '',
    content: '',
    id: '',
    info: {},
  });

  return [open, setOpen];
};

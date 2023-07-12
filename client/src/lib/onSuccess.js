import { success } from '.';

export const onSuccess = (data, setOpen, open, refetch = () => {}, clearInputs = () => {}) => {
  setOpen({ ...open, popUp: false, action: false, modalDialog: false });
  success(data.message);
  refetch();
  clearInputs();
};

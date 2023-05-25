import { format } from 'date-fns';

export const formatDate = (date, newFormat) => {
  const fm = newFormat || 'dd/MM/yyyy';

  return date ? format(new Date(date), fm) : '';
};

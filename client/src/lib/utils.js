import clsx from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export const formatDate = (date, newFormat) => {
  const fm = newFormat || 'dd/MM/yyyy';

  return date ? format(new Date(date), fm) : '';
};

export const replace = (text) => text.replace(/[^א-ת]+/g, ' ');

export const cn = (...input) => twMerge(clsx(input));

import { error } from '.';

export const onError = (data) => {
  const err = data?.response?.data?.message;
  if (err) error(err);
  else error('משהו השתבש, נא לנסות שוב.');
};

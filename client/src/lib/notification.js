import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const success = (message) => {
  return toast.success(message);
};

export const error = (message) => {
  return toast.error(message || 'משהו השתבש, נא לנסות שוב.');
};

export const info = (message) => {
  return toast.info(message);
};

export const warning = (message) => {
  return toast.warning(message);
};

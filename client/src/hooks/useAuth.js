import { decodeToken } from 'react-jwt';
import { useMutation } from 'react-query';
import * as auth from '~/api/auth';
import { onError, onSuccess, success } from '~/lib';
import { useAuthStore } from '~/store/auth';

export const useLogin = (reset) => {
  const { loginStore } = useAuthStore();

  return useMutation(auth.login, {
    onSuccess: (data) => {
      const isAdmin = decodeToken(data)?.isAdmin;
      loginStore(data);
      reset();
      if (isAdmin) window.location.href = '/home';
      else window.location.href = '/user';
    },
    onError: (data) => {
      onError(data);
    },
  });
};

export const useForgotPassword = (setOpen, open, resetField) =>
  useMutation(auth.forgotPassword, {
    onSuccess: (data) => {
      success(data.message);
      setOpen({ ...open, title: 'verificationCode', content: 'אימות קוד סודי' });
      resetField('email');
    },
    onError: (data) => {
      onError(data);
    },
  });

export const useVerificationCode = (setOpen, open, resetField) =>
  useMutation(auth.verificationCode, {
    onSuccess: (data) => {
      success(data.message);
      setOpen({ ...open, title: 'changePassword', content: 'החלפת סיסמא' });
      resetField('code');
    },
    onError: (data) => {
      onError(data);
    },
  });

export const useChangePassword = (setOpen, open) =>
  useMutation(auth.changePassword, {
    onSuccess: (data) => {
      onSuccess(data, setOpen, open);
    },
    onError: (data) => {
      onError(data);
    },
  });

import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as auth from '~/api/auth';
import { useAuthStore } from '~/store/auth';
import { onError, onSuccess, success } from '~/lib';
import { decodeToken } from 'react-jwt';

export const useLogin = (reset, setIsLoading) => {
  const navigate = useNavigate();
  const { loginStore } = useAuthStore();

  return useMutation(auth.login, {
    onSuccess: (data) => {
      reset();
      const isAdmin = decodeToken(data)?.isAdmin;
      loginStore(data);
      setIsLoading(false);
      if (isAdmin) navigate('/home');
      else navigate('/client');
    },
    onError: (data) => {
      setIsLoading(false);
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

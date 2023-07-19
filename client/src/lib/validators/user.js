import { z } from 'zod';

export const LoginValidator = z.object({
  entityCard: z
    .string()
    .min(9, { message: 'תעודת זהות חייבת להכיל 9 ספרות בלבד.' })
    .max(9, { message: 'תעודת זהות חייבת להכיל 9 ספרות בלבד.' })
    .regex(/^[0-9]+$/, 'תעודת זהות חייבת להכיל 9 ספרות בלבד.'),
  password: z.string().min(9, { message: 'סיסמא חייבת להכיל מינימום 9 תווים.' }),
});

export const EmailValidator = z.string().email({ message: 'כתובת המייל אינה תקינה.' });

export const CodeValidator = z
  .string()
  .min(9, { message: 'קוד אימות חייב להכיל מינימום 9 תווים.' })
  .max(9, { message: 'קוד אימות חייב להכיל מקסימום 9 תווים.' });

export const PasswordValidator = z
  .object({
    password: z.string().min(9, 'סיסמא חייבת להכיל מינימום 9 תווים.'),
    verifyPassword: z.string().min(9, 'סיסמא חייבת להכיל מינימום 9 תווים.'),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: 'סיסמאות אינן תואמות.',
    path: ['verifyPassword'],
  });

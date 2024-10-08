import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { fromZodError } from 'zod-validation-error';
import { useChangePassword, useForgotPassword, useVerificationCode } from "~/hooks/useAuth";
import { error, warning } from "~/lib";
import { CodeValidator, EmailValidator, PasswordValidator } from "~/lib/validators";
import { Input, SendIcon } from "../logic";

export const ForgotPassword = ({ setOpen, open }) => {
    const { title, content } = open;
    const [userEmail, setUserEmail] = useState("")

    const { register, handleSubmit, resetField, formState: { errors } } = useForm();

    const { mutate: forgotPassword } = useForgotPassword(setOpen, open, resetField);
    const { mutate: verificationPassword } = useVerificationCode(setOpen, open, resetField);
    const { mutate: changePassword } = useChangePassword(setOpen, open);

    const onSubmit = async (data) => {
        const { email, code, password, verifyPassword } = data;

        try {

            if (title === "fogotPassword") {
                EmailValidator.parse(email);

                const payload = { email };
                setUserEmail(email)
                forgotPassword(payload);
            } else if (title === "verificationCode") {
                CodeValidator.parse(code);

                const payload = { code };
                verificationPassword(payload);
            } else if (title === "changePassword") {
                PasswordValidator.parse({ password, verifyPassword });

                const payload = { email: userEmail, password, verifyPassword };
                changePassword(payload);
            }
            else throw new Error('')

        } catch (err) {
            if (err instanceof z.ZodError) {
                const validationError = fromZodError(err);
                return error(validationError.details[0].message);
            }
            error(err?.message);
        }
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2">{content}</h1>
            <main className="form-wrapper">
                {title === "fogotPassword" &&
                    <label htmlFor="email" className="form-label w-1/2 sm:w-full">מייל לאימות:
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input w-full"
                            placeholder="מייל לאימות"
                            {...register("email", { required: { value: true, message: "שדה חובה." } })}
                        />
                        <p className="form-p_error">{errors.email?.message}</p>
                    </label>
                }
                {title === "verificationCode" &&
                    <label htmlFor="code" className="form-label w-1/2 sm:w-full">קוד אימות:
                        <Input
                            type="text"
                            id="code"
                            name="code"
                            className="form-input w-full"
                            placeholder="קוד אימות"
                            {...register("code", { required: { value: true, message: "שדה חובה." } })}
                        />
                        <p className="form-p_error">{errors.code?.message}</p>
                    </label>
                }
                {title === "changePassword" &&
                    <>
                        <label htmlFor="password" className="form-label sm:w-full">סיסמא חדשה:
                            <Input type="password" id="password" name="password" className="form-input" placeholder="סיסמא חדשה" {...register("password", { required: { value: true, message: "שדה חובה." } })} />
                            <p className="form-p_error">{errors.password?.message}</p>
                        </label>
                        <label htmlFor="verifyPassword" className="form-label sm:w-full">אימות סיסמא חדשה:
                            <Input type="password" id="verifyPassword" name="verifyPassword" className="form-input" placeholder="אימות סיסמא חדשה" {...register("verifyPassword", { required: { value: true, message: "שדה חובה." } })} />
                            <p className="form-p_error">{errors.verifyPassword?.message}</p>
                        </label>
                    </>
                }
            </main>
            <div className="flex justify-end p-2">
                <SendIcon onClick={handleSubmit(onSubmit)} title={title} className="text-3xl" />
            </div>
        </>
    );
};

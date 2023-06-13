import { useForm } from "react-hook-form";
import { useChangePassword, useForgotPassword, useVerificationCode } from "~/hooks/useAuth";
import { error } from "~/utils";
import { SendIcon } from "../logic";
import { useState } from "react";

export const Form = ({ setOpen, open }) => {
    const { title, content } = open;

    const { register, handleSubmit, resetField, formState: { errors } } = useForm();

    const [userEmail, setUserEmail] = useState("")

    const { mutate: forgotMutatePassword } = useForgotPassword(setOpen, open, resetField);
    const { mutate: verificationMutatePassword } = useVerificationCode(setOpen, open, resetField);
    const { mutate: changeMutatePassword } = useChangePassword(setOpen, open);

    const onSubmit = async (data) => {
        const { email, code, password, verifyPassword } = data;

        try {
            if (title === "fogotPassword") {
                const userEmail = { email };
                setUserEmail(email)
                forgotMutatePassword(userEmail);
            } else if (title === "verificationCode") {
                const userCode = { code };
                verificationMutatePassword(userCode);
            } else if (title === "changePassword") {
                const changedPassword = { email: userEmail, password, verifyPassword };
                changeMutatePassword(changedPassword);
            }

        } catch (err) {
            error(err);
        }
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2">{content}</h1>
            <main className="flex flex-wrap justify-center  m-4 p-4 gap-4">
                {title === "fogotPassword" &&
                    <label htmlFor="email" className="form-label w-1/2">מייל לאימות
                        <input
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
                    <label htmlFor="code" className="form-label w-1/2">קוד אימות
                        <input
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
                        <label htmlFor="password" className="form-label">סיסמא חדשה:
                            <input type="password" id="password" name="password" className="form-input" placeholder="סיסמא חדשה" {...register("password", { required: { value: true, message: "שדה חובה." } })} />
                            <p className="form-p_error">{errors.password?.message}</p>
                        </label>
                        <label htmlFor="verifyPassword" className="form-label">אימות סיסמא חדשה:
                            <input type="password" id="verifyPassword" name="verifyPassword" className="form-input" placeholder="אימות סיסמא חדשה" {...register("verifyPassword", { required: { value: true, message: "שדה חובה." } })} />
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

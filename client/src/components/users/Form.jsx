import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { PaymentTypes, paymentTypes } from "~/constants/PaymentTypes";
import { ProductPlace } from "~/constants/productPlace";
import { useProducts } from "~/hooks/useProducts";
import { useAddUser, useAsignProductToUser, useUpdatePassword, useUpdateUser } from "~/hooks/useUsers";
import { error, info, replace } from "~/lib";
import { Input, MultipleAutocomplete, RadioButtons, SelectInput, SendIcon } from "../logic";
import { Spinner } from "../ui";

export const Form = ({ setOpen, open, refetch }) => {
    const { title, content } = open;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [selectedPaymentType, setSelectedPaymentType] = useState("")
    const [selectedAssign, setSelectedAssign] = useState([])
    const [checked, setChecked] = useState(open.title === "edit" ? open.info?.isAdmin : false);

    const location = useLocation();
    const administratorLocation = location.pathname === "/administrator";

    const { data: products, isLoading } = useProducts();
    const { mutate: addUser } = useAddUser(setOpen, open, refetch);
    const { mutate: updateUser } = useUpdateUser(setOpen, open, refetch);
    const { mutate: updatePassword } = useUpdatePassword(setOpen, open, refetch);
    const { mutate: asignProductToUser } = useAsignProductToUser(setOpen, open, refetch);

    const activeProducts = products?.filter((p) => p.place !== ProductPlace.LOANED && p.place !== ProductPlace.REPAIR)

    const handleChange = () => setChecked(!checked)

    const onSubmit = (data) => {
        const {
            entityCard, username,
            name, password,
            email, phoneNumber,
            address, currentPassword,
            newPassword, verifyNewPassword
        } = data;

        try {
            if (title === "add") {
                if (!administratorLocation && (!selectedPaymentType || selectedPaymentType == "")) {
                    info("נא לבחור את אופן התשלום.");
                    return;
                }
                const payload = {
                    entityCard, username,
                    name, password,
                    email, phoneNumber,
                    address,
                    paymentType: selectedPaymentType,
                    admin: !administratorLocation ? false : true
                };

                addUser(payload);
            }
            else if (title === "edit") {
                const payload = {
                    id: open.id,
                    entityCard, username,
                    name, email,
                    phoneNumber,
                    address, paymentType: selectedPaymentType.length > 0 ? selectedPaymentType : open.info.paymentType,
                    admin: checked
                };

                updateUser(payload);
            }

            else if (title === "asignProductToUser") {
                if (!selectedAssign || selectedAssign.length === 0) {
                    info("נא לבחור מוצרים לשיוך.");
                    return;
                }
                const payload = {
                    userId: open.id,
                    ids: selectedAssign.map((s) => s.id),
                }
                asignProductToUser(payload)
            }
            else if (title === "editPassword") {
                const payload = {
                    userId: open.id,
                    currentPassword,
                    newPassword,
                    verifyNewPassword
                }

                updatePassword(payload)
            }
            else throw new Error('')
        } catch (err) {
            error(err?.message);
        }
    };

    const asignProductToUserOnChange = (_, value) => {
        setSelectedAssign(value);
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2">{content}</h1>
            <main className="form-wrapper">
                {(title == "add" || title === "edit") &&
                    <>
                        <label htmlFor="name" className="form-label">שם מלא:
                            <Input type="text" id="name" name="name" defaultValue={title === "edit" ? open.info.name : null} className="form-input" placeholder="שם מלא" {...register("name", { required: { value: true, message: "שדה חובה." } })} />
                            <p className="form-p_error">{errors.name?.message}</p>
                        </label>

                        <label htmlFor="username" className="form-label">שם משתמש:
                            <Input type="text" id="username" name="username" defaultValue={title === "edit" ? open.info.username : null} className="form-input" placeholder="שם משתמש" {...register("username", { required: { value: true, message: "שדה חובה." } })} />
                            <p className="form-p_error">{errors.username?.message}</p>
                        </label>

                        <label htmlFor="entityCard" className="form-label">תעודת זהות:
                            <Input type="text" id="entityCard" name="entityCard" defaultValue={title === "edit" ? open.info.entityCard : null} className="form-input" placeholder="תעודת זהות" {...register("entityCard", { required: { value: true, message: "שדה חובה." } })} />
                            <p className="form-p_error">{errors.entityCard?.message}</p>
                        </label>

                        {title === 'add' &&
                            <label htmlFor="addPassword" className="form-label">סיסמא:
                                <Input type="password" id="addPassword" name="addPassword" className="form-input" placeholder="סיסמא" {...register("password", { required: { value: true, message: "שדה חובה." } })} />
                                <p className="form-p_error">{errors.entityCard?.message}</p>
                            </label>
                        }

                        <label htmlFor="phoneNumber" className="form-label">מספר פלאפון:
                            <Input type="text" id="phoneNumber" name="phoneNumber" defaultValue={title === "edit" ? open.info.phoneNumber : null} className="form-input" placeholder="מספר פלאפון" {...register("phoneNumber", { required: { value: true, message: "שדה חובה." } })} />
                            <p className="form-p_error">{errors.phoneNumber?.message}</p>
                        </label>

                        <label htmlFor="email" className="form-label">מייל:
                            <Input type="email" id="email" name="email" defaultValue={title === "edit" ? open.info.email : null} className={`form-input ${title === 'edit' ? '-mt-0' : null}`} placeholder="מייל" {...register("email", { required: { value: true, message: "שדה חובה." }, pattern: /^\S+@\S+$/i })} />
                            <p className="form-p_error">{errors.email?.message}</p>
                        </label>

                        <label htmlFor="address" className="form-label">כתובת:
                            <Input type="text" id="address" name="address" defaultValue={title === "edit" ? open.info.address : null} className="form-input -mt-0" placeholder="כתובת" {...register("address", { required: { value: true, message: "שדה חובה." } })} />
                            <p className="form-p_error">{errors.address?.message}</p>
                        </label>

                        {!administratorLocation &&
                            <>
                                <label className="form-label">אופן תשלום:
                                    <SelectInput
                                        type={(title === 'add' || open.info.paymentType === PaymentTypes.NOTHING) ? 'אופן תשלום' : open.info.paymentType}
                                        selectedValue={selectedPaymentType}
                                        className={`${title === "edit" ? " !w-[26rem] mb-3" : "w-[12.5rem]"}`}
                                        setSelectedValue={setSelectedPaymentType}
                                        data={paymentTypes?.map(
                                            ({ label, id, }) => ({
                                                key: id,
                                                code: label,
                                                name: label,
                                            })
                                        )}
                                        isLoading={!paymentTypes ? true : false}
                                    />
                                    {/* <p className="form-p_error">{errors.email?.message}</p> */}
                                </label>
                            </>}
                        {title === "edit" &&
                            <div className="mt-5">
                                <RadioButtons
                                    title={!administratorLocation ? "האם הלקוח מנהל מערכת ?" : "האם המנהל מנהל מערכת ?"}
                                    defaultValue={open.info?.isAdmin}
                                    onChange={handleChange}
                                />
                            </div>
                        }
                    </>
                }
                {title === "asignProductToUser" && !isLoading ?
                    <MultipleAutocomplete
                        options={activeProducts?.map(
                            (product, index) => ({
                                label: `${index + 1}. ${replace(product?.productName)} `,
                                id: product?._id,
                            })
                        )}
                        onChange={asignProductToUserOnChange}
                        placeholder={"מוצרים"}
                        isLoading={isLoading}
                        label={"מוצרים"}
                    />
                    : title === "asignProductToUser" && <Spinner />
                }
                {title === "editPassword" &&
                    <>
                        <label htmlFor="currentPassword" className="form-label w-10/12">סיסמא נוכחית:
                            <Input type="password" id="currentPassword" name="currentPassword" className="form-input w-full" placeholder="סיסמא נוכחית" {...register("currentPassword", { required: { value: true, message: "שדה חובה." } })} />
                            <p className="form-p_error">{errors.password?.message}</p>
                        </label>

                        <label htmlFor="newPassword" className="form-label">סיסמא חדשה:
                            <Input type="password" id="newPassword" name="newPassword" className="form-input" placeholder="סיסמא חדשה" {...register("newPassword", { required: { value: true, message: "שדה חובה." } })} />
                            <p className="form-p_error">{errors.password?.message}</p>
                        </label>
                        <label htmlFor="verifyNewPassword" className="form-label">אימות סיסמא חדשה:
                            <Input type="password" id="verifyNewPassword" name="verifyNewPassword" className="form-input" placeholder="אימות סיסמא חדשה" {...register("verifyNewPassword", { required: { value: true, message: "שדה חובה." } })} />
                            <p className="form-p_error">{errors.password?.message}</p>
                        </label>
                    </>
                }
            </main>

            <div className="flex justify-end p-2">
                <SendIcon
                    onClick={handleSubmit(onSubmit)}
                    title={title}
                    className="text-3xl"
                    isLoading={isLoading}
                />
            </div>
        </>
    );
};

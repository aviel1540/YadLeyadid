import { IconButton } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillSendCheckFill } from "react-icons/bs";
import { paymentTypes } from "~/constants/PaymentTypes";
import { ProductPlace } from "~/constants/productPlace";
import { useProducts } from "~/hooks/useProducts";
import { useAddUser, useUpdateUser } from "~/hooks/useUsers";
import { error } from "~/utils/notification";
import { MultipleAutocomplete, SelectInput } from "../logic";
import { Spinner } from "../ui/Spinner";
import { replace } from "~/utils/replace";

export const Form = ({ setOpen, open, refetch, content, title }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [selectedPaymentType, setSelectedPaymentType] = useState("")
    const [selectedAssign, setSelectedAssign] = useState("")

    const { data: products, isLoading } = useProducts();


    const { mutate: addMutateUser } = useAddUser(setOpen, open, refetch);

    const { mutate: updateMutateUser } = useUpdateUser(setOpen, open, refetch);

    const activeProducts = products?.filter((p) => p.place !== ProductPlace.LOANED)

    const onSubmit = (data) => {
        const { entityCard, username, name, password, email, phoneNumber, address } = data;

        try {
            if (title === "add") {
                const addUser = {
                    entityCard, username,
                    name, password,
                    email, phoneNumber,
                    address, paymentType: selectedPaymentType
                };

                addMutateUser(addUser);
            }
            else if (title === "edit") {
                const updateUser = {
                    id: open.id,
                    entityCard, username,
                    name, email,
                    phoneNumber,
                    address, paymentType: selectedPaymentType.length > 0 ? selectedPaymentType : open.info.paymentType
                };

                updateMutateUser(updateUser);
            }
        } catch (err) {
            error(err);
        }
    };

    const asignProductToUserOnChange = (value) => {
        console.log("🚀 value:", value)
        setSelectedAssign(value);
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2">{content}</h1>
            <main className="flex flex-wrap justify-center m-4 p-4 gap-4">
                {title !== "asignProductToUser" &&
                    <>
                        <label htmlFor="name" className="block text-sm font-semibold mt-1">שם מלא:
                            <input type="text" id="name" name="name" defaultValue={title === "edit" ? open.info.name : null} className="block w-35 px-5 h-14 border border-gray font-normal rounded-lg" placeholder="שם מלא" {...register("name", { required: { value: true, message: "שדה חובה." } })} />
                            <p className="text-red text-sm font-normal">{errors.name?.message}</p>
                        </label>

                        <label htmlFor="username" className="block text-sm font-semibold mt-1">שם משתמש:
                            <input type="text" id="username" name="username" defaultValue={title === "edit" ? open.info.username : null} className="block w-35 px-5 h-14 border border-gray font-normal rounded-lg" placeholder="שם משתמש" {...register("username", { required: { value: true, message: "שדה חובה." } })} />
                            <p className="text-red text-sm font-normal">{errors.username?.message}</p>
                        </label>

                        <label htmlFor="entityCard" className="block text-sm font-semibold mt-1">תעודת זהות:
                            <input type="text" id="entityCard" name="entityCard" defaultValue={title === "edit" ? open.info.entityCard : null} className="block w-35 px-5 h-14 border border-gray font-normal rounded-lg" placeholder="תעודת זהות" {...register("entityCard", { required: { value: true, message: "שדה חובה." } })} />
                            <p className="text-red text-sm font-normal">{errors.entityCard?.message}</p>
                        </label>

                        {title === 'add' &&
                            <label htmlFor="password" className="block text-sm font-semibold mt-1">סיסמא:
                                <input type="password" id="password" name="password" className="block w-35 px-5 h-14 border border-gray font-normal rounded-lg" placeholder="סיסמא" {...register("password", { required: { value: true, message: "שדה חובה." } })} />
                                <p className="text-red text-sm font-normal">{errors.entityCard?.message}</p>
                            </label>
                        }

                        <label htmlFor="phoneNumber" className="block text-sm font-semibold mt-1">מספר פלאפון:
                            <input type="text" id="phoneNumber" name="phoneNumber" defaultValue={title === "edit" ? open.info.phoneNumber : null} className="block w-35 px-5 h-14 border border-gray font-normal rounded-lg" placeholder="מספר פלאפון" {...register("phoneNumber", { required: { value: true, message: "שדה חובה." } })} />
                            <p className="text-red text-sm font-normal">{errors.phoneNumber?.message}</p>
                        </label>

                        <label htmlFor="email" className="block text-sm font-semibold mt-1">מייל:
                            <input type="email" id="email" name="email" defaultValue={title === "edit" ? open.info.email : null} className="block w-35 px-5 h-14 border border-gray font-normal rounded-lg" placeholder="מייל" {...register("email", { required: { value: true, message: "שדה חובה." }, pattern: /^\S+@\S+$/i })} />
                            <p className="text-red text-sm font-normal">{errors.email?.message}</p>
                        </label>

                        <label htmlFor="address" className="block text-sm font-semibold mt-1">כתובת:
                            <input type="text" id="address" name="address" defaultValue={title === "edit" ? open.info.address : null} className="block w-35 px-5 h-14 border border-gray font-normal rounded-lg" placeholder="כתובת" {...register("address", { required: { value: true, message: "שדה חובה." } })} />
                            <p className="text-red text-sm font-normal">{errors.address?.message}</p>
                        </label>

                        <label className="block text-sm font-semibold mt-1">אופן תשלום:
                            <SelectInput
                                type={title === 'add' ? 'אופן תשלום' : open.info.paymentType}
                                selectedValue={selectedPaymentType}
                                className={"!w-[12.5rem] sm!w-full"}
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
                            <p className="text-red text-sm font-normal">{errors.email?.message}</p>
                        </label>
                    </>
                }
                {title === "asignProductToUser" && !isLoading ?
                    <MultipleAutocomplete
                        options={activeProducts?.map(
                            (product) => ({
                                label: replace(product?.productName),
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

            </main>

            <div className="flex justify-end p-2">
                <IconButton onClick={handleSubmit(onSubmit)}>
                    <BsFillSendCheckFill
                        color={`${title === "edit" ? "#1fb6ff" : "#13ce66"}`}
                        className="text-3xl" />
                </IconButton>
            </div>
        </>
    );
};

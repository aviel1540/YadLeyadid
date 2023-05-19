import React, { useRef, useState } from "react";
import * as toastMessages from "~/utils/notification";
import { IconButton } from "@mui/material";
import { MdDone } from "react-icons/md";
import { TextInput } from "../logic/TextInput";
import { useAddUser, useUpdateUser } from "~/hooks/useUsers";
import { SelectInput } from "../logic/SelectInput";
import { MultipleAutocomplete } from "../logic/multipleAutocomplete";
import { useProducts } from "~/hooks/useProducts";
import { Spinner } from "../ui/Spinner";

export const Form = ({ title, setOpen, open, refetch }) => {

    const [selectedPaymentType, setSelectedPaymentType] = useState("")
    const [selectedAssign, setSelectedAssign] = useState("")
    console.log("🚀selectedAssign:", selectedAssign)


    const { data: products, isLoading } = useProducts();

    const idTeudaeInputRef = useRef();
    const usernameInputRef = useRef();
    const nameInputRef = useRef();
    const passwordInputRef = useRef();
    const emailInputRef = useRef();
    const phoneNumberInputRef = useRef();
    const addressInputRef = useRef();

    const { mutate: addMutateUser } = useAddUser(
        setOpen,
        open,
        refetch
    );

    const { mutate: updateMutateUser } = useUpdateUser(
        setOpen,
        open,
        refetch
    );


    const submitHandler = async (e) => {
        e.preventDefault();

        const idTeuda = idTeudaeInputRef?.current?.value;
        const username = usernameInputRef?.current?.value;
        const name = nameInputRef?.current?.value;
        const password = passwordInputRef?.current?.value;
        const email = emailInputRef?.current?.value;
        const phoneNumber = phoneNumberInputRef?.current?.value;
        const address = addressInputRef?.current?.value;

        try {
            if (open.title === "add") {
                if (!idTeuda || !username ||
                    !name || !password ||
                    !email || !phoneNumber ||
                    !address || !selectedPaymentType) {
                    toastMessages.info("נא למלא את כל השדות.");
                    return;
                }
                const addUser = {
                    idTeuda, username,
                    name, password,
                    email, phoneNumber,
                    address, paymentType: selectedPaymentType
                };
                addMutateUser(addUser);
            }
            else if (open.title === "edit") {
                if (!idTeuda || !username ||
                    !name || !email ||
                    !phoneNumber || !address) {
                    toastMessages.info("נא למלא את כל השדות.");
                    return;
                }
                const updateUser = {
                    id: open.id,
                    idTeuda, username,
                    name, email,
                    phoneNumber,
                    address, paymentType: selectedPaymentType.length > 0 ? selectedPaymentType : open.info.paymentType
                };

                updateMutateUser(updateUser);
            }
        } catch (err) {
            toastMessages.error(err);
        }
    };

    const asignProductToUserOnChange = (value) => {
        console.log("🚀 value:", value)
        setSelectedAssign(value);
    };

    return (
        <>
            <span className="block text-center text-2xl mb-2">{title}</span>
            <section className="flex flex-wrap justify-center m-4 p-4 gap-2">
                {open.title !== "asignProductToUser" &&
                    <>
                        <TextInput
                            originalText={"תעודת זהות"}
                            placeholder={"תעודת זהות"}
                            className={"w-35 !ml-2"}
                            info={open.info.idTeuda}
                            ref={idTeudaeInputRef}
                        />
                        <TextInput
                            originalText={"שם משתמש"}
                            placeholder={"שם משתמש"}
                            className={"w-35"}
                            info={open.info.username}
                            ref={usernameInputRef}
                        />
                        <TextInput
                            originalText={"שם"}
                            placeholder={"שם"}
                            className={"w-35 !ml-2"}
                            info={open.info.name}
                            ref={nameInputRef}
                        />
                        {open.title === 'add' && <TextInput
                            originalText={"סיסמא"}
                            placeholder={"סיסמא"}
                            className={"w-56"}
                            password={true}
                            ref={passwordInputRef}
                        />}
                        <TextInput
                            originalText={"מייל"}
                            placeholder={"מייל"}
                            className={"w-35 !ml-2"}
                            info={open.info.email}
                            ref={emailInputRef}
                        />
                        <TextInput
                            originalText={"מספר פלאפון"}
                            placeholder={"מספר פלאפון"}
                            className={"w-35"}
                            info={open.info.phoneNumber}
                            ref={phoneNumberInputRef}
                        />
                        <TextInput
                            originalText={"כתובת"}
                            placeholder={"כתובת"}
                            className={"w-35 !ml-2"}
                            info={open.info.address}
                            ref={addressInputRef}
                        />

                        <SelectInput
                            type={open.title === 'add' ? 'אופן תשלום' : open.info.paymentType}
                            className={"!w-56"}
                            selectedValue={selectedPaymentType}
                            setSelectedValue={setSelectedPaymentType}
                        />
                    </>
                }
                {open.title === "asignProductToUser" && !isLoading ?
                    <MultipleAutocomplete
                        options={products?.map(
                            (product) => ({
                                label: product?.productName,
                                id: product?._id,
                            })
                        )}
                        onChange={asignProductToUserOnChange}
                        placeholder={"מוצרים"}
                        isLoading={isLoading}
                        label={"מוצרים"}
                    />
                    : <Spinner />
                }

            </section>

            <section className="flex items-end flex-col p-2">
                <IconButton
                    className="!text-white !bg-green !text-3xl"
                    onClick={submitHandler}
                >
                    <MdDone />
                </IconButton>
            </section>
        </>
    );
};

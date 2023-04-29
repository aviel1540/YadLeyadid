import React, { useRef, useState } from "react";
import * as toastMessages from "~/utils/notification";
import { IconButton } from "@mui/material";
import { MdDone } from "react-icons/md";
import { TextInput } from "../logic/TextInput";
import { useAddUser } from "~/hooks/useUsers";
import { SelectInput } from "../logic/SelectInput";

export const Form = ({ title, setOpen, open, refetch }) => {
    const [selectedValue, setSelectedValue] = useState("")

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
                    !address || !selectedValue) {
                    toastMessages.info("נא למלא את כל השדות.");
                    return;
                }
                const addUser = {
                    idTeuda, username,
                    name, password,
                    email, phoneNumber,
                    address, paymentType: selectedValue
                };
                addMutateUser(addUser);
            }
        } catch (err) {
            toastMessages.error(err);
        }
    };

    return (
        <>
            <span className="block text-center text-2xl mb-2">{title}</span>
            <section className="flex flex-wrap justify-center m-4 p-4 gap-2">
                <TextInput
                    originalText={"תעודת זהות"}
                    placeholder={"תעודת זהות"}
                    className={"w-35 !ml-2"}
                    ref={idTeudaeInputRef}
                />
                <TextInput
                    originalText={"שם משתמש"}
                    placeholder={"שם משתמש"}
                    className={"w-35"}
                    ref={usernameInputRef}
                />
                <TextInput
                    originalText={"שם"}
                    placeholder={"שם"}
                    className={"w-35 !ml-2"}
                    ref={nameInputRef}
                />
                <TextInput
                    originalText={"סיסמא"}
                    placeholder={"סיסמא"}
                    className={"w-35"}
                    ref={passwordInputRef}
                />
                <TextInput
                    originalText={"מייל"}
                    placeholder={"מייל"}
                    className={"w-35 !ml-2"}
                    ref={emailInputRef}
                />
                <TextInput
                    originalText={"מספר פלאפון"}
                    placeholder={"מספר פלאפון"}
                    className={"w-35"}
                    ref={phoneNumberInputRef}
                />
                <TextInput
                    originalText={"כתובת"}
                    placeholder={"כתובת"}
                    className={"w-35 !ml-2"}
                    ref={addressInputRef}
                />

                <SelectInput type={"אופן תשלום"} className={"!w-56"} selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
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

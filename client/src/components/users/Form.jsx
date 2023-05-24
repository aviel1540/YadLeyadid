import { Button } from "@mui/material";
import { useRef, useState } from "react";
import { useProducts } from "~/hooks/useProducts";
import { useAddUser, useUpdateUser } from "~/hooks/useUsers";
import * as toastMessages from "~/utils/notification";
import { TextInput, SelectInput, MultipleAutocomplete } from "../logic";
import { Spinner } from "../ui/Spinner";
import { paymentTypes } from "~/constants/PaymentTypes";
import { ProductPlace } from "~/constants/productPlace";

export const Form = ({ setOpen, open, refetch }) => {
    const [selectedPaymentType, setSelectedPaymentType] = useState("")
    const [selectedAssign, setSelectedAssign] = useState("")

    const textBtn = open.title === "add" ? "הוספת לקוח" : "שיוך ללקוח";

    const { data: products, isLoading } = useProducts();

    const activeProducts = products?.filter((p) => p.place != ProductPlace.LOANED)

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
            <h1 className="block text-center text-2xl mb-2">{open.content}</h1>
            <main className="flex flex-wrap justify-center m-4 p-4 gap-2">
                {open.title !== "asignProductToUser" &&
                    <>
                        <TextInput
                            originalText={"שם"}
                            placeholder={"שם"}
                            className={"w-35 !ml-2"}
                            info={open.info.name}
                            ref={nameInputRef}
                        />
                        <TextInput
                            originalText={"שם משתמש"}
                            placeholder={"שם משתמש"}
                            className={"w-35"}
                            info={open.info.username}
                            ref={usernameInputRef}
                        />
                        <TextInput
                            originalText={"תעודת זהות"}
                            placeholder={"תעודת זהות"}
                            className={"w-35 !ml-2"}
                            info={open.info.idTeuda}
                            ref={idTeudaeInputRef}
                        />
                        {open.title === 'add' &&
                            <TextInput
                                originalText={"סיסמא"}
                                placeholder={"סיסמא"}
                                className={"w-56"}
                                password={true}
                                ref={passwordInputRef}
                            />}
                        <TextInput
                            originalText={"מספר פלאפון"}
                            placeholder={"מספר פלאפון"}
                            className={"w-35"}
                            info={open.info.phoneNumber}
                            ref={phoneNumberInputRef}
                        />
                        <TextInput
                            originalText={"מייל"}
                            placeholder={"מייל"}
                            className={"w-35 !ml-2"}
                            info={open.info.email}
                            ref={emailInputRef}
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
                            selectedValue={selectedPaymentType}
                            className={"!w-56 sm!w-full"}
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
                    </>
                }
                {open.title === "asignProductToUser" && !isLoading ?
                    <MultipleAutocomplete
                        options={activeProducts?.map(
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
                    : open.title === "asignProductToUser" && <Spinner />
                }

            </main>

            <div className="flex justify-end p-2">
                {open.title === "edit" ?
                    <Button
                        className="!text-white w-2/5 h-8 !bg-blue/80 !text-lg hover:!bg-blue"
                        onClick={submitHandler}
                    >
                        עדכון לקוח
                    </Button>
                    :
                    <Button
                        className="!text-white w-2/5 h-8 !bg-green/80 !text-lg hover:!bg-green"
                        onClick={submitHandler}
                    >
                        {textBtn}
                    </Button>
                }
            </div>
        </>
    );
};

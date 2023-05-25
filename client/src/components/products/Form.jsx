import { Button, IconButton } from "@mui/material";
import { useRef } from "react";
import { useAddProduct, useUpdateProduct } from "~/hooks/useProducts";
import * as toastMessages from "~/utils/notification";
import { TextInput } from "../logic/TextInput";
import { BsFillSendCheckFill } from "react-icons/bs";

export const Form = ({ title, setOpen, open, refetch }) => {
    const productNameInputRef = useRef();

    const { mutate: addMutateProduct } = useAddProduct(
        setOpen,
        open,
        refetch
    );

    const { mutate: updateMutateProduct } = useUpdateProduct(
        setOpen,
        open,
        refetch
    );
    const submitHandler = async (e) => {
        e.preventDefault();

        const productName = productNameInputRef?.current?.value;

        try {
            if (open.title === "add") {
                if (!productName) {
                    toastMessages.info("נא למלא השדה.");
                    return;
                }
                const addProduct = { productName };
                addMutateProduct(addProduct);
            }
            else if (open.title === "edit") {
                const updateProduct = { id: open.id, productName };
                updateMutateProduct(updateProduct);
            }
        } catch (err) {
            toastMessages.error(err);
        }
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2">{title}</h1>
            <main className="flex flex-wrap justify-center m-4 p-4 gap-2">

                <TextInput
                    originalText={"שם המוצר"}
                    placeholder={"שם המוצר"}
                    className={"w-35 !ml-2"}
                    info={open.info.productName}
                    ref={productNameInputRef}
                />
            </main>
            <div className="flex justify-end p-2">
                <IconButton >
                    <BsFillSendCheckFill
                        onClick={submitHandler}
                        color={`${open.title === "edit" ? "#1fb6ff" : "#13ce66"}`}
                        className="text-3xl" />
                </IconButton>
            </div>
        </>
    );
};

import React, { useRef } from "react";
import * as toastMessages from "~/utils/notification";
import { IconButton } from "@mui/material";
import { MdDone } from "react-icons/md";
import { TextInput } from "../logic/TextInput";
import { useAddProduct, useUpdateProduct } from "~/hooks/useProducts";

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
            <span className="block text-center text-2xl mb-2">{title}</span>
            <section className="flex flex-wrap justify-center m-4 p-4 gap-2">

                <TextInput
                    originalText={"שם המוצר"}
                    placeholder={"שם המוצר"}
                    className={"w-35 !ml-2"}
                    info={open.info.productName}
                    ref={productNameInputRef}
                />
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

import { Button } from "@mui/material";
import { useRef } from "react";
import { useAddProduct, useUpdateProduct } from "~/hooks/useProducts";
import * as toastMessages from "~/utils/notification";
import { TextInput } from "../logic/TextInput";

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
            <div className="flex justify-center p-2">
                {open.title === "edit" ?
                    <Button
                        className="!text-white w-1/2 !ml-4 h-8 !bg-blue/80 !text-lg hover:!bg-blue"
                        onClick={submitHandler}
                    >
                        עדכון מוצר
                    </Button>
                    :
                    <Button
                        className="!text-white w-1/2 !ml-4 h-8 !bg-green/80 !text-lg hover:!bg-green"
                        onClick={submitHandler}
                    >
                        הוספת מוצר
                    </Button>
                }
            </div>
        </>
    );
};

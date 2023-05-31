import { Button, IconButton } from "@mui/material";
import { useRef } from "react";
import { useAddProduct, useUpdateProduct } from "~/hooks/useProducts";
import { error } from "~/utils/notification";
import { TextInput } from "../logic/TextInput";
import { BsFillSendCheckFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { replace } from "~/utils/replace";

export const Form = ({ setOpen, open, refetch, title, content }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const { mutate: addMutateProduct } = useAddProduct(setOpen, open, refetch);

    const { mutate: updateMutateProduct } = useUpdateProduct(setOpen, open, refetch);

    const onSubmit = async (data) => {
        const { productName } = data;

        try {
            if (title === "add") {
                const addProduct = { productName };
                addMutateProduct(addProduct);
            }
            else if (title === "edit") {
                const updateProduct = { id: open.id, productName };
                updateMutateProduct(updateProduct);
            }
        } catch (err) {
            error(err);
        }
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2">{content}</h1>
            <main className="flex flex-wrap justify-center m-4 p-4 gap-4">
                <label htmlFor="productName" className="block text-sm font-semibold mt-1">שם מוצר:
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        defaultValue={title === "edit" ? replace(open.info.productName) : null}
                        className="block w-full px-5 h-14 border border-gray font-normal rounded-lg"
                        placeholder="שם מוצר"
                        {...register("productName", { required: { value: true, message: "שדה חובה." } })}
                    />
                    <p className="text-red text-sm font-normal">{errors.productName?.message}</p>
                </label>

            </main>
            <div className="flex justify-end p-2">
                <IconButton onClick={handleSubmit(onSubmit)} >
                    <BsFillSendCheckFill
                        color={`${title === "edit" ? "#1fb6ff" : "#13ce66"}`}
                        className="text-3xl" />
                </IconButton>
            </div>
        </>
    );
};

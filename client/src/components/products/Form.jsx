import { useForm } from "react-hook-form";
import { useAddProduct, useUpdateProductLocation } from "~/hooks/useProducts";
import { error, info, replace } from "~/lib";
import { SendIcon } from "../ui";
import { SelectInput } from "../logic";
import { useState } from "react";
import { productPlace } from "~/constants/productPlace";

export const Form = ({ setOpen, open, refetch }) => {
    const { title, content } = open;

    const [selectedPaymentType, setSelectedPaymentType] = useState("")
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { mutate: addProduct } = useAddProduct(setOpen, open, refetch);
    const { mutate: updateProductLocation } = useUpdateProductLocation(setOpen, open, refetch);


    const onSubmit = async (data) => {
        const { productName } = data;

        try {
            if (title === "add") {
                const payload = { productName };
                addProduct(payload);
            }
            else if (title === "edit") {
                if (!selectedPaymentType) {
                    return info('נא לבחור מיקום.')
                }
                const payload = { id: open.id, productPlace: selectedPaymentType };
                updateProductLocation(payload);
            }
        } catch (err) {
            error(err);
        }
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2">{content}</h1>
            <main className="flex flex-wrap justify-center  m-4 p-4 gap-4">
                {title === 'add' ? (
                    <label htmlFor="productName" className="form-label w-1/2">שם מוצר:
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            defaultValue={title === "edit" ? replace(open?.info?.productName) : null}
                            className="form-input w-full"
                            placeholder="שם מוצר"
                            {...register("productName", { required: { value: true, message: "שדה חובה." } })}
                        />
                        <p className="form-p_error">{errors.productName?.message}</p>
                    </label>
                ) : (

                    <label className="form-label">מיקום המוצר:
                        <SelectInput
                            type={open.info.place}

                            selectedValue={selectedPaymentType}
                            className={`!w-[24rem] mb-3`}
                            setSelectedValue={setSelectedPaymentType}
                            data={productPlace?.map(
                                ({ label, id, }) => ({
                                    key: id,
                                    code: label,
                                    name: label,
                                })
                            )}
                            required={true}
                            isLoading={!productPlace ? true : false}
                        />
                    </label>
                )}

            </main>
            <div className="flex justify-end p-2">
                <SendIcon onClick={handleSubmit(onSubmit)} title={title} className="text-3xl" />
            </div>
        </>
    );
};

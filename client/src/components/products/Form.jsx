import { useState } from "react";
import { productPlace } from "~/constants/productPlace";
import { useUpdateProductLocation } from "~/hooks/useProducts";
import { error, info } from "~/lib";
import { SelectInput, SendIcon } from "../logic";

export const Form = ({ setOpen, open, refetch }) => {
    const { title, content } = open;

    const [selectedPaymentType, setSelectedPaymentType] = useState("")

    const { mutate: updateProductLocation } = useUpdateProductLocation(setOpen, open, refetch);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            if (title === "edit") {
                if (!selectedPaymentType) {
                    return info('נא לבחור מיקום.')
                }
                const payload = { id: open.id, productPlace: selectedPaymentType };
                updateProductLocation(payload);
            }
            else throw new Error('')
        } catch (err) {
            error(err?.message);
        }
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2">{content}</h1>
            <main className="flex flex-wrap justify-center  m-4 p-4 gap-4">
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
                        isLoading={!productPlace ? true : false}
                    />
                </label>
            </main>
            <div className="flex justify-end p-2">
                <SendIcon onClick={onSubmit} title={title} className="text-3xl" />
            </div>
        </>
    );
};

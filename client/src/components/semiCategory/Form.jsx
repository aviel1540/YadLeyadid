import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useProducts } from '~/hooks/useProducts';
import { useAddSemiCategory, useAssignProductToSemiCategory, useUpdateSemiCategory } from '~/hooks/useSemiCategory';
import { error, replace } from '~/lib';
import { Input, MultipleAutocomplete, SendIcon } from '../logic';
import { Spinner } from '../ui';

export const Form = ({ setOpen, open, refetch }) => {
    const { title, content } = open;

    const [selectedAssign, setSelectedAssign] = useState([])

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { mutate: addSemiCategory } = useAddSemiCategory(setOpen, open, refetch);
    const { mutate: updateSemiCategory } = useUpdateSemiCategory(setOpen, open, refetch);
    const { mutate: assignProductToSemiCategory } = useAssignProductToSemiCategory(setOpen, open, refetch);

    const { data: products, isLoading } = useProducts();
    const activeProducts = products?.filter((p) => Boolean(!p.inCategory))

    const onSubmit = async (data) => {
        const { name, serialNumber } = data;

        try {
            if (title === "add") {
                const payload = { name, serialNumber };
                addSemiCategory(payload);
            }
            else if (title === "edit") {
                const payload = { id: open.id, name, serialNumber };
                updateSemiCategory(payload);
            }
            else if (title === "asignProductToSemiCategory") {
                if (!selectedAssign || !selectedAssign.length) {
                    info("נא לבחור מוצרים לשיוך.");
                    return;
                }
                const payload = {
                    categoryId: open.id,
                    ids: selectedAssign.map((s) => s.id),
                }
                assignProductToSemiCategory(payload)
            }
            else throw new Error('')
        } catch (err) {
            error(err?.message);
        }
    };

    const asignProductToSemiCategoryOnChange = (_, value) => {
        setSelectedAssign(value);
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2">{content}</h1>
            <main className="form-wrapper">
                {title === 'asignProductToSemiCategory' ?
                    (
                        !isLoading ?
                            <MultipleAutocomplete
                                options={activeProducts?.map(
                                    (product, index) => ({
                                        label: `${index + 1}. ${replace(product?.productName)} `,
                                        id: product?._id,
                                    })
                                )}
                                onChange={asignProductToSemiCategoryOnChange}
                                placeholder={"מוצרים"}
                                isLoading={isLoading}
                                label={"מוצרים"}
                            />
                            : title === "asignProductToSemiCategory" && <Spinner />
                    )
                    :
                    (
                        <>
                            <label htmlFor="serialNumber" className="form-label">מספר סידורי:
                                <Input
                                    type="text"
                                    id="serialNumber"
                                    name="serialNumber"
                                    defaultValue={title === "edit" ? open.info.serialNumber : null}
                                    className="form-input"
                                    placeholder="מספר סידורי"
                                    {...register("serialNumber", { required: { value: true, message: "שדה חובה." } })}
                                />
                                <p className="form-p_error">{errors.serialNumber?.message}</p>
                            </label>

                            <label htmlFor="name" className="form-label ml-6">שם קטגוריה משנית:
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    defaultValue={title === "edit" ? open.info.semiCategoryName : null}
                                    className="form-input"
                                    placeholder="שם קטגוריה משנית"
                                    {...register("name", { required: { value: true, message: "שדה חובה." } })}
                                />
                                <p className="form-p_error">{errors.name?.message}</p>
                            </label>
                        </>
                    )
                }

            </main>
            <div className="flex justify-end p-2">
                <SendIcon
                    onClick={handleSubmit(onSubmit)}
                    title={title}
                    className="text-3xl"
                    isLoading={isLoading}
                />
            </div>
        </>
    )
}

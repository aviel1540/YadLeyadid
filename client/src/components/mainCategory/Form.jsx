import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { error, replace } from '~/lib';
import { useAddMainCategory, useUpdateMainCategory } from '~/hooks/useMainCategory';
import { Input, MultipleAutocomplete, SendIcon } from '../logic';
import { useSemiCategory } from '~/hooks/useSemiCategory';

export const Form = ({ setOpen, open, refetch }) => {
    const { title, content } = open;

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [selectedAssign, setSelectedAssign] = useState([])
    //TODO: add asignMainCategoryToSemiCategoryOnChange to onSubmit

    const { mutate: addMainCategory } = useAddMainCategory(setOpen, open, refetch);
    const { mutate: updateMainCategory } = useUpdateMainCategory(setOpen, open, refetch);

    const { data: semiCategory, isLoading } = useSemiCategory();


    const onSubmit = async (data) => {
        const { mainCategoryName } = data;

        try {
            if (title === "add") {
                const payload = { mainCategoryName };
                addMainCategory(payload);
            }
            else if (title === "edit") {
                const payload = { id: open.id, mainCategoryName };
                updateMainCategory(payload);
            }
        } catch (err) {
            error(err);
        }
    };

    const asignMainCategoryToSemiCategoryOnChange = (_, value) => {
        setSelectedAssign(value);
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2">{content}</h1>
            <main className="flex flex-wrap justify-center  m-4 p-4 gap-4">
                {title === 'asignMainCategoryToSemiCategory' ?
                    (
                        !isLoading ?
                            <MultipleAutocomplete
                                options={semiCategory?.map(
                                    (semi, index) => ({
                                        label: `${index + 1}. ${replace(semi?.semiCategoryName)} `,
                                        id: semi?._id,
                                    })
                                )}
                                // onChange={asignProductToSemiCategoryOnChange}
                                placeholder={"קטגוריות משניות"}
                                isLoading={isLoading}
                                label={"קטגוריות משניות"}
                            />
                            : title === "asignProductToSemiCategory" && <Spinner />
                    )
                    :
                    <label htmlFor="mainCategoryName" className="form-label w-1/2">שם קטגוריה ראשית:
                        <Input
                            type="text"
                            id="mainCategoryName"
                            name="mainCategoryName"
                            defaultValue={title === "edit" ? open.info.mainCategoryName : null}
                            className="form-input w-full"
                            placeholder="שם קטגוריה ראשית"
                            {...register("mainCategoryName", { required: { value: true, message: "שדה חובה." } })}
                        />
                        <p className="form-p_error">{errors.mainCategoryName?.message}</p>
                    </label>
                }
            </main>
            <div className="flex justify-end p-2">
                <SendIcon onClick={handleSubmit(onSubmit)} title={title} className="text-3xl" />
            </div>
        </>
    )
}

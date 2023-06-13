import React from 'react'
import { useForm } from 'react-hook-form';
import { error } from '~/utils';
import { SendIcon } from '../logic';
import { useAddMainCategory, useUpdateMainCategory } from '~/hooks/useMainCategory';

export const Form = ({ setOpen, open, refetch }) => {
    const { title, content } = open;

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { mutate: addMutateMainCategory } = useAddMainCategory(setOpen, open, refetch);
    const { mutate: updateMutateMainCategory } = useUpdateMainCategory(setOpen, open, refetch);


    const onSubmit = async (data) => {
        const { mainCategoryName } = data;

        try {
            if (title === "add") {
                const addMainCategory = { mainCategoryName };
                addMutateMainCategory(addMainCategory);
            }
            else if (title === "edit") {
                const updateMainCategory = { id: open.id, mainCategoryName };
                updateMutateMainCategory(updateMainCategory);
            }
        } catch (err) {
            error(err);
        }
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2">{content}</h1>
            <main className="flex flex-wrap justify-center  m-4 p-4 gap-4">
                <label htmlFor="mainCategoryName" className="form-label w-1/2">שם קטגוריה ראשית:
                    <input
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

            </main>
            <div className="flex justify-end p-2">
                <SendIcon onClick={handleSubmit(onSubmit)} title={title} className="text-3xl" />
            </div>
        </>
    )
}

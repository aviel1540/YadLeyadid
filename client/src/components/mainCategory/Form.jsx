import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { error, info, replace } from '~/lib';
import { useAddMainCategory, useAssignSemiCategoryToMainCategory, useUpdateMainCategory } from '~/hooks/useMainCategory';
import { Input, MultipleAutocomplete, SendIcon } from '../logic';
import { useSemiCategory } from '~/hooks/useSemiCategory';
import { Spinner } from '../ui';

export const Form = ({ setOpen, open, refetch }) => {
    const { title, content } = open;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [selectedAssign, setSelectedAssign] = useState([])

    const { mutate: addMainCategory } = useAddMainCategory(setOpen, open, refetch);
    const { mutate: updateMainCategory } = useUpdateMainCategory(setOpen, open, refetch);
    const { mutate: assignSemiCategoryToMainCategory } = useAssignSemiCategoryToMainCategory(setOpen, open, refetch);

    const { data: semiCategory, isLoading } = useSemiCategory();

    const activeSemiCategory = semiCategory?.filter((p) => Boolean(!p.inMainCategory))


    const onSubmit = async (data) => {
        const { mainCategoryName } = data;

        try {
            if (title === "add") {
                const payload = { mainCategoryName };
                addMainCategory(payload);
            } else if (title === "edit") {
                const payload = { id: open.id, mainCategoryName };
                updateMainCategory(payload);
            } else if (title === "assignSemiCategoryToMainCategory") {
                if (!selectedAssign || !selectedAssign.length) {
                    return info("נא לבחור קטגוריות משניות לשיוך.");
                }
                const payload = {
                    id: open.id,
                    ids: selectedAssign.map((s) => s.id),
                }
                assignSemiCategoryToMainCategory(payload)
            }
            else throw new Error('')
        } catch (err) {
            error(err?.message);
        }
    };

    const assignSemiCategoryToMainCategoryOnChange = (_, value) => {
        setSelectedAssign(value);
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2">{content}</h1>
            <main className="flex flex-wrap justify-center  m-4 p-4 gap-4">
                {title === 'assignSemiCategoryToMainCategory' ?
                    (
                        !isLoading ?
                            <MultipleAutocomplete
                                options={activeSemiCategory?.map(
                                    (semi, index) => ({
                                        label: `${index + 1}. ${replace(semi?.semiCategoryName)} `,
                                        id: semi?._id,
                                    })
                                )}
                                onChange={assignSemiCategoryToMainCategoryOnChange}
                                placeholder={"קטגוריות משניות"}
                                isLoading={isLoading}
                                label={"קטגוריות משניות"}
                            />
                            : title === "assignSemiCategoryToMainCategory" && <Spinner className='' />
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

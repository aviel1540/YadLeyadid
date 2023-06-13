import { useForm } from 'react-hook-form';
import { useUpdateMainCategory } from '~/hooks/useMainCategory';
import { useAddSemiCategory, useUpdateSemiCategory } from '~/hooks/useSemiCategory';
import { error } from '~/utils';
import { SendIcon } from '../logic';

export const Form = ({ setOpen, open, refetch }) => {
    const { title, content } = open;

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { mutate: addMutateSemiCategory } = useAddSemiCategory(setOpen, open, refetch);
    const { mutate: updateMutateSemiCategory } = useUpdateSemiCategory(setOpen, open, refetch);


    const onSubmit = async (data) => {
        const { name, serialNumber } = data;

        try {
            if (title === "add") {
                const addSemiCategory = { name, serialNumber };
                addMutateSemiCategory(addSemiCategory);
            }
            else if (title === "edit") {
                const updateSemiCategory = { id: open.id, name, serialNumber };
                updateMutateSemiCategory(updateSemiCategory);
            }
        } catch (err) {
            error(err);
        }
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2">{content}</h1>
            <main className="form-wrapper">
                <label htmlFor="serialNumber" className="form-label">מספר סידורי
                    <input
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

                <label htmlFor="name" className="form-label ml-6">שם קטגוריה משנית
                    <input
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

            </main>
            <div className="flex justify-end p-2">
                <SendIcon onClick={handleSubmit(onSubmit)} title={title} className="text-3xl" />
            </div>
        </>
    )
}

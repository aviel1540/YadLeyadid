import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RadioButtons, SendIcon } from '~/components/logic'
import { useAddMission, useUpdateMission } from '~/hooks/useMission'
import { useAuthStore } from '~/store/auth'
import { error } from '~/utils/notification'

export const Form = ({ setOpen, open, refetch }) => {
    const { id, content, info } = open;

    const { username } = useAuthStore();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [checked, setChecked] = useState(open.title === "edit" ? info?.completed : false);

    const { mutate: addMutateMission } = useAddMission(setOpen, open, refetch);
    const { mutate: updateMutateMission } = useUpdateMission(setOpen, open, refetch);

    const handleChange = () => setChecked(!checked)

    const onSubmit = (data) => {
        const { title } = data;

        try {
            if (open.title === "add") {
                const addMission = { username, title };
                addMutateMission(addMission);
            }
            else if (open.title === "edit") {
                const editMission = { missionId: id, title, completed: checked };
                updateMutateMission(editMission);
            }
        } catch (err) {
            error(err);
        }
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2">{content}</h1>
            <main className="flex flex-wrap justify-center m-4 p-4 gap-2">
                <label htmlFor="title" className="form-label mt-1 w-1/2">משימה:
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={open.title === "edit" ? info.title : null}
                        className="form-input w-full"
                        placeholder="משימה" {...register("title", { required: { value: true, message: "שדה חובה." } })} />
                    <p className="form-p_error">{errors.title?.message}</p>
                </label>
            </main>
            {open.title === "edit" && <div className='flex justify-center'>
                <RadioButtons
                    title={"האם המשימה הושלמה?"}
                    defaultValue={info?.completed}
                    onChange={handleChange}
                />
            </div>
            }

            <div className="flex justify-end p-2">
                <SendIcon onClick={handleSubmit(onSubmit)} title={open.title} className="text-3xl" />
            </div>
        </>
    )
}

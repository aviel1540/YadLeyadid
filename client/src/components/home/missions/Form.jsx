import { IconButton } from '@mui/material'
import React, { useRef } from 'react'
import { BsFillSendCheckFill } from 'react-icons/bs'
import { TextInput } from '../../logic'
import { useAddMission } from '~/hooks/useMission'
import { error, info } from '~/utils/notification'
import { useAuthStore } from '~/store/auth'
import { useForm } from 'react-hook-form'

export const Form = ({ setOpen, open, refetch, content }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { username } = useAuthStore();


    const { mutate: addMutateMission } = useAddMission(
        setOpen,
        open,
        refetch
    );

    const onSubmit = (data) => {
        const { title } = data;

        try {
            if (open.title === "add") {
                const addMission = { username, title };
                addMutateMission(addMission);
            }

        } catch (err) {
            error(err);
        }
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2">{content}</h1>
            <main className="flex flex-wrap justify-center m-4 p-4 gap-2">
                <label htmlFor="title" className="block text-sm font-semibold mt-1">משימה:
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={open.title === "edit" ? open.info.title : null}
                        className="block w-35 px-5 h-14 border border-gray font-normal rounded-lg"
                        placeholder="משימה" {...register("title", { required: { value: true, message: "שדה חובה." } })} />
                    <p className="text-red text-sm font-normal">{errors.title?.message}</p>
                </label>

            </main>
            <div className="flex justify-end p-2">
                <IconButton onClick={handleSubmit(onSubmit)}>
                    <BsFillSendCheckFill
                        color={`${open.title === "edit" ? "#1fb6ff" : "#13ce66"}`}
                        className="text-3xl" />
                </IconButton>
            </div>
        </>
    )
}

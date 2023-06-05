import { Checkbox, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup } from '@mui/material'
import React, { useRef, useState } from 'react'
import { BsFillSendCheckFill } from 'react-icons/bs'
import { TextInput } from '../../logic'
import { useAddMission } from '~/hooks/useMission'
import { error, info } from '~/utils/notification'
import { useAuthStore } from '~/store/auth'
import { useForm } from 'react-hook-form'

export const Form = ({ setOpen, open, refetch, content }) => {
    console.log("🚀 open:", open)
    const { username } = useAuthStore();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [checked, setChecked] = useState(false);
    const { mutate: addMutateMission } = useAddMission(setOpen, open, refetch);

    const handleChange = () => setChecked(!checked)

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
                        className="block w-full px-5 h-14 border border-gray font-normal rounded-lg"
                        placeholder="משימה" {...register("title", { required: { value: true, message: "שדה חובה." } })} />
                    <p className="text-red text-sm font-normal">{errors.title?.message}</p>
                </label>
            </main>
            {open.title === "edit" && <div className='flex justify-center'>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">האם המשימה הושלמה?</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        required
                        defaultValue={open.info?.completed}
                    >
                        <FormControlLabel value="true" control={<Radio />} label="כן" />
                        <FormControlLabel value="false" control={<Radio />} label="לא" />

                    </RadioGroup>
                </FormControl>
            </div>
            }

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

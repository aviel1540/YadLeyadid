import { IconButton } from '@mui/material'
import React, { useRef } from 'react'
import { BsFillSendCheckFill } from 'react-icons/bs'
import { TextInput } from '../../logic'
import { useAddMission } from '~/hooks/useMission'
import { error, info } from '~/utils/notification'
import { useAuthStore } from '~/store/auth'

export const Form = ({ setOpen, open, refetch }) => {
    const { username } = useAuthStore();

    const titleInputRef = useRef();

    const { mutate: addMutateMission } = useAddMission(
        setOpen,
        open,
        refetch
    );

    const submitHandler = async (e) => {
        e.preventDefault();

        const title = titleInputRef?.current?.value;

        try {
            if (open.title === "add") {
                if (!title) {
                    info("נא למלא את השדה.");
                    return;
                }
                const addMission = { username, title };
                addMutateMission(addMission);
            }

        } catch (err) {
            error(err);
        }
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2">{open.content}</h1>
            <main className="flex flex-wrap justify-center m-4 p-4 gap-2">
                <TextInput
                    originalText={"משימה"}
                    placeholder={"משימה"}
                    className={"w-35 !ml-2"}
                    info={open.info.title}
                    ref={titleInputRef}
                />

            </main>
            <div className="flex justify-end p-2">
                <IconButton>
                    <BsFillSendCheckFill
                        onClick={submitHandler}
                        color={`${open.title === "edit" ? "#1fb6ff" : "#13ce66"}`}
                        className="text-3xl" />
                </IconButton>
            </div>
        </>
    )
}

import React, { useState } from 'react'
import { TextInput } from '../../logic'
import { Button } from '@mui/material'
import { Actions } from './Actions';
import { useMissions } from '~/hooks/useMission';
import { Spinner } from '../../ui/Spinner';
import { useAuthStore } from '~/store/auth';
import { BsThreeDotsVertical } from 'react-icons/bs';

export const Missions = ({ setOpen, open }) => {
    const { username } = useAuthStore();

    const { data: missions, isLoading, refetch } = useMissions(username);

    if (isLoading) return <Spinner />

    return (
        <>
            <main className={`${open.action && "blur-sm"} p-6 w-full ml-5  mt-10 shadow-md shadow-black/10 md:w-full`}>
                <div className='flex justify-between'>
                    <h1 className='text-lg h-8 mb-5 font-bold underline'>משימות</h1>
                    <Button
                        className="!bg-green/90 !h-8 !text-white !rounded-md hover:!bg-green !w-26 !text-sm"
                        onClick={() =>
                            setOpen({
                                ...open,
                                popUp: true,
                                action: true,
                                title: "add",
                                content: "הוספת משימה חדשה"
                            })
                        }
                    >
                        הוספת משימה חדשה
                    </Button>
                </div>
                <ul className="flex flex-col w-full gap-1 mt-3 sm:max-w-md m-auto">
                    {missions?.map((mission, index) => (
                        <div key={mission._id}>
                            <div className='flex justify-around'>
                                <li className='w-full bg-gray-100 dark:bg-white/5 p-3 rounded-md'>{index + 1}. {mission.title}</li>
                                <BsThreeDotsVertical />
                            </div>
                        </div>
                    ))}

                </ul>
            </main>
            {open.action && (
                <Actions
                    open={open}
                    setOpen={setOpen}
                    refetch={refetch}
                />
            )}
        </>
    )
}

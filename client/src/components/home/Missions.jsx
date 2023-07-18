import { IconButton } from '@mui/material';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDeleteForever, MdOutlineModeEdit } from 'react-icons/md';
import { Spinner } from '~/components/ui';
import { useMissions } from '~/hooks/useMission';
import { useAuthStore } from '~/store/auth';
import { Actions } from './Actions';
import { Button } from '../logic';

export const Missions = ({ setOpen, open }) => {
    const { username } = useAuthStore();

    const { data: missions, isLoading, refetch } = useMissions(username);

    const [threeDots, setThreeDots] = useState({
        click: false,
        index: null,
    })

    const handlerThreeDots = (index) => setThreeDots({ ...threeDots, click: !threeDots.click, index })

    if (isLoading) return <Spinner />

    return (
        <>
            <main className={`${open.action && "blur-sm"} p-6 w-full ml-5  mt-10 shadow-md shadow-black/10 md:w-full`}>
                <div className='flex justify-between'>
                    <h1 className='text-lg h-8 mb-5 underline'>משימות</h1>
                    <Button
                        className="bg-green/90 h-8 text-white rounded-md hover:bg-green w-44 text-sm"
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
                                <li className={`w-full p-2 ${mission.completed && "line-through"} `}>{index + 1}. {mission.title}</li>
                                <IconButton onClick={() => handlerThreeDots(index + 1)}>
                                    <BsThreeDotsVertical />
                                </IconButton>
                                {(threeDots.click && threeDots.index === index + 1) &&
                                    <div className='flex justify-around bg-gray-light/40 w-32 rounded-xl'>
                                        <MdDeleteForever color="#E21818" size={25} className='!mt-2 !cursor-pointer' title="מחיקה"
                                            onClick={() =>
                                                setOpen({
                                                    ...open,
                                                    action: true,
                                                    modalDialog: true,
                                                    title: "delete",
                                                    id: mission._id
                                                })
                                            }
                                        />
                                        <MdOutlineModeEdit color="#1fb6ff" size={25} className='!mt-2 !cursor-pointer' title="עריכה"
                                            onClick={() =>
                                                setOpen({
                                                    ...open,
                                                    action: true,
                                                    popUp: true,
                                                    title: "edit",
                                                    content: "עריכת נתונים",
                                                    id: mission._id,
                                                    info: mission,
                                                })
                                            } />
                                    </div>
                                }
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

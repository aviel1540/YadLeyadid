import { IconButton } from '@mui/material'
import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { GiConfirmed } from 'react-icons/gi'
import { MdOutlineCancel } from 'react-icons/md'
import { useWaitConfirmExtensionRequest } from '~/hooks/useProducts'
import { formatDate, replace } from '~/utils'
import { Spinner } from '~/components/ui'

export const Notification = ({ setOpen, open }) => {
    const { data, isLoading, refetch } = useWaitConfirmExtensionRequest()
    console.log("🚀  data:", data)

    const [threeDots, setThreeDots] = useState({
        click: false, index: null,
    })


    const handlerThreeDots = (index) => setThreeDots({ ...threeDots, click: !threeDots.click, index })

    if (isLoading) return <Spinner />

    return (
        <>
            <main className={`${open.action && "blur-sm"} p-6 w-full ml-5  mt-10 shadow-md shadow-black/10 md:w-full`}>
                <div className='flex justify-between'>
                    <h1 className='text-lg h-8 mb-5 underline'>עדכונים</h1>
                </div>
                <ul className="flex flex-col w-full gap-1 mt-3 sm:max-w-md m-auto">
                    {data?.map((extensionRequest, index) => (
                        <div key={extensionRequest.id}>
                            <div className='flex justify-around'>
                                <li className='w-full p-2'>{index + 1}. {" "}
                                    <b>{extensionRequest?.name}</b> {" "}
                                    ביקש הארכה למוצר {" "}
                                    <b>{replace(extensionRequest.productName)}</b>
                                    לתאריך {formatDate(extensionRequest.requestDate)} {" "}
                                    האם לאשר?
                                </li>
                                <IconButton onClick={() => handlerThreeDots(index + 1)}>
                                    <BsThreeDotsVertical />
                                </IconButton>
                                {(threeDots.click && threeDots.index === index + 1) &&
                                    <div className='flex justify-around bg-gray-light/40 w-32 rounded-xl'>
                                        <MdOutlineCancel color='red' size={25} className='!mt-2 !cursor-pointer' title="סירוב"
                                            onClick={() =>
                                                setOpen({
                                                    ...open,
                                                    action: true,
                                                    modalDialog: true,
                                                    title: "cancel",
                                                    id: extensionRequest.id
                                                })
                                            }
                                        />
                                        <GiConfirmed color="green" size={24} className='!mt-2 !cursor-pointer' title="אישור"
                                            onClick={() =>
                                                setOpen({
                                                    ...open,
                                                    action: true,
                                                    popUp: true,
                                                    title: "accept",
                                                    content: "אישור הארכה",
                                                    id: extensionRequest.id,
                                                    info: extensionRequest,
                                                })
                                            } />
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </ul>
            </main>
        </>
    )
}

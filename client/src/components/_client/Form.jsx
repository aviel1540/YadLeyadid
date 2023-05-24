import React, { useState } from 'react'
import { SelectInput } from '../logic/SelectInput'
import { monthsRequest } from '~/constants/monthsRequest';
import { Button } from '@mui/material';
import { useAskExtensionRequest } from '~/hooks/useProducts';

export const Form = ({ open, setOpen }) => {
    const [selectedValue, setSelectedValue] = useState("");


    const { mutate: askExtensionRequest } = useAskExtensionRequest(
        setOpen,
        open,
    );

    return (
        <>
            <span className="block text-center text-2xl mb-2 sm:mt-2 sm:text-xl">
                {open.content}
            </span>
            <main className="flex flex-wrap justify-center m-4 p-4 gap-x-5 gap-y-3">
                <SelectInput
                    type={"בקשת הארכה"}
                    className={"!w-72 sm!w-full"}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    data={monthsRequest?.map(
                        ({ label, id, }) => ({
                            key: id,
                            code: id,
                            name: label,
                        })
                    )}
                    isLoading={!monthsRequest ? true : false}
                />
            </main>
            <div className="flex justify-end p-3">
                <Button
                    className="!text-white w-1/3 h-8 !bg-green/80 !text-lg hover:!bg-green sm:w-full"
                >
                    בצע
                </Button>
            </div>
        </>
    )
}

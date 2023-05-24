import React, { useState } from 'react'
import { SelectInput1 } from '../logic/SelectInput1'
import { monthsRequest } from '~/constants/monthsRequest';
import { Button } from '@mui/material';

export const Form = ({ open, setOpen }) => {
    const [selectedValue, setSelectedValue] = useState("");

    return (
        <>
            <span className="block text-center text-2xl mb-2 sm:mt-2 sm:text-xl">
                {open.content}
            </span>
            <main className="flex flex-wrap justify-center m-4 p-4 gap-x-5 gap-y-3">
                <SelectInput1
                    type={"בקשת הארכה"}
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

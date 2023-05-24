import React, { useState } from 'react'
import { SelectInput } from '../logic/SelectInput'
import { monthsRequest } from '~/constants/monthsRequest';
import { Button } from '@mui/material';
import { useAskExtensionRequest } from '~/hooks/useProducts';
import { error, info } from '~/utils/notification';
import { replace } from '~/utils/replace';

export const Form = ({ open, setOpen, refetch }) => {
    const [selectedValue, setSelectedValue] = useState("");


    const { mutate: askExtensionRequest } = useAskExtensionRequest(
        setOpen,
        open,
        refetch
    );


    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            if (open.title === "extensionRequest") {
                const askExtension = { id: open.id };
                askExtensionRequest(askExtension);
            }


        } catch (err) {
            error(err);
        }
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2 sm:mt-2 sm:text-xl">
                {open.content}
            </h1>
            <div className='flex justify-center p-4'>
                <span className='text-lg'>האם לשלוח בקשת הארכה למוצר <span className='font-bold'>{replace(open.info?.productName)}</span>?</span>
            </div>
            {/* <main className="flex flex-wrap justify-center m-4 p-4 gap-x-5 gap-y-3">
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
            </main> */}
            <div className="flex justify-end p-3">
                <Button className="!text-white w-1/3 h-8 !bg-green/80 !text-lg hover:!bg-green sm:w-full" onClick={submitHandler}>
                    שלח
                </Button>
            </div>
        </>
    )
}

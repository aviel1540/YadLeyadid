import { Button, TextField } from '@mui/material';
import { useRef } from 'react';
import { useAskExtensionRequest } from '~/hooks/useProducts';
import { formatDate } from '~/utils/formatDate';
import { error, info } from '~/utils/notification';
import { replace } from '~/utils/replace';

export const Form = ({ open, setOpen, refetch }) => {
    const dateInputRef = useRef();

    const { mutate: askExtensionRequest } = useAskExtensionRequest(
        setOpen,
        open,
        refetch
    );


    const submitHandler = async (e) => {
        e.preventDefault();

        const date = dateInputRef?.current?.value;

        try {
            if (open.title === "extensionRequest") {
                if (date === formatDate(new Date(Date.now()), "yyyy-MM-dd")) {
                    info("נא לבחור תאריך הארכה.")
                    return;
                }
                const askExtension = { id: open.id, date };
                askExtensionRequest(askExtension);
            }

        } catch (err) {
            error(err);
        }
    };

    return (
        <>
            <h1 className="block text-center text-2xl mb-2 sm:mt-2 sm:text-xl font-bold underline">
                {open.content}
            </h1>
            <div className='flex flex-wrap justify-center m-4 p-4 gap-2'>
                <span className='text-lg'>נא לבחור תאריך הארכה למוצר <span className='underline'>{replace(open.info?.productName)}</span></span>
                <TextField type='date' className='!w-8/12 !mt-3 sm:!w-full' inputRef={dateInputRef} defaultValue={formatDate(new Date(Date.now()), "yyyy-MM-dd")} />
            </div>
            <div className="flex justify-end p-3">
                <Button className="!text-white w-1/3 h-8 !bg-green/80 !text-lg hover:!bg-green sm:w-full" onClick={submitHandler}>
                    שלח
                </Button>
            </div>
        </>
    )
}

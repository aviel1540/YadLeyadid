import { TextField } from '@mui/material';
import { useRef } from 'react';
import { useAskExtensionRequest } from '~/hooks/useProducts';
import { error, formatDate, replace } from '~/lib';
import { SendIcon } from '../logic';

export const Form = ({ open, setOpen, refetch }) => {
  const { content, info, edit } = open;

  const dateInputRef = useRef();

  const { mutate: askExtensionRequest } = useAskExtensionRequest(setOpen, open, refetch);

  const submitHandler = async (e) => {
    e.preventDefault();

    const date = dateInputRef?.current?.value;

    try {
      if (open.title === 'extensionRequest') {
        if (date === formatDate(new Date(Date.now()), 'yyyy-MM-dd')) {
          return info('נא לבחור תאריך הארכה.');
        }
        const payload = { id: info.id, date };
        askExtensionRequest(payload);
      } else throw new Error('');
    } catch (err) {
      error(err?.message);
    }
  };

  return (
    <>
      <h1 className="block text-center text-2xl mb-2">{content}</h1>
      <div className="flex flex-wrap justify-center m-4 p-4 gap-2 ">
        <span className="text-lg sm:text-base">
          נא לבחור תאריך הארכה למוצר <b>{replace(open.info?.productName)}</b>
        </span>
        <TextField
          type="date"
          className="!w-8/12 !mt-3 sm:!w-full"
          inputRef={dateInputRef}
          defaultValue={formatDate(new Date(info?.loanReturn), 'yyyy-MM-dd')}
          InputProps={{ inputProps: { min: formatDate(new Date(info?.loanReturn), 'yyyy-MM-dd') } }}
        />
      </div>
      <div className="flex justify-end p-3">
        <SendIcon onClick={submitHandler} title={edit} className="text-3xl" />
      </div>
    </>
  );
};

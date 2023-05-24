import React from 'react'
import { useUserByUsername } from '~/hooks/useUsers';
import { Spinner } from '../ui/Spinner';
import { formatDate } from '~/utils/formatDate';
import { Button } from '@mui/material';
import { Actions } from './Actions';
import { replace } from '~/utils/replace';

export const ProductDetails = ({ username, open, setOpen }) => {
    const { data: details, isLoading, refetch } = useUserByUsername(username);


    if (isLoading) return <Spinner />;

    return (
        <>
            <main className={`${open.action && "blur-sm"}`}>
                <div className='flex justify-start mr-11 -mb-16 mt-10'>
                    <h1 className='text-lg'>המוצרים שלי:</h1>
                </div>
                <div className="grid justify-between grid-cols-4 gap-2 p-8 mt-10 xl:grid-cols-3 lg:grid-cols-2 sm:ml-6 sm:grid-cols-1 sm:gap-5 sm:p-3">
                    {details?.userProductList?.map((product) => (
                        <section
                            className="max-w-sm p-6 m-3 w-4/5 text-center shadow-lg shadow-black/40 bg-white border rounded-lg lg:w-full"
                            key={product._id}
                        >
                            <label className="text-2xl font-semibold">
                                {replace(product.productName)}
                            </label>

                            <div className='mt-5'>
                                <label className="text-base">
                                    תאריך השאלה: {" "}
                                    {formatDate(product.loanDate)}
                                </label>
                            </div>
                            <div>
                                <label className="text-base">
                                    תאריך החזרה: {" "}
                                    {formatDate(product.loanReturn)}
                                </label>
                            </div>
                            <div className='mt-6'>
                                <Button className={`!w-36 !text-white ${product.requestAlert ? "!bg-orange/70" : "!bg-orange"}  !border`}
                                    onClick={() => setOpen({
                                        ...open,
                                        popUp: true,
                                        action: true,
                                        title: "extensionRequest",
                                        content: "בקשת הארכה",
                                        id: product._id,
                                        info: product
                                    })}
                                    disabled={product.requestAlert}
                                >
                                    {product.requestAlert ? "נשלחה בקשה" : "בקשת הארכה"}
                                </Button>
                            </div>
                        </section>
                    ))}
                </div>
            </main>
            {open.action && <Actions open={open} setOpen={setOpen} refetch={refetch} />}
        </>
    )
}

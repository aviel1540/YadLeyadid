import React, { useState } from 'react'
import { useUserByUsername } from '~/hooks/useUsers';
import { Spinner } from '../ui/Spinner';
import { formatDate } from '~/utils/formatDate';
import { Button } from '@mui/material';
import { Actions } from './Actions';

export const ProductDetails = ({ username, open, setOpen }) => {


    const { data: details, isLoading, } = useUserByUsername(username);

    if (isLoading) return <Spinner />;

    return (
        <>
            <main className={`${open.action && "blur-sm"}`}>
                <div className='flex justify-start mr-11 -mb-16 mt-10'>
                    <h1 className='text-lg'>המוצרים שלי:</h1>
                </div>
                <div className="grid grid-cols-4 gap-2 p-8 justify-between mt-10 lg:flex lg:flex-col">
                    {details?.userProductList?.map((product) => (
                        <section
                            className="max-w-sm p-6 m-3 w-4/5 text-center  shadow-lg shadow-black/40 bg-white border  rounded-lg lg:w-11/12"
                            key={product._id}
                        >
                            <span className="text-2xl font-semibold text-gray-800">
                                {product.productName.replace(/[^א-ת]+/g, ' ')}
                            </span>
                            <div>
                                <span className="text-base font-semibold">
                                    תאריך השאלה: {" "}
                                    {formatDate(product.loanDate)}
                                </span>
                            </div>
                            <div>
                                <span className="text-base font-semibold">
                                    תאריך החזרה: {" "}
                                    {formatDate(product.loanReturn)}
                                </span>
                            </div>
                            <div className='mt-6'>
                                <Button className="!w-36 !text-white !bg-orange !border"
                                    onClick={() => setOpen({
                                        ...open,
                                        popUp: true,
                                        action: true,
                                        title: "extensionRequest",
                                        content: "בקשת הארכה",
                                        id: product._id,
                                    })}
                                >
                                    בקשת הארכה
                                </Button>
                            </div>
                        </section>
                    ))}
                </div>
            </main>
            {open.action && <Actions open={open} setOpen={setOpen} />}
        </>
    )
}

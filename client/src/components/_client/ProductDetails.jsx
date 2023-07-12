import React from 'react'
import { useUserByUsername } from '~/hooks/useUsers';
import { Spinner } from '../ui';
import { formatDate, replace } from '~/lib';
import { Button } from '@mui/material';
import { Actions } from './Actions';

export const ProductDetails = ({ username, open, setOpen }) => {
    const { data: details, isLoading, refetch } = useUserByUsername(username);
    console.log("🚀 details:", details)


    if (isLoading) return <Spinner />;

    return (
        <>
            <main className={`${open.action && "blur-sm"}`}>
                <div className='flex justify-start mr-11 -mb-16 mt-10'>
                    <h1 className='text-lg'>המוצרים שלי:</h1>
                </div>

                {details?.length > 1 &&
                    <div className='flex justify-center mt-20'>
                        <span className='text-lg text-red justify-center'>לא קיימים מוצרים.</span>
                    </div>}

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
                                <label className={`text-base ${product.extensionRequest && "text-green"}`}>
                                    {product.extensionRequest ? 'תאריך החזרה המעודכן:' : 'תאריך החזרה:'} {" "}
                                    {formatDate(product.loanReturn)}
                                </label>
                            </div>
                            <div>
                                <label className={`text-base text-red ${!product.requestDate && "invisible"}`}>
                                    תאריך הארכה: {" "}
                                    {formatDate(product.requestDate)}
                                </label>
                            </div>
                            {(!product.requestDate && !product.extensionRequest === undefined || !product.extensionRequest) && <p className='text-sm text-red'>לא אושרה הארכה.</p>}
                            <div className='mt-6'>
                                <Button className={`!w-44 !text-white ${product.requestDate ? "!bg-orange/70" : "!bg-orange"}  !border`}
                                    onClick={() => setOpen({
                                        ...open,
                                        popUp: true,
                                        action: true,
                                        title: "extensionRequest",
                                        content: "בקשת הארכה",
                                        id: product._id,
                                        info: product
                                    })}
                                    disabled={product.requestDate ? true : false}
                                >
                                    {product.requestDate ? "נשלחה בקשה להארכה" : "בקשת הארכה"}
                                </Button>
                                {product.requestDate && <p className='text-sm mt-3'>ברגע שהבקשה תאושר הטקסט יצבע בירוק.</p>}

                            </div>
                        </section>
                    ))}
                </div>
            </main>
            {open.action &&
                <Actions
                    open={open}
                    setOpen={setOpen}
                    refetch={refetch}
                />
            }
        </>
    )
}

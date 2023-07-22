import { Button } from '@mui/material';
import { RequestStatus } from '~/constants/requestStatus';
import { useUserByUsername } from '~/hooks/useUsers';
import { formatDate, replace } from '~/lib';
import { PopUp, Spinner } from '../ui';
import { Form } from './Form';

export const ProductDetails = ({ username, open, setOpen }) => {
    const { data: details, isLoading, refetch } = useUserByUsername(username);

    if (isLoading) return <Spinner className='mt-32' />;

    return (
        <>
            <main className={`${open.action && "blur-sm"}`}>

                {details?.userProductList?.length  ?
                    <div className='flex justify-start mr-11 -mb-16 mt-10'>
                        <h1 className='text-lg'>המוצרים שלי:</h1>
                    </div>
                    :
                    <div className='flex justify-center mt-20'>
                        <span className='text-lg text-red justify-center'>לא קיימים מוצרים.</span>
                    </div>
                }

                <div className="grid justify-between grid-cols-4 gap-2 p-8 mt-10 xl:grid-cols-3 lg:grid-cols-2 sm:ml-6 sm:grid-cols-1 sm:gap-5 sm:p-3">
                    {details?.userProductList?.map((product) => (
                        <section
                            className="max-w-sm p-6 m-3 w-4/5 text-center shadow-lg shadow-black/40 bg-white border rounded-lg lg:w-full"
                            key={product.id}
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
                                <label className={`text-base ${product.extensionRequest === RequestStatus.ACCEPT && "text-green"}`}>
                                    {product.extensionRequest === RequestStatus.ACCEPT ? 'תאריך החזרה המעודכן:' : 'תאריך החזרה:'} {" "}
                                    {formatDate(product.loanReturn)}
                                </label>
                            </div>
                            <div>
                                <label className={`text-base text-orange ${!product.requestDate && "invisible"}`}>
                                    תאריך הארכה: {" "}
                                    {formatDate(product.requestDate)}
                                </label>
                            </div>
                            {product.extensionRequest === RequestStatus.REJECT &&
                                <p className='text-sm text-red'>לא אושרה הארכה.</p>
                            }
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
                <PopUp setOpen={setOpen} open={open}>
                    <Form
                        refetch={refetch}
                        setOpen={setOpen}
                        open={open}
                    />
                </PopUp>
            }
        </>
    )
}

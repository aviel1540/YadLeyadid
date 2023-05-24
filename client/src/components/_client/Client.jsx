import { useAuthStore } from '~/store/auth';
import { Header } from './Header';
import { ProductDetails } from './ProductDetails';
import { useState } from 'react';

export const Client = () => {
    const { name, username } = useAuthStore();
    const [open, setOpen] = useState({
        action: false,
        popUp: false,
        modalDialog: false,
        title: "",
        content: "",
        id: "",
    });

    return (
        <>
            <main className={`${open.action && "blur-sm"}`}>
                <Header />
                <div className="flex justify-center">
                    <h1 className="text-2xl pt-6 underline">ברוך הבא - {name} 👋</h1>
                </div>
            </main>
            <ProductDetails username={username} open={open} setOpen={setOpen} />
        </>
    )
}

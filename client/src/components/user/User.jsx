import { useOpen } from '~/hooks/useOpen';
import { useAuthStore } from '~/store/auth';
import { Header } from './Header';
import { ProductDetails } from './ProductDetails';

export const User = () => {
    const { name, username } = useAuthStore();

    const [open, setOpen] = useOpen();

    return (
        <>
            <main className={`${open.action && "blur-sm"}`}>
                <Header />
                <div className="flex justify-center">
                    <h1 className="text-2xl pt-6 underline">שלום {name} 👋</h1>
                </div>
            </main>
            <ProductDetails username={username} open={open} setOpen={setOpen} />
        </>
    )
}

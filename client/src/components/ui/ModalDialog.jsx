import { Button } from "../logic";

export const ModalDialog = ({ title, setOpen, open, onClick }) => {
    return (
        <main
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center text-black z-50"
            onClick={() => {
                setOpen({ ...open, modalDialog: false, action: false });
            }}
        >
            <section className="bg-white w-full flex flex-col shadow-md shadow-black/80 border rounded-lg relative max-w-xl sm:w-3/4">
                <div
                    className="absolute text-2xl font-bold cursor-pointer text-black z-50 right-2"
                    onClick={() => setOpen({ ...open, modalDialog: false })}
                >
                    &times;
                </div>
                <div className="p-4 mb-8 text-black flex justify-center">
                    <span className="text-black text-2xl">{title}</span>
                </div>
                <div className="p-2 flex justify-center items-center">
                    <Button
                        className="w-6/12 font-bold text-black"
                        onClick={() => setOpen({ ...open, modalDialog: false })}
                        title='סגור'
                    />

                    <Button
                        className="w-6/12 font-bold rounded-lg text-red hover:bg-red/70 hover:text-white"
                        onClick={() => {
                            onClick();
                            setOpen({ ...open, modalDialog: false });
                        }}
                        title='כן'
                    />

                </div>
            </section>
        </main>
    );
};


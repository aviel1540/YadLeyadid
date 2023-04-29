import { Button } from "@mui/material";

export const ModalDialog = ({ title, setOpen, open, onClick }) => {
    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center  bg-black/60 text-black z-50"
            onClick={() => {
                setOpen({ ...open, modalDialog: false, action: false });
            }}
        >
            <div className="bg-white w-full flex flex-col relative max-w-xl rounded-3xl	sm:w-3/4">
                <div
                    className="absolute text-2xl font-bold cursor-pointer text-black z-50 right-2"
                    onClick={() => setOpen({ ...open, modalDialog: false })}
                >
                    &times;
                </div>
                <div className="p-4 text-black flex justify-center">
                    <span className="text-black text-2xl">{title}</span>
                </div>
                <div className="p-2 flex justify-center items-center">
                    <Button
                        color="primary"
                        className="!w-6/12 !font-bold"
                        onClick={() => setOpen({ ...open, modalDialog: false })}
                    >
                        סגור
                    </Button>
                    <Button
                        color="error"
                        className="!w-6/12 !font-bold"
                        onClick={() => {
                            onClick();
                            setOpen({ ...open, modalDialog: false });
                        }}
                    >
                        כן
                    </Button>
                </div>
            </div>
        </div>
    );
};


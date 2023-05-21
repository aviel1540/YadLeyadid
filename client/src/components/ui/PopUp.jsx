import React from "react";
import { motion } from "framer-motion"

export const PopUp = ({ children, setOpen, open }) => {
    return (
        <>

            <div className="fixed top-0  left-0 w-full h-full flex items-center justify-center   z-50">
                <div className="bg-white w-3/4 flex flex-col max-w-xl shadow-lg shadow-black border rounded-lg relative sm:overflow-y-scroll sm:w-3/4 sm:h-5/12 ">
                    <div
                        className="absolute text-3xl font-bold cursor-pointer text-black z-50 right-2"
                        onClick={() => {
                            setOpen({ ...open, popUp: false, action: false, id: "", info: {} });
                        }}
                    >
                        &times;
                    </div>
                    {children}
                </div>
            </div>

        </>
    );
};

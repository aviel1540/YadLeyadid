import React from "react";

export const SquareInfo = ({ content, total, icon, style }) => {
    return (
        <div className="w-48 h-40 text-black flex items-center justify-center flex-col border border-gray rounded-2xl shadow-xl" style={{ backgroundColor: style }}>
            <span className="text-3xl my-2 mx-auto bg-white/5 rounded-xl shadow-white/20 shadow-md">{icon}</span>
            <span className="block text-center text-2xl">{total}</span>
            <span className="text-center block text-base">{content}</span>
        </div>
    );
};


import { cn } from "~/lib";

export const SquareInfo = ({ content, total, icon, style, className }) => {
    return (
        <div className={cn("flex flex-col items-center justify-center shadow-lg shadow-black/50 w-48 h-40 text-black  border border-gray rounded-2xl", className)} style={{ backgroundColor: style }}>
            <span className="text-3xl my-2 mx-auto bg-white/5 rounded-xl shadow-white/20 shadow-md">{icon}</span>
            <span className="block text-center text-2xl">{total}</span>
            <span className="text-center block text-base">{content}</span>
        </div>
    );
};


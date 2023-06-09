import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "~/store/auth";

export const Header = () => {
    const { logoutStore, username } = useAuthStore();

    const location = useLocation();

    const [click, setClick] = useState({
        home: false,
        details: false,
    })


    useEffect(() => {
        const path = location.pathname;

        if (path === "/client") {
            setClick({ ...click, home: true });
        }
        else if (path === `/details/${username}`) {
            setClick({ ...click, details: true });
        }

    }, [])

    return (
        <header>
            <nav className="pt-3  pr-5 text-lg sm:text-base sm:pr-0">
                <ul className="flex justify-start max-w-screen-xl p-5 ml-5  gap-x-6 sm:gap-x-4 sm:p-2 sm:mr-2">
                    <li>
                        <Link to="/client" className={`${click.home && "underline decoration-orange decoration-wavy"}`}>בית</Link>
                    </li>
                    <li>
                        <Link to={`/details/${username}`} className={`${click.details && "underline decoration-orange decoration-wavy"}`}>פרטים אישיים</Link>
                    </li>
                    <li className="absolute left-0 ml-10 sm:ml-4">
                        <span className="cursor-pointer" onClick={() => logoutStore()}>יציאה</span>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
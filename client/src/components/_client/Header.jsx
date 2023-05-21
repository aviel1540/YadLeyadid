import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "~/store/auth";

export const Header = () => {
    const { logoutStore, username } = useAuthStore();

    const location = useLocation();

    const [click, setClick] = useState({
        home: false,
        incomes: false,
        statistics: false,
    })


    useEffect(() => {
        const path = location.pathname;

        if (path === "/client") {
            setClick({ ...click, home: true });
        }
        else if (path === `/details/${username}`) {
            setClick({ ...click, incomes: true });
        }
        else if (path === "/statistics") {
            setClick({ ...click, statistics: true });
        }
    }, [])

    return (
        <header>
            <nav className="pt-3  pr-5 text-lg sm:text-base sm:pr-0">
                <ul className="flex justify-start max-w-screen-xl p-5 ml-5  text-orange gap-x-6   sm:gap-x-4 sm:p-2 sm:mr-2">
                    <li>
                        <Link to="/client" className={`${click.home && "underline decoration-purple decoration-wavy"}`}>בית</Link>
                    </li>
                    <li>
                        <Link to={`/details/${username}`} className={`${click.incomes && "underline decoration-purple decoration-wavy"}`}>פרטים אישיים</Link>
                    </li>
                    <li className="absolute left-0 ml-10 sm:ml-4">
                        <button onClick={() => logoutStore()}>יציאה</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
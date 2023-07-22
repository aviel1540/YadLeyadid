import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '~/store/auth';

export const NotFound = () => {
    const { isLoggedIn, isAdmin } = useAuthStore();

    const [timer, setTimer] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (timer > 1) setTimer((prev) => prev - 1);
            else {
                if (isLoggedIn && isAdmin) {
                    navigate("/home");
                }
                else if (isLoggedIn && !isAdmin) {
                    navigate("/user");
                }
                else navigate("/");
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [timer]);

    return (
        <main className="flex flex-col items-center justify-center gap-4 p-12 mt-20 text-4xl sm:text-lg">
            <h2 className="block text-3xl text-center sm:text-2xl">
                אופס... <span className="text-red">404</span>
            </h2>
            <p>
                את/ה מועבר לבית בעוד {timer} שניות 🏡.
            </p>
        </main>
    );
};


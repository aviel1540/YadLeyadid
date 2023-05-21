import { Button } from '@mui/material';
import React from 'react'
import { useAuthStore } from '~/store/auth';
import { Header } from './Header';

export const Client = () => {
    const { name, logoutStore } = useAuthStore();

    return (
        <>
            <Header />
            <div className="flex justify-center">
                <span className="text-xl pt-6">ברוך הבא {name} 👋</span>
            </div>

        </>
    )
}

import React from 'react';
import { Button } from './logic';

export class ErrorBoundary extends React.Component {

    state = { hasError: false }


    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.log(error, info);

    }

    render() {
        if (this.state.hasError) {

            const handleClick = () => {
                if (window.location.pathname !== '/client') {
                    window.location.href = "/home"
                } else {
                    window.location.href = "/client"
                }
            }
            return (
                <div className='h-screen flex flex-col justify-center items-center'>
                    <span className='text-xl'>משהו כנראה השתבש, בואו נחזור למקום בטוח.</span>
                    <Button className='bg-blue/40  w-48 rounded-md mt-5 border hover:bg-blue/70' onClick={handleClick} >אל מקום בטוח ⛵</Button>
                </div>
            )
        }
        return this.props.children
    }
}

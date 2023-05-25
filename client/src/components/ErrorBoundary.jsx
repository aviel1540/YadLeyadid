import React from 'react';

class ErrorBoundary extends React.Component {

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
                window.location.href = "/home"
            }
            return (
                <div className='h-screen flex flex-col justify-center items-center'>
                    <span className='text-red text-xl'>משהו כנראה השתבש, בואו נחזור למקום בטוח.</span>
                    <button className='bg-black text-white w-48 rounded-md mt-5 border border-red' onClick={handleClick}>אל מקום בטוח 😨</button>
                </div>
            )
        }
        return this.props.children
    }
}
export default ErrorBoundary;
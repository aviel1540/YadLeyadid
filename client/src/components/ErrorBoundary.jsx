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
            return (
                <div className='h-screen flex justify-center items-center'>
                    <span className='text-red text-xl'>משהו כנראה השתבש, ניתן לרענן את הדף.</span>
                </div>
            )
        }
        return this.props.children
    }
}
export default ErrorBoundary;
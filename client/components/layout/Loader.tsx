import React from 'react'

const Loader = () => {
    return (
        <div
            className="h-14 w-14 border-4 rounded-full
            border-gray-200 border-b-blue-500 border-t-blue-500
            animate-spin
            flex items-center justify-center"
        >
            <div
                className="h-6 w-6 border-4 rounded-full
                border-gray-200 border-l-blue-500 border-r-blue-500
                animate-spin
                animate-ping
                flex items-center justify-center"
            >
            </div>
        </div>
    )
}

export default Loader

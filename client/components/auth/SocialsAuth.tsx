import React from 'react'
import {FaFacebookF, FaGoogle} from '../../utils/icons'

const SocialsAuth = () => {
    return (
        <div className="flex justify-center my-2">
            <a
                href="#"
                className="border-2 border-gray-200 rounded-full p-3 mx-1 transition-all hover:bg-blue-400 hover:text-white"
            >
                <FaFacebookF className="text-sm"/>
            </a>
            <a
                href="#"
                className="border-2 border-gray-200 rounded-full p-3 mx-1 transition-all hover:bg-red-400 hover:text-white"
            >
                <FaGoogle className="text-sm"/>
            </a>
        </div>
    )
}

export default SocialsAuth

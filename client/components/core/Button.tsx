import React, {memo} from 'react'

interface Props {
    text: String
    textColor?: String
    bgColor?: String
    fullWidth?: boolean
    IcAfter?: any

}

const Button = ({text, textColor, bgColor, IcAfter, fullWidth}: Props) => {
    return (
        <div
            className={`p-1.5 sm:py-2 sm:px-4 ${textColor || 'text-white'} ${bgColor || 'bg-lightPrimary'} ${fullWidth ? 'w-full' : 'w-max'} rounded border border-current 
            outline-none hover:underline flex items-center justify-center gap-1 cursor-pointer`}
        >
            <span> {text}</span>
            {IcAfter && <IcAfter/>}

        </div>
    )
}

export default memo(Button)

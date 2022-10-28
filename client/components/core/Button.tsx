import React, {memo} from 'react'

interface Props {
    text: String
    textColor: String
    bgColor: String
    fullWidth?: boolean
    IcAfter?: any

}

const Button = ({text, textColor, bgColor, IcAfter, fullWidth}: Props) => {
  return (
    <button
      type='button'
      className={`py-2 px-4 ${textColor} ${bgColor} ${fullWidth && 'w-full'} rounded border border-current 
            outline-none hover:underline flex items-center justify-center gap-1`}
    >
      <span> {text}</span>
      {IcAfter && <IcAfter/>}

    </button>
  )
}

export default memo(Button)

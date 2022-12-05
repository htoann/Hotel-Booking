import React from 'react'
import {useRouter} from 'next/router'

interface Props {
    text?: string
}

const BackButton = ({text}: Props) => {
    const router = useRouter()

    return <span className="p-1.5 sm:py-2 sm:px-4 w-max rounded border border-current
            outline-none hover:underline flex items-center justify-center gap-1 cursor-pointer"
    onClick={() => router.back()}>{text || 'Go to back'}</span>
}

export default BackButton

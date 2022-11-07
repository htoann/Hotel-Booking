import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
    id: string
    image: string
    name: string
    title: string
}

const HotelPreview = ({id, image, name, title}: Props) => {
    return (
        <Link href={`hotel/${id}`}>
            <div className="w-full h-full flex flex-col gap-y-2 transition-all hover:scale-105 p-2">
                <Image className="w-full h-32 object-cover" src={image} alt={name} width={1000} height={1000}/>
                <h2 className="text-black font-bold">{title}</h2>
                <h3 className="text-primary">{name}</h3>
            </div>

        </Link>
    )
}

export default HotelPreview

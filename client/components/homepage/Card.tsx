import React from 'react';
import Image from "next/image";

interface Props {
    image: string
    name: string
    description: string
}

const Card = ({image, name, description}: Props) => {
    return (
        <div className="w-full flex flex-col gap-y-2">
            <Image className="w-full object-contain" src={image} alt={name} width={1000} height={1000}/>
            <h2 className="text-black font-bold">{name}</h2>
            <h3 className="text-primary">{description}</h3>
        </div>
    );
};

export default Card;
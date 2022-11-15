import React from 'react'

interface Props {
    data: number;
}

const StarRating: React.FC<Props> = ({data}) => {
    const stars = Math.round(data)

    return <div className="pl-2">{Array.from(Array(stars)).map((item, index) =>
        <span className="text-tertiary" key={index}>
          &#9733;
        </span>
    )}</div>
}

export default StarRating

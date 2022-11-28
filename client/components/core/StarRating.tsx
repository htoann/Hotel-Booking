import React from 'react'

interface Props {
    data?: number;
}

const StarRating: React.FC<Props> = ({data}) => {
    if (data) {
        const stars = Math.round(data)

        return <div>{Array.from(Array(stars)).map((item, index) =>
            <span className="text-tertiary" key={index}>
          &#9733;
            </span>
        )}</div>
    }
    return <></>
}

export default StarRating

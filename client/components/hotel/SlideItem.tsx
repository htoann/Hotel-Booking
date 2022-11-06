import React from 'react'

interface Props {
    children: any
}

const SlideItem = ({children, ...params}: Props) => {
    return (
        <div className="swiper-slide" {...params}>
            <span>{children}</span>
        </div>
    )
}

export default SlideItem

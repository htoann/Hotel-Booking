import React, {useState, Fragment} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import {Navigation} from 'swiper'
import Image from 'next/image'
import {Dialog, Transition} from '@headlessui/react'

interface Props {
    photos: string[]
}

const ImageGallery = ({photos}: Props) => {
    let [showImage, setShowImage] = useState(false)
    let [imageFocus, setImageFocus] = useState(photos[0])
    return (
        <>
            <div className="h-96">
                <Swiper
                    spaceBetween={10}
                    breakpoints={{
                        768: {
                            slidesPerView: 2
                        },
                        1024: {
                            slidesPerView: 2.1
                        }
                    }}
                    slidesPerView={1.5}
                    navigation={true}
                    modules={[Navigation]}
                    className="h-full"
                >
                    {
                        photos.map(image =>
                            <SwiperSlide key={image} onClick={() => {
                                setShowImage(true)
                                setImageFocus(image)
                            }}>
                                <Image className="w-full h-full object-cover" src={image} alt={'image'} width={1000}
                                    height={1000}/>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>
            <Transition appear show={showImage} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setShowImage(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-max transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                                    <div>
                                        <Image className="w-full h-5/6 object-cover" src={imageFocus}
                                            alt={'image'}
                                            width={1000}
                                            height={900}/>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>

    )
}

export default ImageGallery

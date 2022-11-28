import React, {FormEvent, useEffect, useState} from 'react'
import {Button} from '../../components/core'
import {useMultistepForm} from '../../hooks/useMultiStepForm'
import {AddressForm, HotelInfoForm, ImagesForm, TypeForm} from '../../components/join'
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'
import {useCreateHotelMutation} from '../../services/userApi'
import {useDeleteImageMutation} from '../../services/uploadApi'

export interface HotelForm {
    title: string;
    type: string;
    desc: string;
    descShort: string;
    city: string;
    address: {
        name: string;
        lat?: number;
        lng?: number;
    };
    distance: string;
    photos: string[];
    featured: boolean;
    name: string;
    cheapestPrice: number;
}

const Create = () => {
    const INITIAL_DATA: HotelForm = {
        title: '',
        type: '',
        desc: '',
        descShort: '',
        city: '',
        address: {
            name: ''
        },
        distance: '1',
        photos: [],
        featured: false,
        name: '',
        cheapestPrice: 10
    }
    const router = useRouter()
    const [data, setData] = useState(INITIAL_DATA)

    function updateFields (fields: Partial<HotelForm>) {
        setData(prev => {
            return {...prev, ...fields}
        })
    }

    const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next} =
        useMultistepForm([
            <TypeForm key={0} {...data} updateFields={updateFields}/>,
            <HotelInfoForm key={1} {...data} updateFields={updateFields}/>,
            <AddressForm key={2} {...data} updateFields={updateFields}/>,
            <ImagesForm key={3}{...data} updateFields={updateFields}/>
        ])

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isLastStep) return next()
        try {
            const result = await createHotel(data).unwrap()
            console.log(result)
            toast.success('Create to success')
            await router.push('/')
        } catch (e) {
            console.log(e)
            toast.error('Something went wrong')
        }
    }

    const [createHotel, {isLoading: isCreating}] = useCreateHotelMutation()
    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        window.addEventListener('beforeunload', alertUser)
        window.addEventListener('unload', handleTabClosing)
        return () => {
            window.removeEventListener('beforeunload', alertUser)
            window.removeEventListener('unload', handleTabClosing)
        }
    })
    const [deleteImage] = useDeleteImageMutation()
    const handleTabClosing = async () => {
        try {
            for (let i = 0; i < data.photos.length; i++) {
                await deleteImage({url: data.photos[i]})
            }
            console.log('close')
            // await removeTempPhotos()
        } catch (e) {
            console.log(e)
            toast.error('Something went wrong')
        }
    }
    const alertUser = (event: any) => {
        event.preventDefault()
        event.returnValue = ''
    }

    return (
        <div
            className="mx-auto container px-4 lg:px-6 py-6 relative"
        >
            <form onSubmit={onSubmit}>
                <div
                    className="absolute top-0 right-0"
                >
                    {currentStepIndex + 1} / {steps.length}
                </div>
                {step}
                <div
                    className="mt-2.5 flex justify-end gap-2.5"

                >
                    {!isFirstStep && (
                        <div onClick={back}>
                            <Button text="Back" textColor="text-white" bgColor="bg-primary"/>
                        </div>
                    )}
                    <button
                        type="submit" disabled={isCreating}>
                        <Button text={isLastStep ? 'Submit' : 'Next'} textColor="text-white" bgColor="bg-primary"/>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Create

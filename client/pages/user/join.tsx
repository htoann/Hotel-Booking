import React, {FormEvent, useEffect, useState} from 'react'
import {Button} from '../../components/core'
import {useMultistepForm} from '../../hooks/useMultiStepForm'
import {AddressForm, HotelInfoForm, ImagesForm, TypeForm} from '../../components/join'
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'

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
    cheapestPrice: number;
    featured: boolean;
    name: string;
}

const Join = () => {
    const INITIAL_DATA: HotelForm = {
        title: '',
        type: '',
        desc: '',
        descShort: '',
        city: '',
        address: {
            name: ''
        },
        distance: '',
        photos: [],
        cheapestPrice: 0,
        featured: false,
        name: ''
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

    function onSubmit (e: FormEvent) {
        e.preventDefault()
        if (!isLastStep) return next()
        console.log(data)
        toast.success('Join to success')
        router.push('/')
    }

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    return (
        <div
            className="container mx-auto relative"
        >
            <form onSubmit={onSubmit}>
                <div style={{position: 'absolute', top: '.5rem', right: '.5rem'}}>
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
                        type="submit">
                        <Button text={isLastStep ? 'Submit' : 'Next'} textColor="text-white" bgColor="bg-primary"/>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Join

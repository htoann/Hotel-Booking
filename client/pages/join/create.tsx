import React, {FormEvent, useState} from 'react'
import {BackButton, Button} from '../../components/core'
import {useMultistepForm} from '../../hooks/useMultiStepForm'
import {AddressForm, HotelInfoForm, ImagesForm, PublishedForm, TypeForm} from '../../components/join'
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'
import {useCreateHotelMutation} from '../../services/userApi'
import {IHotel} from '../../models/IHotel'
import withAuthentication from '../../components/withAuthentication'
import {Layout} from '../../components/layout'

const Create = () => {
    const INITIAL_DATA: IHotel = {
        title: '',
        type: '',
        desc: '',
        descShort: '',
        address: {
            name: ''
        },
        distance: '',
        photos: [],
        featured: false,
        name: '',
        published: false,
        reviews: []
    }
    const router = useRouter()
    const [data, setData] = useState(INITIAL_DATA)

    function updateFields (fields: Partial<IHotel>) {
        setData(prev => {
            return {...prev, ...fields}
        })
    }

    const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next} =
        useMultistepForm([
            <TypeForm key={0} {...data} updateFields={updateFields}/>,
            <HotelInfoForm key={1} {...data} updateFields={updateFields}/>,
            <AddressForm key={2} {...data} updateFields={updateFields}/>,
            <ImagesForm key={3}{...data} updateFields={updateFields}/>,
            <PublishedForm key={4} {...data} updateFields={updateFields}/>
        ])

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isLastStep) return next()
        try {
            await createHotel(data).unwrap()
            await router.push('/join')
            toast.success('Create to success')
        } catch (e) {
            console.log(e)
            toast.error('Something went wrong')
        }
    }

    const [createHotel, {isLoading: isCreating}] = useCreateHotelMutation()

    return (
        <Layout
            metadata={{
                title: `Create hotel - Booking`,
                description: `Join cooperation - Booking`
            }}
        >
            <div
                className="mx-auto container px-4 lg:px-6 py-6 relative"
            >
                <div className="mb-4">
                    <BackButton text='Back to join page'/>
                </div>
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
        </Layout>
    )
}

export default withAuthentication(Create)

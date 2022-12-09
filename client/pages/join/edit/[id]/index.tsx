import React, {FormEvent, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {useUpdateHotelMutation} from '../../../../services/userApi'
import {BackButton, Button} from '../../../../components/core'
import {toast} from 'react-toastify'
import {useAppSelector} from '../../../../store/hooks'
import {IHotel} from '../../../../models'
import AddressForm from '../../../../components/join/AddressForm'
import {useMultistepForm} from '../../../../hooks/useMultiStepForm'
import {HotelInfoForm, ImagesForm, PublishedForm, TypeForm} from '../../../../components/join'
import Link from 'next/link'
import withAuthentication from '../../../../components/withAuthentication'
import {Layout} from '../../../../components/layout'
import {useGetHotelQuery} from '../../../../services/hotelApi'

const EditPage = () => {
    const router = useRouter()
    const id = router.query?.id as string

    const [data, setData] = useState<IHotel>({
        address: {name: ''},
        desc: '',
        descShort: '',
        distance: '',
        featured: false,
        name: '',
        photos: [],
        published: false,
        title: '',
        type: '',
        reviews: []
    })

    const {data: myHotel, isSuccess} = useGetHotelQuery(id)

    useEffect(() => {
        if (isSuccess) {
            setData(myHotel)
        }
    }, [isSuccess, myHotel])

    function updateFields (fields: Partial<IHotel>) {
        setData(prev => {
            return {...prev, ...fields}
        })
    }

    const [updateHotel, {isLoading: isUpdating}] = useUpdateHotelMutation()

    const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next} =
        useMultistepForm([
            <TypeForm key={0} {...data} updateFields={updateFields}/>,
            <HotelInfoForm key={1} {...data} updateFields={updateFields}/>,
            <AddressForm key={2} {...data} updateFields={updateFields}/>,
            <ImagesForm key={3} {...data} updateFields={updateFields}/>,
            <PublishedForm key={4} {...data} updateFields={updateFields}/>
        ])

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isLastStep) return next()
        try {
            if (data) {
                await updateHotel(data)
                await router.push('/join')
                toast.success('Update success')
            }
        } catch (e) {
            console.log(e)
            toast.error('Something went wrong')
        }
    }
    return (
        <Layout
            metadata={{
                title: `Edit hotel - Booking`,
                description: `Join cooperation - Booking`
            }}
        >
            <div
                className="mx-auto container px-4 lg:px-6 py-6 relative"
            >
                <div className="flex justify-between items-center">
                    <BackButton text='Back to join page'/>
                    <Link href={`${id}/room`}>
                        <Button text="Manager Room"/>
                    </Link>
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
                            type="submit" disabled={isUpdating}>
                            <Button text={isLastStep ? 'Update' : 'Next'} textColor="text-white" bgColor="bg-primary"/>
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default withAuthentication(EditPage)

import React, {useEffect, useState} from 'react'
import {useGetUserQuery, useUpdateUserMutation} from '../../services/userApi'
import {Loader} from '../layout'
import {useAppDispatch, useAppSelector} from '../../store/hooks'
import {useForm} from 'react-hook-form'
import {setUser} from '../../features/authSlice'
import {Button} from '../core'
import {CiEdit} from '../../utils/icons'
import {toast} from 'react-toastify'

type FormValues = {
    name: string;
    email: string;
    phone: string;
};

const PersonalDetails = () => {
    const {user, token} = useAppSelector((state) => state.persistedReducer.auth)
    const {data: userData, isLoading: getLoading, isSuccess} = useGetUserQuery(user?._id as string)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isSuccess) {
            dispatch(
                setUser({user: userData, token})
            )
        }
    }, [dispatch, userData, isSuccess, token])

    const [updateUser, {isLoading: isUpdating}] = useUpdateUserMutation()

    const {register, handleSubmit, watch} = useForm<FormValues>({
        defaultValues: {
            name: user?.name,
            email: user?.email,
            phone: user?.phone
        }
    })

    const onSubmit = handleSubmit(async (dataForm) => {
        if (user) {
            try {
                const result = await updateUser({_id: user._id, ...dataForm}).unwrap()
                dispatch(setUser(
                    {
                        user: result,
                        token
                    }
                ))
                toast.success('Update success')
            } catch (error: any) {
                toast.error(`Something went wrong`)
            }
        }
    })

    // Check is change to enable button Submit
    const [isChange, setIsChange] = useState<boolean>(false)
    useEffect(() => {
        if (watch().name !== user?.name || watch().email !== user?.email || watch().phone !== user?.phone) {
            setIsChange(true)
        } else {
            setIsChange(false)
        }
    }, [watch(), user])

    if (getLoading) {
        return (
            <div className="w-full mt-20 flex items-center justify-center">
                <Loader/>
            </div>
        )
    }

    return (
        <div>
            <div>
                <h1 className="font-bold text-2xl">Personal details</h1>
                <h2>Update your info and find out how it&apos;s used.</h2>
            </div>
            <div>
                <div className="border-y px-2.5 py-4 flex flex-wrap md:flex-nowrap w-full items-center ">
                    <span className="w-full md:w-1/4 font-medium">Display name</span>
                    <div className="w-full relative">
                        <input type="text" id="name-input"
                            className="border-none rounded w-full md:p-4 pr-12"
                            {...register('name')}
                        />
                        <label className="absolute inset-y-0 right-4 inline-flex items-center cursor-pointer"
                            htmlFor="name-input">
                            <CiEdit/>
                        </label>
                    </div>
                </div>
                <div className="border-y px-2.5 py-4 flex flex-wrap md:flex-nowrap w-full items-center ">
                    <span className="w-full md:w-1/4 font-medium">Email address</span>
                    <div className="w-full relative">
                        <input type="text" id="email-input"
                            className="border-none rounded w-full md:p-4 pr-12"
                            {...register('email')}
                        />
                        <label className="absolute inset-y-0 right-4 inline-flex items-center cursor-pointer"
                            htmlFor="email-input">
                            <CiEdit/>
                        </label>
                    </div>
                </div>
                <div className="border-y px-2.5 py-4 flex flex-wrap md:flex-nowrap w-full items-center ">
                    <span className="w-full md:w-1/4 font-medium">Phone</span>
                    <div className="w-full relative">
                        <input type="text" id="phone-input"
                            className="border-none rounded w-full md:p-4 pr-12"
                            {...register('phone')}
                        />
                        <label className="absolute inset-y-0 right-4 inline-flex items-center cursor-pointer"
                            htmlFor="phone-input">
                            <CiEdit/>
                        </label>
                    </div>
                </div>
                {
                    isChange && (
                        <div onClick={onSubmit} className="float-right mt-5 mr-5">
                            <Button text={`${isUpdating ? 'Updating...' : 'Save'}`} textColor="text-white"
                                bgColor="bg-lightPrimary"/>
                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default PersonalDetails

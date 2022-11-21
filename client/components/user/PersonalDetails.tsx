import React from 'react'
import {useGetUserQuery} from '../../services/userApi'
import {Loader} from '../layout'
import ErrorPage from 'next/error'

const PersonalDetails = () => {
    const {data: user, isLoading, error} = useGetUserQuery()
    if (isLoading) {
        return (
            <div className="w-screen mt-20 flex items-center justify-center">
                <Loader/>
            </div>
        )
    }
    if (error) {
        // @ts-ignore
        const status = error.status || 404
        return <ErrorPage statusCode={status}/>
    }
    return (
        <div>
            <div>
                <h1 className="font-bold text-2xl">Personal details</h1>
                <h2>Update your info and find out how it&apos;s used.</h2>
            </div>
            <div className="mt-2.5 flex flex-col text-sm">
                <div className="border-y px-2.5 py-4 flex w-full ">
                    <span className="w-1/4 font-medium">Display name</span>
                    <details className="group select-none w-full">
                        <summary
                            className="group flex items-center rounded-lg px-4 py-2 "
                        >
                            <div className="ml-3">
                                <div className="group-open:hidden"> {user?.name} </div>
                                <div className="hidden group-open:block">
                                    <span>Display name </span>
                                    <span className="text-red-500">*</span>
                                </div>
                            </div>

                            <div
                                className="ml-auto shrink-0 text-secondary cursor-pointer p-2 rounded-md hover:bg-blue-100">
                                <span className="group-open:hidden"> Edit </span>
                                <span className="hidden group-open:block">Cancel</span>
                            </div>
                        </summary>

                        <nav aria-label="Users Nav" className="mt-2 ml-8 transition-all">
                            <div className="w-full">
                                <input type="text" className="w-5/6 mb-2.5 "/>
                            </div>
                            <button className="float-right w-max text-white bg-lightPrimary px-2.5 py-2 rounded-md">
                                Save
                            </button>
                        </nav>
                    </details>
                </div>
                {/* Email */}
                <div className="border-y px-2.5 py-4 flex w-full">
                    <span className="w-1/4 font-medium">Email address</span>
                    <details className="group select-none w-full">
                        <summary
                            className="group flex items-center rounded-lg px-4 py-2 "
                        >
                            <div className="ml-3">
                                <div className="group-open:hidden flex flex-col gap-y-2.5">
                                    <span>{user?.email}</span>
                                    <span>This is the email address you use to sign in. It’s also where we send your booking confirmations.</span>
                                </div>
                                <div className="hidden group-open:block">
                                    <span>Email address </span>
                                    <span className="text-red-500">*</span>
                                </div>
                            </div>

                            <div
                                className="ml-auto shrink-0 text-secondary cursor-pointer p-2 rounded-md hover:bg-blue-100">
                                <span className="group-open:hidden"> Edit </span>
                                <span className="hidden group-open:block">Cancel</span>
                            </div>
                        </summary>

                        <nav aria-label="Users Nav" className="mt-2 ml-8 transition-all">
                            <div className="w-full flex flex-col">
                                <input type="text" className="w-5/6 mb-2.5"/>

                            </div>
                            <button className="float-right w-max text-white bg-lightPrimary px-2.5 py-2 rounded-md">
                                Save
                            </button>
                        </nav>
                    </details>
                </div>
                {/* Phone */}
                <div className="border-y px-2.5 py-4 flex w-full">
                    <span className="w-1/4 font-medium">Phone number</span>
                    <details className="group select-none w-full">
                        <summary
                            className="group flex items-center rounded-lg px-4 py-2 "
                        >
                            <div className="ml-3">
                                <div className="group-open:hidden flex flex-col gap-y-2.5">
                                    <span>Add your phone number</span>
                                    <span>TProperties or attractions you book can use this number to contact you. You can also use it to sign in.</span>
                                </div>
                                <div className="hidden group-open:block">
                                    <span>Phone number</span>
                                </div>
                            </div>

                            <div
                                className="ml-auto shrink-0 text-secondary cursor-pointer p-2 rounded-md hover:bg-blue-100">
                                <span className="group-open:hidden"> Edit </span>
                                <span className="hidden group-open:block">Cancel</span>
                            </div>
                        </summary>

                        <nav aria-label="Users Nav" className="mt-2 ml-8 transition-all">
                            <div className="w-full flex flex-col">
                                <input type="text" className="w-5/6 mb-2.5"/>
                            </div>
                            <button className="float-right w-max text-white bg-lightPrimary px-2.5 py-2 rounded-md">
                                Save
                            </button>
                        </nav>
                    </details>
                </div>
            </div>
        </div>
    )
}

export default PersonalDetails

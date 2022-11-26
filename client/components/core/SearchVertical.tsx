import Link from 'next/link'
import React from 'react'
import Button from './Button'
import {useForm} from 'react-hook-form'
import {validateInputCity} from '../../utils/validateInputCity'
import {useRouter} from 'next/router'
import {Disclosure} from '@headlessui/react'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const SearchVertical = () => {
    const {register, watch} = useForm()

    const router = useRouter()
    const queryUrl = router?.query

    const citySlug = queryUrl?.slug ? queryUrl?.slug[0] : ''
    const minSlug = queryUrl?.min
    const maxSlug = queryUrl?.max

    const city = watch('city') || citySlug
    const min = watch('min') || minSlug
    const max = watch('max') || maxSlug

    let query = `/search/${validateInputCity(city)}`
    if (min) query += `?min=${min}`
    if (max) query += `&max=${max}`

    const {width} = useWindowDimensions()

    return (
        <>
            <form className="w-full h-full p-5 bg-secondary">
                <Disclosure defaultOpen={(width > 1024)}>
                    <Disclosure.Button className="w-full">
                        <label className="w-full">
                            <span className="text-sm float-left">Location</span>
                            <input
                                className="form-input block w-full "
                                {...register('city')}
                                placeholder="Where are you going?"
                                defaultValue={city}
                            />
                        </label>
                    </Disclosure.Button>
                    <Disclosure.Panel>
                        <div className="w-full flex flex-col gap-1">
                            <div className="w-full flex flex-wrap gap-x-5">
                                <label className="flex-1">
                                    <span className="text-sm">Check In</span>
                                    <input type="date" className="form-input block w-full"/>
                                </label>
                                <label className="flex-1">
                                    <span className="text-sm">Check Out</span>
                                    <input type="date" className="form-input block w-full"/>
                                </label>
                            </div>
                            <label className="w-full">
                                <span className="text-sm">Room</span>
                                <input type="number" className="form-input block w-full"/>
                            </label>
                            <div className="w-full flex flex-wrap gap-x-5">
                                <label className="flex-1">
                                    <span className="text-sm">Min Price</span>
                                    <input
                                        type="number"
                                        className="form-input block w-full"
                                        {...register('min')}
                                        defaultValue={min}
                                    />
                                </label>
                                <label className="flex-1">
                                    <span className="text-sm">Max Price</span>
                                    <input
                                        type="number"
                                        className="form-input block w-full"
                                        {...register('max')}
                                        defaultValue={max}
                                    />
                                </label>
                            </div>

                            <Link
                                href={query}
                                className={
                                    !watch('city') ? 'pointer-events-none cursor-not-allowed' : ''
                                }
                            >
                                <div className="w-full">
                                    <Button
                                        text="Search"
                                        textColor="text-white"
                                        bgColor="bg-lightPrimary"
                                        fullWidth={true}
                                    />
                                </div>
                            </Link>
                        </div>

                    </Disclosure.Panel>
                </Disclosure>
            </form>
            {/* <form className="w-full h-full p-5 bg-secondary"> */}
            {/*    <h1 className="font-semibold text-primary text-2xl">Search</h1> */}
            {/*    <div className="w-full mx-auto flex flex-col items-start justify-center gap-y-2.5"> */}
            {/*        <label className="w-full"> */}
            {/*            <span className="text-black">Location</span> */}
            {/*            <input */}
            {/*                className="form-input block w-full " */}
            {/*                {...register('city')} */}
            {/*                placeholder="Where are you going?" */}
            {/*                defaultValue={city} */}
            {/*            /> */}
            {/*        </label> */}
            {/*        <label className="hidden lg:block w-full"> */}
            {/*            <span className="text-sm">Check In</span> */}
            {/*            <input type="date" className="form-input block w-full"/> */}
            {/*        </label> */}
            {/*        <label className="hidden lg:block w-full"> */}
            {/*            <span className="text-sm">Check Out</span> */}
            {/*            <input type="date" className="form-input block w-full"/> */}
            {/*        </label> */}
            {/*        <label className="hidden lg:block w-full"> */}
            {/*            <span className="text-sm">Room</span> */}
            {/*            <input type="number" className="form-input block w-full"/> */}
            {/*        </label> */}
            {/*        <label className="hidden lg:block w-full"> */}
            {/*            <span className="text-sm">Min Price</span> */}
            {/*            <input */}
            {/*                type="number" */}
            {/*                className="form-input block w-full" */}
            {/*                {...register('min')} */}
            {/*                defaultValue={min} */}
            {/*            /> */}
            {/*        </label> */}
            {/*        <label className="hidden lg:block w-full"> */}
            {/*            <span className="text-sm">Max Price</span> */}
            {/*            <input */}
            {/*                type="number" */}
            {/*                className="form-input block w-full" */}
            {/*                {...register('max')} */}
            {/*                defaultValue={max} */}
            {/*            /> */}
            {/*        </label> */}
            {/*        <Link */}
            {/*            href={query} */}
            {/*            className={ */}
            {/*                !watch('city') ? 'pointer-events-none cursor-not-allowed' : '' */}
            {/*            } */}
            {/*        > */}
            {/*            <div className="w-full"> */}
            {/*                <Button */}
            {/*                    text="Search" */}
            {/*                    textColor="text-white" */}
            {/*                    bgColor="bg-lightPrimary" */}
            {/*                    fullWidth={true} */}
            {/*                /> */}
            {/*            </div> */}
            {/*        </Link> */}
            {/*    </div> */}
            {/* </form> */}
        </>
    )
}

export default SearchVertical

import React, {useEffect} from 'react'
import {Button} from '../core'
import SocialsAuth from './SocialsAuth'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {SignUpForm} from '../../interface/auth'
import {signUpSchema} from '../../utils/validationSchema'

import {useRegisterUserMutation} from '../../services/authApi'
import {setUser} from '../../features/authSlice'
import {useAppDispatch} from '../../store/hooks'
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'
import {setHotelWishList} from '../../features/appSlice'
import {Layout} from '../layout'

interface Props {
    setIsSignIn: (arg: boolean) => void;
}

const SignUp = ({setIsSignIn}: Props) => {
    const {register, handleSubmit, formState: {errors}} = useForm<SignUpForm>({
        mode: 'onBlur',
        resolver: yupResolver(signUpSchema)
    })

    const router = useRouter()
    const dispatch = useAppDispatch()
    const [
        registerUser,
        {
            data: registerData,
            isSuccess: isRegisterSuccess,
            isError: isRegisterError,
            error: registerError
        }
    ] = useRegisterUserMutation()

    const onSubmit = async (data: SignUpForm) => {
        await registerUser(data)
    }

    useEffect(() => {
        if (isRegisterSuccess) {
            dispatch(
                setUser({user: registerData.user, token: registerData.token})
            )
            dispatch(setHotelWishList(registerData.user.wishlist))
            router.push('/').then(() =>
                toast.success('Sign Up Successfully'))
        }
    }, [isRegisterSuccess])

    useEffect(() => {
        if (isRegisterError) {
            toast.error((registerError as any)?.data?.message ? (registerError as any).data.message : 'Some thing went error')
        }
    }, [isRegisterError])

    const handleChangeAuth = () => {
        setIsSignIn(true)
    }
    return (
        <Layout
            metadata={{
                title: 'Sign up - Booking',
                description: 'Booking'
            }}
        >
            <main
                className="mt-10 md:mt-20 mx-auto container px-4 lg:px-6 flex flex-col items-center justify-center text-center">
                <div className="rounded-2xl shadow-2xl w-full xl:w-2/3 flex flex-col md:flex-row">
                    <div className="w-full md:w-3/5 p-2.5 xl:p-5">
                        <div className="text-left font-bold">
                            L<span className="text-primary">CL</span>
                        </div>
                        <div className="py-5 md:py-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">
                                Sign Up Account
                            </h2>
                            <div className="border-2 w-10 border-primary inline-block mb-2"></div>
                            <SocialsAuth/>
                            <p className="text-gray-400">or use your email account</p>
                            <form className="w-full sm:w-4/5 mx-auto flex flex-col items-center"
                                onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-2.5 w-full">
                                    <label
                                        htmlFor="name"
                                        className={`block font-bold text-sm mb-1 ${
                                            errors.name ? 'text-red-400' : 'text-primary'
                                        }`}
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`block rounded-xl w-full bg-transparent outline-none border-b-2 py-2 px-4  ${
                                            errors.name
                                                ? 'text-red-300 border-red-400'
                                                : 'text-primary'
                                        }`}
                                        {...register('name')}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">
                                            A valid name is required.
                                        </p>
                                    )}
                                </div>
                                <div className="mb-2.5 w-full">
                                    <label
                                        htmlFor="email"
                                        className={`block font-bold text-sm mb-1 ${
                                            errors.email ? 'text-red-400' : 'text-primary'
                                        }`}
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        className={`block rounded-xl w-full bg-transparent outline-none border-b-2 py-2 px-4  ${
                                            errors.email
                                                ? 'text-red-300 border-red-400'
                                                : 'text-primary'
                                        }`}
                                        {...register('email')}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            A valid email is required.
                                        </p>
                                    )}
                                </div>
                                <div className="mb-2.5 w-full">
                                    <label
                                        htmlFor="password"
                                        className={`block font-bold text-sm mb-1 ${
                                            errors.password ? 'text-red-400' : 'text-primary'
                                        }`}
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className={`block rounded-xl w-full bg-transparent outline-none border-b-2 py-2 px-4  ${
                                            errors.password
                                                ? 'text-red-300 border-red-400'
                                                : 'text-primary'
                                        }`}
                                        {...register('password')}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">
                                            Your password is required.
                                        </p>
                                    )}
                                </div>
                                <div className="mb-2.5 w-full">
                                    <label
                                        htmlFor="password2"
                                        className={`block font-bold text-sm mb-1 ${
                                            errors.password2 ? 'text-red-400' : 'text-primary'
                                        }`}
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password2"
                                        className={`block rounded-xl w-full bg-transparent outline-none border-b-2 py-2 px-4  ${
                                            errors.password2
                                                ? 'text-red-300 border-red-400'
                                                : 'text-primary'
                                        }`}
                                        {...register('password2')}
                                    />
                                    {errors.password2 && (
                                        <p className="text-red-500 text-sm mt-1">
                                            Your passwords do not match
                                        </p>
                                    )}
                                </div>
                                <button type="submit">
                                    <Button text="Sign In" textColor="text-white" bgColor="bg-primary"/>
                                </button>
                            </form>

                        </div>
                    </div>

                    <div
                        className="w-full md:w-2/5 bg-lightPrimary text-white rounded-b-2xl md:rounded-none md:rounded-r-2xl px-8 py-12 xl:px-12
                        flex flex-col items-center justify-center"
                    >
                        <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
                        <div className="border-2 w-10 border-white inline-block mb-2"></div>
                        <p className="mb-2">If you already have account</p>
                        <div onClick={() => handleChangeAuth()}>
                            <Button text="Sign In" textColor="text-secondary" bgColor="bg-white"/>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default SignUp

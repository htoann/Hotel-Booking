import React, {useEffect} from 'react'
import {Button} from '../core'
import SocialsAuth from './SocialsAuth'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {toast} from 'react-toastify'

import {SignInForm} from '../../interface/auth'
import {signInSchema} from '../../utils/validationSchema'
import {useAppDispatch} from '../../store/hooks'
import {useLoginUserMutation} from '../../services/authApi'
import {setUser} from '../../features/authSlice'
import {useRouter} from 'next/router'
import { setHotelWishList } from '../../features/appSlice'

interface Props {
    setIsSignIn: (arg: boolean) => void;
}

const SignIn = ({setIsSignIn}: Props) => {
    const {register, handleSubmit, formState: {errors}} = useForm<SignInForm>({
        mode: 'onBlur',
        resolver: yupResolver(signInSchema)
    })
    const handleChangeAuth = () => {
        setIsSignIn(false)
    }
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [
        loginUser,
        {
            data: loginData,
            isSuccess: isLoginSuccess,
            isError: isLoginError,
            error: loginError
        }
    ] = useLoginUserMutation()

    const onSubmit = async (data: SignInForm) => {
        await loginUser(data)
    }
    useEffect(() => {
        if (isLoginSuccess) {
            toast.success('User Login Successfully')
            dispatch(
                setUser({user: loginData.user, token: loginData.token})
            )
            dispatch(setHotelWishList(loginData.user.wishlist))
            router.push('/')
        }
    }, [isLoginSuccess])

    useEffect(() => {
        if (isLoginError) {
            toast.error((loginError as any)?.data?.message ? (loginError as any).data.message : 'Some thing went error')
        }
    }, [isLoginError])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <div className=" rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
                    <div className="w-3/5 p-5">
                        <div className="text-left font-bold">
                            L<span className="text-primary">CL</span>
                        </div>
                        <div className="py-10">
                            <h2 className="text-3xl font-bold text-primary">
                                Sign in to Account
                            </h2>
                            <div className="border-2 w-10 border-primary inline-block mb-2"></div>
                            <SocialsAuth/>
                            <p className="text-gray-400">or use your email account</p>
                            <form className="w-4/5 mx-auto flex flex-col items-center"
                                onSubmit={handleSubmit(onSubmit)}>
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
                                <button type="submit">
                                    <Button text="Sign In" textColor="text-white" bgColor="bg-primary"/>
                                </button>
                            </form>
                        </div>
                    </div>

                    <div
                        className="w-2/5 bg-lightPrimary text-white rounded-tr-2xl rounded-br-2xl py-36 px-12
                        flex flex-col items-center justify-center"
                    >
                        <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
                        <div className="border-2 w-10 border-white inline-block mb-2"></div>
                        <p className="mb-2">
                            Fill up personal information and start journey with us.
                        </p>
                        <div onClick={() => handleChangeAuth()}>
                            <Button text="Sign Up" textColor="text-secondary" bgColor="bg-white"/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SignIn

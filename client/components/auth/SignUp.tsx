import React from 'react'
import {useForm} from '../../hooks/useForm'
import {Button, Input} from '../core'
import Link from 'next/link'
import SocialsAuth from './SocialsAuth'

interface Props {
    setIsSignIn: (arg: boolean) => void;
}

const SignUp = ({setIsSignIn}: Props) => {
    const {values, handleChange} = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const handleChangeAuth = () => {
        setIsSignIn(true)
    }
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
                                Sign Up Account
                            </h2>
                            <div className="border-2 w-10 border-primary inline-block mb-2"></div>
                            <SocialsAuth/>
                            <p className="text-gray-400">or use your email account</p>
                            <form
                                // onSubmit={handleSubmit}
                                className="w-4/5 mx-auto flex flex-col items-center justify-center"
                            >
                                <Input
                                    label="Name"
                                    name="name"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Confirm your password"
                                    name="password2"
                                    type="password"
                                    value={values.password2}
                                    onChange={handleChange}
                                />

                                <div className="flex justify-between w-full mb-5 mt-2">
                                    <label className="flex items-center text-xs">
                                        <input type="checkbox" name="remember" className="mr-1"/>
                                        <p>Remember me</p>
                                    </label>
                                    <div className="text-xs hover:text-gray-400">
                                        <Link href="/auth/index">Forgot Password?</Link>
                                    </div>
                                </div>
                                <Button text="Sign Up" textColor="text-white" bgColor="bg-lightPrimary"/>
                            </form>

                        </div>
                    </div>

                    <div
                        className="w-2/5 bg-lightPrimary text-white rounded-tr-2xl rounded-br-2xl py-36 px-12
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
        </div>
    )
}

export default SignUp

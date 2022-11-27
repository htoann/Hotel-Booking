import React, {useRef} from 'react'
import {useChangePasswordMutation, useDeleteUserMutation} from '../../services/userApi'
import {useAppDispatch, useAppSelector} from '../../store/hooks'
import {logout} from '../../features/authSlice'
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

const Security = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const {user} = useAppSelector((state) => state.persistedReducer.auth)

    // Delete Account
    const [deleteUser, {isLoading: isDeleting}] = useDeleteUserMutation()
    const handleDeleteMyAccount = async () => {
        try {
            const result = await deleteUser(user?._id as string).unwrap()
            toast.success(result.message || 'Delete success')
            dispatch(logout())
            // Fix error toast
            setTimeout(() => router.push('/'), 1)
        } catch (error: any) {
            toast.error(error.data?.message || 'Something went wrong')
        }
    }

    // Change Password
    const [changePassword] = useChangePasswordMutation()
    const formSchema = yup.object().shape({
        password: yup.string()
            .required('Password is required'),
        newPassword: yup.string()
            .required('New password is required')
            .min(6, 'Password length should be at least 6 characters')
            .notOneOf([yup.ref('password')], 'New password must be not match current password')
    })
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors, isValid}
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(formSchema)
    })
    const passwordRef = useRef<HTMLDivElement>(null)
    const onSubmitChangePassword = handleSubmit(async (dataForm) => {
        try {
            const data = await changePassword(dataForm).unwrap()
            toast.success(data.message)
            setValue('password', '')
            setValue('newPassword', '')
            passwordRef.current?.click()
        } catch (error: any) {
            toast.error(error.data?.message || 'Something went wrong')
        }
    }
    )

    return (
        <div>
            <div>
                <h1 className="font-bold text-2xl">Security</h1>
                <h2>Adjust your security settings and set up two-factor authentication.</h2>
            </div>
            <div className="mt-2.5 flex flex-col text-sm">
                {/* Password */}
                <div className="border-y px-2.5 py-4 flex flex-wrap md:flex-nowrap w-full ">
                    <span className="w-full md:w-1/4 font-medium">Password</span>
                    <details className="group select-none w-full">
                        <summary
                            className="group flex flex-wrap items-center rounded-lg md:px-4 py-2 "
                        >
                            <div className="md:ml-3" ref={passwordRef}>
                                <div className="group-open:hidden"> Reset your password regularly to keep your account
                                    secure
                                </div>
                                <div className="hidden group-open:block">
                                    <span>To change your password, please enter </span>
                                </div>
                            </div>
                            <div
                                className="ml-auto shrink-0 text-secondary cursor-pointer p-2 rounded-md hover:bg-blue-100">
                                <span className="group-open:hidden"> Change </span>
                                <span className="hidden group-open:block">Cancel</span>
                            </div>
                        </summary>

                        <nav aria-label="Users Nav" className="mt-2 md:ml-8 transition-all">
                            <div className=" flex flex-col">
                                <label htmlFor="current-password">Current Password</label>
                                <input id="current-password"
                                    type="password"
                                    className="w-full md:w-2/6 mb-2.5 "
                                    {...register('password')}
                                />
                                {errors.password && (
                                    // @ts-ignore
                                    <p className="text-red-500">{errors.password.message}</p>
                                )}
                            </div>
                            <div className=" flex flex-col">
                                <label htmlFor="new-password">New Password</label>
                                <input
                                    id="new-password"
                                    type="password"
                                    className="w-full md:w-2/6 mb-2.5 "
                                    {...register('newPassword')}
                                />
                                {errors.newPassword && (
                                    // @ts-ignore
                                    <p className="text-red-500">{errors.newPassword.message}</p>
                                )}
                            </div>
                            <button
                                className={`float-right w-max text-white ${isValid ? 'bg-lightPrimary' : 'bg-gray-400'} px-2.5 py-2 rounded-md`}
                                disabled={!isValid}
                                onClick={onSubmitChangePassword}
                            >
                                Save
                            </button>
                        </nav>
                    </details>
                </div>
                {/* Account */}
                <div className="border-y px-2.5 py-4 flex flex-wrap md:flex-nowrap w-full">
                    <span className="w-full md:w-1/4 font-medium">Delete account</span>
                    <details className="group select-none w-full">
                        <summary
                            className="group flex flex-wrap items-center rounded-lg md:px-4 py-2 "
                        >
                            <div className="md:ml-3">
                                <div className="group-open:hidden flex flex-col gap-y-2.5">
                                    <span>Permanently delete your account</span>
                                </div>
                                <div className="hidden group-open:block">
                                    <span>Why do you want to delete your account?</span>
                                </div>
                            </div>

                            <div
                                className="ml-auto shrink-0 text-secondary cursor-pointer p-2 rounded-md hover:bg-blue-100">
                                <span className="group-open:hidden"> Delete account </span>
                                <span className="hidden group-open:block">Cancel</span>
                            </div>
                        </summary>

                        <nav aria-label="Users Nav" className="mt-2 md:ml-8 transition-all">
                            <div className="w-full md:w-5/6 flex flex-col gap-2">
                                <span>Do you have any feedback you&apos;d like to share before you go?
                                    We&apos;ll use it to fix problems and improve our services.</span>
                                <input type="text" className=" mb-2.5"/>
                            </div>
                            <button
                                className="float-right w-max text-white bg-lightPrimary px-2.5 py-2 rounded-md"
                                onClick={handleDeleteMyAccount}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete account'}
                            </button>
                        </nav>
                    </details>
                </div>
            </div>
        </div>
    )
}

export default Security

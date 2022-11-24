import React from 'react'
import {useDeleteUserMutation} from '../../services/userApi'
import {useAppDispatch, useAppSelector} from '../../store/hooks'
import {logout, setUser} from '../../features/authSlice'
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'

const Security = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {user, token} = useAppSelector((state) => state.persistedReducer.auth)

    const [deleteUser, {isLoading: isDeleting}] = useDeleteUserMutation()

    const handleDeleteMyAccount = () => {
        deleteUser(user?._id as string).unwrap()
            .then((result) => {
                console.log(result)
                toast.success(result.message || 'Delete success')
                dispatch(logout())
                router.push('/')
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.data.message || 'Delete fail. Something went wrong')
            })
    }
    return (
        <div>
            <div>
                <h1 className="font-bold text-2xl">Security</h1>
                <h2>Adjust your security settings and set up two-factor authentication.</h2>
            </div>
            <div className="mt-2.5 flex flex-col text-sm">
                {/* Password */}
                <div className="border-y px-2.5 py-4 flex w-full ">
                    <span className="w-1/4 font-medium">Password</span>
                    <details className="group select-none w-full">
                        <summary
                            className="group flex items-center rounded-lg px-4 py-2 "
                        >
                            <div className="ml-3">
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

                        <nav aria-label="Users Nav" className="mt-2 ml-8 transition-all">
                            <div className=" flex flex-col">
                                <label htmlFor="current-password">Current Password</label>
                                <input id="current-password" type="password" className="w-2/6 mb-2.5 "/>
                            </div>
                            <div className=" flex flex-col">
                                <label htmlFor="password">New Password</label>
                                <input id="password" type="password" className="w-2/6 mb-2.5 "/>
                            </div>
                            <button className="float-right w-max text-white bg-lightPrimary px-2.5 py-2 rounded-md">
                                Save
                            </button>
                        </nav>
                    </details>
                </div>
                {/* Account */}
                <div className="border-y px-2.5 py-4 flex w-full">
                    <span className="w-1/4 font-medium">Delete account</span>
                    <details className="group select-none w-full">
                        <summary
                            className="group flex items-center rounded-lg px-4 py-2 "
                        >
                            <div className="ml-3">
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

                        <nav aria-label="Users Nav" className="mt-2 ml-8 transition-all">
                            <div className="w-5/6 flex flex-col">
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

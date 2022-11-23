import React, {useState} from 'react'
import Head from 'next/head'
import {PersonalDetails, Security} from '../../components/user'
import {BsShieldLock, RiUserSettingsLine} from '../../utils/icons'

const UserPage = () => {
    const sidebar = [
        {
            icon: <RiUserSettingsLine/>,
            name: 'Personal details',
            id: 1,
            component: <PersonalDetails/>
        },
        {
            icon: <BsShieldLock/>,
            name: 'Security',
            id: 2,
            component: <Security/>
        }
    ]
    const [active, setActive] = useState(1)
    const itemActive = sidebar.find((item) => item.id === active)
    return (
        <>
            <Head>
                <title>Personal</title>
            </Head>

            <div className="container mx-auto">
                <div className="w-full flex py-4">
                    <div className="w-3/12 h-max mr-2.5 border rounded-xl overflow-hidden">
                        {sidebar.map(item => (
                            <div
                                key={item.name}
                                className={`p-4 flex gap-x-2.5 items-center border cursor-pointer
                            hover:text-secondary hover:underline
                            ${active === item.id ? 'text-secondary' : ''}
                            `}
                                onClick={() => setActive(item.id)}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="w-9/12 pl-2.5">
                        {itemActive?.component}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPage

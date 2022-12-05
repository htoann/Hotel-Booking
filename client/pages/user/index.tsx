import React, {useState} from 'react'
import withAuthentication from '../../components/withAuthentication'
import {Layout} from '../../components/layout'
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
        <Layout
            metadata={{
                title: `Personal - Booking`,
                description: `Booking`
            }}
        >
            <div className="mx-auto container px-4 lg:px-6">
                <div className="w-full flex flex-col md:flex-row gap-4 py-4">
                    <div
                        className="md:w-3/12 flex flex-wrap md:flex-col h-max border rounded-xl">
                        {sidebar.map(item => (
                            <div
                                key={item.name}
                                className={`p-4 flex gap-x-2.5 items-center cursor-pointer
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
                    <div className="w-full md:w-9/12 pl-2.5">
                        {itemActive?.component}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default withAuthentication(UserPage)

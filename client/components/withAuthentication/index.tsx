import {useRouter} from 'next/router'
import {ReactElement, useEffect} from 'react'
import type {FC} from 'react'
import {useAppSelector} from '../../store/hooks'

type withAuthenticationFn = (Component: FC) => FC;

const withAuthentication: withAuthenticationFn = (Component) => {
    const Authenticated: FC = (): ReactElement | null => {
        const {token} = useAppSelector((state) => state.persistedReducer.auth)
        const router = useRouter()

        useEffect(() => {
            if (!token) router.push('/auth')
        })

        return token ? <Component/> : null
    }

    return Authenticated
}

export default withAuthentication

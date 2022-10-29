import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {SignIn, SignUp} from '../../components/auth'

const Index = () => {
    const router = useRouter()
    const {asPath} = router
    const [isSignIn, setIsSignIn] = useState<boolean>(true)
    return (
        <div>
            <p>Auth Page</p>
            {isSignIn ? <SignIn setIsSignIn={setIsSignIn}/> : <SignUp setIsSignIn={setIsSignIn}/>}
        </div>
    )
}

export default Index

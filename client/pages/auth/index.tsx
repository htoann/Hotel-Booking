import React, {useState} from 'react'
import {SignIn, SignUp} from '../../components/auth'

const Index = () => {
    const [isSignIn, setIsSignIn] = useState<boolean>(true)
    return (
        <>
            {isSignIn ? <SignIn setIsSignIn={setIsSignIn}/> : <SignUp setIsSignIn={setIsSignIn}/>}
        </>
    )
}

export default Index

import React, {useState} from 'react'
import {SignIn, SignUp} from '../../components/auth'

const Index = () => {
    const [isSignIn, setIsSignIn] = useState<boolean>(true)
    return (
        <div>
            {isSignIn ? <SignIn setIsSignIn={setIsSignIn}/> : <SignUp setIsSignIn={setIsSignIn}/>}
        </div>
    )
}

export default Index

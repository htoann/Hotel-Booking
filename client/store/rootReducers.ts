import {combineReducers} from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'

const rootReducers = combineReducers({
    authSlice
})

export default rootReducers

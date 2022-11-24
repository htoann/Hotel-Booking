import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from '../models'

export interface AuthState {
    user: IUser | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<AuthState>
        ) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },

        logout: (state) => {
            state.user = null
            state.token = null
        }
    }
})

export const {setUser, logout} = authSlice.actions

export default authSlice.reducer

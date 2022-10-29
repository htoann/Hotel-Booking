import {createSlice} from '@reduxjs/toolkit'

interface log {
    isLoggedIn: boolean;
    token: string | null;
}

const initialState: log = {isLoggedIn: false, token: ''}
const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        Login (state, action) {
            const {token} = action.payload
            state.token = token
            state.isLoggedIn = true
        },
        Logout (state) {
            state.token = null
            state.isLoggedIn = false
        }
    }
})

export default authSlice.reducer
export const authActions = authSlice.actions

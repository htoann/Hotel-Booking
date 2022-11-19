import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface AppState {
    wishList: string[];
}

const initialState: AppState = {
    wishList: []
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setHotelWishList: (state, action: PayloadAction<string[]>) => {
            state.wishList = action.payload
        },
        addHotelToWishList: (state, action: PayloadAction<string>) => {
            const check = state.wishList?.every((id) => {
                return id !== action.payload
            })
            if (check) {
                state.wishList.push(action.payload)
            }
        },
        removeHotelFromWishList: (state, action: PayloadAction<string>) => {
            const index = state.wishList.indexOf(action.payload)
            if (index > -1) {
                state.wishList.splice(index, 1)
            }
        }
    }
})

export const {setHotelWishList, addHotelToWishList, removeHotelFromWishList} =
    appSlice.actions

export default appSlice.reducer

import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IHotel} from '../models'

export interface AppState {
    wishList: IHotel[];
}

const initialState: AppState = {
    wishList: []
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setHotelWishList: (state, action: PayloadAction<IHotel[]>) => {
            state.wishList = action.payload
        },
        addHotelToWishList: (state, action: PayloadAction<IHotel>) => {
            const check = state.wishList?.every((hotel) => {
                return hotel._id !== action.payload._id
            })
            if (check) {
                state.wishList.push(action.payload)
            }
        },
        removeHotelFromWishList: (state, action: PayloadAction<IHotel>) => {
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

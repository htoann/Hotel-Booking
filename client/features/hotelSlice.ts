import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IHotel} from '../models'

export interface HotelState {
    hotels: IHotel[];
}

const initialState: HotelState = {
    hotels: []
}
export const hotelSlice = createSlice({
    name: 'hotels',
    initialState,
    reducers: {
        setHotels: (
            state,
            action: PayloadAction<{ hotels: IHotel[] }>
        ) => {
            state.hotels = action.payload.hotels
        }
    }
})

export const {setHotels} = hotelSlice.actions

export default hotelSlice.reducer

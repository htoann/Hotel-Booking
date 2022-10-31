import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IHotel} from '../models'

export interface HotelState {
    hotels: IHotel[] | null;
}

const initialState: HotelState = {
    hotels: null
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

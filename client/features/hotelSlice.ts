import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IHotel} from '../models'

export interface HotelState {
    hotels: IHotel[];
    myHotels: IHotel[];
}

const initialState: HotelState = {
    hotels: [],
    myHotels: []
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
        },
        setMyHotels: (state, action: PayloadAction<IHotel[]>
        ) => {
            state.myHotels = action.payload
        },
        addToMyHotels: (state, action: PayloadAction<IHotel>) => {
            state.myHotels.push(action.payload)
        },
        deleteFromMyHotels: (state, action: PayloadAction<string>) => {
            state.myHotels = state.myHotels.filter(hotel => hotel._id !== action.payload)
        }
    }
})

export const {setHotels, setMyHotels, addToMyHotels, deleteFromMyHotels} = hotelSlice.actions

export default hotelSlice.reducer

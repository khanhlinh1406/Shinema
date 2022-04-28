import { createSlice } from "@reduxjs/toolkit";
import { movieType } from '../../api/tmdbApi'

export const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        selectedDate: ''
    },
    reducers: {
        setDate: (state, action) => {
            state.selectedDate = action.payload
            console.log(state.selectedDate)
        }
    }
})
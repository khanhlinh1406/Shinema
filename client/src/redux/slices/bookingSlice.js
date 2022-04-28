import { createSlice } from "@reduxjs/toolkit";
import { movieType } from '../../api/tmdbApi'

export const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        selectedFilm: '',
        selectedDate: '',
        selectedTime: '',
        selectedTheater: '',
        showTimeList: [],
        currentTimeArray: [],
        currentTheaterArray: [],
    },
    reducers: {
        setSelectedFilm: (state, action) => {
            state.selectedFilm = action.payload
        },

        setDate: (state, action) => {
            state.selectedDate = action.payload
        },

        setTime: (state, action) => {
            state.selectedTime = action.payload
        },

        setShowTimeList: (state, action) => {
            state.showTimeList = action.payload
        },

        setCurrentTimeArray: (state, action) => {
            state.currentTimeArray = action.payload
        },

        setSelectedTheater: (state, action) => {
            state.selectedTheater = action.payload
        },

        setCurrentTheaterArray: (state, action) => {
            state.currentTheaterArray = action.payload
        }

    }
})
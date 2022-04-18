import { createSlice } from "@reduxjs/toolkit";

export const showTimeSlice = createSlice({
    name: 'showTime',
    initialState: {
        data: [],
        filter: {
            date: ''
        },
        newShowTime: {
            film: {},
            theater: {},
            listDateTime: []
        }
    },
    reducers: {
        updateAll: (state, action) => {
            state.data = action.payload
        },
        add: (state, action) => {
            state.data.push(action.payload)
        },
        setFilter: (state, action) => {
            state.filter.date = action.payload
        },
        updateNewShowtime: (state, action) => {
            state.newShowTime = action.payload
        },
        updateNewFilm: (state, action) => {
            state.newShowTime.film = action
        },
        updateNewTheater: (state, action) => {
            state.newShowTime.theater = action
        },
        addNewListDateTime: (state, action) => {
            state.newShowTime.listDateTime.push(action.payload)
        }
    }
})
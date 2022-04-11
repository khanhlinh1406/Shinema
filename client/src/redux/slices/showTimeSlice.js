import { createSlice } from "@reduxjs/toolkit";

export const showTimeSlice = createSlice({
    name: 'showTime',
    initialState: {
        data: [],
        filter: {
            date: ''
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
        }
    }
})
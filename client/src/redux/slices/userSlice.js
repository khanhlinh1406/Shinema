import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        instance: ''
    },
    reducers: {
        update: (state, action) => {
            state.instance = action.payload
        },
    }
})
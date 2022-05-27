import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketApi from "../../api/ticketApi";

import { userSelector } from "../selector";
import { useSelector } from 'react-redux';



export const getByUser = createAsyncThunk(

    'ticket/getByUser',
    async(data, { rejectWithValue }) => {
        const response = await ticketApi.getByUser(data)
        if (response.status != 200) {
            return rejectWithValue("Get All Failed");
        } else {
            return response.data;
        }
    }
);


export const ticketSlice = createSlice({
    name: 'ticket',
    initialState: {
        ticketList: [],
        loading: false
    },
    reducers: {
        ticketListChange: (state, action) => {
            state.ticketList = action.payload;
        },
        ticketLoadingChange: (state, action) => {
            state.loading = action.payload;
        },
        addticket: (state, action) => {
            state.ticketList.push(action.payload)
        },
        deleteticket: (state, action) => {
            state.ticketList = state.ticketList.filter(ite => ite._id != action.payload)
        },
    },
    extraReducers: {
        [getByUser.pending]: (state) => {
            state.loading = true;
        },
        [getByUser.fulfilled]: (state, action) => {
            state.ticketList = action.payload
            state.loading = false;
        },
        [getByUser.rejected]: (state, action) => {
            state.loading = false;
        }
    }
})
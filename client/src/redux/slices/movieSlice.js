import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        data: [],
        upcoming: [],
        movie: {}
    },
    reducers: {
        addMovie: (state, action) => {
            state.data.push(action.payload)
        }, /// type: movie/addMovie

        updateMovie: (state, action) => {
            let updateData = state.data;
            updateData = updateData.map(movie => {
                if (movie.id == action.payload.id)
                    return action.payload
                else return movie
            })

            state.data = updateData
        }, /// type: movie/updateMovie

        removeMovie: (state, action) => {
            let removeMovie = state.data;
            removeMovie.movie = removeMovie.filter(movie => movie.id != action.payload.id)
            state.data = removeMovie
        },

        updateAllUpcoming: (state, action) => {
            state.upcoming = action.payload
        },

        addUpcoming: (state, action) => {
            state.upcoming.push(action.payload)
        },
    }
})
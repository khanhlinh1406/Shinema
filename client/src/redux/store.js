import { configureStore } from '@reduxjs/toolkit';

import { movieSlice } from './slices/movieSlice';
import { userSlice } from './slices/userSlice';
import { showTimeSlice } from './slices/showTimeSlice';
import { theaterSlice } from './slices/theaterSlice'

const Store = configureStore({
    reducer: {
        movies: movieSlice.reducer,
        users: userSlice.reducer,
        showTimes: showTimeSlice.reducer,
        theaters: theaterSlice.reducer
    },
});

export default Store;
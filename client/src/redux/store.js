import { configureStore } from '@reduxjs/toolkit';

import { movieSlice } from './slices/movieSlice';
import { userSlice } from './slices/userSlice';
import { showTimeSlice } from './slices/showTimeSlice';
import { theaterSlice } from './slices/theaterSlice'
import { movieCornerSlice } from './slices/movieCornerSlice';
import { bookingSlice } from './slices/bookingSlice'

const Store = configureStore({
    reducer: {
        movies: movieSlice.reducer,
        users: userSlice.reducer,
        showTimes: showTimeSlice.reducer,
        theaters: theaterSlice.reducer,
        corner__movie: movieCornerSlice.reducer,
        booking: bookingSlice.reducer
    },
});

export default Store;
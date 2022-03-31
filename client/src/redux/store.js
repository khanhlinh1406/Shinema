import { configureStore } from '@reduxjs/toolkit';

import  {movieSlice}  from './slices/movieSlice';
import  {userSlice}  from './slices/userSlice';

const Store = configureStore({
    reducer: {
        movies: movieSlice.reducer,
        users: userSlice.reducer
    },
});

export default Store;
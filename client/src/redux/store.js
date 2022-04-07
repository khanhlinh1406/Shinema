import { configureStore } from '@reduxjs/toolkit';

import  {movieSlice}  from './slices/movieSlice';
import  {userSlice}  from './slices/userSlice';
import { movieCornerSlice } from './slices/movieCornerSlice';

const Store = configureStore({
    reducer: {
        movie: movieSlice.reducer,
        user: userSlice.reducer,
        corner__movie: movieCornerSlice.reducer,
    },
});

export default Store;
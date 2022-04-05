import { configureStore } from '@reduxjs/toolkit';

import  {movieSlice}  from './slices/movieSlice';
import  {userSlice}  from './slices/userSlice';

const Store = configureStore({
    reducer: {
        movie: movieSlice.reducer,
        user: userSlice.reducer
    },
});

export default Store;
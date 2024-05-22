// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tournamentsReducer from './tournamentsSlice';
import matchesReducer from './matchesSlices'


const store = configureStore({
    reducer: {
        user: userReducer,
        tournaments: tournamentsReducer,
        matches: matchesReducer,
    },

});

export default store;
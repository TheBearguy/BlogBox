import {configureStore} from '@reduxjs/toolkit'
import reducer from "../features/authSlice.js"
import authSlice from "../features/authSlice.js"
const store = configureStore({
    reducer:{
        auth: authSlice
        // TODO: add more slices here for posts
    } // reducer imported from some slice
})

export default store;

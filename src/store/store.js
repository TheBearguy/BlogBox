import {configureStore} from '@reduxjs/toolkit'
import reducer from "../features/authSlice.js"
const store = configureStore({
    reducer:{
        reducer
    } // reducer imported from some slice
})

export default store;

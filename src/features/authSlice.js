import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // what are the possible states of a user state management :
        // 1. user is logged in
        // 2. user is logged out
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state, action) => {
            state.status = false;
            state.userData = null; 
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;

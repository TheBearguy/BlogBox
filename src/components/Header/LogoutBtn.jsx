import React from 'react'
import {useDispatch} from 'react-redux';
import authService from '../../appwrite/auth_service';
import {logout} from '../../features/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        // all appwrite methods are async
        // all processes related to appwrite are async, they return a promise
        // so we can use .then() to handle the response
        // console.log("HEADER :: Logout Button Clicked");
        authService.logout()
            .then(() => {
                // dispatch an action to update the state
                dispatch(logout());
            })
            .catch((error) => {
                console.log("HEADER :: Logout Error :: ", error);
    })
}
    return (
        <button className='inline-block px-6 py-2 duration-200 hover:bg:blue-100 rounded-full'  onClick={logoutHandler}>Logout</button>
    )
}

export default LogoutBtn

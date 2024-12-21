import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication=true}) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status); // get the auth status from the redux store

    useEffect(() => {
        // TODO: make it more easy to understand

        // if (authStatus === true) {
        //     navigate("/");
        // } else if (authStatus === false) {
        //     navigate("/login");
        // }

        // let authValue = authStatus === true ? true : false;

        if(authentication && authStatus !== authentication) {
            navigate("/login");
        } else if (!authentication && authStatus !==  authentication) {
            navigate("/");
        }
        setLoader(false); // set the loader to false after the authentication is done
    }, [authStatus, authentication, navigate])


  return loader? <h1>Loading...</h1> : <>{children}</>
}

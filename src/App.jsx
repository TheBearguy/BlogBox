import { useState, useEffect } from 'react'
import {useDispatch} from "react-redux"
import "./App.css"
import authService from "./appwrite/auth_service.js";
import {login, logout} from "./features/authSlice"
import {Header, Footer } from "./components/";
import {Outlet} from "react-router-dom"
function App() {

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({userData}));
                } else {
                    dispatch(logout())
                }
            })
            // .catch((error) => {
            //     console.log("AUTHSERVICE ERROR :: APP :: ERROR :: ", error);
            // })
            .finally(() => setLoading(false))
    }, [])

    return !loading ? (
        <div className='min-h-screen flex flex-wrap content-between bg-slate-950'>
          <div className='w-full block text-white'>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      ) : null
}

export default App

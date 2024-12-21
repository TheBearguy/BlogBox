import React from 'react'
import {useSelector} from 'react-redux';
import {Container, LogoutBtn, Logo} from '../index';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Header() {
    const user = useSelector(state => state.auth.userData);
    const authStatus = useSelector(state => state.auth.status);
    const navigate = useNavigate();
    const navItems = [
        {
            name: 'Home',
            slug: '/', // route
            active: 'true'
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        }
    ]; // array of objects
    // if any new route is added, it will be added to the navItems array (making prod code more scalable)
    return (
    <header className='flex justify-between items-center p-4 bg-gray-800 text-white'>
        <Container>
        <nav className='flex'>
            <div className='mr-4'>
                <Link to='/'>
                    <Logo width='70px' />
                </Link>
            </div>
            <ul className='flex ml-auto'>
                {navItems.map((item, index) => {
                    return item.active && (
                        <li key={index} className='mr-4'>
                            <button onClick={() => navigate(item.slug)} className='inline-block px-6 py-2 curation-200 hover:bg-blue-100 rounded-full' >{item.name} </button>
                        </li>
                    )
                })}
                {authStatus && (
                    <li>
                        <LogoutBtn />
                    </li>
                )}
            </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header

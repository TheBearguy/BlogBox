import React, {useState} from 'react'
import { Link, matchPath, useNavigate } from 'react-router-dom'
import {login as authLogin} from '../features/authSlice'
import {useDispatch} from 'react-redux'
import {Button, Input, Logo} from "./index"
import {service} from '../appwrite/config'
import { useForm  } from "react-hook-form"
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm();
    // handleSubmit is an event handler that will be called when the form is submitted and it will pass the form data to the login function
    // register is also an event handler that will register the input fields with the react-hook-form library
    // it has to be passed to the input field as a prop (it has to be destructured from the useForm hook) (spread operator)
    // formState is an object that contains the state of the form, it has a property called errors that will contain the errors of the form fields
    const [error, setError] = useState("");
    const login = async (data) => {
        setError(""); // for clearing the error message, if any from previous login attempt
        try {
            const session = await service.login(data);
            console.log("session", session);
            if (session) {
                const userData = await service.getCurrentUser();
                if (userData) {
                    dispatch(authLogin({userData}));
                }
                navigate("/"); // redirect to home page
            }
        } catch (error) {
            setError(error.message);
        }
    }
  return (
    <div
        className='flex items-center justify-center w-full'
    >
        <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px'>
                    <Logo width='100%'/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account bro</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Don$apos;t have an account? <Link to='/signup' className='font-medium text-primary transition-all duration-200 hover:underline'>Create one</Link>
            </p>
            {error && <p className='text-red-600 text-center mt-8'>{error}</p>}
            <form action={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                        label='Email: '
                        placeholder='Enter your email'
                        type='email'
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([,-]?\w+)*@\w+([,-]?\w+)*(\.\w{2,3})+$/.test(value) || "Invalid email"
                            }
                            // this is a custom validation rule, we can also use the pattern attribute in the input field to validate the email address but this is a more dynamic way to do it
                        })}
                    />
                    <Input
                        label="Password: "
                        placeholder='Enter your password'
                        type="password"
                        {...register("password", {required: true})}
                    />
                    <Button
                        type='submit'
                        className='w-full'
                    >
                        Sign in
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login

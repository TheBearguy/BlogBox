import React, {useState} from 'react'
import {authService} from '../appwrite/auth_service'
import {Link, useNavigate} from 'react-router-dom'
import {Button, Input, Logo} from "./index"
import {useForm} from 'react-hook-form'
import {login} from '../features/authSlice'
import { useDispatch } from 'react-redux'
function Signup() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}}  = useForm();
    const create = async  (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);

            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login({userData}));
                }
            }
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    }
  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%'/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to Create an account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Already have an account?&nbsp;
                <Link to={/login}
                    className='font-medium text-primary transition-all duration-200 hover:underline'>Sign in
                </Link>
            </p>
            {error && <p className='text-red-600 text-center mt-8'>{error}</p>}
            <form onSubmit={handleSubmit(create)}>
               <div className='space-y-5'>
                    <Input
                        label='FullName: '
                        placeholder='Enter your full name'
                        {...register("name", {
                            required: true
                        })}
                    />
                    {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                    <Input
                        label='Email: '
                        placeholder='Enter your email'
                        type='email'
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([,-]?\w+)*@\w+([,-]?\w+)*(\.\w{2,3})+$/.test(value) || "Invalid email"
                            }
                        })}
                    />
                    <Input
                        label='Password: '
                        placeholder='Enter your password'
                        type='password'
                        {...register("password", {
                            required: true,
                            minLength: 6
                        })}
                    />
                    {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                    <Button type='submit' className='w-full'>Create Account</Button>
                </div>
            </form>
        </div>

    </div>
)
}

export default Signup

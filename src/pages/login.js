import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import useToken from '../hooks/useToken'
import './login.scss'
import {useNavigate} from "react-router-dom";

const Login = () => {
    //const tokenSelector = useSelector((state) => state.token);
    const {login, error, logedin} = useToken();
    const navigate = useNavigate();
    const [fields, setFields] = useState({
        username: '',
        password: ''
    })
    const [hideError, setErrorHiding] = useState(false);

    useEffect(()=> {
        if (error && error.length > 0)
            console.error(error);
        setErrorHiding(false);
    }, [error]);

    useEffect(()=> {
        if (logedin)
            navigate("/payments")
    }, [logedin]);

    const closeError = () => {
        setErrorHiding(true);
    }

    const onChangeEvent = (event) => {
        setFields({
            ...fields,
            [event.target.name]: event.currentTarget.value
        })
    }

    const onSubmitEvent = (event) => {
        event.preventDefault();
        login(fields.username, fields.password);
    }

    return (
        <form onSubmit={onSubmitEvent}>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Логин</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="username" id="username" onChange={onChangeEvent} required/>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-3">Пароль</label>
            <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="password" id="password" onChange={onChangeEvent} required/>
            {error && !hideError &&
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-1.5 rounded-full relative mt-3" role="alert">
                    <span className="block sm:inline">{error}</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-1.5" onClick={closeError}>
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </span>
                </div>
            }
            <button type='submit' className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full mt-5'>Войти</button>
        </form>
    )
}

export default Login;
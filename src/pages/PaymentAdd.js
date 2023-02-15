import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import getUsers from "../actions/users"
import useUsers from "../hooks/useUsers"
import {currency} from "../types/currency"
import { useState } from "react"
import useToken from "../hooks/useToken"
import { useNavigate } from "react-router-dom"
import { addPayment } from "../actions/payments"
import usePayments from "../hooks/usePayments"
import { ADD_PAYMENT } from "../types"
import {clearType} from "../actions/payments"

const PaymentAdd = () => {

    const {users} = useUsers();
    const dispatch = useDispatch();
    const {logedin} = useToken();
    const navigate = useNavigate();

    const {type} = usePayments()

    const [fields, setFields] = useState({
        username: users[0] ?? '',
        credentials: '',
        amount: 0,
        currency: currency[0].symbol ?? '',

    })

    const onChangeEvent = (event) => {
        setFields({
            ...fields,
            [event.target.name]: event.currentTarget.value
        });
    }

    const onSubmitEvent = (event) => {
        event.preventDefault();
        dispatch(addPayment(fields.username, fields.credentials, parseFloat(fields.amount), fields.currency));
    }

    const redirectBack = () =>
    {
        dispatch(clearType());
        navigate("/payments");
    }

    useEffect(()=> {
        if (type == ADD_PAYMENT)
            redirectBack();
    }, [type])

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    return (
        <>
            <form className="w-90 px-10" onSubmit={onSubmitEvent}>
                <div className="inline-block relative w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2" htmlFor="username">
                        Логин
                    </label>
                    <select onChange={onChangeEvent} value={fields.username} name="username" id="username" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline" required>
                        {users.map((username, index) => <option value={username} key={index}>{username}</option>)}
                    </select>
                </div>
                <div className="inline-block relative w-full">
                    <label htmlFor="credentials" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">Реквизиты</label>
                    <textarea onChange={onChangeEvent} name="credentials" id="credentials" rows="4" className="block p-2.5 w-full text-sm text-gray-700 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ИНН, БИК, ..." required></textarea>
                </div>
                <div className="inline-block relative w-full">
                    <label htmlFor="amount" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">Сумма</label>
                    <input onChange={onChangeEvent} min={1} name="amount" type="number" id="amount" className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required/>
                </div>
                <div className="inline-block relative w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2" htmlFor="currency">
                        Валюта
                    </label>
                    <select onChange={onChangeEvent} name="currency" id="currency" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline" required>
                        {currency.map((value, index)=> <option value={value.symbol} key={index}>{value.name}</option>)}
                    </select>
                </div>
                <div className="inline-block relative w-full mt-3">
                    <button type="submit" className="w-full mb-3 inline-block bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 disabled:opacity-25 hover:border-transparent rounded-full">Добавить</button>
                    <button type="button" onClick={redirectBack} className="w-full inline-block bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 disabled:opacity-25 hover:border-transparent rounded-full">Назад</button>
                </div>
            </form>
        </>
    )
}

export default PaymentAdd
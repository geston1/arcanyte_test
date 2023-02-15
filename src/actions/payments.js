import { getState } from "react-pages";
import httpClient from "../http/httpClient"
import {GET_PAYMENTS, UPDATE_PAYMENT, ADD_PAYMENT, API_ERROR} from '../types'
import { deleteToken } from "./token";

const getPayments = () => (dispatch, getState) => {
    const token = localStorage.getItem("token");

    httpClient.get('api/payments',{
        headers:{
            'Authorization': 'Bearer ' + token
        }
    }).then((response) => {
        dispatch({ type: GET_PAYMENTS, list: response.data.message})
    }).catch((error) => {
        if (error.response.data.code == 401)
            dispatch(deleteToken());
        else
            dispatch({ type: API_ERROR, error: "Техническая ошибка, обратитесь к администратору" });
    });
}

const changePaymentStatus = (id, newStatus) => (dispatch, getState) => {
    const token = localStorage.getItem("token");
    httpClient.put('api/payment', {uuid: id, status: newStatus},{
        headers:{
            'Authorization': 'Bearer ' + token
        }
    }).then((response) => {
        dispatch({type: UPDATE_PAYMENT})
        dispatch(getPayments());
    }).catch((error) => {
        if (error.response.data.code == 401)
            dispatch(deleteToken());
        else
            dispatch({ type: API_ERROR, error: "Техническая ошибка, обратитесь к администратору" })
    })
}

const addPayment = (username, credentials, amount, currency) => (dispatch, getState) => {
    const token = localStorage.getItem("token");
    httpClient.post('api/payment', {"username": username, "credentials": credentials, "amount": amount, "currency": currency, "status": false},{
        headers:{
            'Authorization': 'Bearer ' + token
        }
    }).then((response) => {
        dispatch({type: ADD_PAYMENT})
        dispatch(getPayments());
    }).catch((error) => {
        if (error.response.data.code == 401)
            dispatch(deleteToken());
        else
            dispatch({ type: API_ERROR, error: "Техническая ошибка, обратитесь к администратору" })
    })
}

const clearType = () => (dispatch, getState) => {
    dispatch({type: undefined});
}

export {changePaymentStatus, getPayments, addPayment, clearType}
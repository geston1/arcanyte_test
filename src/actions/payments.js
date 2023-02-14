import httpClient from "../http/httpClient"
import {GET_PAYMENTS} from '../types'

const getPayments = () => (dispatch, getState) => {
    const token = localStorage.getItem("token");

    httpClient.get('api/payments',{
        headers:{
            'Authorization': 'Bearer ' + token
        }
    }).then((response) => {
        dispatch({ type: GET_PAYMENTS, list: response.data.message})
    }).catch((error) => {
        dispatch({ type: GET_PAYMENTS, list: [], error: "Техническая ошибка, обратитесь к администратору" });
    });
}

export {getPayments}
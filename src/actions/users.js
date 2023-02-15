import httpClient from "../http/httpClient"
import {deleteToken} from "./token"
import { GET_USERS, API_ERROR } from "../types";

const getUsers = () => (dispatch, getState) => {
    const token = localStorage.getItem("token");

    httpClient.get('api/users',{
        headers:{
            'Authorization': 'Bearer ' + token
        }
    }).then((response) => {
        dispatch({ type: GET_USERS, users: response.data.message})
    }).catch((error) => {
        if (error.response.data.code == 401)
            dispatch(deleteToken());
        else
            dispatch({ type: API_ERROR, error: "Техническая ошибка, обратитесь к администратору" });
    });
    
}

export default getUsers
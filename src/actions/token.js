import httpClient from '../http/httpClient'
import {GET_TOKEN, REMOVE_TOKEN} from '../types'


const getToken = (username, password) => (dispatch, getState) => {
    httpClient.post('api/auth',{username: username, password: password}).then((response) => {
        localStorage.setItem("token", response.data.token)
        dispatch({ type: GET_TOKEN, token: response.data.token });
    }).catch((error) => {
        if (error.response.data.code == 401)
            dispatch({ type: GET_TOKEN, error: "Неверный логин/пароль" });
        else
            dispatch({ type: GET_TOKEN, error: "Техническая ошибка, обратитесь к администратору" });
    });
}

const deleteToken = () => (dispatch, getState) => {
    localStorage.removeItem("token");
    dispatch({type: REMOVE_TOKEN, token: undefined});
}

export {getToken, deleteToken}
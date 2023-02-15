import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {getToken, deleteToken} from "../actions/token";
import {GET_TOKEN} from "../types";

const useToken = () => {
    const tokenSelector = useSelector((state) => state.token);
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [error, setError] = useState(tokenSelector.error);
    const [logedin, setLogedin] = useState((tokenSelector.token && tokenSelector.token.length > 0) || false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
        if (!logedin)
            navigate("/");
    }, [logedin]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token)
            dispatch({ type: GET_TOKEN, token: token });
    }, [])

    useEffect(() => {
        setToken(tokenSelector.token)
        setError(tokenSelector.error);
        setLogedin((tokenSelector.token && tokenSelector.token.length > 0) || false);
    }, [tokenSelector]);

    const login = (username, password) => {
        dispatch(getToken(username, password));
    }

    const logout = () => {
        dispatch(deleteToken());
    }

    return {
        login,
        logout,
        error,
        token: token,
        logedin: logedin
    };

}

export default useToken;
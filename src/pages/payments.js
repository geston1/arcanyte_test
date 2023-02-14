import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MenuPanel from '../components/MenuPanel';
import PaymentsList from '../components/PaymentsList';
import useToken from "../hooks/useToken";

const Payments = () => {

    const {logedin} = useToken();
    const navigate = useNavigate();

    useEffect(()=> {
        if (!logedin)
            navigate("/");
    }, [logedin]);

    return (
        <>
            <MenuPanel/>
            <PaymentsList/>
        </>
    )
}

export default Payments;
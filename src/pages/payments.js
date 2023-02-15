import React from "react";
import { useEffect } from "react";

import MenuPanel from '../components/MenuPanel';
import PaymentsList from '../components/PaymentsList';
import useToken from "../hooks/useToken";

const Payments = () => {

    return (
        <>
            <MenuPanel/>
            <PaymentsList/>
        </>
    )
}

export default Payments;
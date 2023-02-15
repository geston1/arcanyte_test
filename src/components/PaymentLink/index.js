import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PaymentLink = () => {

    const location = useLocation();
    const isOnPage = location.pathname == "/payments";

    return (
        <>
            <Link to="/payments">
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 disabled:opacity-25 hover:border-transparent rounded-full w-24" disabled={isOnPage}>Выплаты</button>
            </Link>
        </>
    );
}

export default PaymentLink;
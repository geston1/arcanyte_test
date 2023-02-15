import React from "react"
import { Link } from "react-router-dom"

const PaymentAdd = () => {
    return (
        <button className="ml-auto mr-3 inline-block bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 disabled:opacity-25 hover:border-transparent rounded-full w-30">
            <Link to="/payments/add">
                Добавить платёж
            </Link>
        </button>
    )
}

export default PaymentAdd
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getPayments } from "../../actions/payments"
import usePayments from "../../hooks/usePayments"
import PaymentRow from "../PaymentsRow"

const PaymentsList = () => {
    
    const dispatch = useDispatch();
    const {list, error} = usePayments();

    useEffect(() => {
        dispatch(getPayments());
    }, []);

    return (
        <>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5 mb-5">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Логин</th>
                        <th scope="col" className="px-6 py-3">Реквизиты</th>
                        <th scope="col" className="px-6 py-3">Сумма</th>
                        <th scope="col" className="px-6 py-3">Валюта</th>
                        <th scope="col" className="px-6 py-3">Статус заявки</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800">
                {
                    list && list.map((payment, index) => <PaymentRow payment={payment} key={index} />)
                }
                </tbody>
            </table>
        </>
    )
}

export default PaymentsList
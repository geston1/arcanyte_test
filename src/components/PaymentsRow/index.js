import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {changePaymentStatus} from "../../actions/payments"

const PaymentRow = ({payment}) =>
{
    const [showStatusMenu, setStatusMenuShowing] = useState(false);
    const dispatch = useDispatch();

    const status = payment.status == "Оплачен";
    const buttonBckgrnd = status ? "bg-green-100" : "bg-rose-100";

    const onStatusFocus = (event) => {
        event.preventDefault();
        setStatusMenuShowing(!showStatusMenu);
    }

    const setStatus = (event) => {
        event.preventDefault();
        setStatusMenuShowing(false);
        dispatch(changePaymentStatus(payment.uuid, !status));
    }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{payment.username}</td>
            <td className="px-6 py-4 whitespace-pre-wrap">{payment.credentials}</td>
            <td className="px-6 py-4">{payment.amount}</td>
            <td className="px-6 py-4">{payment.currency}</td>
            <td className="px-6 py-4">
                <div className="relative inline-block text-left">
                    <div>
                        <button type="button" className={`${buttonBckgrnd} inline-flex w-40 justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100`} id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={onStatusFocus}>
                        {payment.status}

                        <svg className="-mr-1 ml-auto h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                        </button>
                    </div>
                    {showStatusMenu &&
                        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div className="py-1" role="none">
                            
                            <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0" onClick={(e) => setStatus(e)}>{status? "Не оплачен" : "Оплачен"}</a>
                            </div>
                        </div>
                    }
                </div>
            </td>
        </tr>
    );
}

export default PaymentRow;
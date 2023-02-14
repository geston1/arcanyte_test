import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const usePayment = () => {
    const paymentSelector = useSelector((state) => state.payments);

    const [list, setList] = useState(paymentSelector.list);
    const [error, setError] = useState(paymentSelector.error);

    useEffect(() => {
        setList(paymentSelector.list);
        setError(paymentSelector.error);
    }, [])

    return {
        list,
        error
    }
}

export default usePayment;
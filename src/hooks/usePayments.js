import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const usePayments = () => {
    const paymentSelector = useSelector((state) => state.payments);

    const [type, setType] = useState(paymentSelector.type);
    const [list, setList] = useState(paymentSelector.list);
    const [error, setError] = useState(paymentSelector.error);

    useEffect(() => {
        setList(paymentSelector.list);
        setError(paymentSelector.error);
        setType(paymentSelector.type);
    }, [paymentSelector])

    return {
        type,
        list,
        error
    }
}

export default usePayments;
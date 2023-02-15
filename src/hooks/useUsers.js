import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const useUsers = () => {
    const paymentSelector = useSelector((state) => state.users);

    const [users, setList] = useState(paymentSelector.users);
    const [error, setError] = useState(paymentSelector.error);

    useEffect(() => {
        setList(paymentSelector.users);
        setError(paymentSelector.error);
    }, [paymentSelector])

    return {
        users,
        error
    }
}

export default useUsers;
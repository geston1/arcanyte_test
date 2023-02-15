import React from "react";
import useToken from "../../hooks/useToken";


const Logout = () => {

    const {logout} = useToken();

    const onClickEvent = () => {
        logout();
    }

    return (
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full w-24" onClick={onClickEvent}>
            <span>Выход</span>
        </button>
    );
}

export default Logout;
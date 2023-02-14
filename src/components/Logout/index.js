import React from "react";
import useToken from "../../hooks/useToken";


const Logout = () => {

    const {logout} = useToken();

    const onClickEvent = () => {
        logout();
    }

    return (
        <button className="text-gray-800 hover:text-gray-400 font-bold py-2 px-4 rounded inline-flex items-center" onClick={onClickEvent}>
            <span>Выход</span>
        </button>
    );
}

export default Logout;
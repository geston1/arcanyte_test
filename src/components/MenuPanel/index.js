import React from "react"
import Logout from "../Logout"
import PaymentLink from "../PaymentLink"
import PaymentAdd from "../PaymentAdd"

const MenuPanel = () => {
    return (
        <>
            <form className="w-full float-right m-0 p-3 flex flex-row">
                <PaymentLink/>
                <PaymentAdd/>
                <Logout/>
            </form>
        </>
    )
}

export default MenuPanel
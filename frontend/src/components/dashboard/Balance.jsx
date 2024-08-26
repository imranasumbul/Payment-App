
import React from "react";

function Balance({userFirstName, userBalance}){

    console.log("from Balance.jsx");

    return (
        <>
        <div className="flex justify-center w-full"> 
            <p className="font-bold text-l"> {userFirstName}'s balance is Rupees {userBalance} </p>
        </div>
        </>
    )
}

export default React.memo(Balance);
import React from "react"

function SendMoney({receiversName}){

    console.log("from SendMoney.jsx");
    return (
        <>
        <div>Send money</div>
        </>
    )
}
export default React.memo(SendMoney);
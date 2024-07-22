import { Link } from "react-router-dom";
import React from "react"

function BottomWarning({label, ButtonText, to}){
    return (
        <>
        <div className="w-full flex justify-center">

        
            <span className="text-sm">{label}</span>
            <Link to={to} className="text-sm font-bold"> 
                {ButtonText}
            </Link>
        </div>
        </>
    )
}

export default React.memo(BottomWarning);
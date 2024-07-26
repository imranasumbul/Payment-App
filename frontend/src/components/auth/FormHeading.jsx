import React from "react"

function FormHeading({heading}){
    return (
        <>
        <div className="font-bold p-3 text-3xl">
            {heading} 
        </div>
        </>
    )
}

export default React.memo(FormHeading);
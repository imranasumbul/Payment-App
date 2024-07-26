import React from "react"

function FormInputs({title, placeholder, type, onChangeFunction}){
    return (
        <>
        <div className="py-3 text-sm font-medium ">
            {title} 
        </div>
        <input className="w-full px-2 py-2 mb-2 rounded-md" onChange={onChangeFunction} placeholder={placeholder} type={type} />
        </>
    )
}

export default React.memo(FormInputs);
import React from "react";

function FormSubheading({subheading}){
    return (
        <>
        <div className="pt-1 pb-4 text-gray-600 text-md">
            {subheading} 
        </div>
        </>
    )
}
export default React.memo(FormSubheading);
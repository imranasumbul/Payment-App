import React from "react";

function SubmitFormBtn({buttonText, onClickFunc}){
    return (
        <>
        <button onClick={onClickFunc} className="bg-black text-white text-lg w-full p-2 my-4 rounded-md hover:bg-gray-500">
            {buttonText}
        </button>
        </>
    )
}

export default React.memo(SubmitFormBtn);
import React from "react";

function searchUsersInput({onChangeFunction}){

    console.log("from SearchedUsersInput.jsx");
    return (
        <>
            <div className=" my-4 md:my-8 w-full flex justify-center">
                <input className="w-[90%] sm:w-[80%] lg:w-[50%] border-2 border-gray-300 rounded-xl p-2" type="text" placeholder="Search for users" onChange={onChangeFunction} />
            </div>
        </>
    )
}

export default React.memo(searchUsersInput);
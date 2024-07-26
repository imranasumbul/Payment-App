import React from "react";

function Header({userFirstName}){

    console.log("from Header.jsx");
    return (
        <>
            <div className="flex justify-between items-center px-20 border-b border-gray-200 shadow-md">
                <h2 className="font-bold text-xl">PaymentApp</h2>
                <div className="flex items-center">
                    <span className="mx-4">Hello {userFirstName}</span>
                    <span className="bg-green-700 my-4 w-10 h-10 rounded-full "></span>

                </div>
            </div>
        </>
    )
}

export default React.memo(Header);
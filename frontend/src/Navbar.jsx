import { Link } from "react-router-dom";
import React from "react";

function Navbar(){

    return (
        <>
        <div className="w-full flex justify-center items-center py-4">
            <div className="w-[90%] flex">
            <Link to="/signin" >Sign In</Link>
            <Link to="/signup" >Sign Up</Link>
            </div>
            
        </div>
        </>
    )

}

export default React.memo(Navbar)
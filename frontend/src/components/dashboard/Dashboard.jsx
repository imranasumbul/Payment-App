import React from "react"
import Header from "./Header";
import Balance from "./Balance";
import axios from "axios";
import SearchUsersInput from "./searchUsersInput";
import { useState, useEffect } from "react";

function Dashboard(){

    const [searchedUsers, setSearchedUsers] = useState("");
    console.log(searchedUsers);
    useEffect(() => {
        async function a(){
            const response = await axios.get("http://localhost:3030/api/v1/users/bulk", {
                headers: {
                    'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM4In0.NzsvWrIxSF-ko0Zj6fKT60V21A_bbioi6A8V_NpSZv8`
                },
                params: {
                    name: searchedUsers
                }
            })
            console.log(response.data);
        }
        a();
        
    }, [searchedUsers])

    console.log("from Dashboard.jsx");
    return (
        <>
        <Header userFirstName={"Imrana"} />
        <Balance userBalance={599} userFirstName={"Imrana"}/>
        <SearchUsersInput onChangeFunction={function (e){
            setSearchedUsers(e.target.value);
        }} />
        <div>Dashboard</div>
        </>
    )
}
export default React.memo(Dashboard);
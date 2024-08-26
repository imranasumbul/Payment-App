
import React from "react"
import Navbar from "../../Navbar";
import TopDiv from "./TopDiv";
function Home() {
    return (
        <>
            <Navbar />
            <TopDiv/>
        </>
    )
}

export default React.memo(Home);
import FormHeading from "./FormHeading";
import FormSubheading from "./FormSubheading";
import FormInputs from "./FormInputs";
import SubmitFormBtn from "./SubmitFormBtn";
import BottomWarning from "./BottomWarning";
import { useCallback, useState } from "react";
import React from "react"

function Signin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [submitBtnClicked, setSubmitBtnClicked] = useState(false);
    
    return (
        
        <body className="w-full px-4 min-h-screen flex justify-center items-center">
            <div className="p-4 max-w-sm bg-gray-200 rounded-lg sm:max-w-md">
                <div className="w-full flex flex-col items-center">
                    <FormHeading heading="Sign In"/>
                    <FormSubheading subheading={"Enter your details below to sign in to your account"} />
                </div>
                <FormInputs onChangeFunction={function (e){
                    setEmail(e.target.value);
                }} type={"email"} placeholder={"johndoe@gmail.com"} title={"Email"} />
                <FormInputs type={"text"} onChangeFunction={function (e){
                    setPassword(e.target.value);
                }}  placeholder={"password"} title={"Password"} />
                < SubmitFormBtn buttonText={"Sign In"}/>
                <BottomWarning to={"/signup"} label={"Don't have an account yet? "} ButtonText={"Sign Up"}/>
            </div>
        </body>
        
        
    )
}

export default React.memo(Signin);
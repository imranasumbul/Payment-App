import FormHeading from "./FormHeading"
import FormInputs from "./FormInputs"
import FormSubheading from "./FormSubheading"
import SubmitFormBtn from "./SubmitFormBtn"
import BottomWarning from "./BottomWarning"
import Signin from "./Signin";
import React, { useMemo, useEffect, useState } from "react"
import axios from 'axios'

function Signup(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [submitBtnClicked, setSubmitBtnClicked] = useState(false);
    const [response, setResponse] = useState({});

    useEffect( () => {
        const a = async () => {
            await axios.post("http://localhost:3030/api/v1/users/signup", {
                username: email,
                password,
                firstName,
                lastName
            })
            
        };
        a();
    } , [submitBtnClicked])

    return (
        
        <body className="w-full px-4 min-h-screen flex justify-center items-center">
            <div className="p-4 max-w-sm bg-gray-200 rounded-lg sm:max-w-md">
                <div className="w-full flex flex-col items-center">
                    <FormHeading heading="Sign Up"/>
                    <FormSubheading subheading={"Enter your details below to create an account"} />
                </div>
                <FormInputs onChangeFunction={function (e){
                    setEmail(e.target.value);
                }} type={"email"} placeholder={"johndoe@gmail.com"} title={"Email"} />
                <FormInputs onChangeFunction={function (e){
                    setPassword(e.target.value);
                }} type={"text"} placeholder={"password"} title={"Password"} />
                <FormInputs onChangeFunction={function (e){
                    setFirstName(e.target.value);
                }} type={"text"} placeholder={"John"} title={"First Name"} />
                <FormInputs onChangeFunction={function (e){
                    setLastName(e.target.value);
                }} type={"text"} placeholder={"Doe"} title={"Last Name"} />
                < SubmitFormBtn onClickFunc={function (){
                    setSubmitBtnClicked(true);
                }} buttonText={"Sign Up"}/>

                <BottomWarning to={"/signin"} label={"Already have an account? "} ButtonText={"Sign In"}/>
            </div>
        </body>
        
    )
}
export default React.memo(Signup);
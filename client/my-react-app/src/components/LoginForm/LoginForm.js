

import React, { useState, useSyncExternalStore, useEffect } from 'react';
import "./LoginForm.css"
import { createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { auth } from "../../config/firebase.config"

const LoginForm = () => {

  const [email, setEmail ] = useState("");
  const [password, setPassword] = useState("");

  const signUpAction = async () =>{
    await createUserWithEmailAndPassword(auth, email, password).then(
      async (userCred) => {
        const user = userCred.user
        await sendEmailVerification(user)
        console.log('Success')
      }
    );
  }

  useEffect (() => {
     auth.onAuthStateChanged((userCred) => {
      console.log(userCred)
    })
  }, [])

  return (
    <div className="search-container">
      <h2>Sign Up:</h2>
      
      <form>
        <div class="top-margin">
          <label>Email:</label>
          <InputField type={"email"} placeholder={"Enter your email"} handleChange={(data) => setEmail(data)}/>
        </div>
        <div class="top-margin">
          <label>Password:</label>
          <InputField type={"password"} placeholder={"Enter your password"} handleChange={(data) => setPassword(data)}/>
        </div>
        <div class="top-margin">
          <label>Nickname:</label>
          <InputField type={"text"} placeholder={"Enter your nickname"}/>
        </div>
        <div>
          <button type="button" onClick={signUpAction}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({placeholder, handleChange, type}) =>{
  const [inputValue, setInputValue] = useState("")
  const handleChangeEvent = (e) => {
    setInputValue(e.target.value)
    handleChange(e.target.value)
  }
  return(
    <input value={inputValue} type={type} placeholder={placeholder} onChange={handleChangeEvent}/>
  )
}

export default LoginForm;

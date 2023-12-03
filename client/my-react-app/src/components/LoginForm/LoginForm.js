

import React, { useState, useSyncExternalStore, useEffect} from 'react';
import "./LoginForm.css"
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import { auth } from "../../config/firebase.config"

const LoginForm = () => {

  const [email, setEmail ] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const signUpAction = async () =>{
    await createUserWithEmailAndPassword(auth, email, password).then(
      async (userCred) => {
        const user = userCred.user
        await sendEmailVerification(user)
        console.log('Success')
      }
    );
  }

  const handleNicknameChange = (data) => {
    setNickname(data);
  };

  const handleEmailChange = (data) => {
    setEmail(data);
  };

  const handlePasswordChange = (data) => {
    setPassword(data);
  };

  const handleSignOut = async () => {
    // Sign out the user
    try {
      await signOut(auth);
      setLoggedIn(false); // Update the state to reflect the user is no longer logged in
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  

  const loginAction = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      if (user && user.emailVerified) {
        console.log("Login success");
        // Add any further actions you want to perform on successful login
      } else {
        console.log("Email not verified or user not found");
      }
    } catch (error) {
      console.error("Login failed", error.message);
    }
  };

  // useEffect (() => {
  //    auth.onAuthStateChanged((userCred) => {
  //     console.log(userCred)
  //   })
  // }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // If the user is logged in, user will be truthy; otherwise, it will be falsy
      console.log('User:', user);
      setLoggedIn(!!user);
    });
  
    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);
  

  return (
    <div class="flex-container">
      
      {loggedIn ? null : ( <>
      
        <div className="container" id="signup">
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
              <InputField type={"text"} placeholder={"Enter your nickname"} handleChange={handleNicknameChange}/>
            </div>
            <div>
              <button type="button" onClick={signUpAction}>Sign Up</button>
            </div>
          </form>
        </div>

      <div className="container" id="login">
      <h2>Login:</h2>

      <form>
        <div class="top-margin">
          <label>Email:</label>
          <InputField type={"email"} placeholder={"Enter your email"} handleChange={handleEmailChange}/>
        </div>
        <div class="top-margin">
          <label>Password:</label>
          <InputField type={"password"} placeholder={"Enter your password"} handleChange={handlePasswordChange} />
        </div>
        <div>
          <button type="button" onClick={loginAction}>Login</button>
        </div>
      </form>
      </div>

      
      </> )}


    <div class="container">
      <h2>About:</h2>
      <p>Welcome to SuperheroDB—your hub for all things superheroes! Dive into a world where information meets excitement. Explore, discover, and curate your favorite superhero details with our user-friendly platform.</p>
    </div>

      {loggedIn && (
        <div className="container" id="signout">
          <h2>Sign Out:</h2>
          <button type="button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}


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

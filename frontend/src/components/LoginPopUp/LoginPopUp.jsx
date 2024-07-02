import React from 'react'
import './LoginPopUp.css'
import { useState } from 'react'
import { assets } from '../../assets/assets'
const LoginPopUp = ({setShowLogin}) => {
   
    const [currentState,setCurrState] = useState("Login")

  return (
    <div className='login-popup'>
      <form  className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currentState==="Login"?<></>:<input type="text" placeholder='your name' required/>}           
            <input type="email" placeholder='your email' required/>
            <input type="password" placeholder='Password' required/>
        </div>
        <button>{currentState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState==="Login"
        ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span> </p>
        :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span > </p>
        }
        
      </form>
    </div>
  )
}

export default LoginPopUp

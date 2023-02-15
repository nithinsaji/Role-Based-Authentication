import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { usePasswordValidation } from '../../hooks/usePasswordValidation';
import AuthService from '../../services/auth.service';

function Register() {


  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [focus,setFocus] = useState(false)

  const [validLength, hasNumber, upperCase, lowerCase, match, specialChar,valid] = usePasswordValidation({
    firstPassword: password,
    secondPassword: cpassword
  })

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(name, email, password).then((response) => {
        console.log(response)
      })
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 500) {
        setErrMsg('User is already there!');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Register Failed');
      }
    }
  }

  useEffect(() => {
    userRef.current.focus();
  }, [])

  return (
    <div id="loginform">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h2 id="headerTitle">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="row">
          <label>Name</label>
          <input type="text" placeholder="Enter your Name" ref={userRef} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="row">
          <label>Email</label>
          <input type="email" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="row">
          <label className={valid ? 'valid' : 'invalid' }>Password</label>
          <input type="password" placeholder="Enter your password" onFocus={(e) => setFocus(true)} onChange={(e)=> setPassword(e.target.value)} className={valid ? 'valid' : 'invalid' } />
          {!valid && <div className='valid-container' style={{display:focus?'block':'none'}}>
            <ul>
              <li>
                {!validLength && <span className={validLength ? 'valid' : 'invalid' }>Valid Length: False </span>}
              </li>
              <li>
                {!hasNumber && <span className={hasNumber ? 'valid' : 'invalid' }>Has a Number: False</span>}
              </li>
              <li>
                {!upperCase && <span className={upperCase ? 'valid' : 'invalid' }>UpperCase: False</span>}
              </li>
              <li>
                {!lowerCase && <span className={lowerCase ? 'valid' : 'invalid' }>LowerCase: False</span>}
              </li>
              <li>
                {!specialChar && <span className={specialChar ? 'valid' : 'invalid' }> Special Character:False</span>}
              </li>
            </ul>
          </div>}
        </div>
        <div className="row">
          <label>Password</label>
          <input type="password" placeholder="Enter your Confirm password" onChange={(e)=> setCpassword(e.target.value)} />
          <div className='valid-container'>
            <ul>
            <li>{!match && <span>Match: False</span>}</li>
            </ul>
          </div>
        </div>
        <div id="button" className="row">
          <button>Register</button>
        </div>
      </form>
      <div className="new">
                <p>Or Already a member? <NavLink to="/login">Sign in</NavLink></p>
            </div>
    </div>
  )
}


export default Register
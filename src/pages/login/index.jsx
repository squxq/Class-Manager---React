import React, { useState, useEffect, useReducer } from 'react'
import styles from '../../style.js'
import '../signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import {
  BoxDiv,
  FormDiv,
  SignUpH2,
  InputBox,
  LinksDiv,
  ForgotPasswordLink,
  LoginLink,
} from '../signup-elements.js'


const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const storeAuth = (token, user) => {
    localStorage.setItem("user", JSON.stringify(user))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios({
      method: `post`,
      url: `http://localhost:5000/login`,
      data: { email, password },
      withCredentials: true,
    })
      .then((res) => {
        const { user, token } = res.data
        storeAuth(token, user)
        navigate(`/dashboard`)
      })
      .catch((err) => {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors)
        } else {
          console.log(err)
        }
      })
  }

  return (
    <div className={`${styles.flexCenter} min-h-screen body-class w-full bg-primary`}>
      <BoxDiv className={`login-h`}>
        <FormDiv onSubmit={ handleSubmit }>
          <SignUpH2>
            Log in
          </SignUpH2>
          <InputBox>
            <input type="text" className={`input`}
            onChange={(e) => setEmail(e.target.value)} />
            <span className={!email ? `span` : `over`}>Email</span>
            <i className={`i-tag`}></i>
          </InputBox>
            <span className={`error-span`}>{ errors["email"] }</span>
          <InputBox>
            <input type="text" className={`input`}
            onChange={(e) => setPassword(e.target.value)} />
            <span className={!password ? `span` : `over`}>Password</span>
            <i className={`i-tag`}></i>
          </InputBox>
            <span className={`error-span`}>{ errors["password"] }</span>
          <LinksDiv>
              <ForgotPasswordLink>Forgot Password?</ForgotPasswordLink>
                <LoginLink to="/signup">Sign Up</LoginLink>
          </LinksDiv>
          <button type="submit">Log In</button>
        </FormDiv>
      </BoxDiv>
    </div>
  )
}

export default LoginPage
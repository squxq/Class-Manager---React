import React, { useState, useEffect, useReducer } from 'react'
import styles from '../../style.js'
import '../signup.css'
import axios from 'axios'

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
  const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
  }

  const [email, setEmail] = useReducer(formReducer, {})
  const [password, setPassword] = useReducer(formReducer, {})

  const handleSubmit = (e) => {
    e.preventDefault()

    const postData = async ( email, password) => {
      axios({
        method: `post`,
        url: `http://localhost:5000/login`,
        data: { email, password }
      })
    }

    postData( email[""], password[""])
    return false
  }

  const handleEmail = event => {
    setEmail({
      name: event.target.name,
      value: event.target.value,
    })
  }
  const handlePassword = event => {
    setPassword({
      name: event.target.name,
      value: event.target.value,
    })
  }
  return (
    <div className={`${styles.flexCenter} min-h-screen body-class w-full`}>
      <BoxDiv className={`login-h`}>
        <FormDiv onSubmit={ handleSubmit }>
          <SignUpH2>
            Log in
          </SignUpH2>
          <InputBox>
            <input type="text" className={`input`} onChange={ handleEmail } />
            <span className={`span`}>Email</span>
            <i className={`i-tag`}></i>
          </InputBox>
          <InputBox>
            <input type="text" className={`input`} onChange={ handlePassword} />
            <span className={`span`}>Password</span>
            <i className={`i-tag`}></i>
          </InputBox>
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
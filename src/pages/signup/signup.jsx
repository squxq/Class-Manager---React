import React, { useEffect, useState, useReducer } from 'react'
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


const SignupPage = () => {
  const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
  }

  const [firstname, setFirstname] = useReducer(formReducer, {})
  const [lastname, setLastname] = useReducer(formReducer, {})
  const [email, setEmail] = useReducer(formReducer, {})
  const [password, setPassword] = useReducer(formReducer, {})
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const postData = async (firstname, lastname, email, password) => {
      axios({
        method: `post`,
        url: `http://localhost:5000/signup`,
        data: { firstname, lastname, email, password }
      })
    }

    postData(firstname[""], lastname[""], email[""], password[""])
  }

  const handleFirstname = event => {
    setFirstname({
      name: event.target.name,
      value: event.target.value,
    })
  }
  const handleLastname = event => {
    setLastname({
      name: event.target.name,
      value: event.target.value,
    })
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
      <BoxDiv className={`signup-h`}>
        <FormDiv onSubmit={ handleSubmit }>
          <SignUpH2>
            Sign Up
          </SignUpH2>
          <InputBox>
            <input type="text" className={`input`} id="firstname"
            onChange={ handleFirstname }
            />
            <span className={`span`}>First Name</span>
            <i className={`i-tag`}></i>
          </InputBox>
          <InputBox>
            <input type="text" className={`input`} id="lastname"
            onChange={ handleLastname }
            />
            <span className={`span`}>Last Name</span>
            <i className={`i-tag`}></i>
          </InputBox>
          <InputBox>
            <input type="text" className={`input`} id="email"
            onChange={ handleEmail }
            />
            <span className={`span`}>Email</span>
            <i className={`i-tag`}></i>
          </InputBox>
          <InputBox>
            <input type="text" className={`input`} id="password"
            onChange={ handlePassword }
            />
            <span className={`span`}>Password</span>
            <i className={`i-tag`}></i>
          </InputBox>
          <LinksDiv>
              <ForgotPasswordLink>Forgot Password?</ForgotPasswordLink>
              <LoginLink to="/login">Log In</LoginLink>
          </LinksDiv>
          <button type="submit">Sign Up</button>
        </FormDiv>
      </BoxDiv>
    </div>
  )
}

export default SignupPage
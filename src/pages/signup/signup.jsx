import React, { useState, useEffect } from 'react'
import styles from '../../style.js'
import '../signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/button.js'

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
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email , setEmail] = useState("")
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
      url: `http://localhost:5000/signup`,
      data: { firstname, lastname, email, password },
      withCredentials: true,
    })
      .then((res) => {
        const { user, token } = res.data
        storeAuth(token, user)
        navigate(`/confirmation/${user}`)
      })
      .catch((err) => {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors)
        } else {
          console.log(err)
        }
      })
    }
    
    const [signupData, setSignupData] = useState(false)

    useEffect(() => {
      const fetchData = async () => {
        await axios.get(`http://localhost:5000/signup`, { withCredentials: false })
          .then((res) => {
            setSignupData(res.data.success)
          })
          .catch((err) => console.log(err))
      }
      
      fetchData()
    }, [])

    switch (signupData) {
      case false: 
        return ( <h1>Loading...</h1> )
      case true:
        return (
        <div className={`${styles.flexCenter} min-h-screen body-class w-full bg-primary`}>
          <BoxDiv className={`signup-h`}>
            <FormDiv onSubmit={ handleSubmit }>
              <SignUpH2>
                Sign Up
              </SignUpH2>
              <InputBox>
                <input type="text" className={`input`} id="firstname"
                onChange={(e) => setFirstname(e.target.value)}
                />
                <span className={!firstname ? `span` : `over`}>First Name</span>
                <i className={`i-tag`}></i>
              </InputBox>
                <span className={`error-span`}>{ errors["firstname"] }</span>
              <InputBox>
                <input type="text" className={`input`} id="lastname"
                onChange={(e) => setLastname(e.target.value)}
                />
                <span className={!lastname ? `span` : `over`}>Last Name</span>
                <i className={`i-tag`}></i>
              </InputBox>
                <span className={`error-span`}>{ errors["lastname"] }</span>
              <InputBox>
                <input type="text" className={`input`} id="email"
                onChange={(e) => setEmail(e.target.value)}
                />
                <span className={!email ? `span` : `over`}>Email</span>
                <i className={`i-tag`}></i>
              </InputBox>
                <span className={`error-span`}>{ errors["email"] }</span>
              <InputBox>
                <input type="text" className={`input`} id="password"
                onChange={(e) => setPassword(e.target.value)}
                />
                <span className={!password ? `span` : `over`}>Password</span>
                <i className={`i-tag`}></i>
              </InputBox>
                <span className={`error-span`}>{ errors["password"] }</span>
              <LinksDiv>
                  <ForgotPasswordLink>Forgot Password?</ForgotPasswordLink>
                  <LoginLink to="/login">Log In</LoginLink>
              </LinksDiv>
              <button type="submit"
              >Sign Up</button>
            </FormDiv>
          </BoxDiv>
        </div>
      )
    }
}

export default SignupPage
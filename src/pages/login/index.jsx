import React, { useState, useEffect } from "react"
import styles from "../../style.js"
import "../signup.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import {
  BoxDiv,
  FormDiv,
  SignUpH2,
  InputBox,
  LinksDiv,
  ForgotPasswordLink,
  LoginLink,
} from "../signup-elements.js"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState(``)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios({
      method: `post`,
      url: `http://localhost:5000/login`,
      data: { email, password },
      withCredentials: true,
    })
      .then((res) => {
        const { user } = res.data
        navigate(`/calendar/${user}`)
      })
      .catch((err) => {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors)
        } else if (err.response.data.err) {
          setLoginError(err.response.data.err)
        } else {
          console.log(err)
        }
      })
  }

  const [loginData, setLoginData] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/login`, { withCredentials: false })
        .then((res) => {
          setLoginData(res.data.success)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    fetchData()
  }, [])

  switch (loginData) {
    case false:
      return <h1>Loading...</h1>
    case true:
      return (
        <div
          className={`${styles.flexCenter} min-h-screen body-class w-full bg-primary`}
        >
          <BoxDiv className={`login-h`}>
            <FormDiv onSubmit={handleSubmit}>
              <SignUpH2>Log in</SignUpH2>
              <InputBox>
                <input
                  type="text"
                  className={`input`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className={!email ? `span` : `over`}>Email</span>
                <i className={`i-tag`}></i>
              </InputBox>
              <span className={`error-span`}>{errors["email"]}</span>
              <InputBox>
                <input
                  type="text"
                  className={`input`}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className={!password ? `span` : `over`}>Password</span>
                <i className={`i-tag`}></i>
              </InputBox>
              <span className={`error-span`}>{errors["password"]}</span>
              <span className={`error-span`}>{loginError}</span>
              <LinksDiv>
                <ForgotPasswordLink>Forgot Password?</ForgotPasswordLink>
                <LoginLink to="/signup">Sign Up</LoginLink>
              </LinksDiv>
              <button type="submit" style={{ marginTop: "3rem" }}>
                Log In
              </button>
            </FormDiv>
          </BoxDiv>
        </div>
      )
  }
}

export default LoginPage

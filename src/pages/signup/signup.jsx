import React, { useState, useEffect } from "react"
import styles from "../../style.js"
import "../signup.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Button from "../../components/button.js"

import {
  BoxDiv,
  FormDiv,
  SignUpH2,
  InputBox,
  LinksDiv,
  ForgotPasswordLink,
  LoginLink,
} from "../signup-elements.js"

import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material"
import styled from "styled-components"

const RoleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  .MuiFormLabel-root,
  .MuiInputLabel-root,
  .MuiInputLabel-formControl,
  .MuiInputLabel-animated,
  .MuiInputLabel-standard,
  .MuiFormLabel-colorPrimary,
  .MuiInputLabel-root,
  .MuiInputLabel-formControl,
  .MuiInputLabel-animated,
  .MuiInputLabel-standard,
  .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root {
    color: #f6f6f6;
  }

  .MuiSvgIcon-root,
  .MuiSvgIcon-fontSizeMedium,
  .MuiSelect-icon,
  .MuiSelect-iconStandard,
  .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon {
    color: #f6f6f6 !important;
  }

  .MuiSelect-nativeInput,
  .css-yf8vq0-MuiSelect-nativeInput {
    color: #f6f6f6 !important;
    /* border-bottom: 1px solid white !important; */
  }

  .MuiSelect-select,
  .MuiSelect-standard,
  .MuiInputBase-input,
  .MuiInput-input,
  .css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input::before {
    color: #f6f6f6;
    border-bottom: 2px solid #f6f6f6 !important;
  }

  .MuiSelect-select,
  .MuiSelect-standard,
  .MuiInputBase-input,
  .MuiInput-input,
  .css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input::after {
    color: #f6f6f6;
    border-bottom: 2px solid white !important;
  }

  .MuiFormLabel-root,
  .MuiInputLabel-root,
  .MuiInputLabel-formControl,
  .MuiInputLabel-animated,
  .MuiInputLabel-shrink,
  .MuiInputLabel-standard,
  .MuiFormLabel-colorPrimary,
  .Mui-focused,
  .MuiInputLabel-root,
  .MuiInputLabel-formControl,
  .MuiInputLabel-animated,
  .MuiInputLabel-shrink,
  .MuiInputLabel-standard,
  .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root {
    color: white !important;
  }
`

const CssTextField = styled(TextField)({
  width: "100%",
  "& .MuiInputBase-input": {
    color: "#f6f6f6",
  },
  "& label.Mui-focused": {
    color: "#3AAFA9",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#f6f6f6",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#3AAFA9",
  },
})

const SignupPage = () => {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios({
      method: `post`,
      url: `https://admin-backend-i5xx.onrender.com/signup`,
      data: { firstname, lastname, email, password, role },
      withCredentials: true,
    })
      .then((res) => {
        const { user, token } = res.data
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
      await axios
        .get(`https://admin-backend-i5xx.onrender.com/signup`, {
          withCredentials: false,
        })
        .then((res) => {
          setSignupData(res.data.success)
        })
        .catch((err) => console.log(err))
    }

    fetchData()
  }, [])

  switch (signupData) {
    case false:
      return <h1>Loading...</h1>
    case true:
      return (
        <div
          className={`${styles.flexCenter} min-h-screen body-class w-full bg-primary`}
        >
          <BoxDiv className={`signup-h`}>
            <FormDiv onSubmit={handleSubmit}>
              <SignUpH2>Sign Up</SignUpH2>
              <InputBox>
                <input
                  type="text"
                  className={`input`}
                  id="firstname"
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <span className={!firstname ? `span` : `over`}>First Name</span>
                <i className={`i-tag`}></i>
              </InputBox>
              <span className={`error-span`}>{errors["firstname"]}</span>
              <InputBox>
                <input
                  type="text"
                  className={`input`}
                  id="lastname"
                  onChange={(e) => setLastname(e.target.value)}
                />
                <span className={!lastname ? `span` : `over`}>Last Name</span>
                <i className={`i-tag`}></i>
              </InputBox>
              <span className={`error-span`}>{errors["lastname"]}</span>
              <InputBox>
                <input
                  type="text"
                  className={`input`}
                  id="email"
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
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className={!password ? `span` : `over`}>Password</span>
                <i className={`i-tag`}></i>
              </InputBox>
              <span className={`error-span`}>{errors["password"]}</span>
              <LinksDiv>
                <ForgotPasswordLink>Forgot Password?</ForgotPasswordLink>
                <LoginLink to="/login">Log In</LoginLink>
              </LinksDiv>
              <RoleBox>
                <Box sx={{ width: "40%", marginTop: "8px" }}>
                  <FormControl
                    variant="standard"
                    sx={{
                      m: 1,
                      minWidth: 120,
                    }}
                  >
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={role}
                      onChange={(event) => setRole(event.target.value)}
                      label="Role"
                      sx={{
                        "&:before": {
                          borderBottom: "2px solid #f6f6f6",
                        },
                        "&:after": {
                          borderBottom: "2px solid #3AAFA9",
                        },
                      }}
                    >
                      <MenuItem value={"Teacher"}>Teacher</MenuItem>
                      <MenuItem value={"Student"}>Student</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ width: "60%" }}>
                  <button type="submit">Sign Up</button>
                </Box>
              </RoleBox>
              <span className={`error-span`}>{errors["role"]}</span>
            </FormDiv>
          </BoxDiv>
        </div>
      )
  }
}

export default SignupPage

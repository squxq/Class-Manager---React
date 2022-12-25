import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import SignupPage from './pages/signup/signup.jsx'
import LoginPage from './pages/login/'
import ConfirmationPage from './pages/confirmation/index'
import axios from 'axios'

const App = () => {
  const [homeData, setHomeData] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://localhost:5000/`, { withCredentials: false })
        .then((res) => {
          setHomeData(res.data.success)
        })
        .catch((err) => console.log(err))
    }
    
    fetchData()
  }, [])

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

  const [loginData, setLoginData] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://localhost:5000/login`, { withCredentials: false })
        .then((res) => {
          setLoginData(res.data.success)
        })
        .catch((err) => console.log(err))
    }
    
    fetchData()
  }, [])

  const [confirmationData, setConfirmationData] = useState(false)
  const [confirmationError, setConfirmationError] = useState(``)

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://localhost:5000/confirmation/:id`, 
      { withCredentials: true })
        .then((res) => {
          setConfirmationData(res.data.success)
        })
        .catch(async (err) => {
          try {
            setConfirmationError(err.response.data.err)
          } catch (error) {
            console.log(err);
          }
        })
    }

    fetchData()
  }, [])
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={ !homeData ? <h1>Loading...</h1> : <Home /> } exact />
        <Route path='/signup' element={ !signupData ? <h1>Loading...</h1> : <SignupPage /> } exact />
        <Route path='/login' element={ !loginData ? <h1>Loading...</h1> : <LoginPage /> } exact />
        <Route path='/confirmation/:id' element={ !confirmationData ? <h1>{ confirmationError }</h1> : <ConfirmationPage />} exact />
      </Routes>
    </Router>
  )
}

export default App
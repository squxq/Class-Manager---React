import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import SignupPage from './pages/signup/signup.jsx'
import LoginPage from './pages/login/'
import axios from 'axios'

const App = () => {
  const [homeData, setHomeData] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:5000').catch((err) => console.log(err))
      setHomeData(data.success)
    }
    
    fetchData()
  }, [])

  const [signupData, setSignupData] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:5000/signup').catch((err) => console.log(err))
      setSignupData(data.success)
    }
    
    fetchData()
  }, [])

  const [loginData, setLoginData] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:5000/login').catch((err) => console.log(err))
      setLoginData(data.success)
    }
    
    fetchData()
  }, [])
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={ !homeData ? <h1>Loading...</h1> : <Home /> } exact />
        <Route path='/signup' element={ !signupData ? <h1>Loading...</h1> : <SignupPage /> } exact />
        <Route path='/login' element={ !loginData ? <h1>Loading...</h1> : <LoginPage /> } exact />
      </Routes>
    </Router>
  )
}

export default App
import React, { lazy, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const Home = lazy(() => import("./pages/home"))
const SignupPage = lazy(() => import("./pages/signup/signup.jsx"))
const LoginPage = lazy(() => import("./pages/login/"))
const ConfirmationPage = lazy(() => import("./pages/confirmation/index"))
const VerificationPage = lazy(() => import("./pages/verification"))
const Layout = lazy(() => import("./pages/dashboard"))
const Dashboard = lazy(() => import("./pages/dashboard/dashboard"))
const Calendar = lazy(() => import("./pages/calendar"))

const App = () => {
  return (
    <Router>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/signup" element={<SignupPage />} exact />
          <Route path="/login" element={<LoginPage />} exact />
          <Route
            path="/confirmation/:id"
            element={<ConfirmationPage />}
            exact
          />
          <Route
            path="/verification/:token"
            element={<VerificationPage />}
            exact
          />
          <Route element={<Layout />}>
            <Route path="/dashboard/:id" element={<Dashboard />} exact />
            <Route path="/calendar/:id" element={<Calendar />} exact />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App

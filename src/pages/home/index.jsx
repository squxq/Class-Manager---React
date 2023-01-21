import React, { useState, useEffect } from "react"
import Navbar from "../../components/Navbar/index.jsx"
import HeroSection from "../../components/HeroSection/index.jsx"
import styles from "../../style.js"
import Stats from "../../components/Stats"
import "./index.css"
import Benefit1 from "../../components/Benefits/Benefit-1"
import Benefit2 from "../../components/Benefits/Benefit-2/index.jsx"
import Testimonials from "../../components/Testimonials/index.jsx"
import CTA from "../../components/CTA/index.jsx"
import Footer from "../../components/Footer2/index.jsx"
import axios from "axios"

const Home = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const [homeData, setHomeData] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/`, { withCredentials: false })
        .then((res) => {
          setHomeData(res.data.success)
        })
        .catch((err) => console.log(err))
    }

    fetchData()
  }, [])

  switch (homeData) {
    case false:
      return <h1>Loading...</h1>
    case true:
      return (
        <div className="bg-primary w-full">
          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Navbar toggle={toggle} />
            </div>
          </div>

          <div className={`bg-primary ${styles.flexStart} hero-height`}>
            <div className={`${styles.boxWidth}`}>
              <HeroSection />
              <Stats />
            </div>
          </div>

          <div className={`bg-secondary ${styles.flexStart}`}>
            <div className={`${styles.boxWidthFeatures}`}>
              <Benefit1 />
              <Benefit2 />
            </div>
          </div>

          <div className={`bg-secondary ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
              <Testimonials />
              <CTA />
            </div>
          </div>

          <div className={`bg-primary ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
              <Footer />
            </div>
          </div>
        </div>
      )
  }
}

export default Home

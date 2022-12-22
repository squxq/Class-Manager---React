import React, { useState } from 'react'
import Navbar from '../../components/Navbar/index.jsx'
import HeroSection from '../../components/HeroSection/index.jsx'
import styles from '../../style.js'
import Stats from '../../components/Stats'
import './index.css'
import Benefit1 from '../../components/Benefits/Benefit-1'
import Benefit2 from '../../components/Benefits/Benefit-2/index.jsx'
import Testimonials from '../../components/Testimonials/index.jsx'
import CTA from '../../components/CTA/index.jsx'
import Footer from '../../components/Footer2/index.jsx'

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

  return (
    <div className="bg-primary w-full">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar toggle={ toggle }/> 
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

export default HomePage
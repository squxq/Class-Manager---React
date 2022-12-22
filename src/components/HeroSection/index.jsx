import React, { useState } from 'react'
import styles from '../../style.js'
import './index.css'
import HeroImg from '../../assets/heroimg000000.png'
import { RiArrowRightSLine, RiArrowRightLine } from 'react-icons/ri'
import Button from '../button.js'

import {
    HeroContainer,
    HeroBg,
    HeroContent,
    HeroH1,
} from './hero-elements.js'

const HeroSection = () => {
  const [ hover, setHover ] = useState(false)
  const [ hover2, setHover2 ] = useState(false)

  const onHover = () => {
    setHover(!hover)
  }

  const onHover2 = () => {
    setHover2(!hover2)
  }
  return (
    <HeroContainer id="home"
    className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <HeroBg className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <HeroContent className={`flex flex-row jsutify-between items-center w-full`}>
          <HeroH1 className={`xl:ml-10 ml-2 flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-secondary ss:leading-[100px] leading-[75px]`}>
            The Next <br className='sm:block hidden' /> {" "}
            <span className='text-accent'>Generation</span> {" "}
          </HeroH1>
        </HeroContent>
        <h1 className={`xl:ml-10 ml-2 font-poppins font-semibold ss:text-[68px] text-[52px] text-secondary ss:leading-[100px] leading-[75px] w-full`}>
          Teaching Platform
        </h1>
        <p className={`xl:ml-10 ml-2 ${styles.paragraphHero} max-w-[670px] mt-5 mb-10`}>Class Manager is a student teacher portal with various classroom features like uploading assignments, submissions and many more.</p>

        <div className="flex flex-row">
          <Button type="button" className={`xl:ml-20 ml-2 mr-10 py-2 px-4 bg-accent border-2 border-accent font-poppins font-medium text-[18px] text-primary ouline-none ${styles} rounded-[10px] flex flex-row ease-in-out transition-all duration-600`}
          onMouseEnter={ onHover }
          onMouseLeave={ onHover }
          to="/signup"
          >Sign Up { hover ? <RiArrowRightLine 
            className={`text-[20px] mt-1 ml-2`} /> : 
            <RiArrowRightSLine 
            className={`text-[20px] mt-1 ml-2`} />}
          </Button>
          <Button type="button" className={`ml-0 mr-0 py-2 px-4 border-2 border-secondary font-poppins font-medium text-[18px] text-secondary ouline-none ${styles} rounded-[10px] flex flex-row ease-in-out transition-all duration-1000`}
          onMouseEnter={ onHover2 }
          onMouseLeave={ onHover2 }
          to="/login"
          >Log In { hover2 ? <RiArrowRightLine 
            className={`text-[20px] mt-1 ml-2`} /> : 
            <RiArrowRightSLine 
            className={`text-[20px] mt-1 ml-2`} />}
          </Button>
        </div>
      </HeroBg>
      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={HeroImg} alt="hero-image" className='relative z-[5] w-[100%] h-auto' />
      </div>
    </HeroContainer>
  )
}

export default HeroSection
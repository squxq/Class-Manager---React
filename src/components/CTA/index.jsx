import React, { useState } from 'react'
import styles from '../../style.js'
import { RiArrowRightSLine, RiArrowRightLine } from 'react-icons/ri'
import Button from '../button'

const CTA = () => {
  const [ hover, setHover ] = useState(false)
  const [ hover2, setHover2 ] = useState(false)

  const onHover = () => {
    setHover(!hover)
  }

  const onHover2 = () => {
    setHover2(!hover2)
  }

  return (
    <section 
    className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
        <div className={`flex-1 flex flex-col`}>
            <h2 className={`${styles.heading2} text-secondary`}>Try Our Service Now!</h2>
            <p className={`${styles.paragraphHero} max-w-[670px] mt-5`}>Everything you need to have the maximum control over all your students in on place.</p>
        </div>
        <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
            <Button type="button" className={`xl:ml-20 ml-2 mr-10 py-6 px-8 border-2 border-secondary font-poppins font-bold text-[24px] text-secondary ouline-none ${styles} rounded-[10px] flex flex-row ease-in-out transition-all duration-600`}
            onMouseEnter={ onHover }
            onMouseLeave={ onHover }
            to="/signup"
            >Sign Up { hover ? <RiArrowRightLine 
              className={`text-[36px] mb-0 ml-2`} /> : 
              <RiArrowRightSLine 
            className={`text-[36px] [mb-0 ml-2`} />}
          </Button>
        </div>
    </section>
  )
}

export default CTA
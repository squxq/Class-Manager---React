import React, { useState } from 'react'
import styles, { layout } from '../../../style.js'
import { RiArrowRightSLine, RiArrowRightLine } from 'react-icons/ri'
import { BsFillArrowRightSquareFill } from 'react-icons/bs'
import Button from '../../button'

const Benefit1 = () => {
  const [ hover, setHover ] = useState(false)
  const [ hover2, setHover2 ] = useState(false)

  const onHover = () => {
    setHover(!hover)
  }

  const onHover2 = () => {
    setHover2(!hover2)
  }

  return (
    <section id="features" className={layout.section}>
      <div className={`${layout.sectionInfo}`}>
        <div className={`flex flex-row`}>
          <BsFillArrowRightSquareFill className={`mt-[14%] text-[60px] text-primary leading-[76.8px] mr-10`} />
          <h2 className={`${styles.heading2}`}
          >Lorem ipsum dolor <br className={`sm:block hidden`} 
          /> sit consectetur amet<br className={`sm:block hidden`} />elit. Nobis, illum!</h2>
        </div>
          <p className={`${styles.paragraph} max-w-[670px] mt-5`}
          >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam iste quod eum, fugiat tempora illum veniam repellendus distinctio tempore cumque consequuntur esse vel? Atque aliquam tempora quidem nobis, corrupti cum.</p>
          <Button type="button" className={`mt-5 xl:ml-0 ml-2 mr-10 py-2 px-4 bg-accent border-2 border-accent font-poppins font-medium text-[26px] text-primary ouline-none ${styles} rounded-[10px] flex flex-row ease-in-out transition-all duration-600`}
            onMouseEnter={ onHover }
            onMouseLeave={ onHover }
            to="signup"
            >Sign Up { hover ? <RiArrowRightLine 
              className={`text-[30px] mt-1 ml-2`} /> : 
              <RiArrowRightSLine 
            className={`text-[30px] mt-1 ml-2`} />}
          </Button>
      </div>
    </section>
  )
}

export default Benefit1
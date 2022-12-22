import React, { useState } from 'react'
import styles, { layout } from '../../../style.js'
import SideImg from '../../../assets/benefit0000.png'
import { RiArrowRightSLine, RiArrowRightLine } from 'react-icons/ri'
import { BsFillArrowRightSquareFill } from 'react-icons/bs'
import Button from '../../button'

const Benefit2 = () => {
  const [ hover, setHover ] = useState(false)
  const [ hover2, setHover2 ] = useState(false)

  const onHover = () => {
    setHover(!hover)
  }

  const onHover2 = () => {
    setHover2(!hover2)
  }

  return (
    <section id="product" className={layout.sectionReverse}>
        <div className={layout.sectionImgReverse}>
            <img src={SideImg} alt="laptop" className={`w-[100%] h-[100%] relative z-[5]`} />
            {/* <div className={`absolute z-[0] bottom-38 w-[100%] h-[100%] rounded-xl blue__gradient`} /> */}
        </div>

        <div className={layout.sectionInfo}>
          <div className={`flex flex-row`}>
            <BsFillArrowRightSquareFill className={`ml-10 mt-12 text-[60px] text-primary leading-[76.8px] mr-10`} />
            <h2 className={`${styles.heading2}`}
            >Lorem ipsum dolor<br className={`sm:block hidden`} />sit amet consectetur.</h2>
          </div>
            <p className={`${styles.paragraph} ml-10 max-w-[670px] mt-5`}
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam facere architecto vel ipsum animi maxime excepturi omnis rerum veniam incidunt. Provident ut dolorum nihil, deleniti eveniet maiores nulla ratione aspernatur!</p>
            <Button type="button" className={`ml-10 mt-5 mr-10 py-2 px-4 border-2 border-primary font-poppins font-medium text-[26px] text-primary ouline-none ${styles} rounded-[10px] flex flex-row ease-in-out transition-all duration-600`}
            onMouseEnter={ onHover }
            onMouseLeave={ onHover }
            to="/signup"
            >Sign Up { hover ? <RiArrowRightLine 
              className={`text-[30px] mt-1 ml-2`} /> : 
              <RiArrowRightSLine 
            className={`text-[30px] mt-1 ml-2`} />}
          </Button>
        </div>
    </section>
  )
}

export default Benefit2
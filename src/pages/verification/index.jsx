import React, { useEffect } from 'react'
import Button from '../../components/button'
import styles from '../../style'
// import { BsFillArrowRightSquareFill } from 'react-icons/bs'
import axios from 'axios'

import {
    BoxDiv,
    TextDiv,
    H2,
    P,
} from './elements'

const VerificationPage = () => {
  return (
    <BoxDiv className={`bg-white ${styles.flexCenter}`}>
        <TextDiv className={`bg-secondary w-[678px] h-[350px] mt-[100px] flex-col`}>
            <div className={``}>
                {/* <BsFillArrowRightSquareFill className={`mt-[14%] text-[30px] text-primary leading-[76.8px] mr-10`} /> */}
                <H2 className={`${styles.heading2} text-primary font-poppins`}>
                    Verified!!
                </H2>
            </div>
            <P className={`${styles.paragraph} text-primary font-poppins`}>
                Your account has been successfully activated.
            </P>
            <Button
            className={`bg-primary text-secondary border-2 border-secondary font-poppins font-medium text-[26px] text-secondary ouline-none ${styles} rounded-[10px] flex flex-row ml-4 mr-4 py-2 px-4 indent-64`}
            to="/login">Log In</Button>
        </TextDiv>
    </BoxDiv>
  )
}

export default VerificationPage
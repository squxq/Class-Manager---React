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

const ConfirmationPage = ({ firstname }) => {
  return (
    <BoxDiv className={`bg-secondary ${styles.flexCenter}`}>
        <TextDiv className={`bg-secondary w-[678px] h-[350px] mt-[100px] flex-col`}>
            <div className={``}>
                {/* <BsFillArrowRightSquareFill className={`mt-[14%] text-[30px] text-primary leading-[76.8px] mr-10`} /> */}
                <H2 className={`${styles.heading2} text-primary font-poppins`}>
                    { !firstname ? `Thank You!!` : `Thank You ${firstname}!!`}
                </H2>
            </div>
            <P className={`${styles.paragraph} text-primary font-poppins`}>
                A confirmation link was sent to your email.
            </P>
            <Button
            className={`bg-primary text-secondary border-2 border-secondary font-poppins font-medium text-[26px] text-secondary ouline-none ${styles} rounded-[10px] flex flex-row ml-4 mr-4 py-2 px-4 indent-24`}>
                Send Confirmation Link Again</Button>
        </TextDiv>
    </BoxDiv>
  )
}

export default ConfirmationPage
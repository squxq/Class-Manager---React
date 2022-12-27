import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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

const ConfirmationPage = () => {
    const [confirmationData, setConfirmationData] = useState(false)
    const [confirmationError, setConfirmationError] = useState(``)
    const [firstname, setFirstname] = useState(``)

    const { id } = useParams()

    const fetchData = async () => {
    await axios.get(`http://localhost:5000/confirmation/${id}`, 
    { withCredentials: true })
        .then((res) => {
            setConfirmationData(res.data.success)
            setFirstname(res.data.firstname)
        })
        .catch(async (err) => {
            try {
                setConfirmationError(err.response.data.err)
            } catch (error) {
                console.log(err);
            }
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleClick = () => {
        fetchData()
    }

    switch (confirmationData) {
        case false:
            return ( <h1>{ confirmationError }</h1> )
        case true:
            return (
              <BoxDiv className={`bg-white ${styles.flexCenter}`}>
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
                      onClick={ handleClick }
                      className={`bg-primary text-secondary border-2 border-secondary font-poppins font-medium text-[26px] text-secondary ouline-none ${styles} rounded-[10px] flex flex-row ml-4 mr-4 py-2 px-4 indent-24`}>
                          Send Confirmation Link Again</Button>
                  </TextDiv>
              </BoxDiv>
            )
    }
}

export default ConfirmationPage
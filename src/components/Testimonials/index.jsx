import React from 'react'
import styles from '../../style.js'
import FeedbackCard from '../feedbackcard.jsx'
import review00 from '../../assets/review00.jpg'
import review01 from '../../assets/review01.jpg'
import review02 from '../../assets/review02.jpg'
import { BsFillArrowRightSquareFill } from 'react-icons/bs'

const Testimonials = () => {
  return (
    <section id="reviews" 
    className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}>
        <div 
        className={`w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]`}>
            <BsFillArrowRightSquareFill className={`text-[108px] text-primary leading-[76.8px] ml-10 mr-10`} />
            <h1 className={`${styles.heading2}`}
            >What people are <br className={`sm:block hidden`} /> saying about us</h1>
            <div className={`w-full md:mt-o mt-6`}
            >
                <p className={`${styles.paragraph} text-left m-w-[250px]`}
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore optio officiis, consequuntur ab, cum tempore impedit doloribus doloremque libero quaerat asperiores ducimus sunt nostrum sequi tempora totam! Distinctio, reiciendis assumenda.</p>
            </div>
        </div>
        <div 
        className={`flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]`}>
          <div className="w-full justify-center flex">
            <FeedbackCard src={review00} />
            <FeedbackCard src={review01} />
            <FeedbackCard src={review02} />
          </div>
        </div>
    </section>
  )
}

export default Testimonials

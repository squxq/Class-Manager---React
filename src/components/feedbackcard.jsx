import React from 'react'
import { BsFillChatLeftQuoteFill } from 'react-icons/bs'

const FeedbackCard = ({ src }) => {
  return (
    <div 
    className={`flex justify-between flex-col px-10 py-12 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5`}>
        <BsFillChatLeftQuoteFill className={`w-[42px] h-[27px] object-contain text-primary`} />
        <p className={`font-poppins font-normal text-[18px] leading-[32px] text-primary mr-10`}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, facere explicabo ratione iste similique, provident dolor molestias repellat non possimus quod? Similique quis sunt rem corporis impedit doloremque modi esse.
        </p>
        <div className="flex flex-row">
            <img src={ src } alt="someone's pfp" className={`w-[48px] h-[48px] rounded-full`} />

            <div className={`flex flex-col ml-4`}>
                <h4 
                className={`font-poppins font-semibold text-[20px] leading-[32px] text-primary`}>
                    Someone's name</h4>
                <p className={`font-poppins font-normal text-[16px] leading-[24px] text-dimPrimary`}>Someone's title</p>
            </div>
        </div>
    </div>
  )
}

export default FeedbackCard
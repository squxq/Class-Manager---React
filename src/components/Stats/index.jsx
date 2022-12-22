import React from 'react'
import { RxDividerVertical } from 'react-icons/rx'
import './index.css'

import {
    StatsSection,
    StatH4,
    StatP,
} from './stats-components.js'

const Stats = () => {
  return (
    <StatsSection className={`flex items-center flex-col sm:flex-row sm:mb-20 mb-6`}>
        <StatH4 className={`xl:ml-10 ml-2 font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-secondary`}>3000+</StatH4>
        <StatP className={`font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-accent[26px] leading-[21px] text-accent uppercase ml-3 mr-10`}
        >Users Active</StatP>
        <RxDividerVertical className='ml-10 mr-20 text-secondary xl:block hidden' />
        <StatH4 className={`font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-secondary`}>100+</StatH4>
        <StatP className={`font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-accent uppercase ml-3 mr-10`}
        >Trusted Companies</StatP>
        <RxDividerVertical className='ml-10 mr-20 text-secondary xl:block hidden' />
        <StatH4 className={`font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-secondary`}>7000+</StatH4>
        <StatP className={`font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-accent uppercase ml-3 mr-10`}
        >Managed Classes</StatP>
    </StatsSection>
  )
}

export default Stats
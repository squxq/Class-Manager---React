import React from 'react'
import styles from '../../style.js'
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { animateScroll as scroll } from 'react-scroll'

import { FooterLogo } from './elements'

const Footer = () => {
    const toggleHome = () => {
        scroll.scrollToTop({
            smooth: true,
            duration: 100,
            spy: true,
            exact: true,
            offset: -80,
        })
    }

  return (
    <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
        <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
            <div className={`flex-1 flex flex-col justify-start mr-10`}>
                <div className={`w-[266px] h-[72px] object contain`}>
                    <FooterLogo className={`font-poppins ${styles.heading2} text-secondary`}
                    onClick={ toggleHome }
                    to="/"
                    >Class Manager
                    </FooterLogo>
                </div>
                <p className={`${styles.paragraphHero} mt-4 max-w-[510px]`}
                >A new way to grade students. Easy, reliable and secure. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>

            <div className={`flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10`}>
                <div className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
                    <h4 className={`font-poppins font-medium text-[18px] leading-[27px] text-secondary`}>
                        Useful Links
                    </h4>
                    <ul className={`list-none mt-4`}>
                        <li className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-accent cursor-pointer mb-4`}>Link 1</li>
                        <li className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-accent cursor-pointer mb-4`}>Link 2</li>
                        <li className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-accent cursor-pointer mb-4`}>Link 3</li>
                        <li className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-accent cursor-pointer`}>Link 4</li>
                    </ul>
                </div>
                <div className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
                    <h4 className={`font-poppins font-medium text-[18px] leading-[27px] text-secondary`}>
                        Community
                    </h4>
                    <ul className={`list-none mt-4`}>
                        <li className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-accent cursor-pointer mb-4`}>Link 1</li>
                        <li className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-accent cursor-pointer mb-4`}>Link 2</li>
                        <li className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-accent cursor-pointer mb-4`}>Link 3</li>
                        <li className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-accent cursor-pointer`}>Link 4</li>
                    </ul>
                </div>
                <div className={`flex flex-col ss:my-0 my-4 min-w-[150px] mr-20`}>
                    <h4 className={`font-poppins font-medium text-[18px] leading-[27px] text-secondary`}>
                        Partner
                    </h4>
                    <ul className={`list-none mt-4`}>
                        <li className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-accent cursor-pointer mb-4`}>Link 1</li>
                        <li className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-accent cursor-pointer mb-4`}>Link 2</li>
                        <li className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-accent cursor-pointer mb-4`}>Link 3</li>
                        <li className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-accent cursor-pointer`}>Link 4</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className={`w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3fer45]`}>
            <p className={`font-poppins font-normal text-[18px] leading-[27px] text-secondary text-center`}>
                Class Manager &copy; {new Date().getFullYear()}
            </p>
            <div className={`flex flex-row md:mt-0 mt-6`}>
                <FaInstagram className={`w-[21px] h-[21px] object-contain cursor-pointer text-secondary mr-6`} />
                <FaFacebook className={`w-[21px] h-[21px] object-contain cursor-pointer text-secondary mr-6`} />
                <FaTwitter className={`w-[21px] h-[21px] object-contain cursor-pointer text-secondary mr-6`} />
                <FaLinkedin className={`w-[21px] h-[21px] object-contain cursor-pointer text-secondary mr-0`} />
            </div>
        </div>
    </section>
  )
}

export default Footer
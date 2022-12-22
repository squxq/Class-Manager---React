import React, { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { animateScroll as scroll } from 'react-scroll'
import styles from '../../style.js'
import { RiArrowRightSLine, RiArrowRightLine } from 'react-icons/ri'
import Button from '../button.js'

import { 
    Nav, 
    NavLogo, 
    NavMenu,
    NavItem,
    NavLinks,
    MobileNav,
    MobileDivMenu,
    NavMobileMenu,
    NavMobileItem,
} from './navbar-elements.js'

const Navbar = ({ toggle }) => {
    const [ scrollNav, setScrollNav ] = useState(false)

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true)
        } else {
            setScrollNav(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, [])

    const toggleHome = () => {
        scroll.scrollToTop()
    }

    const [Toggle, setToggle] = useState(false)

    const handleClick = () => setToggle(!Toggle)

    const [ hover, setHover ] = useState(false)
    const [ hover2, setHover2 ] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    const onHover2 = () => {
        setHover2(!hover2)
    }

  return (
    <Nav scrollNav={ scrollNav } className='w-full flex py-6 justify-between items-center'>
        <NavLogo onClick={ toggleHome } className={`font-poppins`}>
            Class Manager
        </NavLogo>
        <NavMenu className='list-none sm:flex hidden justify-end items-center flex-1'>
            <NavItem className={`font-poppins font-normal cursor-pointer text-[16px] text-secondary mr-10`}>
                <NavLinks
                smooth={true}
                duration={100}
                spy={true}
                exact='true'
                offset={-80}
                >Home</NavLinks>
            </NavItem>
            <NavItem className={`font-poppins font-normal cursor-pointer text-[16px] text-secondary mr-10`}>
                <NavLinks to="features"
                smooth={true}
                duration={100}
                spy={true}
                exact='true'
                offset={-80} // for the navbar height
                >Features</NavLinks>
            </NavItem>
            <NavItem className={`font-poppins font-normal cursor-pointer text-[16px] text-secondary mr-10`}>
                <NavLinks to="reviews"
                smooth={true}
                duration={100}
                spy={true}
                exact='true'
                offset={-80}
                >Reviews</NavLinks>
            </NavItem>
            <Button type="button" className={`mr-10 py-2 px-4 border-2 border-secondary font-poppins font-medium text-[16px] text-secondary ouline-none ${styles} rounded-[10px] flex flex-row ease-in-out transition-all duration-1000`}
            onMouseEnter={ onHover2 }
            onMouseLeave={ onHover2 }
            to="/login"
            >Log In { hover2 ? <RiArrowRightLine 
                className={`text-[20px] mt-0.5 ml-1`} /> : 
                <RiArrowRightSLine 
                className={`text-[20px] mt-0.5 ml-1`} />}
            </Button>
            <Button type="button" className={`mr-0 py-2 px-4 border-2 border-accent bg-accent font-poppins font-medium text-[16px] text-secondary ouline-none ${styles} rounded-[10px] flex flex-row ease-in-out transition-all duration-1000`}
            onMouseEnter={ onHover }
            onMouseLeave={ onHover }
            to="/signup"
            >Sign Up { hover ? <RiArrowRightLine 
                className={`text-[20px] mt-0.5 ml-1`} /> : 
                <RiArrowRightSLine 
                className={`text-[20px] mt-0.5 ml-1`} />}
            </Button>
        </NavMenu>
        {/* <MobileNav className={`sm:hidden flex flex-1 justify-end items-center`}>
            { Toggle ? <FaTimes className={`w-[28px] h-[28px] object-contain text-secondary`} onClick={() => handleClick((prev) => !prev)} /> 
            : <FaBars className={`w-[28px] h-[28px] object-contain text-secondary`} onClick={() => setToggle((prev) => !prev)} /> }

            <MobileDivMenu
            className={`${Toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
                <NavMobileMenu className='list-none flex flex-col hidden justify-end items-center flex-1'>
                    <NavMobileItem className={`font-poppins font-normal cursor-pointer text-[16px] text-secondary mb-10`}>
                        <NavLinks to="about"
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80} // for the navbar height
                        >About</NavLinks>
                    </NavMobileItem>
                    <li className={`font-poppins font-normal cursor-pointer text-[16px] text-secondary mb-10`}>
                        <NavLinks to="services"
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        >Services</NavLinks>
                    </li>
                    <li className={`font-poppins font-normal cursor-pointer text-[16px] text-secondary mb-0`}>
                        <NavLinks to="signup"
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        >Sign Up</NavLinks>
                    </li>
                </NavMobileMenu>
            </MobileDivMenu>
        </MobileNav> */}
    </Nav>
  )
}

export default Navbar
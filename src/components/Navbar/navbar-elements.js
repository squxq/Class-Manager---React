import styled from 'styled-components'
import { Link as LinkR } from 'react-router-dom'
import { Link as LinkS } from 'react-scroll'

export const Nav = styled.nav``

export const NavLogo = styled(LinkR)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 2rem;
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;
    text-align: center;
`

export const NavMenu = styled.ul``
export const NavItem = styled.li``
export const NavLinks = styled(LinkS)``
export const MobileNav = styled.div``
export const MobileDivMenu = styled.div``
export const NavMobileMenu = styled.ul``
export const NavMobileItem = styled.li``
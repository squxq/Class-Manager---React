import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const BoxDiv = styled.div`
    position: relative;
    width: 475px;
    background-color: #171923;
    border-radius: 8px;
    overflow: hidden;

    :before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 475px;
        background: linear-gradient(0deg, transparent, #F6F6F6, #F6F6F6); // checkmakr the color that can be changed to accent color
        transform-origin: bottom right;
        animation: animate 16s linear infinite;
    }

    :after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 475px;
        background: linear-gradient(0deg, transparent, #F6F6F6, #F6F6F6); // checkmakr the color that can be changed to accent color
        transform-origin: bottom right;
        animation: animate 16s linear infinite;
        animation-delay: -8s;
    }

    @keyframes animate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

export const FormDiv = styled.form`
    position: absolute;
    inset: 2px;
    border-radius: 8px;
    background-color: #171923;
    z-index: 10;
    padding: 50px 40px;
    display: flex;
    flex-direction: column;
`

export const SignUpH2 = styled.h2`
    color: #3AAFA9;
    font-weight: 600;
    text-align: center;
    font-size: 48px;
    width: 100%;
    line-height: 76.8px;
    font-family: 'Poppins';
`

export const InputBox = styled.div`
    position: relative;
    width: 300px;
    margin-top: 35px;
`

export const LinksDiv = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 5px 40px 5px;
`

export const ForgotPasswordLink = styled(Link)`
    font-size: 1rem;
    line-height: 20px;
    font-weight: 600;
    color: #F6F6F6;
    text-decoration: none;
    font-family: 'Poppins';

    :hover {
        color: #3AAFA9;
    }
`

export const LoginLink = styled(Link)`
    font-size: 1rem;
    line-height: 20px;
    font-weight: 600;
    color: #F6F6F6;
    text-decoration: none;
    font-family: 'Poppins';

    :hover {
        color: #3AAFA9;
    }
`
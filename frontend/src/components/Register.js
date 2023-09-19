import React from 'react'
import RegisterForm from './RegisterForm'
import { useSelector } from 'react-redux'
const Register = (props) => {

    return (
        <div>
            <h1>Sign Up</h1>
            <RegisterForm />
        </div>
    )
}

export default Register
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { startLoginUsers } from '../actions/usersAction'
const Login = (props) => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required("Password is required").min(7, "Password is too short - should be 7 chars minimum")
        }),
        onSubmit: function (values, { resetForm }) {
            const redirect = () => {
                props.history.push('/dashboard')
            }
            dispatch(startLoginUsers(values, resetForm, redirect))
        }
    })
    return (
        <div className='row'>
            <h1>LogIn</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className='mb-1 col-6 '>
                    <label for='Email' className='form-label'> Email </label>
                    <input
                        type='text'
                        value={formik.values.email}
                        name='email'
                        onChange={formik.handleChange}
                        className='form-control'
                        id='Email'
                    />
                    {formik.touched.email && formik.errors.email && <span> {formik.errors.email}</span>}
                    <br />
                </div>

                <div className='mb-1 col-6'>
                    <label for='Password' className='form-label'> Password </label>
                    <input
                        type='text'
                        value={formik.values.password}
                        name='password'
                        onChange={formik.handleChange}
                        className='form-control'
                        id='Password'
                    />
                    {formik.touched.password && formik.errors.password && <span> {formik.errors.password}</span>}
                    <br />
                </div>

                <input type="submit" className='btn btn-outline-danger' />
            </form>
        </div>
    )
}

export default Login
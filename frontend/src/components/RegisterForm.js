import { useFormik } from 'formik'
import * as Yup from 'yup'
import { withRouter } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { startCreateUsers } from '../actions/usersAction'
import React from 'react'

const RegisterForm = (props) => {

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required("Password is required").min(7, "Password is too short - should be 7 chars minimum")
    }),
    onSubmit: function (values, { resetForm }) {
      const redirect = () => {
        props.history.push('/login')
      }
      dispatch(startCreateUsers(values, resetForm, redirect))
    }
  })
  return (
    <div className='row'>
      <form onSubmit={formik.handleSubmit}>

        <div className='mb-1 col'>
          <label for='Name' className='form-label' > Name </label>
          <input
            type="text"
            value={formik.values.username}
            name='username'
            onChange={formik.handleChange}
            className='form-control'
            id="Name"
          />
          {formik.touched.username && formik.errors.username && <span> {formik.errors.username} </span>}
          <br />
        </div>

        <div className='mb-1 col'>
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

        <div className='mb-1 col'>
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

export default withRouter(RegisterForm)

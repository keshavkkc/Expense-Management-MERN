import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { startGetCategories } from '../actions/categoriesAction';
import { startUpdateExpenses } from '../actions/expenseAction';


const ExpenseForm = (props) => {
    const { _id, title, amount, category, expenseDate, handleEdit } = props

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetCategories())
    }, [])

    const categories = useSelector(state => state.categories)
    const data = categories.data

    const formik = useFormik({
        initialValues: {
            category: category.name,
            title: title,
            amount: amount,
            expenseDate: expenseDate,
        },
        validationSchema: Yup.object({
            category: Yup.string()
                .required('Please Select a Category'),
            amount: Yup.number()
                .required('Amount is required')
                .positive('Amount must be a positive number'),
            expenseDate: Yup.date()
                .required('Expense date is required'),
            title: Yup.string()
                .required('Title is required'),
        }),
        onSubmit: function (values, { resetForm }) {
            dispatch(startUpdateExpenses(_id, values, handleEdit))
        }
    })

    return (
        <>
            <td>
                <select
                    value={formik.values.category}
                    name='category'
                    onChange={formik.handleChange} >
                    <option value="">--Select Category--</option>
                    {data.map((category) => {
                        return <option key={category._id} value={category._id}> {category.name} </option>
                    })}
                </select>
            </td>

            <td>
                <input
                    type="text"
                    value={formik.values.title}
                    name='title'
                    onChange={formik.handleChange}
                />
                {formik.touched.title && formik.errors.title && <span> {formik.errors.title} </span>}
                <br />
            </td>

            <td>
                <input
                    type="text"
                    value={formik.values.amount}
                    name='amount'
                    onChange={formik.handleChange}
                />
                {formik.touched.amount && formik.errors.amount && <span> {formik.errors.amount} </span>}
                <br />
            </td>

            <td>
                <input
                    type="text"
                    value={formik.values.expenseDate}
                    name='expenseDate'
                    onChange={formik.handleChange}
                />
                {formik.touched.expenseDate && formik.errors.expenseDate && <span> {formik.errors.expenseDate} </span>}
                <br />
            </td>

            <td>
                <input type="submit" onClick={formik.handleSubmit} />
            </td>
        </>
    )
}

export default ExpenseForm

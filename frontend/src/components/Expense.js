import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetExpenses } from '../actions/expenseAction'
import { MdDelete, MdModeEditOutline } from "react-icons/md"
import { startGetBudgets } from '../actions/budgetsAction'
import { startSoftDelete } from '../actions/expenseAction'
import Modals from './Modal'
import CategoryCharts from './CategoryCharts'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { startSoftDeleteCategories } from '../actions/categoriesAction'
import ExpenseForm from './ExpenseForm'
import BudgetCharts from './BudgetCharts'
import { format } from 'date-fns/esm'


const Expense = (props) => {
    const [modal, setModal] = useState(false)
    const [editRecord, setEditRecord] = useState(undefined)

    const toggle = () => {
        setModal(!modal)
    }

    const handleEdit = (id) => {
        setEditRecord(id)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetExpenses())
    }, [])

    useEffect(() => {
        dispatch(startGetBudgets())
    }, [])

    const expenses = useSelector((state) => {
        return state.expenses
    })

    const budgets = useSelector((state) => {
        return state.budgets
    })

    const budgetdata = budgets.data

    const handleSoftDelete = (id) => {
        dispatch(startSoftDelete(id, "delete"))
    }

    const data = expenses.data
    return (
        <div >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <BudgetCharts />
                <CategoryCharts />
            </div>

            <h2> Total Budgets - {budgetdata.amount}</h2>
            <h5 className='d-flex justify-content-center'>Expenses</h5>
            <button className='btn btn-dark' onClick={toggle}> Add Expense </button>

            <Modals modal={modal} toggle={toggle} />

            <button className='btn btn-dark float-end'> Search </button>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <td> Edit </td>
                        <td> Category </td>
                        <td> Item_Name </td>
                        <td> Amount </td>
                        <td> Expense_Date </td>
                        <td> Delete </td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((expense) => {
                        return (
                            <tr key={expense._id}>
                                {!expense.isDeleted &&
                                    <>
                                        <td> <button onClick={() => { handleEdit(expense._id) }
                                        }> <MdModeEditOutline /> </button> </td>
                                        {editRecord === expense._id ? ( // Important
                                            <ExpenseForm {...expense} handleEdit={handleEdit} />
                                        ) : (
                                            <>
                                                <td> {expense.category.name} </td>
                                                <td> {expense.title} </td>
                                                <td> {expense.amount} </td>
                                                <td> {format(new Date(expense.expenseDate), 'yyyy-MM-dd')} </td>

                                                <td> <button
                                                    onClick={() => {
                                                        handleSoftDelete(expense._id)
                                                    }}> <MdDelete />
                                                </button>
                                                </td>
                                            </>
                                        )}
                                    </>
                                }
                            </tr>

                        )
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default Expense
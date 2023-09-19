import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { startUpdateBuget } from '../actions/budgetsAction'
import { getBudgetList } from '../actions/budgetsAction'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"


const Budget = (props) => {
    const [amount, setAmount] = useState('')
    const [isDeleted, setIsDeleted] = useState(false)
    const dispatch = useDispatch()

    const budget = useSelector((state) => {
        return state.budget
    })

    // const data = budget.data
    // useEffect(() => {
    //     dispatch(getBudgetList())
    // }, [])

    const handleInputChange = (e) => {
        setAmount(e.target.value)
    }
    const handleSubmit = (e) => {
        const obj = {
            amount: Number(amount)
        }
        const resetForm = () => {
            setAmount('')
            setIsDeleted(true)
            // dispatch(getBudgetList())
        }
        dispatch(startUpdateBuget(obj, resetForm))
    }
    return (
        <div className='m-2'>
            <h5 className='d-inline'> Update Budget: </h5>
            <input
                type="text"
                placeholder='Update Budget'
                value={amount}
                onChange={handleInputChange}
            />
            <input
                type="submit"
                value="Update Budget"
                onClick={handleSubmit}
                disabled={isDeleted}
            />
        </div>
    )
}

export default Budget
import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startGetCategories } from '../actions/categoriesAction';
import { startCreateExpenses, startGetExpenses } from '../actions/expenseAction';
import format from 'date-fns/format';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Modals = (props) => {
    const { toggle, modal } = props
    const [title, setTitle] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetCategories())
    }, [])

    const categories = useSelector((state) => {
        return state.categories
    })

    const handleSubmit = (e) => {
        const newdate = format(new Date(date), 'yyyy-MM-dd')
        e.preventDefault()
        const expenseData = {
            title: title,
            category: selectedCategory,
            amount: amount,
            expenseDate: newdate
        }
        const formData = () => {
            setSelectedCategory('')
            setTitle('')
            setAmount(0)
            setDate('')
            dispatch(startGetExpenses())
        }
        dispatch(startCreateExpenses(expenseData, toggle, formData))
    }
    return (
        <Modal isOpen={modal} toggle={toggle} {...props}>
            <ModalHeader toggle={toggle}> Add Expense </ModalHeader>
            <ModalBody>
                <form>
                    <label> Category</label>
                    <select className='form-select'
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)} >
                        <option value="">--Select Category--</option>
                        {categories.data.map((category) => {
                            return <option key={category._id} value={category._id}> {category.name} </option>
                        })}
                    </select>
                    <br />
                    <label className='form-label'>Amount:</label>
                    <input
                        className='form-control'
                        type="text"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />

                    <br />
                    <label className='form-label'>Date:</label>
                    <input
                        className='form-control'
                        type="date"
                        format="yyyy-mm-dd"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                    <br />
                    <label className='form-label'>Title:</label>
                    <input
                        className='form-control'
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>
                    Submit
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default Modals
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startUpdateCategories } from '../actions/categoriesAction'

const EditCategories = (props) => {
    const { _id, name: categoriesName, handleEdit } = props
    const [name, setName] = useState(categoriesName ? categoriesName : "")

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const categoryName = {
            name: name
        }
        dispatch(startUpdateCategories(_id, categoryName, handleEdit))
    }

    return (
        <div>
            <input type="text" value={name} onChange={handleChange} />
            <button onClick={handleSubmit}> Submit </button>
        </div>

    )
}

export default EditCategories
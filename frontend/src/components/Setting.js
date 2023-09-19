import React from "react"
import Spinner from "react-bootstrap/Spinner"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { MdDelete, MdModeEditOutline } from "react-icons/md"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreateCategories } from "../actions/categoriesAction"
import { startGetCategories } from "../actions/categoriesAction"
import { startUpdateCategories } from "../actions/categoriesAction"
import { startSoftDeleteCategories } from "../actions/categoriesAction"
import EditCategories from "./EditCategories"
import Budget from "./Budget"

const Setting = (props) => {
    const [category, setCategory] = useState("")
    const [editRecord, setEditRecord] = useState(undefined)
    const dispatch = useDispatch()
    // Categories State
    const categories = useSelector((state) => {
        return state.categories
    })

    const isError = categories.isError
    const isLoading = categories.isLoading
    const data = categories.data

    const handleChange = (e) => {
        setCategory(e.target.value)
    }

    //After Component rendered Getting All Categories:-
    useEffect(() => {
        dispatch(startGetCategories())
    }, [])

    //Soft Delte
    const handleSoftDelete = (id) => {
        dispatch(startSoftDeleteCategories(id))
    }

    const handleEdit = (id) => {
        setEditRecord(id)
    }

    // After Add Submit
    const handleClick = () => {
        const addCategory = {
            name: category,
        }
        const resetForm = () => {
            setCategory("")
            dispatch(startGetCategories())
        }
        dispatch(startCreateCategories(addCategory, resetForm))
    }
    return (
        <div>
            <h1>Expense Settings</h1>
            <Budget />
            <h5 className="d-inline m-2"> Categories:</h5>

            <input
                type="text"
                value={category}
                placeholder="Add Categories"
                onChange={handleChange}
            />
            <button onClick={handleClick}> Add </button>

            {isLoading ? (
                <Spinner animation="border" variant="primary" />
            ) : (
                <ul>
                    {data.map((category) => {
                        return (
                            <li key={category._id} className="m-2">


                                {editRecord == category._id ? <EditCategories {...category} handleEdit={handleEdit} /> : <div>
                                    {category.isDeleted ? <s>{category.name}</s> : category.name}
                                    <button
                                        className="m-1"
                                        disabled={category.isDeleted}
                                        onClick={() => {
                                            handleEdit(category._id)
                                        }}
                                    >
                                        <MdModeEditOutline />
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleSoftDelete(category._id)
                                        }}
                                        disabled={category.isDeleted}
                                    >
                                        <MdDelete />
                                    </button>
                                </div>}


                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default Setting

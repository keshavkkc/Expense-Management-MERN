import axios from 'axios'

const token = localStorage.getItem('token')

export const startGetExpenses = () => {
    return (dispatch) => {
        axios.get('http://localhost:3055/api/expenses', {
            headers: {
                Authorization: token
            }
        })
            .then((response) => {
                const result = response.data
                dispatch(listExpenses(result))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const startCreateExpenses = (data, toggle, formData) => {
    return (dispatch) => {
        axios.post('http://localhost:3055/api/expenses', data, {
            headers: {
                Authorization: token
            }
        })
            .then((response) => {
                const result = response.data
                toggle()
                formData()
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const startSoftDelete = (id, action) => {
    return (dispatch) => {
        axios.put(`http://localhost:3055/api/expenses/delete/${id}?action=${action}`, null, {
            headers: {
                Authorization: token
            }
        })
            .then((response) => {
                const result = response.data
                const resultStatus = result.hasOwnProperty('notice')
                if (!resultStatus) {
                    dispatch(deleteExpenses(result)) // we need to update the state
                } else {
                    alert(result.notice)
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const startUpdateExpenses = (id, data, handleEdit) => { //Updata  One Expense Details
    return (dispatch) => {
        axios.put(`http://localhost:3055/api/expenses/${id}`, data, {
            headers: {
                Authorization: token
            }
        })
            .then((response) => {
                const result = response.data
                const newResult = result.hasOwnProperty('notice')
                if (newResult) {
                    alert(result.notice)
                } else {
                    alert("Succefullt Update")
                    handleEdit()
                    dispatch(startGetExpenses())// Update state
                }
            })
    }
}

const listExpenses = (data) => {
    return {
        type: 'LIST_EXPENSES',
        payload: data
    }
}

const deleteExpenses = (data) => {
    return {
        type: 'DELETE_EXPENSES',
        payload: data
    }
}

const isLoading = () => {
    return {
        type: "LOADING",
    }
}

const isError = (error) => {
    return {
        type: "ERROR",
        payload: error,
    }
}



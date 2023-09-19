import axios from "axios"
const token = localStorage.getItem('token')
export const startUpdateBuget = (data, resetForm) => {
    return (dispatch) => {
        axios
            .put(`http://localhost:3055/api/budgets/update`, data, {
                headers: {
                    Authorization: token
                }
            })
            .then((response) => {
                if (!response.data.notice) {
                    dispatch(updateBudget(response.data))
                    resetForm()
                } else {
                    alert(response.data.notice)
                }
            })
            .catch((err) => {
                alert(err.message)
            })

    }
}
export const startGetBudgets = () => {
    return (dispatch) => {
        axios.get("http://localhost:3055/api/budgets", {
            headers: {
                Authorization: token
            }
        })
            .then((response) => {
                const result = response.data
                dispatch(listBudget(result))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const listBudget = (data) => {
    return {
        type: 'LIST_BUDGET',
        payload: data
    }
}

const updateBudget = (data) => {
    return {
        type: 'UPDATE_BUDGET',
        payload: data
    }
}

const isLoading = () => {
    return {
        type: "LOADING_BUDGET",
    }
}

const isError = (error) => {
    return {
        type: "ERROR_BUDGET",
        payload: error,
    }
}
